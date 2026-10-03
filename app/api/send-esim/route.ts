import { NextResponse } from "next/server";
import { sendEsimOrderEmail } from "@/app/lib/mail";
import { gloesim, GLOESIM_PAKISTAN_PACKAGES } from "@/app/lib/gloesim";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, planName, dataAllowance, validity, priceFormatted, planId } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "A valid email address is required" },
        { status: 400 }
      );
    }

    // Map plan to GloEsim package code / UUID
    let packageCode = planId || "a2db19a9-0a35-4ed8-883f-296d8fe6abf8";
    if (planId && GLOESIM_PAKISTAN_PACKAGES[planId]) {
      packageCode = GLOESIM_PAKISTAN_PACKAGES[planId].id;
    } else if (planId && planId.length > 20) {
      packageCode = planId;
    } else if (dataAllowance) {
      const match = Object.values(GLOESIM_PAKISTAN_PACKAGES).find(
        (p) => p.dataFormatted.toLowerCase() === String(dataAllowance).toLowerCase()
      );
      if (match) packageCode = match.id;
    }

    // 1. Provision eSIM profile with GloEsim provider
    const gloOrder = await gloesim.createOrder({
      packageCode,
      customerEmail: email,
      referenceId: `SPROUT-${Date.now()}`,
    });

    // 2. Dispatch professional activation email with GloEsim credentials via Hostinger SMTP
    let emailResult = null;
    let emailStatus = "pending";
    try {
      emailResult = await sendEsimOrderEmail({
        to: email,
        planName: planName || "Pakistan eSIM Package",
        dataAllowance: dataAllowance || `${Math.round(gloOrder.dataMB / 1024)} GB`,
        validity: validity || `${gloOrder.validityDays} Days`,
        priceFormatted: priceFormatted || "Rs 2,225",
        lpaCode: gloOrder.lpaCode,
        smdpAddress: gloOrder.smdpAddress,
      });
      emailStatus = "sent";
    } catch (emailErr: any) {
      console.warn("[Hostinger SMTP Notice] Could not deliver email, continuing with profile:", emailErr?.message || emailErr);
      emailStatus = `delivery_failed: ${emailErr?.message || "Check email address"}`;
    }

    return NextResponse.json({
      success: true,
      message: "eSIM provisioned via GloEsim enterprise provider",
      order: gloOrder,
      emailStatus,
      emailResult,
    });
  } catch (error: any) {
    console.error("[eSIM Checkout & GloEsim Error]", error);
    return NextResponse.json(
      { error: "Failed to process order", details: error?.message || String(error) },
      { status: 500 }
    );
  }
}
