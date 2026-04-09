"use client";

type Props = {
  productId: string;
};

export default function DeleteProductButton({ productId }: Props) {
  async function handleDelete() {
    const ok = confirm("Are you sure you want to delete this product?");
    if (!ok) return;

    await fetch(`/api/products/${productId}`, {
      method: "DELETE",
    });

    // Refresh the page so server component re-fetches data
    window.location.reload();
  }

  return (
    <button
      onClick={handleDelete}
      className="text-red-600 hover:underline"
    >
      Delete
    </button>
  );
}