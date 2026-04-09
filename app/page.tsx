"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "./context/CartContext";

/* ================= TYPES ================= */
type Product = {
  id: string;
  name: string;
  category: string;
  priceInr: number;
  unit: string;
  stock: number;
  origin?: string;
  images?: string | null;
};

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data || []));
  }, []);

  return (
    <div className="bg-gray-50">

      {/* ================= HERO ================= */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h1 className="text-5xl font-bold text-green-800 mb-4">
            Fresh Fruits & Vegetables
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Farm‑fresh produce for local markets and international export,
            delivered with quality and trust.
          </p>

          <div className="flex justify-center gap-4">
            <Link
              href="/shop"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold text-lg"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* ================= TRUST ================= */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <TrustItem icon="🌱" title="Farm Direct" desc="Sourced directly from farmers" />
          <TrustItem icon="✅" title="Quality Checked" desc="Fresh & export‑grade quality" />
          <TrustItem icon="🚚" title="PAN India & Export" desc="Local delivery & global shipping" />
        </div>
      </section>

      {/* ================= FEATURED PRODUCTS ================= */}
      <section className="bg-white py-16 border-t">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">
              Featured Products
            </h2>

            <Link
              href="/shop"
              className="text-green-700 font-semibold hover:underline"
            >
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.slice(0, 4).map((product) => {
              let images: string[] = [];
              try {
                const parsed = JSON.parse(product.images || "[]");
                images = Array.isArray(parsed) ? parsed : [];
              } catch {
                images = [];
              }

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
                >
                  <Link href={`/product/${product.id}`}>
                    <div className="h-48 bg-gray-50 flex items-center justify-center overflow-hidden">
                      {images.length > 0 ? (
                        <img
                          src={images[0]}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="text-sm text-gray-400">
                          No image
                        </div>
                      )}
                    </div>
                  </Link>

                  <div className="p-4">
                    <h3 className="text-lg font-semibold truncate">
                      {product.name}
                    </h3>

                    {product.origin && (
                      <p className="text-xs text-gray-500">
                        {product.origin}
                      </p>
                    )}

                    <p className="text-green-700 text-xl font-bold mt-1">
                      ₹{product.priceInr}
                      <span className="text-sm text-gray-600 font-normal">
                        {" "}
                        / {product.unit}
                      </span>
                    </p>

                    <button
                      onClick={() =>
                        addToCart({
                          id: product.id,
                          name: product.name,
                          priceInr: product.priceInr,
                          unit: product.unit,
                        })
                      }
                      className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-xl font-semibold"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ================= SMALL COMPONENT ================= */
function TrustItem({
  icon,
  title,
  desc,
}: {
  icon: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{desc}</p>
    </div>
  );
}
