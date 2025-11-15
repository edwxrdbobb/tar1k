import process from 'node:process';
import { Resend } from 'resend';

const DEFAULT_FROM = 'invite@tar1k.com';
const DEFAULT_CONTACTS = ['edwardbobkamara@gmail.com', 'sl.tar1kmusic@gmail.com'];

export const getFromEmail = () => {
  const from = process.env.RESEND_FROM_EMAIL;
  console.log(`[env] RESEND_FROM_EMAIL ${from ? 'present' : 'missing'}${from ? '' : ' (using default)'}`);
  return from ?? DEFAULT_FROM;
};
export const getContactEmails = () => {
  const envContacts = process.env.CONTACT_TO_EMAIL;
  console.log(`[env] CONTACT_TO_EMAIL ${envContacts ? 'present' : 'missing'}`);
  if (!envContacts) return DEFAULT_CONTACTS;
  const parsed = envContacts
    .split(',')
    .map((email:any) => email.trim())
    .filter(Boolean);
  return parsed.length ? parsed : DEFAULT_CONTACTS;
};

export const getResendClient = () => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('[env] RESEND_API_KEY missing');
    throw new Error('RESEND_API_KEY is not configured');
  }
  console.log('[env] RESEND_API_KEY present');
  return new Resend(apiKey);
};
