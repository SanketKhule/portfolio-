import nodemailer from "nodemailer"
import { NextResponse } from "next/server"

type ContactPayload = {
  email: string
  number: string
  companyName: string
  description: string
}

const requiredFields: Array<keyof ContactPayload> = [
  "email",
  "number",
  "companyName",
  "description",
]

function normalizeValue(value: unknown) {
  return typeof value === "string" ? value.trim() : ""
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
}

function getMissingFields(payload: ContactPayload) {
  return requiredFields.filter((field) => !payload[field])
}

export async function POST(request: Request) {
  const senderEmail = process.env.EMAIL
  const senderPassword = process.env.EMAIL_PASS
  const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL ?? senderEmail

  if (!senderEmail || !senderPassword || !receiverEmail) {
    return NextResponse.json(
      {
        message:
          "Mail service is not configured. Add EMAIL, EMAIL_PASS, and CONTACT_RECEIVER_EMAIL in your environment.",
      },
      { status: 500 }
    )
  }

  let body: Partial<ContactPayload>

  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { message: "Invalid request body." },
      { status: 400 }
    )
  }

  const payload: ContactPayload = {
    email: normalizeValue(body.email),
    number: normalizeValue(body.number),
    companyName: normalizeValue(body.companyName),
    description: normalizeValue(body.description),
  }

  const missingFields = getMissingFields(payload)

  if (missingFields.length > 0) {
    return NextResponse.json(
      {
        message: `Missing required fields: ${missingFields.join(", ")}.`,
      },
      { status: 400 }
    )
  }

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)

  if (!isValidEmail) {
    return NextResponse.json(
      { message: "Enter a valid email address." },
      { status: 400 }
    )
  }

  const escapedEmail = escapeHtml(payload.email)
  const escapedNumber = escapeHtml(payload.number)
  const escapedCompany = escapeHtml(payload.companyName)
  const escapedDescription = escapeHtml(payload.description).replace(/\n/g, "<br />")
  const receivedAt = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "long",
    timeStyle: "short",
  })

  const htmlBody = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Hiring Inquiry</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:'Segoe UI',Arial,sans-serif;">

  <!-- Outer wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.10);">

          <!-- Header gradient -->
          <tr>
            <td style="background:linear-gradient(135deg,#0f0f0f 0%,#1a1a2e 50%,#16213e 100%);padding:40px 40px 32px;text-align:center;">
              <div style="width:56px;height:56px;background:#ffffff15;border-radius:14px;display:inline-flex;align-items:center;justify-content:center;margin-bottom:16px;">
              </div>
              <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;letter-spacing:-0.5px;">Hiring Inquiry</h1>
              <p style="margin:8px 0 0;color:#a0aec0;font-size:14px;">Someone wants to work with you</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#ffffff;padding:36px 40px 32px;">

              <!-- Info cards -->
              <table width="100%" cellpadding="0" cellspacing="0">

                <!-- Company -->
                <tr>
                  <td style="padding-bottom:16px;">
                    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border-radius:10px;border-left:4px solid #6366f1;padding:16px 20px;">
                      <tr>
                        <td>
                          <p style="margin:0 0 4px;font-size:11px;font-weight:600;color:#6366f1;text-transform:uppercase;letter-spacing:0.8px;">🏢 Company</p>
                          <p style="margin:0;font-size:17px;font-weight:600;color:#111827;">${escapedCompany}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Email + Phone (two columns) -->
                <tr>
                  <td style="padding-bottom:16px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="48%" style="vertical-align:top;">
                          <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border-radius:10px;border-left:4px solid #10b981;padding:16px 20px;">
                            <tr>
                              <td>
                                <p style="margin:0 0 4px;font-size:11px;font-weight:600;color:#10b981;text-transform:uppercase;letter-spacing:0.8px;">📧 Email</p>
                                <a href="mailto:${escapedEmail}" style="margin:0;font-size:14px;color:#111827;text-decoration:none;word-break:break-all;">${escapedEmail}</a>
                              </td>
                            </tr>
                          </table>
                        </td>
                        <td width="4%"></td>
                        <td width="48%" style="vertical-align:top;">
                          <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border-radius:10px;border-left:4px solid #f59e0b;padding:16px 20px;">
                            <tr>
                              <td>
                                <p style="margin:0 0 4px;font-size:11px;font-weight:600;color:#f59e0b;text-transform:uppercase;letter-spacing:0.8px;">📱 Phone</p>
                                <p style="margin:0;font-size:14px;color:#111827;">${escapedNumber}</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Description -->
                <tr>
                  <td style="padding-bottom:8px;">
                    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border-radius:10px;border-left:4px solid #ec4899;padding:16px 20px;">
                      <tr>
                        <td>
                          <p style="margin:0 0 10px;font-size:11px;font-weight:600;color:#ec4899;text-transform:uppercase;letter-spacing:0.8px;">💬 Description</p>
                          <p style="margin:0;font-size:15px;color:#374151;line-height:1.7;">${escapedDescription}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

              </table>

              <!-- Reply CTA -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:28px;">
                <tr>
                  <td align="center">
                    <a href="mailto:${escapedEmail}" style="display:inline-block;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#ffffff;text-decoration:none;font-size:15px;font-weight:600;padding:14px 36px;border-radius:8px;letter-spacing:0.3px;">
                      Reply to ${escapedCompany}
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f8fafc;border-top:1px solid #e5e7eb;padding:20px 40px;text-align:center;">
              <p style="margin:0;font-size:12px;color:#9ca3af;">
                Received on ${receivedAt} (IST) &nbsp;•&nbsp; Sanket Khule Portfolio
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>`

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: senderEmail,
      pass: senderPassword,
    },
  })

  const thankYouHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Thank You!</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:'Segoe UI',Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.10);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#0f0f0f 0%,#1a1a2e 50%,#16213e 100%);padding:48px 40px 40px;text-align:center;">
              <div style="font-size:52px;margin-bottom:16px;">🙏</div>
              <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:700;letter-spacing:-0.5px;">
                Thank You, ${escapedCompany}!
              </h1>
              <p style="margin:12px 0 0;color:#a0aec0;font-size:15px;line-height:1.6;">
                Your message has been received. I will get back to you shortly.
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#ffffff;padding:36px 40px 32px;">

              <!-- Greeting -->
              <p style="margin:0 0 24px;font-size:15px;color:#374151;line-height:1.7;">
                Hi there 👋,<br /><br />
                Thank you for reaching out through my portfolio! I have received your inquiry and will review it carefully. Expect a reply from me within <strong>24–48 hours</strong>.
              </p>

              <!-- Summary card -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border-radius:12px;border:1px solid #e5e7eb;padding:20px 24px;margin-bottom:28px;">
                <tr>
                  <td>
                    <p style="margin:0 0 14px;font-size:12px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:1px;">📋 Your Submission Summary</p>

                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:6px 0;border-bottom:1px solid #e5e7eb;">
                          <span style="font-size:13px;color:#6b7280;width:120px;display:inline-block;">🏢 Company</span>
                          <span style="font-size:13px;color:#111827;font-weight:600;">${escapedCompany}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;border-bottom:1px solid #e5e7eb;">
                          <span style="font-size:13px;color:#6b7280;width:120px;display:inline-block;">📧 Email</span>
                          <span style="font-size:13px;color:#111827;">${escapedEmail}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;">
                          <span style="font-size:13px;color:#6b7280;width:120px;display:inline-block;">📱 Phone</span>
                          <span style="font-size:13px;color:#111827;">${escapedNumber}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- What happens next -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td>
                    <p style="margin:0 0 14px;font-size:12px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:1px;">⚡ What happens next?</p>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:8px 0;">
                          <table cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="width:32px;vertical-align:top;">
                                <div style="width:24px;height:24px;background:#6366f1;border-radius:50%;text-align:center;line-height:24px;font-size:11px;font-weight:700;color:#fff;">1</div>
                              </td>
                              <td style="padding-left:12px;font-size:14px;color:#374151;">I review your project description carefully.</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;">
                          <table cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="width:32px;vertical-align:top;">
                                <div style="width:24px;height:24px;background:#8b5cf6;border-radius:50%;text-align:center;line-height:24px;font-size:11px;font-weight:700;color:#fff;">2</div>
                              </td>
                              <td style="padding-left:12px;font-size:14px;color:#374151;">I reply to your email with thoughts and next steps.</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;">
                          <table cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="width:32px;vertical-align:top;">
                                <div style="width:24px;height:24px;background:#ec4899;border-radius:50%;text-align:center;line-height:24px;font-size:11px;font-weight:700;color:#fff;">3</div>
                              </td>
                              <td style="padding-left:12px;font-size:14px;color:#374151;">We schedule a call and get to work! 🚀</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Visit portfolio CTA -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="http://localhost:3000" style="display:inline-block;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#ffffff;text-decoration:none;font-size:15px;font-weight:600;padding:14px 36px;border-radius:8px;letter-spacing:0.3px;">
                      View My Portfolio
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f8fafc;border-top:1px solid #e5e7eb;padding:20px 40px;text-align:center;">
              <p style="margin:0 0 6px;font-size:13px;font-weight:600;color:#374151;">Sanket Khule</p>
              <p style="margin:0;font-size:12px;color:#9ca3af;">
                Full Stack Developer &nbsp;•&nbsp; ${receivedAt} (IST)
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>`

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact" <${senderEmail}>`,
      to: receiverEmail,
      replyTo: payload.email,
      subject: `✉️ New inquiry from ${payload.companyName}`,
      text: [
        `Company: ${payload.companyName}`,
        `Email: ${payload.email}`,
        `Number: ${payload.number}`,
        "",
        "Description:",
        payload.description,
        "",
        `Received: ${receivedAt} IST`,
      ].join("\n"),
      html: htmlBody,
    })

    await transporter.sendMail({
      from: `"Sanket Khule" <${senderEmail}>`,
      to: payload.email,
      subject: `🙏 Thank you for reaching out, ${payload.companyName}!`,
      text: [
        `Hi ${payload.companyName},`,
        "",
        "Thank you for reaching out through my portfolio!",
        "I have received your message and will get back to you within 24–48 hours.",
        "",
        "— Sanket Khule",
      ].join("\n"),
      html: thankYouHtml,
    })

    return NextResponse.json({ message: "Message sent successfully." })
  } catch (error) {
    console.error("Failed to send contact email", error)

    return NextResponse.json(
      { message: "Failed to send message." },
      { status: 500 }
    )
  }
}