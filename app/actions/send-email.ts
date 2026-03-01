"use server"

import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendEmail(formData: FormData) {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const subject = formData.get("subject") as string
    const message = formData.get("message") as string

    if (!name || !email || !subject || !message) {
        return { error: "Missing required fields" }
    }

    try {
        const result = await resend.emails.send({
            from: "NuVioLabs <onboarding@resend.dev>",
            to: "contact@nuviolabs.de",
            replyTo: email,
            subject: `Kontaktformular: ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\n${message}`
        })

        if (result.error) {
            return { ok: false, error: result.error.message }
        }

        return { ok: true }
    } catch (e: any) {
        return { ok: false, error: e.message || "Something went wrong" }
    }
}
