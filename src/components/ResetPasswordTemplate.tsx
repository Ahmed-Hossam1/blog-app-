type ResetPasswordEmailProps = {
  name: string;
  resetLink: string;
};

const ResetPasswordEmail = ({ name, resetLink }: ResetPasswordEmailProps) => {
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
            background: "#ef4444", // 🔥 لون مختلف (red for security action)
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
          <h2>Hello {name} 🔐</h2>

          <p style={{ fontSize: "15px", marginTop: "10px" }}>
            We received a request to reset your password.
          </p>

          <p style={{ fontSize: "14px", color: "#555" }}>
            Click the button below to set a new password. If you didn’t request
            this, you can safely ignore this email.
          </p>

          <a
            href={resetLink}
            style={{
              display: "inline-block",
              marginTop: "25px",
              padding: "12px 20px",
              background: "#ef4444",
              color: "#fff",
              textDecoration: "none",
              borderRadius: "6px",
              fontWeight: "bold",
            }}
          >
            Reset Password
          </a>

          <p
            style={{
              marginTop: "15px",
              fontSize: "12px",
              color: "#999",
            }}
          >
            ⏳ This link will expire in 15 minutes.
          </p>

          <p
            style={{
              marginTop: "10px",
              fontSize: "12px",
              color: "#bbb",
            }}
          >
            If the button doesn’t work, copy and paste this link into your browser:
          </p>

          <p
            style={{
              fontSize: "12px",
              wordBreak: "break-all",
              color: "#4f46e5",
            }}
          >
            {resetLink}
          </p>
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
    </div>
  );
};

export default ResetPasswordEmail;