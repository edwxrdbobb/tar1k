import * as React from 'react';
import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface InviteNov21EmailProps {
  fullName: string;
  email: string;
  phone: string;
  community: string;
  affiliation: string;
  qrCodeDataUrl?: string;
  qrToken?: string;
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
  qrCodeDataUrl,
}: InviteNov21EmailProps) => (
  <Html>
    <Head />
    <Preview>Your spot is reserved �?" Nothing Too Serious</Preview>
    <Body style={{ backgroundColor: '#050505', padding: '32px 0', fontFamily: baseFont }}>
      <Container
        style={{
          backgroundColor: '#0f0f0f',
          borderRadius: 24,
          padding: 36,
          width: 580,
          color: '#f6f6f6',
          border: '1px solid #1f1f1f',
          boxShadow: '0 30px 80px rgba(0,0,0,0.65)',
        }}
      >
        <Section style={{ ...baseTextStyles, color: '#f6f6f6', fontSize: 16 }}>
          <div style={{ ...badgeStyle, backgroundColor: '#f6e05e', color: '#090909' }}>
            You�?Tre In
          </div>
          <Text style={{ fontSize: 32, fontWeight: 800, margin: '18px 0 10px' }}>
            Nothing Too Serious
          </Text>
          <Text style={{ marginBottom: 16 }}>
            Thank you, {fullName.split(' ')[0] || fullName}, for confirming your attendance at
            Nothing Too Serious �?" an evening of music, poetry, film, and conversation curated by
            tar1k.
          </Text>
          <Text style={{ marginBottom: 16 }}>
            This is a moment suspended between reflection and becoming �?" a celebration of effort,
            collaboration, and authenticity. Come open, come curious, and come ready to enjoy art
            for its own sake.
          </Text>
          <Section
            style={{
              borderRadius: 18,
              background: 'linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))',
              padding: 20,
              margin: '24px 0',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <Text style={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 12 }}>
              Event Details
            </Text>
            <Text style={{ margin: 0 }}>dY"? Venue: Freetown Aqua Sports Club</Text>
            <Text style={{ margin: '6px 0' }}>dY". Date: Friday, 21st November</Text>
            <Text style={{ margin: 0 }}>�?� Time: 7:00 PM �?" 10:00 PM</Text>
          </Section>
          <Section
            style={{
              borderRadius: 18,
              padding: 20,
              marginBottom: 24,
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <Text style={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 12 }}>
              Evening Flow
            </Text>
            <ul style={{ paddingLeft: 18, margin: 0 }}>
              <li>7:00 �?" 7:45 | Arrivals &amp; Welcome</li>
              <li>8:00 �?" 8:20 | First Performance</li>
              <li>8:30 �?" 9:00 | �?oBefore You Wake�?? �?" Film Screening</li>
              <li>9:10 �?" 9:30 | Fireside Conversation</li>
              <li>9:35 �?" 10:00 | Final Performance</li>
            </ul>
          </Section>
          <Text style={{ marginBottom: 20 }}>
            Dress Code: Come comfortable. It�?Ts Nothing Too Serious.
          </Text>
          {qrCodeDataUrl ? (
            <Section
              style={{
                borderRadius: 18,
                padding: 24,
                border: '1px dashed rgba(255,255,255,0.2)',
                textAlign: 'center',
                marginBottom: 24,
                backgroundColor: 'rgba(0,0,0,0.2)',
              }}
            >
              <Text style={{ marginBottom: 12, fontWeight: 600 }}>
                Bring this QR code to check in on the night.
              </Text>
              <Img
                alt="Nothing Too Serious QR Code"
                src={qrCodeDataUrl}
                width="180"
                height="180"
                style={{ display: 'block', margin: '0 auto 12px' }}
              />
              <Text style={{ fontSize: 13, color: '#d1d1d1' }}>
                We�?Tll scan it to verify your RSVP at the entrance.
              </Text>
            </Section>
          ) : null}
          <Text style={{ marginBottom: 16 }}>
            We look forward to sharing this space with you.
          </Text>
          <Text>
            Warmly,
            <br />
            tar1k &amp; Team
            <br />
            @onlytar1k
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
  community,
  affiliation,
  qrToken,
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
              <strong>Community:</strong> {community}
            </Text>
            <Text style={{ margin: '6px 0 0' }}>
              <strong>Affiliation:</strong> {affiliation}
            </Text>
            {qrToken ? (
              <Text style={{ margin: '12px 0 0', fontSize: 13, color: '#bbbbbb' }}>
                QR Token: <code>{qrToken}</code>
              </Text>
            ) : null}
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
