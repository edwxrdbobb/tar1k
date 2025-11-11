import {
  InviteNov21GuestEmail,
  InviteNov21OrganizerEmail,
} from '../emails/invite-nov21-emails';
import { getContactEmail, getFromEmail, getResendClient } from './_shared/resend';

export interface InviteNov21Payload {
  fullName: string;
  email: string;
  phone: string;
  designation: string;
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
    'designation',
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
    designation: String(body.designation).trim(),
  };

  for (const value of Object.values(sanitized)) {
    if (!value) throw new Error('Missing required fields');
  }

  return sanitized;
}

export async function sendInviteNov21Emails(payload: InviteNov21Payload) {
  const resend = getResendClient();
  await resend.emails.send({
    from: getFromEmail(),
    to: [getContactEmail()],
    reply_to: payload.email,
    subject: `New RSVP — ${payload.fullName}`,
    react: InviteNov21OrganizerEmail(payload),
  });

  await resend.emails.send({
    from: getFromEmail(),
    to: [payload.email],
    subject: 'RSVP Confirmed — Nothing Too Serious',
    react: InviteNov21GuestEmail(payload),
  });
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  try {
    const payload = parseInviteNov21Payload(req.body);
    await sendInviteNov21Emails(payload);
    res.status(200).json({ success: true, message: 'RSVP submitted! Check your inbox for confirmation.' });
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
