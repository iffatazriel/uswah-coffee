"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function startShiftAction(formData: FormData) {
  const staffId = "cl-example-id"; // Ini nantinya dinamis dari dropdown
  const inputPin = formData.get("pin") as string;

  // 1. Cari staff di database
  const staff = await prisma.staff.findUnique({
    where: { id: staffId },
  });

  if (!staff || staff.pin !== inputPin) {
    throw new Error("PIN yang Anda masukkan salah.");
  }

  // 2. Buat record Shift baru sesuai desain Makaryo
  await prisma.shift.create({
    data: {
      staffId: staff.id,
      startCash: 0, // Bisa ditambahkan input modal awal jika perlu
      startTime: new Date(),
    },
  });

  // 3. Redirect ke halaman POS utama
  redirect("/dashboard/pos");
}