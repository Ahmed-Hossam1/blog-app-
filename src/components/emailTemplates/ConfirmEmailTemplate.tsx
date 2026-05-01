type EmailTemplateProps = {
  name: string;
  verificationLink: string;
};

const ConfirmEmailTemplate = ({
  name,
  verificationLink,
}: EmailTemplateProps) => {
  return (
    <div
      style={{
        fontFamily: "system-ui, sans-serif, Arial",
        backgroundColor: "#f4f4f7",
        padding: "20px",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          margin: "auto",
          background: "#ffffff",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "#4f46e5",
            padding: "20px",
            textAlign: "center",
            color: "white",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          Blogy
        </div>

        {/* Content */}
        <div
          style={{
            padding: "30px",
            textAlign: "center",
            color: "#2c3e50",
          }}
        >
          <h2>Hello {name} 👋</h2>

          <p style={{ fontSize: "15px" }}>
            Thanks for signing up! Please confirm your email address to activate
            your account.
          </p>

          <a
            href={verificationLink}
            style={{
              display: "inline-block",
              marginTop: "20px",
              padding: "12px 20px",
              background: "#4f46e5",
              color: "#fff",
              textDecoration: "none",
              borderRadius: "6px",
              fontWeight: "bold",
            }}
          >
            Verify Email
          </a>

          <p
            style={{
              marginTop: "15px",
              fontSize: "12px",
              color: "#999",
            }}
          >
            ⏳ This link will expire in 1 hour.
          </p>

          <p
            style={{
              marginTop: "10px",
              fontSize: "12px",
              color: "#bbb",
            }}
          >
            If the button does not work, copy and paste this link into your
            browser:
          </p>

          <p
            style={{
              fontSize: "12px",
              wordBreak: "break-all",
              color: "#4f46e5",
            }}
          >
            {verificationLink}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          textAlign: "center",
          fontSize: "12px",
          color: "#aaa",
          padding: "20px",
        }}
      >
        © 2026 Blogy. All rights reserved.
      </div>
    </div>
  );
};

export default ConfirmEmailTemplate;
