import {
  InviteNov21GuestEmail,
  InviteNov21OrganizerEmail,
} from './_emails/invite-nov21-emails.js';
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
  await resend.emails.send({
    from: getFromEmail(),
    to: getContactEmails(),
    replyTo: payload.email,
    subject: `New RSVP �?" ${payload.fullName}`,
    react: InviteNov21OrganizerEmail(payload),
  });

  await resend.emails.send({
    from: getFromEmail(),
    to: [payload.email],
    subject: 'Your Spot is Reserved �?" Nothing Too Serious',
    react: InviteNov21GuestEmail(payload),
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
