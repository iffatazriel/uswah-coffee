"use server";

// app/actions/auth.ts
// ─────────────────────────────────────────────────────────────────────────────
// USE_DUMMY = true  → tidak perlu DB, PIN apapun diterima (untuk development)
// USE_DUMMY = false → verifikasi PIN dari DB via Prisma
// ─────────────────────────────────────────────────────────────────────────────
const USE_DUMMY = true; // ← ganti ke false kalau DB sudah siap

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

// ── DUMMY ─────────────────────────────────────────────────────────────────────
async function startShiftDummy(formData: FormData) {
  const staffId = formData.get("staffId") as string;
  const pin     = formData.get("pin")     as string;

  if (!pin || pin.length < 4) {
    throw new Error("PIN harus minimal 4 digit.");
  }

  // Simulasi delay network
  await new Promise((res) => setTimeout(res, 600));

  // Simpan session sederhana ke cookie
  const cookieStore = await cookies();
  cookieStore.set("shift_staff_id", staffId, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 12, // 12 jam
  });
  cookieStore.set("shift_id", `DUMMY-SHIFT-${Date.now()}`, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 12,
  });
}

// ── REAL ──────────────────────────────────────────────────────────────────────
async function startShiftReal(formData: FormData) {
  const staffId = formData.get("staffId") as string;
  const pin     = formData.get("pin")     as string;

  if (!staffId || !pin) throw new Error("Staff ID dan PIN wajib diisi.");

  const { prisma } = await import("@/lib/prisma");

  const staff = await prisma.staff.findUnique({ where: { id: staffId } });
  if (!staff) throw new Error("Kasir tidak ditemukan.");
  if (staff.pin !== pin) throw new Error("PIN yang kamu masukkan salah.");

  const shift = await prisma.shift.create({
    data: { staffId: staff.id, startCash: 0, startTime: new Date() },
  });

  const cookieStore = await cookies();
  cookieStore.set("shift_staff_id", staff.id, {
    httpOnly: true, path: "/", maxAge: 60 * 60 * 12,
  });
  cookieStore.set("shift_id", shift.id, {
    httpOnly: true, path: "/", maxAge: 60 * 60 * 12,
  });
}

// ── Export utama ──────────────────────────────────────────────────────────────
export async function startShiftAction(formData: FormData) {
  if (USE_DUMMY) {
    await startShiftDummy(formData);
  } else {
    await startShiftReal(formData);
  }

  redirect("/dashboard");
}

// ── Logout action ─────────────────────────────────────────────────────────────
export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("shift_staff_id");
  cookieStore.delete("shift_id");
  redirect("/");
}

// ── Helper: ambil shift ID dari cookie (dipakai order-panel) ──────────────────
export async function getShiftIdFromCookie(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get("shift_id")?.value ?? null;
}