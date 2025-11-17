import { getSupabaseClient } from './_shared/supabase.js';
import { getContactEmails, getFromEmail, getResendClient } from './_shared/resend.js';

const isSupabaseEnabled = process.env.ENABLE_SUPABASE === 'true';
const isSupabaseConfigured = Boolean(
  process.env.SUPABASE_URL &&
    (process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.SUPABASE_ANON_KEY ||
      process.env.SUPABASE_API_KEY)
);

export interface InviteNov21Payload {
  fullName: string;
  email: string;
  phone: string;
  community: string;
  affiliation: string;
}

export function parseInviteNov21Payload(input: unknown): InviteNov21Payload {
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

  const requiredFields: Array<keyof InviteNov21Payload> = [
    'fullName',
    'email',
    'phone',
    'community',
    'affiliation',
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
    affiliation: String(body.affiliation).trim(),
  };

  for (const value of Object.values(sanitized)) {
    if (!value) throw new Error('Missing required fields');
  }

  return sanitized;
}

async function persistInviteNov21Rsvp(payload: InviteNov21Payload) {
  if (!isSupabaseEnabled || !isSupabaseConfigured) {
    console.warn(
      '[supabase] Skipping RSVP persistence; ENABLE_SUPABASE is not true or credentials are missing'
    );
    return;
  }

  const supabase = getSupabaseClient();
  const { error } = await supabase
    .from('invite_nov21_rsvps')
    .upsert(
      {
        full_name: payload.fullName,
        email: payload.email,
        phone: payload.phone,
        community: payload.community,
        affiliation: payload.affiliation,
      },
      { onConflict: 'email' }
    );

  if (error) {
    throw new Error(`Failed to store RSVP: ${error.message}`);
  }
}

export async function sendInviteNov21Emails(payload: InviteNov21Payload) {
  const resend = getResendClient();
  const from = getFromEmail();
  const to = getContactEmails();

  const organizerHtml = `
    <h2>New RSVP - Nothing Too Serious</h2>
    <p><strong>Name:</strong> ${payload.fullName}</p>
    <p><strong>Email:</strong> ${payload.email}</p>
    <p><strong>Phone:</strong> ${payload.phone}</p>
    <p><strong>Community:</strong> ${payload.community}</p>
    <p><strong>Affiliation:</strong> ${payload.affiliation}</p>
  `;

  await resend.emails.send({
    from,
    to,
    replyTo: payload.email,
    subject: `New RSVP - ${payload.fullName}`,
    html: organizerHtml,
  });

  const firstName = payload.fullName.split(' ')[0] || payload.fullName;
  const guestHtml = `
    <p>Hi ${firstName},</p>
    <p>Thank you for confirming your attendance at <strong>Nothing Too Serious</strong> &mdash; an evening of music, poetry, film, and conversation curated by tar1k.</p>
    <p><strong>Event Details</strong><br/>
    Venue: Freetown Aqua Sports Club<br/>
    Date: Friday, 21st November<br/>
    Time: 7:00 PM - 10:00 PM</p>
    <p>Dress Code: Come comfortable. It's Nothing Too Serious.</p>
    <p>We look forward to sharing this space with you.</p>
    <p>Warmly,<br/>tar1k &amp; Team<br/>@onlytar1k</p>
  `;

  await resend.emails.send({
    from,
    to: [payload.email],
    subject: 'Your Spot is Reserved - Nothing Too Serious',
    html: guestHtml,
  });
}

export async function processInviteNov21(payload: InviteNov21Payload) {
  await persistInviteNov21Rsvp(payload);
  await sendInviteNov21Emails(payload);
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  try {
    const payload = parseInviteNov21Payload(req.body);
    await processInviteNov21(payload);
    res
      .status(200)
      .json({ success: true, message: 'RSVP submitted! Check your inbox for confirmation.' });
  } catch (error: any) {
    console.error(error);
    const isBadRequest = /Missing required fields|Invalid JSON payload|Invalid payload format/.test(
      error?.message ?? ''
    );
    res.status(isBadRequest ? 400 : 500).json({
      error: isBadRequest ? error.message : 'Failed to send RSVP',
      details: isBadRequest ? undefined : error?.message ?? 'Unknown error',
    });
  }
}
