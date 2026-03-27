import nodemailer from 'nodemailer';
import { config } from 'dotenv';

config({
  path: '.env',
});

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT ?? 587),
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export async function sendSubscribeConfirmation(email: string) {
  await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to: email,
    subject: "You're on the list! 🎉",
    html: `
      <div style="font-family: sans-serif; max-width: 520px; margin: 0 auto; padding: 40px 24px;">
        <h1 style="font-size: 28px; font-weight: 900; margin-bottom: 8px;">You're in! 🎉</h1>
        <p style="color: #555; font-size: 16px; line-height: 1.6;">
          Thanks for subscribing to our newsletter. We'll keep you updated with the
          latest news, tips, and exclusive content.
        </p>
        <div style="margin: 32px 0;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL}"
             style="background:#F15A2B;color:#fff;padding:12px 28px;border-radius:999px;
                    text-decoration:none;font-weight:700;font-size:15px;">
            Visit our site →
          </a>
        </div>
        <p style="color:#aaa;font-size:13px;">
          You received this because you signed up at ${process.env.NEXT_PUBLIC_APP_URL}.
          <br/>To unsubscribe, reply to this email.
        </p>
      </div>
    `,
  });
}

export async function sendWelcomeEmail(name: string, email: string) {
  await transporter.sendMail({
    from: `"My App" <${process.env.SMTP_FROM}>`,
    to: email,
    subject: `Welcome, ${name}! 👋`,
    html: `
      <div style="font-family: sans-serif; max-width: 520px; margin: 0 auto; padding: 40px 24px;">
        <h1 style="font-size: 28px; font-weight: 900; margin-bottom: 8px;">Welcome, ${name}!</h1>
        <p style="color: #555; font-size: 16px; line-height: 1.6;">
          Your account has been created. You can now access all blog content and
          your personal dashboard.
        </p>
        <div style="margin: 32px 0;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard"
             style="background:#F15A2B;color:#fff;padding:12px 28px;border-radius:999px;
                    text-decoration:none;font-weight:700;font-size:15px;">
            Go to Dashboard →
          </a>
        </div>
      </div>
    `,
  });
}
