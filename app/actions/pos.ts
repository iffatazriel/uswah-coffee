"use server";

// app/actions/pos.ts
// ─────────────────────────────────────────────────────────────────────────────
// Jika database belum siap, ganti USE_DUMMY = true
// Jika sudah siap, ganti USE_DUMMY = false
// ─────────────────────────────────────────────────────────────────────────────
const USE_DUMMY = true; // ← ganti ke false jika DB sudah running

import { revalidatePath } from "next/cache";

type CartItem = {
  productId: string;
  name: string;
  price: number;
  qty: number;
};

type PlaceOrderInput = {
  shiftId: string;
  tableId?: string;
  typeOfService: "DINE_IN" | "TAKE_AWAY" | "DELIVERY";
  paymentMethod: "CASH" | "CREDIT_CARD" | "QRIS";
  items: CartItem[];
};

// ── DUMMY mode (DB belum siap) ────────────────────────────────────────────────
async function placeOrderDummy(input: PlaceOrderInput) {
  // Simulasi network delay
  await new Promise((res) => setTimeout(res, 800));

  const fakeId = `ORDER-${Date.now()}`;
  console.log("[DUMMY] Order placed:", fakeId, input);

  return { success: true, orderId: fakeId };
}

// ── REAL mode (DB sudah siap) ─────────────────────────────────────────────────
async function placeOrderReal(input: PlaceOrderInput) {
  const { prisma } = await import("@/lib/prisma");

  const subtotal = input.items.reduce((s, i) => s + i.price * i.qty, 0);
  const tax = subtotal * 0.11;
  const total = subtotal + tax;

  const order = await prisma.order.create({
    data: {
      subtotal,
      tax,
      total,
      status: "PENDING",
      typeOfService: input.typeOfService,
      paymentMethod: input.paymentMethod,
      shiftId: input.shiftId,
      tableId: input.tableId ?? null,
      items: {
        create: input.items.map((item) => ({
          productId: item.productId,
          qty: item.qty,
          price: item.price,
        })),
      },
    },
  });

  if (input.tableId) {
    await prisma.table.update({
      where: { id: input.tableId },
      data: { status: "USED" },
    });
  }

  revalidatePath("/dashboard/pos");
  revalidatePath("/dashboard/table");
  revalidatePath("/dashboard");

  return { success: true, orderId: order.id };
}

// ── Export utama ──────────────────────────────────────────────────────────────
export async function placeOrderAction(input: PlaceOrderInput) {
  if (USE_DUMMY) return placeOrderDummy(input);
  return placeOrderReal(input);
}

export async function getProductsAction(merchantId: string) {
  if (USE_DUMMY) {
    // Return kosong — komponen pakai PRODUCTS dari constants.ts
    return [];
  }

  const { prisma } = await import("@/lib/prisma");
  return prisma.product.findMany({
    where: { merchantId },
    orderBy: { category: "asc" },
  });
}