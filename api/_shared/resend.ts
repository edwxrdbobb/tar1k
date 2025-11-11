import { Resend } from 'resend';

const DEFAULT_FROM = 'invite@tar1k.com';
const DEFAULT_CONTACT = 'edwardbobkamara@gmail.com';

export const getFromEmail = () => process.env.RESEND_FROM_EMAIL ?? DEFAULT_FROM;
export const getContactEmail = () => process.env.CONTACT_TO_EMAIL ?? DEFAULT_CONTACT;

export const getResendClient = () => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured');
  }
  return new Resend(apiKey);
};
