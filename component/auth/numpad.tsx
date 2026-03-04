"use client";

import { Delete } from "lucide-react";
import { useAuthStore } from "@/lib/store";

export default function Numpad() {
  const { addNumber, deleteNumber } = useAuthStore();

  const buttons = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

  return (
    <div className="grid grid-cols-3 gap-4 w-full max-w-[300px] mx-auto mt-8">
      {/* Angka 1-9 */}
      {buttons.slice(0, 9).map((num) => (
        <button
          key={num}
          onClick={() => addNumber(num)}
          className="h-16 w-16 mx-auto text-2xl font-semibold hover:bg-orange-50 rounded-full transition-colors"
        >
          {num}
        </button>
      ))}

      {/* Baris Bawah: Kosong, Angka 0, Tombol Hapus */}
      <div /> 
      <button
        onClick={() => addNumber("0")}
        className="h-16 w-16 mx-auto text-2xl font-semibold hover:bg-orange-50 rounded-full transition-colors"
      >
        0
      </button>
      <button
        onClick={deleteNumber}
        className="h-16 w-16 mx-auto flex items-center justify-center text-gray-500 hover:text-orange-600 transition-colors"
      >
        <Delete size={28} />
      </button>
    </div>
  );
}