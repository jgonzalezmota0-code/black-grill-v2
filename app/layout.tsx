import type { Metadata } from "next";
import "./globals.css";
import RegisterSW from "./register-sw";
export const metadata: Metadata = {
  title: "Black Grill",
  description: "Menú Digital Black Grill",
  manifest: "/manifest.json",
  themeColor: "#F59E0B",
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
  <RegisterSW />
  {children}
</body>
    </html>
  );
}