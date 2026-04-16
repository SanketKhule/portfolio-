const express = require("express");
const nodemailer = require("nodemailer");

const router = express.Router();

function normalizeValue(value) {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

// POST /api/contact
router.post("/", async (req, res) => {
  const senderEmail = process.env.EMAIL;
  const senderPassword = process.env.EMAIL_PASS;
  const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL ?? senderEmail;

  if (!senderEmail || !senderPassword || !receiverEmail) {
    return res.status(500).json({
      message:
        "Mail service is not configured. Add EMAIL, EMAIL_PASS, and CONTACT_RECEIVER_EMAIL in your environment.",
    });
  }

  const body = req.body;

  const payload = {
    email: normalizeValue(body.email),
    number: normalizeValue(body.number),
    companyName: normalizeValue(body.companyName),
    description: normalizeValue(body.description),
  };

  const requiredFields = ["email", "number", "companyName", "description"];
  const missingFields = requiredFields.filter((f) => !payload[f]);

  if (missingFields.length > 0) {
    return res.status(400).json({
      message: `Missing required fields: ${missingFields.join(", ")}.`,
    });
  }

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email);
  if (!isValidEmail) {
    return res.status(400).json({ message: "Enter a valid email address." });
  }

  const escapedEmail = escapeHtml(payload.email);
  const escapedNumber = escapeHtml(payload.number);
  const escapedCompany = escapeHtml(payload.companyName);
  const escapedDescription = escapeHtml(payload.description).replace(/\n/g, "<br />");
  const receivedAt = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "long",
    timeStyle: "short",
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: senderEmail, pass: senderPassword },
  });

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact" <${senderEmail}>`,
      to: receiverEmail,
      subject: `Hiring Inquiry from ${escapedCompany}`,
      html: `
        <p><strong>Company:</strong> ${escapedCompany}</p>
        <p><strong>Email:</strong> ${escapedEmail}</p>
        <p><strong>Phone:</strong> ${escapedNumber}</p>
        <p><strong>Message:</strong><br />${escapedDescription}</p>
        <p><em>Received at: ${receivedAt}</em></p>
      `,
    });

    return res.status(200).json({ message: "Message sent successfully." });
  } catch (error) {
    console.error("POST /api/contact error:", error);
    return res.status(500).json({ message: "Failed to send message. Please try again later." });
  }
});

module.exports = router;
