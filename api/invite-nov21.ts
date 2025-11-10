import { Resend } from 'resend';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const { fullName, email, phone, designation } = body;
    if (!fullName || !email || !phone || !designation) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const from = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
    const toOrganizer = process.env.CONTACT_TO_EMAIL || 'edwardbobkamara@gmail.com';

    // Notify organizer
    await resend.emails.send({
      from,
      to: [toOrganizer],
      subject: 'RSVP for Nothing Too Serious Event',
      text: `Full Name: ${fullName}\nEmail: ${email}\nPhone: ${phone}\nDesignation: ${designation}`,
      html: `
        <p><strong>Full Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone Number:</strong> ${phone}</p>
        <p><strong>Designation:</strong> ${designation}</p>
      `,
    });

    // Confirmation to user
    await resend.emails.send({
      from,
      to: [email],
      subject: 'RSVP Confirmation - Nothing Too Serious Event',
      html: `
        <h2>Thank you for your RSVP!</h2>
        <p>Dear ${fullName},</p>
        <p>Your RSVP for the "Nothing Too Serious" event has been received. We're excited to have you join us!</p>
        <p>Event Details:</p>
        <ul>
          <li>Event: Nothing Too Serious</li>
          <li>Date: November 21st</li>
          <li>Location: To be announced</li>
        </ul>
        <p>If you have any questions, please reply to this email.</p>
        <p>Best regards,<br/>TAR1K Team</p>
      `,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit RSVP' });
  }
}
