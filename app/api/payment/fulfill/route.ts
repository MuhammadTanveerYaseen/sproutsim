import { NextResponse } from "next/server";
import { gloesim, GLOESIM_PAKISTAN_PACKAGES } from "@/app/lib/gloesim";
import { sendEsimOrderEmail } from "@/app/lib/mail";
import { getOrdersCollection } from "@/app/lib/mongodb";
import { memoryOrders } from "../create-order/route";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { orderId, planId, email, planName, dataAllowance, validity, priceFormatted } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }

    // Map plan to GloEsim package code / UUID
    let packageCode = planId || "a2db19a9-0a35-4ed8-883f-296d8fe6abf8";
    if (planId && GLOESIM_PAKISTAN_PACKAGES[planId]) {
      packageCode = GLOESIM_PAKISTAN_PACKAGES[planId].id;
    } else if (planId && planId.length > 20) {
      packageCode = planId;
    }

    // 1. Provision real eSIM profile with GloEsim provider
    const gloOrder = await gloesim.createOrder({
      packageCode,
      customerEmail: email,
      referenceId: orderId || `SPROUT-${Date.now()}`,
    });

    // 2. Dispatch real activation email with genuine GloEsim credentials via Hostinger SMTP
    let emailStatus = "pending";
    try {
      await sendEsimOrderEmail({
        to: email,
        planName: planName || "Pakistan 4G eSIM Package",
        dataAllowance: dataAllowance || `${Math.round(gloOrder.dataMB / 1024)} GB`,
        validity: validity || `${gloOrder.validityDays} Days`,
        priceFormatted: priceFormatted || "Rs 2,350",
        lpaCode: gloOrder.lpaCode,
        smdpAddress: gloOrder.smdpAddress,
      });
      emailStatus = "sent";
    } catch (err: any) {
      console.warn("[Hostinger SMTP Notice]", err?.message || err);
      emailStatus = "email_failed";
    }

    // 3. Update order record in memory & MongoDB
    if (orderId) {
      const existing = memoryOrders.get(orderId) || {};
      const updated = {
        ...existing,
        status: "COMPLETED",
        iccid: gloOrder.iccid,
        lpaCode: gloOrder.lpaCode,
        smdpAddress: gloOrder.smdpAddress,
        qrCodeUrl: gloOrder.qrCodeUrl,
        gloOrderId: gloOrder.orderId,
        redeemLink: gloOrder.redeemLink,
        completedAt: new Date(),
      };
      memoryOrders.set(orderId, updated);

      try {
        const col = await getOrdersCollection();
        await col.updateOne(
          { orderId },
          { $set: updated },
          { upsert: true }
        );
      } catch (dbErr) {
        console.warn("[MongoDB Order Update Error]", dbErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: "eSIM successfully provisioned from live GloEsim telecom gateway",
      order: gloOrder,
      emailStatus,
    });
  } catch (err: any) {
    console.error("[Fulfill Order Error]", err);
    return NextResponse.json(
      { error: "Failed to fulfill eSIM order", details: err?.message || String(err) },
      { status: 500 }
    );
  }
}
