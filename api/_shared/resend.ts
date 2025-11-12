import { Resend } from 'resend';

const DEFAULT_FROM = 'invite@tar1k.com';
const DEFAULT_CONTACTS = ['edwardbobkamara@gmail.com', 'sl.tar1kmusic@gmail.com'];

export const getFromEmail = () => process.env.RESEND_FROM_EMAIL ?? DEFAULT_FROM;
export const getContactEmails = () => {
  const envContacts = process.env.CONTACT_TO_EMAIL;
  if (!envContacts) return DEFAULT_CONTACTS;
  const parsed = envContacts
    .split(',')
    .map((email) => email.trim())
    .filter(Boolean);
  return parsed.length ? parsed : DEFAULT_CONTACTS;
};

export const getResendClient = () => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured');
  }
  return new Resend(apiKey);
};
