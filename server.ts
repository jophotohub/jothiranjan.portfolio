import express from "express";
import path from "path";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Body parser middleware
  app.use(express.json());

  // In-memory rate limiting to prevent email spam
  const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
  const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
  const MAX_REQUESTS = 3; // Max 3 submissions per minute from same IP

  const rateLimiter = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const ip = req.ip || req.headers['x-forwarded-for']?.toString() || 'unknown';
    const now = Date.now();
    const limitInfo = rateLimitStore.get(ip);

    if (!limitInfo) {
      rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
      return next();
    }

    if (now > limitInfo.resetTime) {
      rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
      return next();
    }

    if (limitInfo.count >= MAX_REQUESTS) {
      return res.status(429).json({
        success: false,
        message: "Too many requests. Please wait a minute before sending another message."
      });
    }

    limitInfo.count++;
    next();
  };

  // API Contact Route
  app.post("/api/contact", rateLimiter, async (req: express.Request, res: express.Response) => {
    try {
      const { name, email, subject, message, honeypot } = req.body;

      // Basic client validation
      if (!name || !email || !subject || !message) {
        return res.status(400).json({
          success: false,
          message: "All fields are required (Name, Email, Subject, Message)."
        });
      }

      // Honeypot spam prevention
      if (honeypot && honeypot.trim() !== "") {
        console.warn(`Spam bot caught! Honeypot field filled: "${honeypot}"`);
        // Silently succeed to trick the spam bot
        return res.status(200).json({
          success: true,
          message: "Message sent successfully!"
        });
      }

      const emailUser = process.env.EMAIL_USER;
      const emailPass = process.env.EMAIL_PASS;
      const receiver = process.env.EMAIL_RECEIVER || "jophtgrph@gmail.com";

      // If mail credentials are set, try sending actual email
      if (emailUser && emailPass) {
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
      } else {
        // Fallback for development/simulation mode
        console.warn("\n================ [SMTP NOT CONFIGURED] ================");
        console.warn("Please add EMAIL_USER and EMAIL_PASS to your env variables for live sending.");
        console.warn(`FROM: "${name}" <${email}>`);
        console.warn(`TO: ${receiver}`);
        console.warn(`SUBJECT: ${subject}`);
        console.warn("MESSAGE CONTENT:");
        console.warn(message);
        console.warn("========================================================\n");

        return res.status(200).json({
          success: true,
          simulated: true,
          message: "Message received! (SMTP is not configured in your environment yet, so the email was logged to the server terminal. To enable live sending, configure EMAIL_USER and EMAIL_PASS in your environment settings.)"
        });
      }
    } catch (error: any) {
      console.error("Error in contact form handler:", error);
      return res.status(500).json({
        success: false,
        message: "An internal error occurred while trying to send your message. Please try again later."
      });
    }
  });

  // Serve static assets or mount Vite dev middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
