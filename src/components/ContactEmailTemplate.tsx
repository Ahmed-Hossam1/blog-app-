import React from "react";

type ContactEmailTemplateProps = {
  name: string;
  email: string;
  message: string;
};

const ContactEmailTemplate = ({
  name,
  email,
  message,
}: ContactEmailTemplateProps) => {
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
          boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "#4f46e5",
            padding: "20px",
            textAlign: "center",
            color: "white",
            fontSize: "22px",
            fontWeight: "bold",
            letterSpacing: "1px",
          }}
        >
          Blogy - New Message
        </div>

        {/* Content */}
        <div
          style={{
            padding: "30px",
            color: "#2c3e50",
            lineHeight: "1.6",
          }}
        >
          <h2 style={{ color: "#4f46e5", marginBottom: "20px" }}>
            You have a new contact form submission!
          </h2>

          <div
            style={{
              backgroundColor: "#f9fafb",
              padding: "20px",
              borderRadius: "8px",
              marginBottom: "20px",
              borderLeft: "4px solid #4f46e5",
            }}
          >
            <p style={{ margin: "0 0 10px 0" }}>
              <strong>From:</strong> {name}
            </p>
            <p style={{ margin: "0 0 10px 0" }}>
              <strong>Email:</strong> {email}
            </p>
            <p style={{ margin: "0" }}>
              <strong>Message:</strong>
            </p>
            <p
              style={{
                marginTop: "10px",
                whiteSpace: "pre-wrap",
                color: "#4b5563",
                fontSize: "15px",
                backgroundColor: "#fff",
                padding: "15px",
                borderRadius: "6px",
                border: "1px solid #e5e7eb",
              }}
            >
              {message}
            </p>
          </div>

          <p style={{ fontSize: "14px", color: "#6b7280", marginTop: "20px" }}>
            This message was sent via the contact form on your website.
          </p>
        </div>

        {/* Footer */}
        <div
          style={{
            textAlign: "center",
            fontSize: "12px",
            color: "#9ca3af",
            padding: "20px",
            borderTop: "1px solid #f3f4f6",
          }}
        >
          © 2026 Blogy. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default ContactEmailTemplate;
