// src/app/page.tsx
"use client";

import { startShiftAction } from "@/app/actions/auth";
import { useAuthStore } from "@/lib/store";
import Numpad from "@/components/auth/numpad";
import PinDisplay from "@/components/auth/pin-display";

export default function LoginPage() {
  const { pin } = useAuthStore();

  return (
    <main className="flex min-h-screen">
      {/* SISI KIRI: Branding (Oranye) */}
      <div className="hidden lg:flex w-1/2 bg-[#FF5200] p-12 flex-col justify-between text-white relative overflow-hidden">
        <div className="z-10">
          <h1 className="text-5xl font-bold leading-tight">
            Transform Your <br /> Business with <br />
            <span className="flex items-center gap-2 italic">
              Uswah Coffee POS
            </span>
          </h1>
        </div>

        {/* Dekorasi Gambar POS di Tengah (Opsional) */}
        <div className="relative z-10 w-full max-w-md mx-auto">
          {/* Masukkan asset gambar POS kamu di sini */}
        </div>

        <p className="z-10 text-sm opacity-80">
          Your journey to faster transactions and smoother operations starts here.
        </p>

        {/* Elemen Dekoratif Lingkaran */}
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
      </div>

      {/* SISI KANAN: Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 bg-white">
        <form
          action={startShiftAction}
          className="w-full max-w-[400px] text-center"
        >
          {/* Input hidden untuk mengirim PIN dari Zustand ke Server Action */}
          <input type="hidden" name="pin" value={pin} />

          <div className="mb-8 flex justify-center">
            {/* Logo */}
            <div className="bg-[#FF5200] p-3 rounded-2xl shadow-lg">
              <div className="w-8 h-8 border-4 border-white rounded-md rotate-45" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-800">Cashier Login</h2>
          <p className="text-gray-500 text-sm mt-2">
            Handle transactions effortlessly with the Makaryo cashier system.
          </p>

          {/* Selector Kasir */}
          <div className="mt-8 p-4 border rounded-xl flex items-center justify-between hover:border-orange-500 cursor-pointer transition-all">
            <div className="flex items-center gap-3 text-left">
              <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden" />
              <div>
                <p className="font-semibold text-sm">Broicad</p>
                <p className="text-xs text-gray-400">10:00 Am - 22:00 Pm</p>
              </div>
            </div>
            <span className="text-gray-400">▼</span>
          </div>

          <p className="mt-8 text-xs text-gray-400 uppercase tracking-widest">
            Please input your PIN to validate yourself
          </p>

          <PinDisplay />

          <button
            type="button"
            className="text-orange-600 text-sm font-medium hover:underline"
          >
            Forgot PIN?
          </button>

          <Numpad />

          <button
            type="submit"
            disabled={pin.length < 6}
            className="w-full mt-10 bg-[#FF5200] text-white py-4 rounded-xl font-bold hover:bg-orange-700 disabled:bg-gray-300 transition-all shadow-lg shadow-orange-200"
          >
            Start Shift
          </button>
        </form>
      </div>
    </main>
  );
}