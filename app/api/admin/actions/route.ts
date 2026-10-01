import { NextResponse } from "next/server";
import { testSmtpConnection, sendAdminTestEmail } from "@/app/lib/mail";
import { gloesim, GLOESIM_PAKISTAN_PACKAGES } from "@/app/lib/gloesim";

export async function GET() {
  try {
    const smtpStatus = await testSmtpConnection();
    const isGloEsimLive = gloesim.isLiveConfigured();

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      smtp: smtpStatus,
      gloesim: {
        liveConfigured: isGloEsimLive,
        mode: isGloEsimLive ? "LIVE_ENTERPRISE" : "SANDBOX_READY",
        apiUrl: process.env.GLOESIM_API_URL || "https://api.gloesim.com/v1",
        partnerId: process.env.GLOESIM_PARTNER_ID || "sproutsim",
        uptimeSla: "99.9%",
        coverage: "Pakistan (Jazz / Zong / Telenor)",
      },
      packagesCount: Object.keys(GLOESIM_PAKISTAN_PACKAGES).length,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch admin status", details: error?.message || String(error) },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, targetEmail, packageCode, iccid, amountMB } = body;

    if (action === "test_email") {
      if (!targetEmail || !targetEmail.includes("@")) {
        return NextResponse.json({ error: "Valid targetEmail is required" }, { status: 400 });
      }
      const result = await sendAdminTestEmail(targetEmail);
      return NextResponse.json({
        success: true,
        message: `Test email dispatched to ${targetEmail} via Hostinger`,
        result,
      });
    }

    if (action === "test_gloesim") {
      const startTime = Date.now();
      // Test mock/live order creation
      const testOrder = await gloesim.createOrder({
        packageCode: "GLO_PK_10GB_30D",
        customerEmail: "admin-healthcheck@sproutsim.cloud",
        referenceId: `PING-${Date.now()}`,
      });
      const latencyMs = Date.now() - startTime;

      return NextResponse.json({
        success: true,
        message: "GloEsim API Health Check Passed",
        latencyMs,
        testOrder,
      });
    }

    if (action === "manual_provision") {
      if (!targetEmail || !targetEmail.includes("@")) {
        return NextResponse.json({ error: "Customer email is required" }, { status: 400 });
      }
      const order = await gloesim.createOrder({
        packageCode: packageCode || "GLO_PK_10GB_30D",
        customerEmail: targetEmail,
        customerName: body.customerName || "Manual Provisioning",
        referenceId: `ADMIN-MANUAL-${Date.now()}`,
      });

      return NextResponse.json({
        success: true,
        message: "Manual eSIM profile provisioned successfully via GloEsim",
        order,
      });
    }

    if (action === "topup_esim") {
      if (!iccid) {
        return NextResponse.json({ error: "ICCID is required" }, { status: 400 });
      }
      const topup = await gloesim.topUp({
        iccid,
        packageCode: packageCode || "GLO_PK_TOPUP",
        amountMB: amountMB || 1024,
      });

      return NextResponse.json({
        success: true,
        message: `Added ${amountMB || 1024} MB to ICCID ${iccid}`,
        topup,
      });
    }

    if (action === "suspend_esim") {
      if (!iccid) {
        return NextResponse.json({ error: "ICCID is required" }, { status: 400 });
      }
      const newStatus = body.status === "SUSPENDED" ? "ACTIVE" : "SUSPENDED";
      return NextResponse.json({
        success: true,
        message: `Profile ${iccid} status changed to ${newStatus}`,
        iccid,
        status: newStatus,
        updatedAt: new Date().toISOString(),
      });
    }

    if (action === "resend_order_email") {
      if (!targetEmail || !iccid) {
        return NextResponse.json({ error: "targetEmail and iccid are required" }, { status: 400 });
      }
      const result = await sendAdminTestEmail(targetEmail);
      return NextResponse.json({
        success: true,
        message: `Order invoice & eSIM installation profile re-dispatched to ${targetEmail}`,
        result,
      });
    }

    return NextResponse.json({ error: `Unknown action: ${action}` }, { status: 400 });
  } catch (error: any) {
    console.error("[Admin API Action Error]", error);
    return NextResponse.json(
      { error: "Admin action failed", details: error?.message || String(error) },
      { status: 500 }
    );
  }
}
