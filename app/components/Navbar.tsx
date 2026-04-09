"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const pathname = usePathname();
  const { cart } = useCart();

  // 🚫 Hide navbar on all admin pages
  if (pathname.startsWith("/admin")) {
    return null;
  }

  const linkClass = (path: string) =>
    `transition ${
      pathname === path
        ? "text-white font-semibold border-b-2 border-white"
        : "text-green-100 hover:text-white"
    }`;

  return (
    <nav className="bg-green-700 text-white sticky top-0 z-50 shadow">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* ✅ BRAND (Clickable) */}
        <Link href="/" className="flex items-center gap-3">
          <div className="text-3xl">🍎🥕</div>
          <div>
            <h1 className="text-2xl font-bold leading-tight">
              Khushi International
            </h1>
            <p className="text-xs text-green-200">
              Fresh Fruits & Vegetables • Local + Export
            </p>
          </div>
        </Link>

        {/* ✅ NAV LINKS */}
        <div className="hidden md:flex gap-8 text-lg">
          <Link href="/" className={linkClass("/")}>
            Home
          </Link>

          <Link href="/shop" className={linkClass("/shop")}>
            Shop
          </Link>

          <Link href="/contact" className={linkClass("/contact")}>
            Contact
          </Link>

          <Link href="/account" className={linkClass("/account")}>
            My Account
          </Link>
        </div>

        {/* ✅ CART */}
        <Link
          href="/cart"
          className="bg-white text-green-700 px-5 py-2 rounded-full font-medium hover:bg-green-100 flex items-center gap-2"
        >
          🛒 Cart
          {cart.length > 0 && (
            <span className="bg-green-700 text-white px-2 py-0.5 rounded-full text-xs">
              {cart.length}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}