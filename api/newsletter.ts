import { getContactEmails, getFromEmail, getResendClient } from './_shared/resend.js';
import { getSupabaseClient } from './_shared/supabase.js';

export interface NewsletterPayload {
  email: string;
}

export function parseNewsletterPayload(input: unknown): NewsletterPayload {
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

  const email = String(body.email ?? '').trim();
  if (!email) {
    throw new Error('Email is required');
  }

  return { email };
}

async function persistNewsletterSubscription(payload: NewsletterPayload) {
  const supabase = getSupabaseClient();
  const { error } = await supabase
    .from('newsletter_subscribers')
    .upsert(
      { email: payload.email },
      { onConflict: 'email' }
    );

  if (error) {
    throw new Error(`Failed to store newsletter subscription: ${error.message}`);
  }
}

export async function handleNewsletterSubscription(payload: NewsletterPayload) {
  const resend = getResendClient();
  const from = getFromEmail();
  const to = getContactEmails();
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  if (audienceId) {
    await resend.contacts.create({ audienceId, email: payload.email });
  } else {
    await resend.emails.send({
      from,
      to,
      subject: '[Newsletter] New subscriber',
      html: `<p>New subscriber:</p><p><strong>${payload.email}</strong></p>`,
    });
  }

  await resend.emails.send({
    from,
    to: [payload.email],
    subject: 'Subscribed to TAR1K updates',
    html: `<p>Thanks for tapping in.</p>
           <p>You’ll get drops, updates, and behind-the-scenes notes first. If you didn't mean to subscribe, just ignore this email.</p>
           <p>— TAR1K</p>`,
  });
}

export async function processNewsletterSubscription(payload: NewsletterPayload) {
  await persistNewsletterSubscription(payload);
  await handleNewsletterSubscription(payload);
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  try {
    const payload = parseNewsletterPayload(req.body);
    await processNewsletterSubscription(payload);
    res.status(200).json({ success: true, message: 'Subscribed! Check your email for confirmation.' });
  } catch (error: any) {
    const isBadRequest = /Invalid JSON payload|Invalid payload format|Email is required/.test(
      error?.message ?? ''
    );
    res.status(isBadRequest ? 400 : 500).json({
      error: isBadRequest ? error.message : 'Failed to process subscription',
      details: isBadRequest ? undefined : error?.message ?? 'Unknown error',
    });
  }
}
