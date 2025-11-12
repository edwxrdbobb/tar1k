import { randomUUID } from 'node:crypto';

import QRCode from 'qrcode';

import {
  InviteNov21GuestEmail,
  InviteNov21OrganizerEmail,
} from '../emails/invite-nov21-emails';
import { getSupabaseClient } from './_shared/supabase';
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

interface InviteNov21EmailContext {
  qrCodeDataUrl: string;
  qrToken: string;
}

async function persistInviteNov21Rsvp(payload: InviteNov21Payload) {
  const supabase = getSupabaseClient();
  const qrToken = randomUUID();

  const qrPayload = JSON.stringify({
    type: 'invite-nov21',
    email: payload.email,
    token: qrToken,
  });

  const qrCodeDataUrl = await QRCode.toDataURL(qrPayload, {
    width: 256,
    margin: 2,
    color: {
      dark: '#111111',
      light: '#ffffff',
    },
  });

  const { error } = await supabase
    .from('invite_nov21_rsvps')
    .upsert(
      {
        full_name: payload.fullName,
        email: payload.email,
        phone: payload.phone,
        designation: payload.designation,
        qr_token: qrToken,
        qr_payload: qrPayload,
        qr_png_data_url: qrCodeDataUrl,
      },
      { onConflict: 'email' }
    );

  if (error) {
    throw new Error(`Failed to store RSVP: ${error.message}`);
  }

  return { qrCodeDataUrl, qrToken };
}

export async function sendInviteNov21Emails(
  payload: InviteNov21Payload,
  context: InviteNov21EmailContext
) {
  const resend = getResendClient();
  await resend.emails.send({
    from: getFromEmail(),
    to: [getContactEmail()],
    reply_to: payload.email,
    subject: `New RSVP — ${payload.fullName}`,
    react: InviteNov21OrganizerEmail({ ...payload, qrToken: context.qrToken }),
  });

  await resend.emails.send({
    from: getFromEmail(),
    to: [payload.email],
    subject: 'Your Spot is Reserved — Nothing Too Serious',
    react: InviteNov21GuestEmail({
      ...payload,
      qrCodeDataUrl: context.qrCodeDataUrl,
    }),
  });
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  try {
    const payload = parseInviteNov21Payload(req.body);
    const qrDetails = await persistInviteNov21Rsvp(payload);
    await sendInviteNov21Emails(payload, qrDetails);
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
