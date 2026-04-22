"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "../context/CartContext";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const { cart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  // 🚫 Hide navbar on admin pages
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
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* ✅ BRAND */}
        <Link href="/" className="flex items-center gap-3">
          <div className="text-2xl md:text-3xl">🍎🥕</div>
          <div className="hidden sm:block">
            <h1 className="text-lg md:text-2xl font-bold leading-tight">
              Khushi International
            </h1>
            <p className="text-xs text-green-200">
              Fresh Fruits & Vegetables
            </p>
          </div>
        </Link>

        {/* ✅ DESKTOP LINKS */}
        <div className="hidden md:flex gap-8 text-lg">
          <Link href="/" className={linkClass("/")}>Home</Link>
          <Link href="/shop" className={linkClass("/shop")}>Shop</Link>
          <Link href="/contact" className={linkClass("/contact")}>Contact</Link>
          <Link href="/account" className={linkClass("/account")}>My Account</Link>
        </div>

        {/* ✅ RIGHT SIDE (CART + HAMBURGER) */}
        <div className="flex items-center gap-3">
          {/* Cart */}
          <Link
            href="/cart"
            className="bg-white text-green-700 px-3 py-1.5 md:px-5 md:py-2 rounded-full font-medium hover:bg-green-100 flex items-center gap-2 text-sm md:text-base"
          >
            🛒
            <span className="hidden sm:inline">Cart</span>
            {cart.length > 0 && (
              <span className="bg-green-700 text-white px-2 py-0.5 rounded-full text-xs">
                {cart.length}
              </span>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* ✅ MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden bg-green-800 border-t border-green-600">
          <div className="flex flex-col px-4 py-4 gap-4 text-base">
            <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link href="/shop" onClick={() => setMenuOpen(false)}>Shop</Link>
            <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
            <Link href="/account" onClick={() => setMenuOpen(false)}>My Account</Link>
          </div>
        </div>
      )}
    </nav>
  );
}