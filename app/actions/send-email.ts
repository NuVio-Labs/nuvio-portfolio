"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type Lang = "de" | "nl" | "en";

function normalizeLang(input: unknown): Lang {
    const v = String(input ?? "de").toLowerCase().slice(0, 2);
    if (v === "de" || v === "nl" || v === "en") return v;
    return "de";
}

function cleanStr(value: unknown) {
    return String(value ?? "")
        .replace(/[\r\n]+/g, " ")
        .replace(/<[^>]*>/g, "")
        .trim();
}

function cleanMsg(value: unknown) {
    return String(value ?? "").replace(/<[^>]*>/g, "").trim();
}

export async function sendEmail(formData: FormData) {
    try {
        // 1) Bot Schutz
        const honeypot = String(formData.get("honeypot") ?? "");
        if (honeypot.trim().length > 0) {
            return { success: false, message: "Spam detected." };
        }

        // 2) Sprache
        const lang = normalizeLang(formData.get("lang"));

        // 3) Templates wie PHP
        const subjects: Record<Lang, string> = {
            de: "Kontaktformular NuVioLabs",
            nl: "Contactformulier NuVioLabs",
            en: "Contact form NuVioLabs",
        };

        const labels: Record<
            Lang,
            { name: string; email: string; phone: string; subject: string; message: string }
        > = {
            de: { name: "Name", email: "E Mail", phone: "Telefon", subject: "Betreff", message: "Nachricht" },
            nl: { name: "Naam", email: "E mail", phone: "Telefoon", subject: "Onderwerp", message: "Bericht" },
            en: { name: "Name", email: "Email", phone: "Phone", subject: "Subject", message: "Message" },
        };

        const responseMessages: Record<Lang, { success: string; errorFields: string; errorServer: string }> =
        {
            de: {
                success: "Danke. Deine Anfrage wurde gesendet.",
                errorFields: "Bitte fülle alle Pflichtfelder korrekt aus.",
                errorServer: "Ein technischer Fehler ist aufgetreten.",
            },
            nl: {
                success: "Bedankt. Je aanvraag is verzonden.",
                errorFields: "Vul alle verplichte velden correct in.",
                errorServer: "Er is een technische fout opgetreden.",
            },
            en: {
                success: "Thanks. Your request has been sent.",
                errorFields: "Please fill in all required fields correctly.",
                errorServer: "A technical error occurred.",
            },
        };

        // 4) Input Validierung und Sanitizing
        const name = cleanStr(formData.get("name"));
        const email = cleanStr(formData.get("email"));
        const phone = cleanStr(formData.get("phone"));
        const subject = cleanStr(formData.get("subject"));
        const message = cleanMsg(formData.get("message"));

        const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        let isValid = true;
        if (name.length < 2 || name.length > 80) isValid = false;
        if (!emailOk || email.length > 120) isValid = false;
        if (subject.length < 2 || subject.length > 150) isValid = false;
        if (message.length < 5 || message.length > 2000) isValid = false;
        if (phone && phone.length > 30) isValid = false;

        if (!isValid) {
            return { success: false, message: responseMessages[lang].errorFields };
        }

        // 5) Body Construction wie PHP
        const l = labels[lang];

        const bodyLines: string[] = [];
        bodyLines.push(`${l.name}: ${name}`);
        bodyLines.push(`${l.email}: ${email}`);
        if (phone) bodyLines.push(`${l.phone}: ${phone}`);
        bodyLines.push(`${l.subject}: ${subject}`);
        bodyLines.push("");
        bodyLines.push(`${l.message}:`);
        bodyLines.push(message);
        bodyLines.push("");
        bodyLines.push("---");
        bodyLines.push(`Sent: ${new Date().toISOString()}`);

        const text = bodyLines.join("\n");

        // 6) Versand
        const to = "contact@nuviolabs.de";
        const from = "NuVioLabs <contact@nuviolabs.de>";

        const result = await resend.emails.send({
            from,
            to,
            replyTo: email,
            subject: `${subjects[lang]}: ${subject}`,
            text,
        });

        if (result.error) {
            return { success: false, message: result.error.message };
        }

        // 7) Auto-Reply an den Kunden
        const autoReplySubjects: Record<Lang, string> = {
            de: "Wir haben deine Anfrage erhalten",
            nl: "We hebben uw aanvraag ontvangen",
            en: "We have received your inquiry",
        };

        const autoReplyTexts: Record<Lang, string> = {
            de: `Hallo ${name},\n\nvielen Dank für deine Anfrage bei NuVioLabs.\nWir melden uns zeitnah bei dir.\n\nBeste Grüße\nNuVioLabs`,
            nl: `Hallo ${name},\n\nbedankt voor uw aanvraag bij NuVioLabs.\nWe nemen binnenkort contact met u op.\n\nMet vriendelijke groet,\nNuVioLabs`,
            en: `Hello ${name},\n\nthank you for your inquiry at NuVioLabs.\nWe will get back to you shortly.\n\nBest regards,\nNuVioLabs`,
        };

        try {
            await resend.emails.send({
                from: "NuVioLabs <contact@nuviolabs.de>",
                to: email,
                subject: autoReplySubjects[lang],
                text: autoReplyTexts[lang]
            });
        } catch (autoErr) {
            // Auto-reply error should not prevent the success message to the client 
            // as the main lead email was already successful.
            console.error("Auto-reply failed:", autoErr);
        }

        return { success: true, message: responseMessages[lang].success };
    } catch (e: any) {
        return { success: false, message: e.message || "Server error." };
    }
}
