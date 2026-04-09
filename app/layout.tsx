// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; // ✅ ADD THIS

export const metadata: Metadata = {
  title: "Khushi International - Fresh Fruits & Vegetables",
  description:
    "Premium Fruits & Vegetables | Local Mumbai + International Export",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 font-sans">
        <Providers>
          <Navbar />
          {children}
          <Footer /> {/* ✅ ADD THIS */}
        </Providers>
      </body>
    </html>
  );
}
