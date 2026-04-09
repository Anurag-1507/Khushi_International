"use client";

import { useState } from "react";
import { updateProduct } from "../actions";

export default function EditProductForm({ product }: { product: any }) {
  const [name, setName] = useState(product.name);
  const [priceInr, setPriceInr] = useState(product.priceInr.toString());
  const [stock, setStock] = useState(product.stock.toString());

  // ✅ existing images from DB
  const [existingImages] = useState<string[]>(
    Array.isArray(JSON.parse(product.images || "[]"))
      ? JSON.parse(product.images || "[]")
      : []
  );

  // ✅ new images if admin wants to replace
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [newPreviews, setNewPreviews] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;

    const selected = Array.from(e.target.files);
    if (selected.length > 4) {
      alert("Maximum 4 images allowed");
      return;
    }

    setNewFiles(selected);
    setNewPreviews(selected.map((file) => URL.createObjectURL(file)));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    let finalImages = existingImages;

    // ✅ Only upload images if admin selected new ones
    if (newFiles.length > 0) {
      finalImages = [];
      for (const file of newFiles) {
        const fd = new FormData();
        fd.append("file", file);
        const res = await fetch("/api/upload", {
          method: "POST",
          body: fd,
        });
        const data = await res.json();
        finalImages.push(data.url);
      }
    }

    const formData = new FormData();
    formData.append("id", product.id);
    formData.append("name", name);
    
formData.append("category", product.category);
formData.append("unit", product.unit)

    formData.append("priceInr", priceInr);
    formData.append("stock", stock);
    formData.append("images", JSON.stringify(finalImages));

    const result = await updateProduct(formData);

    setMessage(
      result.success
        ? "✅ Product updated successfully"
        : "❌ " + result.error
    );
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
      <h1 className="text-2xl font-bold">Edit Product</h1>

      {message && <div className="p-3 bg-gray-100 rounded">{message}</div>}

      <div>
        <label className="block mb-1 font-medium">Product Name</label>
        <input
          className="w-full border rounded p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">Price (₹)</label>
          <input
            type="number"
            className="w-full border rounded p-2"
            value={priceInr}
            onChange={(e) => setPriceInr(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Stock</label>
          <input
            type="number"
            className="w-full border rounded p-2"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </div>
      </div>

      {/* ✅ EXISTING IMAGES */}
      <div>
        <label className="block mb-2 font-medium">Current Images</label>
        <div className="flex gap-2">
          {existingImages.map((img, i) => (
            <img
              key={i}
              src={img}
              className="w-20 h-20 object-cover rounded border"
            />
          ))}
        </div>
      </div>

      {/* ✅ REPLACE IMAGES */}
      <div>
        <label className="block mb-2 font-medium">
          Replace Images (optional, max 4)
        </label>
        <input type="file" multiple accept="image/*" onChange={handleImageChange} />

        {newPreviews.length > 0 && (
          <div className="flex gap-2 mt-2">
            {newPreviews.map((src, i) => (
              <img
                key={i}
                src={src}
                className="w-20 h-20 object-cover rounded border"
              />
            ))}
          </div>
        )}
      </div>

      <button
        disabled={loading}
        className="bg-green-700 text-white px-6 py-2 rounded"
      >
        {loading ? "Updating..." : "Update Product"}
      </button>
    </form>
  );
}
