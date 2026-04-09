"use client";

import { useState } from "react";

export default function UploadTestPage() {
  const [imageUrl, setImageUrl] = useState("");

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setImageUrl(data.url);
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Upload Test</h1>

      <input type="file" accept="image/*" onChange={handleUpload} />

      {imageUrl && (
        <div style={{ marginTop: 20 }}>
          <p>Uploaded Image:</p>
          <img src={imageUrl} alt="Uploaded" width={300} />
        </div>
      )}
    </div>
  );
}