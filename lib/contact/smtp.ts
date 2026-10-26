import 'server-only';

import nodemailer from 'nodemailer';
import type { ContactEnquiry } from './validate';

type SmtpConfig = {
    host: string;
    port: number;
    secure: boolean;
    user: string;
    password: string;
    from: string;
    to: string;
};

function readSmtpConfig(): SmtpConfig | null {
    const host = process.env.SMTP_HOST?.trim();
    const port = Number(process.env.SMTP_PORT);
    const secure = process.env.SMTP_SECURE;
    const user = process.env.SMTP_USER?.trim();
    const password = process.env.SMTP_PASSWORD;
    const from = process.env.CONTACT_EMAIL_FROM?.trim();
    const to = process.env.CONTACT_EMAIL_TO?.trim();

    if (!host || !Number.isInteger(port) || port < 1 || port > 65535 ||
        (secure !== 'true' && secure !== 'false') || !user || !password ||
        !from || !/^[^\s@<>\r\n]+@[^\s@<>\r\n]+\.[^\s@<>\r\n]+$/.test(from) ||
        to !== 'hello@tresmind.com') {
        console.error('Contact form: SMTP configuration is missing or invalid.');
        return null;
    }

    return { host, port, secure: secure === 'true', user, password, from, to };
}

export async function deliverContactEnquiry(enquiry: ContactEnquiry): Promise<boolean> {
    const config = readSmtpConfig();
    if (!config) return false;

    const transport = nodemailer.createTransport({
        host: config.host,
        port: config.port,
        secure: config.secure,
        requireTLS: !config.secure,
        auth: { user: config.user, pass: config.password },
    });

    try {
        const result = await transport.sendMail({
            from: config.from,
            to: config.to,
            replyTo: enquiry.email,
            subject: `Website enquiry: ${enquiry.subject}`,
            text: [
                `Name: ${enquiry.name}`,
                `Email: ${enquiry.email}`,
                `Phone: ${enquiry.phone || 'Not provided'}`,
                `Subject: ${enquiry.subject}`,
                '',
                'Message:',
                enquiry.message,
            ].join('\n'),
        });
        return result.accepted.includes(config.to);
    } catch (error) {
        const smtpError = error as {
            code?: string;
            responseCode?: number;
            command?: string;
        };

        console.error('Contact form: SMTP delivery failed.', {
            code: smtpError.code,
            responseCode: smtpError.responseCode,
            command: smtpError.command,
        });

        return false;
    } finally {
        transport.close();
    }
}
