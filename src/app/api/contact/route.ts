import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || apiKey === 're_your_api_key_here') {
    return NextResponse.json(
      { error: 'Resend API key is not configured. Set RESEND_API_KEY in your .env file.' },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);

  let body: { name?: string; email?: string; subject?: string; message?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { name, email, subject, message } = body;

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: 'All fields are required: name, email, subject, message' }, { status: 400 });
  }

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'Simora <onboarding@resend.dev>',
      to: process.env.RESEND_TO_EMAIL || 'test@gmail.com',
      replyTo: email,
      subject: `[Simora Contact] ${subject}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #4F46E5; padding: 24px; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 20px;">New Contact Message</h1>
          </div>
          <div style="border: 1px solid #E2E8F0; border-top: none; padding: 24px; border-radius: 0 0 12px 12px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #64748B; font-size: 14px; width: 100px;">Name:</td>
                <td style="padding: 8px 0; color: #1E293B; font-size: 14px; font-weight: 600;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748B; font-size: 14px;">Email:</td>
                <td style="padding: 8px 0; color: #1E293B; font-size: 14px;"><a href="mailto:${email}" style="color: #4F46E5;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748B; font-size: 14px;">Subject:</td>
                <td style="padding: 8px 0; color: #1E293B; font-size: 14px; font-weight: 600;">${subject}</td>
              </tr>
            </table>
            <hr style="border: none; border-top: 1px solid #E2E8F0; margin: 16px 0;" />
            <div style="color: #1E293B; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</div>
          </div>
          <p style="color: #94A3B8; font-size: 12px; text-align: center; margin-top: 16px;">
            Sent from Simora contact form
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Resend error:', err);
    return NextResponse.json({ error: 'Failed to send email. Please try again later.' }, { status: 500 });
  }
}
