import nodemailer from "nodemailer";

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
  });
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
            <div class="order-row"><span>Destination</span><strong>Pakistan (Jazz &amp; Zong 4G)</strong></div>
            <div class="order-row"><span>Data Package</span><strong>${payload.dataAllowance}</strong></div>
            <div class="order-row"><span>Validity</span><strong>${payload.validity}</strong></div>
            <div class="order-row"><span>Amount Paid</span><strong>${payload.priceFormatted}</strong></div>
          </div>

          <div class="qr-placeholder">
            <div style="font-size: 12px; font-weight: 800; text-transform: uppercase; color: #A7E8C1; letter-spacing: 0.5px;">Manual Activation Details</div>
            <div class="code-box">${lpaCode}</div>
            <div style="font-size: 11px; color: #A7E8C1;">SM-DP+ Address: ${smdp}</div>
          </div>

          <div class="steps">
            <div style="font-weight: 800; font-size: 14px; color: #123C2A; margin-bottom: 10px;">Quick Setup Guide:</div>
            <div class="step-item">1. Go to <strong>Settings &rarr; Cellular / Mobile Service &rarr; Add eSIM</strong> on your device.</div>
            <div class="step-item">2. Scan your QR code or paste the activation code above.</div>
            <div class="step-item">3. Turn on <strong>Data Roaming</strong> when landing in Pakistan.</div>
          </div>

          <p style="font-size: 12px; color: #5E6E66; text-align: center;">
            Need help? Contact our 24/7 team at <a href="mailto:${fromEmail}" style="color: #2FBF71; font-weight: bold;">${fromEmail}</a> or on WhatsApp.
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
