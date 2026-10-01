import { NextResponse } from "next/server";
import { gloesim } from "@/app/lib/gloesim";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const iccid = searchParams.get("iccid");

    if (!iccid) {
      return NextResponse.json(
        { error: "ICCID query parameter is required" },
        { status: 400 }
      );
    }

    const usage = await gloesim.getUsage(iccid);

    return NextResponse.json({
      success: true,
      data: usage,
    });
  } catch (error: any) {
    console.error("[GloEsim Usage Route Error]", error);
    return NextResponse.json(
      { error: "Failed to retrieve GloEsim usage", details: error?.message || String(error) },
      { status: 500 }
    );
  }
}
