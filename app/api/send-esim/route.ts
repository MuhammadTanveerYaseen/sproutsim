import { NextResponse } from "next/server";
import { sendEsimOrderEmail } from "@/app/lib/mail";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, planName, dataAllowance, validity, priceFormatted } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "A valid email address is required" },
        { status: 400 }
      );
    }

    const result = await sendEsimOrderEmail({
      to: email,
      planName: planName || "Pakistan eSIM Package",
      dataAllowance: dataAllowance || "10 GB",
      validity: validity || "30 Days",
      priceFormatted: priceFormatted || "Rs 2,225",
    });

    return NextResponse.json({
      success: true,
      message: "eSIM activation email sent successfully via Hostinger business email",
      data: result,
    });
  } catch (error: any) {
    console.error("[Hostinger Email Error]", error);
    return NextResponse.json(
      { error: "Failed to dispatch email", details: error?.message || String(error) },
      { status: 500 }
    );
  }
}
