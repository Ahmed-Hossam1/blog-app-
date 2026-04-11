type UpdateEmailTemplateProps = {
  name: string;
  newEmail: string;
  verificationLink: string;
};

const UpdateEmailTemplate = ({
  name,
  newEmail,
  verificationLink,
}: UpdateEmailTemplateProps) => {
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
            background: "#0ea5e9", 
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
          <h2>Hello {name} ✉️</h2>

          <p style={{ fontSize: "15px", marginTop: "10px" }}>
            You requested to update your email address.
          </p>

          <p style={{ fontSize: "14px", color: "#555" }}>
            Please confirm that you want to use this email:
          </p>

          <p
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              marginTop: "10px",
              color: "#0ea5e9",
            }}
          >
            {newEmail}
          </p>

          <a
            href={verificationLink}
            style={{
              display: "inline-block",
              marginTop: "25px",
              padding: "12px 20px",
              background: "#0ea5e9",
              color: "#fff",
              textDecoration: "none",
              borderRadius: "6px",
              fontWeight: "bold",
            }}
          >
            Confirm Email Update
          </a>

          <p
            style={{
              marginTop: "15px",
              fontSize: "12px",
              color: "#999",
            }}
          >
            ⏳ This link will expire in 30 minutes.
          </p>

          <p
            style={{
              marginTop: "10px",
              fontSize: "12px",
              color: "#bbb",
            }}
          >
            If you didn’t request this change, please ignore this email or secure your account.
          </p>

          <p
            style={{
              marginTop: "10px",
              fontSize: "12px",
              wordBreak: "break-all",
              color: "#4f46e5",
            }}
          >
            {verificationLink}
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

export default UpdateEmailTemplate;