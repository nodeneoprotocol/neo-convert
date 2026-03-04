// Helper para envio de email via Mailtrap
// Docs: https://api-docs.mailtrap.io/docs/mailtrap-api-docs/bcf61cdc1547e-send-email

interface MailtrapEmail {
    to: string;
    subject: string;
    html: string;
    fromName?: string;
    fromEmail?: string;
}

export async function sendEmail({ to, subject, html, fromName, fromEmail }: MailtrapEmail) {
    const apiToken = process.env.MAILTRAP_API_TOKEN;
    if (!apiToken) {
        console.warn("MAILTRAP_API_TOKEN não configurado — email ignorado");
        return;
    }

    const from = {
        email: fromEmail || process.env.MAILTRAP_FROM_EMAIL || "no-reply@neo-convert.com",
        name: fromName || process.env.MAILTRAP_FROM_NAME || "NeoConvert",
    };

    const res = await fetch("https://send.api.mailtrap.io/api/send", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${apiToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            from,
            to: [{ email: to }],
            subject,
            html,
        }),
    });

    if (!res.ok) {
        const err = await res.text();
        console.error("Mailtrap error:", err);
        throw new Error(`Mailtrap: ${err}`);
    }

    return res.json();
}
