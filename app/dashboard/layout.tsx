import Sidebar from "@/components/pos/sidebar";
import ToastContainer from "@/components/pos/toast-container";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily: "'DM Sans', sans-serif",
          background: "#f8f8f8", // Warna latar sesuai mockup
        }}
      >
        <div
          style={{
            display: "flex",
            height: "100vh", 
          }}
        >
          {/* Kolom Kiri: Sidebar */}
          <Sidebar />

          {/* Kolom Tengah & Kanan: Konten Sales */}
          <main
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {children}
          </main>
          <ToastContainer />
        </div>
      </body>
    </html>
  );
}