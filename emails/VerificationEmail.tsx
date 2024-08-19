import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Row,
  Section,
  Text,
  Button,
} from "@react-email/components";

interface VerificationEmailProps {
  username: string;
  otp: string;
}

export default function VerificationEmail({
  username,
  otp,
}: VerificationEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Verification Code</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>Here's your verification code: {otp}</Preview>
      <Section
        style={{
          backgroundColor: "#f4f4f4",
          padding: "20px",
          fontFamily: "Roboto, Verdana, sans-serif",
          borderRadius: "8px",
          maxWidth: "600px",
          margin: "auto",
        }}
      >
        <Row style={{ textAlign: "center", marginBottom: "20px" }}>
          <Heading as="h1" style={{ color: "#333", marginBottom: "10px" }}>
            Verification Code
          </Heading>
        </Row>
        <Row style={{ marginBottom: "20px" }}>
          <Text style={{ fontSize: "16px", color: "#555" }}>
            Hello {username},
          </Text>
        </Row>
        <Row style={{ marginBottom: "20px" }}>
          <Text style={{ fontSize: "16px", color: "#555" }}>
            Thank you for registering. Please use the following verification
            code to complete your registration:
          </Text>
        </Row>
        <Row style={{ marginBottom: "20px", textAlign: "center" }}>
          <Text
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              backgroundColor: "#ffffff",
              border: "1px solid #dddddd",
              borderRadius: "4px",
              padding: "10px",
              color: "#333",
            }}
          >
            {otp}
          </Text>
        </Row>
        <Row style={{ marginBottom: "20px", textAlign: "center" }}>
          <Button
            href={`http://localhost:3000/verify/${username}`}
            style={{
              backgroundColor: "#007bff",
              color: "#ffffff",
              padding: "10px 20px",
              borderRadius: "4px",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Verify Now
          </Button>
        </Row>
        <Row style={{ textAlign: "center" }}>
          <Text style={{ fontSize: "14px", color: "#888888" }}>
            If you did not request this code, please ignore this email.
          </Text>
        </Row>
      </Section>
    </Html>
  );
}
