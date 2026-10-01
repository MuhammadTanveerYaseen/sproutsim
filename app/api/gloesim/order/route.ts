import { NextResponse } from "next/server";
import { gloesim } from "@/app/lib/gloesim";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { packageCode, customerEmail, customerName, referenceId } = body;

    if (!customerEmail || !customerEmail.includes("@")) {
      return NextResponse.json(
        { error: "A valid customer email is required" },
        { status: 400 }
      );
    }

    const order = await gloesim.createOrder({
      packageCode: packageCode || "GLO_PK_10GB_30D",
      customerEmail,
      customerName,
      referenceId,
    });

    return NextResponse.json({
      success: true,
      data: order,
    });
  } catch (error: any) {
    console.error("[GloEsim Order Route Error]", error);
    return NextResponse.json(
      { error: "Failed to process GloEsim order", details: error?.message || String(error) },
      { status: 500 }
    );
  }
}
