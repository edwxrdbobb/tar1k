import * as React from 'react';
import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface InviteNov21EmailProps {
  fullName: string;
  email: string;
  phone: string;
  designation: string;
}

const baseFont =
  "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

const baseTextStyles: React.CSSProperties = {
  color: '#0f0f0f',
  fontFamily: baseFont,
  lineHeight: '24px',
  fontSize: '15px',
};

const badgeStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  padding: '6px 14px',
  borderRadius: 999,
  backgroundColor: '#111',
  color: '#fff',
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: 1,
  textTransform: 'uppercase',
  width: 'fit-content',
};

export const InviteNov21GuestEmail = ({
  fullName,
}: InviteNov21EmailProps) => (
  <Html>
    <Head />
    <Preview>You're on the list — Nothing Too Serious RSVP confirmed.</Preview>
    <Body style={{ backgroundColor: '#f7f7f7', padding: '32px 0' }}>
      <Container style={{ backgroundColor: '#ffffff', borderRadius: 16, padding: 32, width: 560, fontFamily: baseFont }}>
        <Section style={{ ...baseTextStyles, fontSize: '16px' }}>
          <div style={badgeStyle}>RSVP Confirmed</div>
          <Text style={{ fontSize: 26, fontWeight: 700, margin: '16px 0 8px' }}>
            Nothing Too Serious
          </Text>
          <Text style={{ marginBottom: 12 }}>Hi {fullName.split(' ')[0] || fullName},</Text>
          <Text style={{ marginBottom: 12 }}>
            Thank you for locking in your spot. Expect a night where the music, poetry, film and
            raw conversations meet with no filter.
          </Text>
          <Section
            style={{
              border: '1px solid #ececec',
              borderRadius: 12,
              padding: 16,
              margin: '20px 0',
              background: '#fafafa',
            }}
          >
            <Text style={{ margin: 0 }}>
              <strong>Date:</strong> November 21, 2025
            </Text>
            <Text style={{ margin: '6px 0' }}>
              <strong>Location:</strong> TBA (we&apos;ll send the coordinates privately)
            </Text>
            <Text style={{ margin: 0 }}>
              <strong>Dress code:</strong> Comfortable, ready to move &amp; listen
            </Text>
          </Section>
          <Text style={{ fontWeight: 600, marginBottom: 8 }}>On the night</Text>
          <ul style={{ paddingLeft: 20, margin: '0 0 20px' }}>
            <li>Live performances &amp; intimate readings</li>
            <li>First screening of “Before You Wake”</li>
            <li>Limited keepsakes for purchase</li>
            <li>Real conversations about the art &amp; the work</li>
          </ul>
          <Text style={{ marginBottom: 12 }}>
            Keep an eye on your inbox; final details and arrival instructions will follow soon.
            Until then, stay open, stay curious — it&apos;s Nothing Too Serious.
          </Text>
          <Text style={{ marginTop: 24 }}>
            See you soon,
            <br />
            TAR1K
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export const InviteNov21OrganizerEmail = ({
  fullName,
  email,
  phone,
  designation,
}: InviteNov21EmailProps) => (
  <Html>
    <Head />
    <Preview>New RSVP submission for Nothing Too Serious.</Preview>
    <Body style={{ backgroundColor: '#050505', padding: '32px 0' }}>
      <Container
        style={{
          backgroundColor: '#0f0f0f',
          borderRadius: 18,
          padding: 32,
          width: 560,
          color: '#f3f3f3',
          fontFamily: baseFont,
          border: '1px solid #1f1f1f',
          boxShadow: '0 40px 90px rgba(0,0,0,0.45)',
        }}
      >
        <Section style={{ ...baseTextStyles, color: '#f3f3f3' }}>
          <div style={{ ...badgeStyle, backgroundColor: '#fff', color: '#0f0f0f' }}>New RSVP</div>
          <Text style={{ fontSize: 26, fontWeight: 700, margin: '18px 0 10px' }}>
            Nothing Too Serious
          </Text>
          <Text style={{ marginBottom: 24, color: '#bbbbbb' }}>
            A guest just confirmed. Details below.
          </Text>
          <Section
            style={{
              padding: 20,
              borderRadius: 14,
              background: 'linear-gradient(145deg, #181818, #111)',
              border: '1px solid #232323',
            }}
          >
            <Text style={{ margin: '0 0 8px', fontSize: 18, fontWeight: 600 }}>
              {fullName}
            </Text>
            <Text style={{ margin: 0 }}>
              <strong>Email:</strong> {email}
            </Text>
            <Text style={{ margin: '6px 0' }}>
              <strong>Phone:</strong> {phone}
            </Text>
            <Text style={{ margin: 0 }}>
              <strong>Designation:</strong> {designation}
            </Text>
          </Section>
          <Hr style={{ borderColor: '#1e1e1e', margin: '24px 0' }} />
          <Text style={{ fontSize: 13, color: '#8c8c8c' }}>
            Tip: reply directly to this email to reach {fullName.split(' ')[0] || fullName}.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);
