import transporter from "./nodemailer";

export async function notifyAdminOnLogin({
    name,
    email,
}: {
    name: string;
    email: string;
}): Promise<void> {
    await transporter.sendMail({
        from: `"Blogy" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        subject: "New login on your application",
        html: `
      <h2>New user login</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
    `,
    })

}

