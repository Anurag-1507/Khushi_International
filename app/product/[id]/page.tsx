"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useCart } from "../../context/CartContext";

/* ================= TYPES ================= */
type Product = {
  id: string;
  name: string;
  category: string;
  priceInr: number;
  unit: string;
  origin?: string;
  description?: string;
  stock: number;
  images?: string;
};

export default function ProductPage() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  /* ================= FETCH PRODUCT ================= */
  useEffect(() => {
    if (!id) return;

    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);

        let imgs: string[] = [];
        try {
          imgs = JSON.parse(data.images || "[]");
        } catch {
          imgs = [];
        }

        setImages(imgs);
        setActiveImage(imgs[0] || null);

        fetch("/api/products")
          .then((res) => res.json())
          .then((all) => {
            const similar = all.filter(
              (p: Product) =>
                p.category === data.category && p.id !== data.id
            );
            setRelated(similar.slice(0, 4));
            setLoading(false);
          });
      });
  }, [id]);

  if (loading || !product) {
    return <div className="p-10 text-center">Loading product…</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* ================= IMAGE SECTION ================= */}
        <div>
          {/* Main Image */}
          <div className="bg-white border rounded-2xl p-4 mb-4">
            <div className="relative aspect-square overflow-hidden bg-gray-50 rounded-xl">
              {activeImage ? (
                <img
                  src={activeImage}
                  alt={product.name}
                  className="
                    w-full h-full 
                    object-contain 
                    transition-transform duration-300 ease-out
                    hover:scale-125
                  "
                />
              ) : (
                <div className="h-full flex items-center justify-center text-gray-400">
                  No image available
                </div>
              )}
            </div>
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-3">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(img)}
                  className={`w-20 h-20 rounded-xl border bg-white overflow-hidden ${
                    img === activeImage
                      ? "border-green-600 ring-2 ring-green-300"
                      : "border-gray-300"
                  }`}
                >
                  <img
                    src={img}
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ================= PRODUCT INFO ================= */}
        <div className="bg-white border rounded-2xl p-8">
          <h1 className="text-4xl font-bold mb-1">{product.name}</h1>
          <p className="text-gray-500 mb-4">
            {product.origin || "Fresh Farm Produce"}
          </p>

          <p className="text-3xl font-semibold text-green-700 mb-4">
            ₹{product.priceInr} / {product.unit}
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            {product.description || "Fresh and high quality produce."}
          </p>

          <p className="mb-6">
            <span className="font-medium">Stock:</span>{" "}
            <span className="text-green-600">
              {product.stock} {product.unit}
            </span>
          </p>

          {/* Quantity */}
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              −
            </button>

            <span className="text-lg font-semibold">{quantity}</span>

            <button
              onClick={() =>
                setQuantity((q) => Math.min(product.stock, q + 1))
              }
              className="px-4 py-2 bg-gray-200 rounded"
            >
              +
            </button>
          </div>

          <button
            onClick={() => {
              for (let i = 0; i < quantity; i++) {
                addToCart(product);
              }
            }}
            className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-xl font-semibold text-lg w-full"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* ================= RELATED PRODUCTS ================= */}
      {related.length > 0 && (
        <div className="mt-20">
          <h2 className="text-3xl font-bold mb-8">
            Similar {product.category}s
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((p) => {
              const imgs = JSON.parse(p.images || "[]");
              return (
                <Link key={p.id} href={`/product/${p.id}`}>
                  <div className="bg-white border rounded-xl overflow-hidden hover:shadow-lg transition">
                    <div className="aspect-[4/3] bg-gray-50 flex items-center justify-center">
                      {imgs[0] && (
                        <img
                          src={imgs[0]}
                          className="w-full h-full object-contain"
                        />
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold">{p.name}</h3>
                      <p className="text-green-700 font-bold">
                        ₹{p.priceInr}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}