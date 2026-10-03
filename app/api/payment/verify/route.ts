import { NextResponse } from "next/server";
import { getOrdersCollection } from "@/app/lib/mongodb";
import { memoryOrders } from "../create-order/route";

async function markVerified(orderId: string) {
  // Update in memory
  const cached = memoryOrders.get(orderId) || { orderId, status: "PENDING_VERIFICATION" };
  cached.status = "VERIFIED";
  cached.verifiedAt = new Date();
  memoryOrders.set(orderId, cached);

  // Update in MongoDB
  try {
    const col = await getOrdersCollection();
    await col.updateOne(
      { orderId },
      { $set: { status: "VERIFIED", verifiedAt: new Date() } },
      { upsert: true }
    );
  } catch (err) {
    console.warn("[MongoDB Verify Error]", err);
  }

  return cached;
}

// GET handler: Admin clicks verification link from email
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get("orderId");

  if (!orderId) {
    return new Response("Missing orderId parameter", { status: 400 });
  }

  const updatedOrder = await markVerified(orderId);

  // Return a sleek confirmation HTML page for the admin
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Payment Approved | SproutSIM Admin</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #F5F7F2; margin: 0; padding: 30px 15px; color: #123C2A; display: flex; justify-content: center; }
        .card { max-width: 480px; width: 100%; background: #ffffff; border-radius: 24px; border: 2px solid #2FBF71; padding: 32px 24px; text-align: center; box-shadow: 0 10px 30px rgba(18,60,42,0.08); }
        .badge { width: 64px; height: 64px; border-radius: 50%; background: #E9F8F0; color: #2FBF71; display: inline-flex; align-items: center; justify-content: center; font-size: 32px; margin-bottom: 16px; }
        h1 { margin: 0 0 8px; font-size: 22px; font-weight: 800; color: #123C2A; }
        p { color: #5E6E66; font-size: 13px; line-height: 1.5; margin: 0 0 20px; }
        .details { background: #F8FAF9; border: 1px solid #E0E7E2; border-radius: 14px; padding: 14px; text-align: left; font-size: 13px; margin-bottom: 20px; }
        .details div { display: flex; justify-content: space-between; padding: 4px 0; }
        .btn { display: inline-block; background: #123C2A; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 12px; font-weight: 700; font-size: 13px; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="badge">✓</div>
        <h1>Payment Verified!</h1>
        <p>Order <strong>${orderId}</strong> has been marked as <strong>VERIFIED</strong>. The customer's screen has been updated and they can now generate their live eSIM QR profile.</p>
        <div class="details">
          <div><span>Order ID:</span><strong>${orderId}</strong></div>
          <div><span>Customer:</span><strong>${updatedOrder.customerEmail || "Customer"}</strong></div>
          <div><span>Status:</span><strong style="color: #2FBF71;">VERIFIED (Green Light)</strong></div>
        </div>
        <a href="/" class="btn">Return to SproutSIM Website</a>
      </div>
    </body>
    </html>
  `;

  return new Response(html, {
    headers: { "Content-Type": "text/html" },
  });
}

// POST handler: Called from admin dashboard or on-screen admin quick verify
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { orderId } = body;

    if (!orderId) {
      return NextResponse.json({ error: "orderId is required" }, { status: 400 });
    }

    const order = await markVerified(orderId);

    return NextResponse.json({
      success: true,
      message: "Order payment verified successfully",
      order,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Failed to verify order", details: err?.message || String(err) },
      { status: 500 }
    );
  }
}
