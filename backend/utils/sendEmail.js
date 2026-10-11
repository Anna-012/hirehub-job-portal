import nodemailer from "nodemailer";
import dns from "dns";

const SMTP_HOSTNAME = "smtp.gmail.com";

async function smtpIpv4Host() {
  try {
    const addrs = await dns.resolve4(SMTP_HOSTNAME);

    if (addrs && addrs.length) {
      return addrs[Math.floor(Math.random() * addrs.length)];
    }
  } catch (e) {
    console.warn(
      "[nodemailer] resolve4 failed, falling back to hostname:",
      e.message,
    );
  }

  return SMTP_HOSTNAME;
}

async function createTransporter() {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
    throw new Error("Email is not configured: set GMAIL_USER and GMAIL_PASS");
  }

  const host = await smtpIpv4Host();

  return nodemailer.createTransport({
    host,
    port: 587,
    secure: false,

    servername: SMTP_HOSTNAME,

    connectionTimeout: 20000,
    greetingTimeout: 15000,
    socketTimeout: 25000,

    tls: {
      servername: SMTP_HOSTNAME,
    },

    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });
}

const sendEmail = async ({ to, subject, html }) => {
  try {
    const transporter = await createTransporter();

    console.log("Sending password reset email to:", to);

    const mailOptions = {
      from: `"HireHub" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent successfully:", info.messageId);

    return info;
  } catch (error) {
    console.error("EMAIL ERROR:", error);
    throw error;
  }
};

export default sendEmail;
