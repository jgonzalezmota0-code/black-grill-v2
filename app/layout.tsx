import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Black Grill",
  description: "Menú Digital Black Grill",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}