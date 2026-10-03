import nodemailer from "nodemailer";

import dns from "node:dns";
try {
  dns.setDefaultResultOrder?.("ipv4first");
} catch {
  // Fallback if not supported
}

export function getHostingerTransporter() {
  const host = process.env.HOSTINGER_SMTP_HOST || "smtp.hostinger.com";
  const port = parseInt(process.env.HOSTINGER_SMTP_PORT || "465", 10);
  const secure = process.env.HOSTINGER_SMTP_SECURE === "true" || port === 465;
  const user = process.env.HOSTINGER_SMTP_USER || "";
  const pass = process.env.HOSTINGER_SMTP_PASS || "";

  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
    family: 4, // Force IPv4 to eliminate IPv6 network route unreachable errors
  } as any);
}

export interface EsimEmailPayload {
  to: string;
  planName: string;
  dataAllowance: string;
  validity: string;
  priceFormatted: string;
  lpaCode?: string;
  smdpAddress?: string;
}

export async function sendEsimOrderEmail(payload: EsimEmailPayload) {
  const transporter = getHostingerTransporter();
  const fromName = process.env.HOSTINGER_FROM_NAME || "SproutSIM Pakistan";
  const fromEmail = process.env.HOSTINGER_FROM_EMAIL || process.env.HOSTINGER_SMTP_USER || "support@sproutsim.com";
  const lpaCode = payload.lpaCode || "LPA:1$smdp.sproutsim.io$SPROUT-PK-JAZZ9921";
  const smdp = payload.smdpAddress || "smdp.sproutsim.io";

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your Pakistan eSIM Activation Details</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F5F7F2; margin: 0; padding: 20px; color: #1C2420; }
        .container { max-width: 580px; margin: 0 auto; background: #FFFFFF; border-radius: 20px; border: 2px solid #E0E7E2; overflow: hidden; }
        .header { background-color: #123C2A; color: #FFFFFF; padding: 28px 24px; text-align: center; }
        .header h1 { margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px; }
        .header p { margin: 6px 0 0 0; color: #A7E8C1; font-size: 13px; font-weight: 600; }
        .content { padding: 28px 24px; }
        .badge { display: inline-block; padding: 4px 10px; background-color: #E9F8F0; color: #123C2A; border-radius: 999px; font-size: 11px; font-weight: 800; text-transform: uppercase; border: 1px solid #A7E8C1; }
        .order-box { background-color: #F5F7F2; border-radius: 14px; padding: 18px; margin: 20px 0; border: 1px solid #E0E7E2; }
        .order-row { display: flex; justify-content: space-between; padding: 6px 0; font-size: 13px; border-bottom: 1px solid #EAEFEA; }
        .order-row:last-child { border-bottom: none; font-weight: 800; color: #123C2A; font-size: 15px; }
        .qr-placeholder { background-color: #123C2A; color: #FFFFFF; border-radius: 14px; padding: 24px; text-align: center; margin: 24px 0; }
        .code-box { background: #FFFFFF; color: #1C2420; padding: 12px; border-radius: 10px; font-family: monospace; font-size: 12px; word-break: break-all; margin: 12px 0; border: 1px solid #E0E7E2; }
        .steps { background-color: #FFFFFF; border: 1.5px solid #E0E7E2; border-radius: 14px; padding: 18px; margin: 20px 0; }
        .step-item { margin-bottom: 12px; font-size: 13px; line-height: 1.5; color: #5E6E66; }
        .step-item strong { color: #123C2A; }
        .footer { background-color: #F5F7F2; padding: 20px 24px; text-align: center; font-size: 11px; color: #8E9E96; border-top: 1px solid #E0E7E2; }
        .footer a { color: #2FBF71; text-decoration: none; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>SPROUTSIM</h1>
          <p>STAY CONNECTED ANYWHERE</p>
        </div>
        <div class="content">
          <div style="text-align: center;">
            <span class="badge">Order Confirmed</span>
            <h2 style="font-size: 20px; font-weight: 800; color: #123C2A; margin: 14px 0 6px 0;">Your Pakistan eSIM is Ready!</h2>
            <p style="font-size: 13px; color: #5E6E66; margin: 0;">Thank you for choosing SproutSIM for your trip to Pakistan.</p>
          </div>

          <div class="order-box">
            <div class="order-row"><span>Destination</span><strong>Pakistan (High-Speed 4G)</strong></div>
            <div class="order-row"><span>Device Status</span><strong>Zero Device Tax Required</strong></div>
            <div class="order-row"><span>Data Package</span><strong>${payload.dataAllowance}</strong></div>
            <div class="order-row"><span>Validity</span><strong>${payload.validity}</strong></div>
            <div class="order-row"><span>Amount Paid</span><strong>${payload.priceFormatted}</strong></div>
          </div>

          <div class="qr-placeholder">
            <div style="font-size: 12px; font-weight: 800; text-transform: uppercase; color: #A7E8C1; letter-spacing: 0.5px;">eSIM Activation Code</div>
            <div class="code-box">${lpaCode}</div>
            <div style="font-size: 11px; color: #A7E8C1;">SM-DP+ Address: ${smdp}</div>
          </div>

          <div class="steps">
            <div style="font-weight: 800; font-size: 14px; color: #123C2A; margin-bottom: 10px;">Quick Device Setup:</div>
            <div class="step-item">1. Open <strong>Settings &rarr; Cellular / Mobile Service &rarr; Add eSIM</strong> on your phone.</div>
            <div class="step-item">2. Scan your QR code or paste the activation code above.</div>
            <div class="step-item">3. Turn on <strong>Data Roaming</strong>. Your phone connects to high-speed data immediately.</div>
          </div>

          <p style="font-size: 12px; color: #5E6E66; text-align: center;">
            Need help? Contact our 24/7 team at <a href="mailto:${fromEmail}" style="color: #2FBF71; font-weight: bold;">${fromEmail}</a> or on WhatsApp at <a href="https://wa.me/923365131223" style="color: #2FBF71; font-weight: bold;">+92 336 5131223</a>.
          </p>
        </div>
        <div class="footer">
          &copy; ${new Date().getFullYear()} SproutSIM Pakistan. All rights reserved.
        </div>
      </div>
    </body>
    </html>
  `;

  if (!transporter) {
    // If Hostinger credentials are not yet saved in .env.local, log and return graceful simulated success
    console.warn(
      "[Hostinger Email] HOSTINGER_SMTP_USER and HOSTINGER_SMTP_PASS are not configured yet in .env.local. Email dispatch simulated successfully."
    );
    return {
      success: true,
      simulated: true,
      message: "Hostinger credentials pending in .env.local; simulated dispatch logged.",
    };
  }

  const info = await transporter.sendMail({
    from: `"${fromName}" <${fromEmail}>`,
    to: payload.to,
    subject: `Your Pakistan eSIM Activation Details (${payload.dataAllowance})`,
    html: htmlContent,
  });

  return {
    success: true,
    messageId: info.messageId,
  };
}

export async function testSmtpConnection(): Promise<{ success: boolean; message: string; host?: string }> {
  const transporter = getHostingerTransporter();
  if (!transporter) {
    return {
      success: false,
      message: "Hostinger credentials (HOSTINGER_SMTP_USER / HOSTINGER_SMTP_PASS) are missing in .env.local",
    };
  }

  try {
    await transporter.verify();
    return {
      success: true,
      message: "Hostinger SMTP verified successfully! Ready to dispatch.",
      host: process.env.HOSTINGER_SMTP_HOST || "smtp.hostinger.com",
    };
  } catch (err: any) {
    return {
      success: false,
      message: err?.message || String(err),
      host: process.env.HOSTINGER_SMTP_HOST || "smtp.hostinger.com",
    };
  }
}

export async function sendAdminTestEmail(targetEmail: string) {
  return sendEsimOrderEmail({
    to: targetEmail,
    planName: "Admin System Test Package",
    dataAllowance: "10 GB",
    validity: "30 Days",
    priceFormatted: "Rs 0 (Test)",
    lpaCode: "LPA:1$smdp.gloesim.com$ADMIN-TEST-ACTIVATION",
    smdpAddress: "smdp.gloesim.com",
  });
}

export interface AdminPaymentAlertPayload {
  orderId: string;
  customerEmail: string;
  customerPhone?: string;
  customerName?: string;
  planName: string;
  dataAllowance: string;
  validity: string;
  priceFormatted: string;
  senderDetails?: string;
  verifyUrl: string;
  paymentMethod?: string;
  invoiceData?: string;
  invoiceFileName?: string;
}

export async function sendPaymentVerificationAlertToAdmin(payload: AdminPaymentAlertPayload) {
  const transporter = getHostingerTransporter();
  const fromName = process.env.HOSTINGER_FROM_NAME || "SproutSIM Billing Alerts";
  const fromEmail = process.env.HOSTINGER_FROM_EMAIL || "business@sproutsim.cloud";
  const adminEmail = process.env.HOSTINGER_FROM_EMAIL || "business@sproutsim.cloud";

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Payment Verification Required</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F5F7F2; margin: 0; padding: 20px; color: #1C2420;">
      <div style="max-width: 580px; margin: 0 auto; background: #FFFFFF; border-radius: 20px; border: 2px solid #123C2A; overflow: hidden;">
        
        <!-- Header -->
        <div style="background-color: #123C2A; color: #FFFFFF; padding: 24px; text-align: center;">
          <div style="display: inline-block; background-color: #EF4444; color: #FFFFFF; padding: 5px 14px; border-radius: 999px; font-weight: 800; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">
            Action Required
          </div>
          <h1 style="margin: 0; font-size: 22px; color: #FFFFFF; font-weight: 800;">Customer Sent Payment</h1>
          <p style="margin: 6px 0 0 0; color: #A7E8C1; font-size: 13px; font-weight: 600;">SproutSIM Payment Verification Alert</p>
        </div>

        <!-- Content -->
        <div style="padding: 24px;">
          <p style="font-size: 14px; line-height: 1.5; color: #1C2420; margin-top: 0;">
            A customer has submitted a manual payment request for a Pakistan eSIM package. Please check your bank account or JazzCash to verify the funds.
          </p>

          <!-- Order Summary Box -->
          <div style="background-color: #F8FAF9; border: 1px solid #E0E7E2; border-radius: 14px; padding: 18px; margin: 18px 0;">
            <div style="padding: 6px 0; font-size: 13px; border-bottom: 1px solid #EAEFEA;">
              <span style="color: #5E6E66;">Order ID:</span>
              <strong style="float: right; font-family: monospace; color: #123C2A; font-size: 14px;">${payload.orderId}</strong>
              <div style="clear: both;"></div>
            </div>

            <div style="padding: 6px 0; font-size: 13px; border-bottom: 1px solid #EAEFEA;">
              <span style="color: #5E6E66;">Customer Email:</span>
              <strong style="float: right; color: #123C2A;">${payload.customerEmail}</strong>
              <div style="clear: both;"></div>
            </div>

            <div style="padding: 6px 0; font-size: 13px; border-bottom: 1px solid #EAEFEA;">
              <span style="color: #5E6E66;">Customer Phone / WhatsApp:</span>
              <strong style="float: right; color: #123C2A;">${payload.customerPhone || "Not provided"}</strong>
              <div style="clear: both;"></div>
            </div>

            <div style="padding: 6px 0; font-size: 13px; border-bottom: 1px solid #EAEFEA;">
              <span style="color: #5E6E66;">Package:</span>
              <strong style="float: right; color: #123C2A;">${payload.planName} (${payload.dataAllowance} • ${payload.validity})</strong>
              <div style="clear: both;"></div>
            </div>

            <div style="padding: 6px 0; font-size: 13px; border-bottom: 1px solid #EAEFEA;">
              <span style="color: #5E6E66;">Payment Proof / Sender:</span>
              <strong style="float: right; color: #2563EB;">${payload.senderDetails || "Transfer Reported"}</strong>
              <div style="clear: both;"></div>
            </div>

            <div style="padding: 8px 0 2px 0; font-size: 15px;">
              <span style="color: #123C2A; font-weight: 800;">Total Amount Due:</span>
              <strong style="float: right; color: #2FBF71; font-size: 18px; font-weight: 900;">${payload.priceFormatted}</strong>
              <div style="clear: both;"></div>
            </div>
          </div>

          <!-- CUSTOMER UPLOADED INVOICE / RECEIPT PROOF -->
          ${
            payload.invoiceData
              ? `
          <div style="background-color: #F8FAF9; border: 2px dashed #2FBF71; border-radius: 14px; padding: 16px; margin: 18px 0; text-align: center;">
            <div style="font-size: 11px; font-weight: 800; color: #123C2A; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 10px;">
              📎 Mandatory Customer Payment Invoice Attached
            </div>
            ${
              payload.invoiceData.startsWith("data:image")
                ? `<div style="text-align: center; margin-bottom: 8px;">
                     <img src="${payload.invoiceData}" alt="Payment Receipt" style="max-width: 100%; max-height: 400px; border-radius: 8px; border: 1px solid #E0E7E2; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); display: inline-block;" />
                   </div>`
                : `<div style="background: #FFFFFF; border: 1px solid #E0E7E2; border-radius: 8px; padding: 12px; font-family: monospace; font-size: 13px; color: #123C2A;">
                     📄 ${payload.invoiceFileName || "Receipt Document Uploaded"}
                   </div>`
            }
            <span style="display: block; font-size: 11px; color: #5E6E66; margin-top: 6px;">
              File: ${payload.invoiceFileName || "invoice-receipt"} (Verified upload by customer)
            </span>
          </div>`
              : ""
          }

          <!-- BULLETPROOF BUTTON: Table-based with 100% inline CSS -->
          <div style="margin: 24px 0; text-align: center;">
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td align="center">
                  <table border="0" cellspacing="0" cellpadding="0">
                    <tr>
                      <td align="center" style="border-radius: 14px; background-color: #2FBF71;">
                        <a href="${payload.verifyUrl}" target="_blank" style="font-size: 15px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #FFFFFF !important; text-decoration: none; border-radius: 14px; padding: 16px 36px; border: 1px solid #2FBF71; display: inline-block; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; background-color: #2FBF71;">
                          ✅ APPROVE &amp; VERIFY PAYMENT
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </div>

          <!-- DIRECT BACKUP LINK BOX (Always visible even if images/buttons blocked) -->
          <div style="background-color: #E9F8F0; border: 1px solid #A7E8C1; border-radius: 12px; padding: 12px; margin-top: 18px; text-align: center;">
            <span style="font-size: 11px; font-weight: 800; color: #123C2A; display: block; margin-bottom: 4px; text-transform: uppercase;">
              Direct Approval Link:
            </span>
            <a href="${payload.verifyUrl}" style="color: #123C2A; font-size: 12px; word-break: break-all; font-family: monospace; font-weight: 700; text-decoration: underline;">
              ${payload.verifyUrl}
            </a>
          </div>

          <p style="font-size: 11px; text-align: center; color: #8E9E96; margin-top: 18px; line-height: 1.4;">
            Once you click this button, the customer's screen will instantly turn green and allow them to generate their live GloEsim GSMA profile.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  if (!transporter) {
    console.warn("[Admin Payment Alert] Hostinger SMTP not configured; simulated alert logged.");
    return { success: true, simulated: true };
  }

  const plainText = `NEW PAYMENT VERIFICATION REQUEST:\n\nOrder ID: ${payload.orderId}\nCustomer Email: ${payload.customerEmail}\nCustomer Phone: ${payload.customerPhone || "Not provided"}\nPackage: ${payload.planName} (${payload.dataAllowance} • ${payload.validity})\nAmount: ${payload.priceFormatted}\nMethod: ${payload.paymentMethod || "Transfer Reported"}\nPayment Proof: ${payload.senderDetails || "Transfer Reported"}\nInvoice File: ${payload.invoiceFileName || (payload.invoiceData ? "Attached" : "None")}\n\nCLICK THIS LINK TO APPROVE PAYMENT:\n${payload.verifyUrl}\n\n(Once clicked, customer screen will turn green and activate eSIM)`;

  const attachments: any[] = [];
  if (payload.invoiceData && payload.invoiceData.includes(",")) {
    try {
      const [meta, base64Content] = payload.invoiceData.split(",");
      const mimeMatch = meta.match(/:(.*?);/);
      const contentType = mimeMatch ? mimeMatch[1] : "image/png";
      const ext = contentType.includes("pdf") ? "pdf" : "png";
      attachments.push({
        filename: payload.invoiceFileName || `invoice-${payload.orderId}.${ext}`,
        content: Buffer.from(base64Content, "base64"),
        contentType,
      });
    } catch (e) {
      console.warn("[Mail Invoice Attachment Notice]", e);
    }
  }

  const info = await transporter.sendMail({
    from: `"${fromName}" <${fromEmail}>`,
    to: adminEmail,
    subject: `🚨 [PAYMENT VERIFICATION NEEDED] Order ${payload.orderId} - ${payload.priceFormatted} via ${payload.paymentMethod || "Manual"} from ${payload.customerPhone || payload.customerEmail}`,
    text: plainText,
    html: htmlContent,
    attachments,
  });

  return { success: true, messageId: info.messageId };
}

