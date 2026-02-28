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
        const data = await resend.emails.send({
            from: "Portfolio Contact <contact@nuviolabs.com>", // You'll need to verify this domain in Resend
            to: process.env.CONTACT_EMAIL || "hello@nuviolabs.com", // Fallback email
            subject: `Neue Portfolio Anfrage: ${subject}`,
            replyTo: email,
            text: `
Name: ${name}
Email: ${email}
Betreff: ${subject}

Nachricht:
${message}
            `,
        })

        if (data.error) {
            return { error: data.error.message }
        }

        return { success: true }
    } catch (error) {
        return { error: "Something went wrong" }
    }
}
