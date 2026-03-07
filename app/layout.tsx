// app/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Makaryo POS",
  description: "Uswah Coffee Point of Sale",
};

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
          background: "#f8f8f8",
        }}
      >
        {children}
      </body>
    </html>
  );
}