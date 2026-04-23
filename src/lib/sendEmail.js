import nodemailer from "nodemailer";

// ✅ Create transporter once (not inside the function)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // ✅ was: smtp.example.com (placeholder)
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = async (to, subject, html) => {
  // ✅ was: text
  await transporter.sendMail({
    from: `Hero Kidz <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html, // ✅ now matches the parameter
  });
};
