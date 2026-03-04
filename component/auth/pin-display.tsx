"use client";

import { useAuthStore } from "@/lib/store";

export default function PinDisplay() {
  const { pin } = useAuthStore();
  const dots = Array(6).fill(0); // Sesuai desain Makaryo yang punya 6 digit PIN

  return (
    <div className="flex gap-3 justify-center my-6">
      {dots.map((_, index) => (
        <div
          key={index}
          className={`w-12 h-12 border-2 rounded-lg flex items-center justify-center transition-all ${
            pin[index] ? "border-orange-500 bg-orange-50" : "border-gray-200"
          }`}
        >
          {pin[index] && (
            <div className="w-3 h-3 bg-orange-600 rounded-full" />
          )}
        </div>
      ))}
    </div>
  );
}