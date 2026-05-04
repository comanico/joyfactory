import type { CSSProperties } from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

const primary = "#63367c";
const secondary = "#006973";
const onSurface = "#0e2000";
const muted = "#4c444f";

export type ConfirmationEmailProps = {
  reservationUrl: string;
  packageLabel: string;
  dateFormatted: string;
  timeLine: string;
  guests: number;
  greetingName: string;
  bookingReference: string;
};

export function ConfirmationEmail({
  reservationUrl,
  packageLabel,
  dateFormatted,
  timeLine,
  guests,
  greetingName,
  bookingReference,
}: ConfirmationEmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>Your JoyFactory reservation is confirmed — view your details</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={hero}>
            <Text style={logo}>JoyFactory</Text>
            <Heading as="h1" style={h1}>
              You&apos;re booked, {greetingName}!
            </Heading>
            <Text style={lede}>
              Your deposit went through.{" "}
              <span style={ledeAccent}>Save the link below</span> — you can open it anytime before your party.
            </Text>
          </Section>

          <Section style={card}>
            <Text style={label}>Package</Text>
            <Text style={packageTitle}>{packageLabel}</Text>
            <Hr style={hr} />
            <Text style={label}>Date</Text>
            <Text style={valueAccent}>{dateFormatted}</Text>
            <Hr style={hr} />
            <Text style={label}>Time</Text>
            <Text style={valueAccent}>{timeLine}</Text>
            <Hr style={hr} />
            <Text style={label}>Guests included</Text>
            <Text style={valueSecondary}>{guests}</Text>
            <Hr style={hr} />
            <Text style={label}>Reference</Text>
            <Text style={mono}>{bookingReference}</Text>
          </Section>

          <Section style={{ textAlign: "center", marginTop: 28 }}>
            <Link href={reservationUrl} style={ctaLink}>
              View your reservation →
            </Link>
          </Section>

          <Text style={footer}>
            <span style={{ color: primary, fontWeight: 700 }}>Sophisticated joy</span>
            {" "}for little adventurers ·{" "}
            <span style={{ color: secondary, fontWeight: 700 }}>JoyFactory</span>
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main: CSSProperties = {
  fontFamily:
    '"Plus Jakarta Sans", "Be Vietnam Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  margin: 0,
  padding: "32px 16px",
};

const container: CSSProperties = {
  maxWidth: 520,
  margin: "0 auto",
};

const hero: CSSProperties = {
  textAlign: "center",
  marginBottom: 24,
};

const logo: CSSProperties = {
  fontSize: 28,
  fontWeight: 900,
  color: primary,
  letterSpacing: "-0.04em",
  margin: "0 0 16px",
};

const h1: CSSProperties = {
  color: primary,
  fontSize: 26,
  fontWeight: 800,
  margin: "0 0 12px",
  lineHeight: 1.2,
};

const lede: CSSProperties = {
  color: muted,
  fontSize: 16,
  lineHeight: 1.55,
  margin: 0,
};

const ledeAccent: CSSProperties = {
  color: secondary,
  fontWeight: 700,
};

const card: CSSProperties = {
  borderRadius: 20,
  padding: "24px 28px",
  border: `2px solid ${primary}`,
};

const label: CSSProperties = {
  color: secondary,
  fontSize: 12,
  fontWeight: 700,
  textTransform: "uppercase" as const,
  letterSpacing: "0.08em",
  margin: "0 0 6px",
};

const packageTitle: CSSProperties = {
  color: primary,
  fontSize: 22,
  fontWeight: 800,
  margin: "0 0 16px",
};

const valueAccent: CSSProperties = {
  color: primary,
  fontSize: 18,
  fontWeight: 700,
  margin: "0 0 16px",
};

const valueSecondary: CSSProperties = {
  color: secondary,
  fontSize: 18,
  fontWeight: 700,
  margin: "0 0 16px",
};

const hr: CSSProperties = {
  borderColor: "#63367c33",
  borderWidth: "1px 0 0",
  borderStyle: "solid",
  margin: "14px 0",
};

const ctaLink: CSSProperties = {
  color: secondary,
  fontWeight: 800,
  fontSize: 18,
  textDecoration: "underline",
};

const mono: CSSProperties = {
  color: primary,
  fontSize: 13,
  fontFamily: "ui-monospace, monospace",
  fontWeight: 600,
  margin: 0,
  wordBreak: "break-all" as const,
};

const footer: CSSProperties = {
  textAlign: "center",
  color: muted,
  fontSize: 13,
  marginTop: 32,
  lineHeight: 1.5,
};

export default ConfirmationEmail;
