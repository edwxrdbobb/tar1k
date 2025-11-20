import { getSupabaseClient } from './_shared/supabase.js';
import { getContactEmails, getFromEmail, getResendClient } from './_shared/resend.js';

const isSupabaseEnabled = process.env.ENABLE_SUPABASE === 'true';
const isSupabaseConfigured = Boolean(
  process.env.SUPABASE_URL &&
    (process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.SUPABASE_ANON_KEY ||
      process.env.SUPABASE_API_KEY)
);
const GENERAL_SIGNUP_LIMIT = 15;

class SignupLimitReachedError extends Error {
  statusCode: number;
  constructor() {
    super('Signup limit reached');
    this.name = 'SignupLimitReachedError';
    this.statusCode = 409;
  }
}

export interface InviteGeneralPayload {
  fullName: string;
  email: string;
  phone: string;
  community: string;
}

export function parseInviteGeneralPayload(input: unknown): InviteGeneralPayload {
  let body: any = input ?? {};

  if (typeof body === 'string') {
    if (!body.trim()) body = {};
    else {
      try {
        body = JSON.parse(body);
      } catch {
        throw new Error('Invalid JSON payload');
      }
    }
  }

  if (typeof body !== 'object' || Array.isArray(body)) {
    throw new Error('Invalid payload format');
  }

  const requiredFields: Array<keyof InviteGeneralPayload> = [
    'fullName',
    'email',
    'phone',
    'community',
  ];

  for (const field of requiredFields) {
    if (!body[field]) {
      throw new Error('Missing required fields');
    }
  }

  const sanitized = {
    fullName: String(body.fullName).trim(),
    email: String(body.email).trim(),
    phone: String(body.phone).trim(),
    community: String(body.community).trim(),
  };

  for (const value of Object.values(sanitized)) {
    if (!value) throw new Error('Missing required fields');
  }

  return sanitized;
}

async function fetchSignupCount(): Promise<number> {
  if (!isSupabaseEnabled || !isSupabaseConfigured) {
    return 0;
  }

  const supabase = getSupabaseClient();
  const { count, error } = await supabase
    .from('invite_general_signups')
    .select('*', { count: 'exact', head: true });

  if (error) {
    throw new Error(`Failed to fetch signup count: ${error.message}`);
  }

  return count ?? 0;
}

export async function getInviteGeneralStatus() {
  const currentCount = await fetchSignupCount();
  const remaining = Math.max(GENERAL_SIGNUP_LIMIT - currentCount, 0);

  return {
    success: true,
    limit: GENERAL_SIGNUP_LIMIT,
    count: currentCount,
    remaining,
    isClosed: currentCount >= GENERAL_SIGNUP_LIMIT,
  };
}

async function ensureSignupCapacity() {
  const status = await getInviteGeneralStatus();
  if (status.isClosed) {
    throw new SignupLimitReachedError();
  }
  return status;
}

async function persistInviteGeneralSignup(payload: InviteGeneralPayload) {
  if (!isSupabaseEnabled || !isSupabaseConfigured) {
    console.warn(
      '[supabase] Skipping signup persistence; ENABLE_SUPABASE is not true or credentials are missing'
    );
    return;
  }

  const supabase = getSupabaseClient();
  const { error } = await supabase
    .from('invite_general_signups')
    .upsert(
      {
        full_name: payload.fullName,
        email: payload.email,
        phone: payload.phone,
        community: payload.community,
      },
      { onConflict: 'email' }
    );

  if (error) {
    throw new Error(`Failed to store signup: ${error.message}`);
  }
}

export async function sendInviteGeneralEmails(payload: InviteGeneralPayload) {
  const resend = getResendClient();
  const from = getFromEmail();
  const to = getContactEmails();

  const organizerHtml = `
    <h2>New Signup - Nothing Too Serious</h2>
    <p><strong>Name:</strong> ${payload.fullName}</p>
    <p><strong>Email:</strong> ${payload.email}</p>
    <p><strong>Phone:</strong> ${payload.phone}</p>
    <p><strong>Community:</strong> ${payload.community}</p>
  `;

  await resend.emails.send({
    from,
    to,
    replyTo: payload.email,
    subject: `New Signup - ${payload.fullName}`,
    html: organizerHtml,
  });

  const firstName = payload.fullName.split(' ')[0] || payload.fullName;
  const guestHtml = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>Nothing Too Serious - You're In</title>
      </head>
      <body style="margin:0;padding:32px 0;background-color:#050505;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
        <table role="presentation" width="100%" cellPadding="0" cellSpacing="0" style="border-collapse:collapse;">
          <tr>
            <td align="center">
              <table role="presentation" width="580" cellPadding="0" cellSpacing="0" style="border-radius:24px;background-color:#0f0f0f;border:1px solid #1f1f1f;box-shadow:0 30px 80px rgba(0,0,0,0.65);color:#f6f6f6;padding:36px;">
                <tr>
                  <td style="font-size:15px;line-height:24px;color:#f6f6f6;">
                    <div style="display:inline-flex;align-items:center;padding:6px 14px;border-radius:999px;background-color:#f6e05e;color:#090909;font-size:12px;font-weight:600;letter-spacing:1px;text-transform:uppercase;width:fit-content;">
                      You're In
                    </div>
                    <h1 style="margin:18px 0 10px;font-size:32px;font-weight:800;color:#ffffff;">
                      Nothing Too Serious
                    </h1>
                    <p style="margin:0 0 16px;">
                      Thank you, ${firstName}, for confirming your attendance at Nothing Too Serious &mdash; an evening of music, poetry, film, and conversation curated by tar1k.
                    </p>
                    <p style="margin:0 0 16px;">
                      This is a moment suspended between reflection and becoming &mdash; a celebration of effort, collaboration, and authenticity. Come open, come curious, and come ready to enjoy art for its own sake.
                    </p>

                    <div style="border-radius:18px;background:linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03));padding:20px;margin:24px 0;border:1px solid rgba(255,255,255,0.08);">
                      <p style="margin:0 0 12px;font-weight:600;text-transform:uppercase;letter-spacing:1.5px;">Event Details</p>
                      <p style="margin:0;">Venue: Freetown Aqua Sports Club</p>
                      <p style="margin:6px 0;">Date: Friday, 21st November</p>
                      <p style="margin:0;">Time: 7:00 PM - 10:00 PM</p>
                    </div>

                    <div style="border-radius:18px;padding:20px;margin:0 0 24px;border:1px solid rgba(255,255,255,0.08);">
                      <p style="margin:0 0 12px;font-weight:600;text-transform:uppercase;letter-spacing:1.5px;">Evening Flow</p>
                      <ul style="margin:0;padding-left:18px;">
                        <li>7:00 - 7:45 | Arrivals &amp; Welcome</li>
                        <li>8:00 - 8:20 | First Performance</li>
                        <li>8:30 - 9:00 | "Before You Wake" - Film Screening</li>
                        <li>9:10 - 9:30 | Fireside Conversation</li>
                        <li>9:35 - 10:00 | Final Performance</li>
                      </ul>
                    </div>

                    <p style="margin:0 0 20px;">Dress Code: Come comfortable. It's Nothing Too Serious.</p>
                    <p style="margin:0 0 16px;">We look forward to sharing this space with you.</p>
                    <p style="margin:0;">
                      Warmly,<br />
                      tar1k &amp; Team<br />
                      @onlytar1k
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  await resend.emails.send({
    from,
    to: [payload.email],
    subject: 'You are confirmed - Nothing Too Serious',
    html: guestHtml,
  });
}

export async function processInviteGeneral(payload: InviteGeneralPayload) {
  await ensureSignupCapacity();
  await persistInviteGeneralSignup(payload);
  await sendInviteGeneralEmails(payload);
}

export default async function handler(req: any, res: any) {
  if (req.method === 'GET') {
    try {
      const status = await getInviteGeneralStatus();
      res.status(200).json(status);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({
        error: 'Failed to load signup status',
        details: error?.message ?? 'Unknown error',
      });
    }
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  try {
    const payload = parseInviteGeneralPayload(req.body);
    await processInviteGeneral(payload);
    res
      .status(200)
      .json({ success: true, message: 'Signup submitted! Check your inbox for confirmation.' });
  } catch (error: any) {
    console.error(error);
    const isBadRequest = /Missing required fields|Invalid JSON payload|Invalid payload format/.test(
      error?.message ?? ''
    );
    const isSignupLimitError = error instanceof SignupLimitReachedError;
    const status = isSignupLimitError ? error.statusCode : isBadRequest ? 400 : 500;
    res.status(status).json({
      error: isSignupLimitError ? error.message : isBadRequest ? error.message : 'Failed to process signup',
      details: isBadRequest || isSignupLimitError ? undefined : error?.message ?? 'Unknown error',
    });
  }
}
