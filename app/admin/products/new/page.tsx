"use client";

import { useState } from "react";
import { createProduct } from "../actions";

export default function AddProductPage() {
  // Product fields
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Fruit");
  const [unit, setUnit] = useState("kg");
  const [description, setDescription] = useState("");
  const [priceInr, setPriceInr] = useState("");
  const [priceUsd, setPriceUsd] = useState("");
  const [stock, setStock] = useState("");
  const [origin, setOrigin] = useState("");
  const [isOrganic, setIsOrganic] = useState(false);

  // Image handling
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  // UI state
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  /* ===========================
     Handle Image Selection
  ============================ */
  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;

    const selected = Array.from(e.target.files);

    if (selected.length > 4) {
      alert("You can upload a maximum of 4 images");
      return;
    }

    setFiles(selected);
    setPreviews(selected.map((file) => URL.createObjectURL(file)));
  }

  /* ===========================
     Handle Form Submit
  ============================ */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // 1️⃣ Upload images to Cloudinary
      const imageUrls: string[] = [];

      for (const file of files) {
        const fd = new FormData();
        fd.append("file", file);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: fd,
        });

        if (!res.ok) {
          throw new Error("Image upload failed");
        }

        const data = await res.json();
        imageUrls.push(data.url);
      }

      // 2️⃣ Send product data to server action
      const formData = new FormData();
      formData.append("name", name);
      formData.append("category", category);
      formData.append("unit", unit);
      formData.append("description", description);
      formData.append("priceInr", priceInr);
      formData.append("priceUsd", priceUsd);
      formData.append("stock", stock);
      formData.append("origin", origin);
      formData.append("isOrganic", String(isOrganic));
      formData.append("images", JSON.stringify(imageUrls));

      const result = await createProduct(formData);

      if (result.success) {
        setMessage("✅ Product added successfully");

        // Reset form
        setName("");
        setCategory("Fruit");
        setUnit("kg");
        setDescription("");
        setPriceInr("");
        setPriceUsd("");
        setStock("");
        setOrigin("");
        setIsOrganic(false);
        setFiles([]);
        setPreviews([]);
      } else {
        setMessage("❌ " + result.error);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to add product");
    }

    setLoading(false);
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">Add Product</h1>

      {message && (
        <div className="mb-4 rounded bg-gray-100 p-3">{message}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Product Name */}
        <div>
          <label className="block font-medium mb-1">Product Name</label>
          <input
            className="w-full border rounded p-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Category / Unit / Stock */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block font-medium mb-1">Category</label>
            <select
              className="w-full border rounded p-2"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Fruit">Fruit</option>
              <option value="Vegetable">Vegetable</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Unit</label>
            <select
              className="w-full border rounded p-2"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
            >
              <option value="kg">kg</option>
              <option value="piece">piece</option>
              <option value="box">box</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Stock</label>
            <input
              type="number"
              className="w-full border rounded p-2"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            className="w-full border rounded p-2"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Prices */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Price (INR)</label>
            <input
              type="number"
              className="w-full border rounded p-2"
              value={priceInr}
              onChange={(e) => setPriceInr(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Price (USD)</label>
            <input
              type="number"
              className="w-full border rounded p-2"
              value={priceUsd}
              onChange={(e) => setPriceUsd(e.target.value)}
            />
          </div>
        </div>

        {/* Origin */}
        <div>
          <label className="block font-medium mb-1">Origin</label>
          <input
            className="w-full border rounded p-2"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
          />
        </div>

        {/* Organic */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isOrganic}
            onChange={(e) => setIsOrganic(e.target.checked)}
          />
          <span>Organic product</span>
        </div>

        {/* Images */}
        <div>
          <label className="block font-medium mb-2">
            Product Images (max 4)
          </label>

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
          />

          {previews.length > 0 && (
            <div className="flex gap-2 mt-3">
              {previews.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  className="w-20 h-20 object-cover rounded border"
                />
              ))}
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="bg-green-700 text-white px-6 py-2 rounded"
        >
          {loading ? "Saving..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}