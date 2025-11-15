import { getContactEmails, getFromEmail, getResendClient } from './_shared/resend.js';
import { getSupabaseClient } from './_shared/supabase.js';
const isSupabaseEnabled = process.env.ENABLE_SUPABASE === 'true';

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export function parseContactPayload(input: unknown): ContactPayload {
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

  const payload: ContactPayload = {
    name: String(body.name ?? '').trim(),
    email: String(body.email ?? '').trim(),
    message: String(body.message ?? '').trim(),
  };

  if (!payload.name || !payload.email || !payload.message) {
    throw new Error('Missing required fields');
  }

  return payload;
}

async function persistContactMessage(payload: ContactPayload) {
  if (!isSupabaseEnabled) {
    console.warn('[supabase] ENABLE_SUPABASE is not set to true; skipping contact persistence');
    return;
  }

  const supabase = getSupabaseClient();
  const { error } = await supabase.from('contact_messages').insert({
    name: payload.name,
    email: payload.email,
    message: payload.message,
  });

  if (error) {
    throw new Error(`Failed to store contact submission: ${error.message}`);
  }
}

export async function sendContactEmails(payload: ContactPayload) {
  const resend = getResendClient();
  const from = getFromEmail();
  const to = getContactEmails();

  await resend.emails.send({
    from,
    to,
    replyTo: payload.email,
    subject: `[Contact] ${payload.name} via TAR1K`,
    html: `<p><strong>Name:</strong> ${payload.name}</p>
           <p><strong>Email:</strong> ${payload.email}</p>
           <p style="white-space:pre-wrap">${payload.message}</p>`,
  });

  await resend.emails.send({
    from,
    to: [payload.email],
    subject: 'Thanks for reaching out to TAR1K',
    html: `<p>Hi ${payload.name.split(' ')[0] || payload.name},</p>
           <p>Got your message — thank you for reaching out. I’ll read it and circle back shortly.</p>
           <p>Talk soon,<br/>TAR1K</p>`,
  });
}

export async function processContactSubmission(payload: ContactPayload) {
  await persistContactMessage(payload);
  await sendContactEmails(payload);
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  try {
    const payload = parseContactPayload(req.body);
    await processContactSubmission(payload);
    res.status(200).json({ success: true, message: 'Message delivered. Check your inbox for confirmation.' });
  } catch (error: any) {
    const isBadRequest = /Missing required fields|Invalid JSON payload|Invalid payload format/.test(
      error?.message ?? ''
    );
    res.status(isBadRequest ? 400 : 500).json({
      error: isBadRequest ? error.message : 'Failed to send message',
      details: isBadRequest ? undefined : error?.message ?? 'Unknown error',
    });
  }
}
