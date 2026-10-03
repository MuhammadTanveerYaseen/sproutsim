import { NextResponse } from "next/server";
import { getOrdersCollection } from "@/app/lib/mongodb";
import { sendPaymentVerificationAlertToAdmin } from "@/app/lib/mail";

// In-memory fallback/cache to ensure immediate zero-latency polling
export const memoryOrders = new Map<string, any>();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      planId,
      planName,
      dataAllowance,
      validity,
      priceFormatted,
      email,
      phone,
      senderName,
      transactionRef,
      paymentMethod,
      invoiceData,
      invoiceFileName,
    } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "A valid email address is required" },
        { status: 400 }
      );
    }

    if (!invoiceData) {
      return NextResponse.json(
        { error: "Payment invoice / receipt screenshot is mandatory. Please upload your payment receipt before submitting." },
        { status: 400 }
      );
    }

    const orderId = `SPROUT-${Date.now().toString().slice(-6)}-PK`;
    const now = new Date();

    const orderDoc = {
      orderId,
      planId: planId || "a2db19a9-0a35-4ed8-883f-296d8fe6abf8",
      planName: planName || "Pakistan 4G eSIM Package",
      dataAllowance: dataAllowance || "10 GB",
      validity: validity || "30 Days",
      priceFormatted: priceFormatted || "Rs 2,350",
      customerEmail: email,
      customerPhone: phone || "Not provided",
      senderName: senderName || "Customer",
      transactionRef: transactionRef || `Paid via ${paymentMethod || "Direct Transfer"}`,
      status: "PENDING_VERIFICATION",
      paymentMethod: paymentMethod || "MANUAL_TRANSFER",
      invoiceUrl: invoiceData,
      invoiceFileName: invoiceFileName || "payment_receipt.png",
      createdAt: now,
      updatedAt: now,
    };

    // 1. Cache in memory
    memoryOrders.set(orderId, orderDoc);

    // 2. Persist to MongoDB
    try {
      const ordersCol = await getOrdersCollection();
      await ordersCol.insertOne(orderDoc);
    } catch (dbErr) {
      console.warn("[MongoDB Notice] Could not persist pending order immediately:", dbErr);
    }

    // 3. Dispatch high-priority email alert to Admin with uploaded invoice
    const origin = request.headers.get("origin") || "http://localhost:3000";
    const verifyUrl = `${origin}/api/payment/verify?orderId=${orderId}&token=admin_instant_verify`;

    try {
      await sendPaymentVerificationAlertToAdmin({
        orderId,
        customerEmail: email,
        customerPhone: phone,
        customerName: senderName,
        planName: orderDoc.planName,
        dataAllowance: orderDoc.dataAllowance,
        validity: orderDoc.validity,
        priceFormatted: orderDoc.priceFormatted,
        senderDetails: `${senderName ? senderName + " • " : ""}${transactionRef || "Invoice uploaded for verification"}`,
        verifyUrl,
        paymentMethod: paymentMethod || "Manual Transfer",
        invoiceData,
        invoiceFileName,
      });
    } catch (mailErr) {
      console.warn("[Mail Alert Notice] Failed to send admin payment alert email:", mailErr);
    }

    return NextResponse.json({
      success: true,
      message: "Order placed with invoice attached. Awaiting admin manual payment verification.",
      orderId,
      order: orderDoc,
    });
  } catch (err: any) {
    console.error("[Create Manual Order Error]", err);
    return NextResponse.json(
      { error: "Failed to create order", details: err?.message || String(err) },
      { status: 500 }
    );
  }
}
