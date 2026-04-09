"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext";

/* ================= TYPES ================= */
type Product = {
  id: string;
  name: string;
  category: string;
  priceInr: number;
  stock: number;
  unit: string;
  origin?: string;
  images?: string | null;
};

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] =
    useState<"all" | "Fruit" | "Vegetable">("all");

  const { addToCart } = useCart();

  /* ================= FETCH PRODUCTS ================= */
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredProducts =
    filter === "all"
      ? products
      : products.filter((p) => p.category === filter);

  if (loading) {
    return (
      <div className="p-10 text-center text-lg">
        Loading products...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* ================= FILTERS ================= */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          <FilterBtn
            active={filter === "all"}
            onClick={() => setFilter("all")}
          >
            All Products
          </FilterBtn>

          <FilterBtn
            active={filter === "Fruit"}
            onClick={() => setFilter("Fruit")}
          >
            🍎 Fruits
          </FilterBtn>

          <FilterBtn
            active={filter === "Vegetable"}
            onClick={() => setFilter("Vegetable")}
          >
            🥕 Vegetables
          </FilterBtn>
        </div>

        {/* ================= PRODUCTS GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => {
            /* ---------- SAFE IMAGE PARSING ---------- */
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
                {/* IMAGE */}
                <Link href={`/product/${product.id}`}>
                  <div className="h-52 bg-white flex items-center justify-center overflow-hidden">
                    {images.length > 0 ? (
                      <img
                        src={images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-sm text-gray-400">
                        No image
                      </div>
                    )}
                  </div>
                </Link>

                {/* INFO */}
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

                  <p className="text-xs text-gray-500">
                    Stock: {product.stock} {product.unit}
                  </p>

                  {/* ✅ CART (TYPE SAFE) */}
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
    </div>
  );
}

/* ================= SMALL COMPONENT ================= */
function FilterBtn({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-8 py-3 rounded-full font-semibold ${
        active
          ? "bg-green-700 text-white"
          : "bg-white border border-green-700 text-green-700"
      }`}
    >
      {children}
    </button>
  );
}