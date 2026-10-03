import { NextResponse } from "next/server";
import { getOrdersCollection } from "@/app/lib/mongodb";
import { memoryOrders } from "../create-order/route";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get("orderId");

  if (!orderId) {
    return NextResponse.json({ error: "orderId is required" }, { status: 400 });
  }

  // 1. Check in-memory store
  let order = memoryOrders.get(orderId);

  // 2. Check MongoDB if not found or to sync latest
  if (!order) {
    try {
      const ordersCol = await getOrdersCollection();
      const doc = await ordersCol.findOne({ orderId });
      if (doc) {
        order = doc;
        memoryOrders.set(orderId, doc);
      }
    } catch (err) {
      console.warn("[MongoDB Status Error]", err);
    }
  }

  if (!order) {
    return NextResponse.json({
      success: false,
      error: "Order not found",
      status: "NOT_FOUND",
    }, { status: 404 });
  }

  const isVerified = order.status === "VERIFIED" || order.status === "PROVISIONED" || order.status === "COMPLETED";

  return NextResponse.json({
    success: true,
    orderId,
    status: order.status,
    isVerified,
    order,
  });
}
