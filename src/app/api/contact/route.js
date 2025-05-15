import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// TODO: Implement a better rate limiting with Redis
const rateLimit = new Map();
const WINDOW_SIZE_IN_MS = 5 * 60 * 1000; // 5 minutes
const MAX_REQUESTS_PER_WINDOW = 1;

/**
 * Handles POST requests for the contact form
 * @param {Request} request - The request object
 * @returns {Promise<NextResponse>} A response object
 */
export async function POST(request) {
    try {
        const ip =
            request.headers.get('x-forwarded-for') || request.ip || 'unknown';

        const now = Date.now();
        const windowStart = now - WINDOW_SIZE_IN_MS;
        const requestsInWindow = (rateLimit.get(ip) || []).filter(
            (t) => t > windowStart
        );

        if (requestsInWindow.length >= MAX_REQUESTS_PER_WINDOW) {
            return NextResponse.json(
                {
                    error: true,
                    message: 'Too many requests. Please try again later.',
                },
                { status: 429 }
            );
        }

        rateLimit.set(ip, [...requestsInWindow, now]);

        if (!process.env.RESEND_API_KEY) {
            console.error(
                '⚠️ Email service configuration error: API key is missing'
            );
            return NextResponse.json(
                {
                    error: true,
                    message:
                        '⚠️ Email service configuration error: API key is missing',
                },
                { status: 500 }
            );
        }

        const { name, email, message } = await request.json();

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: true, message: 'Missing required fields' },
                { status: 400 }
            );
        }

        const emailResponse = await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL,
            to: process.env.RESEND_TO_EMAIL,
            reply_to: email,
            subject: `New Contact Form Submission from ${name} | jdiogo.dev`,
            text: `
                Name: ${name}
                Email: ${email}
                Message: 
                ${message}`.trim(),
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>`,
        });

        if (emailResponse.error) {
            return NextResponse.json(
                { error: true, message: emailResponse.error.message },
                { status: emailResponse.error.statusCode }
            );
        }

        return NextResponse.json(
            { success: true, message: 'Message sent successfully!' },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                error: true,
                message: 'Failed to send message',
                details: error.message,
            },
            { status: 500 }
        );
    }
}
