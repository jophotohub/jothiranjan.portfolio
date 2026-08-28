import type { IncomingMessage, ServerResponse } from "http";
import nodemailer from "nodemailer";

// Simple helper to parse JSON body from standard Vercel request
async function getRequestBody(req: IncomingMessage): Promise<any> {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(err);
      }
    });
    req.on("error", (err) => reject(err));
  });
}

export default async function handler(req: any, res: any) {
  // CORS Headers
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  // Handle Options preflight request
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method Not Allowed"
    });
  }

  try {
    // Vercel serverless functions automatically parse JSON bodies for application/json requests.
    // We fall back to manual parsing just in case.
    const body = req.body || (await getRequestBody(req));
    const { name, email, subject, message, honeypot } = body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required (Name, Email, Subject, Message)."
      });
    }

    // Honeypot spam prevention
    if (honeypot && honeypot.trim() !== "") {
      console.warn("Spam bot caught!");
      return res.status(200).json({
        success: true,
        message: "Message sent successfully!"
      });
    }

    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    const receiver = process.env.EMAIL_RECEIVER || "jophtgrph@gmail.com";

    if (!emailUser || !emailPass) {
      console.error("EMAIL_USER or EMAIL_PASS environment variables are missing.");
      return res.status(500).json({
        success: false,
        message: "SMTP Mail credentials are not configured on Vercel yet. Please set EMAIL_USER and EMAIL_PASS environment variables in your Vercel Dashboard."
      });
    }

    const smtpService = process.env.SMTP_SERVICE || "gmail";
    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = parseInt(process.env.SMTP_PORT || "587");

    const transporter = nodemailer.createTransport({
      service: smtpService,
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    const mailOptions = {
      from: `"${name}" <${emailUser}>`,
      to: receiver,
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      text: `You have received a new contact request from your Portfolio Website.

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 25px; color: #2d3748; background-color: #f7fafc; border-radius: 12px; border: 1px solid #e2e8f0; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4a5568; border-bottom: 2px solid #a3e635; padding-bottom: 12px; margin-top: 0;">📬 New Portfolio Contact</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #718096; width: 120px;">Name:</td>
              <td style="padding: 8px 0; color: #1a202c;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #718096;">Email:</td>
              <td style="padding: 8px 0; color: #1a202c;"><a href="mailto:${email}" style="color: #4f46e5; text-decoration: none;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #718096;">Subject:</td>
              <td style="padding: 8px 0; color: #1a202c; font-weight: 500;">${subject}</td>
            </tr>
          </table>
          <div style="margin-top: 25px; padding: 20px; background-color: #ffffff; border-left: 4px solid #a3e635; border-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
            <p style="margin-top: 0; font-weight: bold; color: #718096; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.05em;">Message Body:</p>
            <p style="margin-bottom: 0; line-height: 1.6; white-space: pre-wrap; color: #2d3748;">${message}</p>
          </div>
          <p style="margin-top: 30px; margin-bottom: 0; font-size: 0.75rem; color: #a0aec0; text-align: center;">Sent from Jothiranjan's Portfolio Website Form</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({
      success: true,
      message: "Your message has been sent successfully! Jothiranjan will get back to you soon."
    });
  } catch (error: any) {
    console.error("Error in serverless function:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "An internal error occurred while trying to send your message."
    });
  }
}
