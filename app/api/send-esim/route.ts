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

    // Map plan to GloEsim package code
    let packageCode = "GLO_PK_10GB_30D";
    if (planId && GLOESIM_PAKISTAN_PACKAGES[planId]) {
      packageCode = GLOESIM_PAKISTAN_PACKAGES[planId].code;
    } else if (dataAllowance) {
      const match = Object.values(GLOESIM_PAKISTAN_PACKAGES).find(
        (p) => p.dataFormatted.toLowerCase() === String(dataAllowance).toLowerCase()
      );
      if (match) packageCode = match.code;
    }

    // 1. Provision eSIM profile with GloEsim provider
    const gloOrder = await gloesim.createOrder({
      packageCode,
      customerEmail: email,
      referenceId: `SPROUT-${Date.now()}`,
    });

    // 2. Dispatch professional activation email with GloEsim credentials via Hostinger SMTP
    const emailResult = await sendEsimOrderEmail({
      to: email,
      planName: planName || "Pakistan eSIM Package",
      dataAllowance: dataAllowance || `${Math.round(gloOrder.dataMB / 1024)} GB`,
      validity: validity || `${gloOrder.validityDays} Days`,
      priceFormatted: priceFormatted || "Rs 2,225",
      lpaCode: gloOrder.lpaCode,
      smdpAddress: gloOrder.smdpAddress,
    });

    return NextResponse.json({
      success: true,
      message: "eSIM provisioned via GloEsim and activation email dispatched via Hostinger",
      order: gloOrder,
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
