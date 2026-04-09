import prisma from "@/lib/prisma";
import Link from "next/link";
import DeleteProductButton from "./DeleteProductButton";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Products</h1>

        <Link
          href="/admin/products/new"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Add Product
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price (₹)</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.length === 0 && (
              <tr>
                <td colSpan={6} className="p-6 text-center text-gray-500">
                  No products found
                </td>
              </tr>
            )}

            {products.map((product) => {
              
let images: string[] = [];

try {
  images = Array.isArray(JSON.parse(product.images ?? "[]"))
    ? JSON.parse(product.images ?? "[]")
    : [];
} catch {
  images = [];
}

const image = images.length > 0 ? images[0] : null;


              return (
                <tr key={product.id} className="border-t">
                  <td className="p-3">
                    {image ? (
                      <img
                        src={image}
                        alt={product.name}
                        className="w-14 h-14 object-cover rounded"
                      />
                    ) : (
                      <div className="w-14 h-14 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                        No Image
                      </div>
                    )}
                  </td>

                  <td className="p-3 font-medium">{product.name}</td>
                  <td className="p-3">{product.category}</td>
                  <td className="p-3">₹{product.priceInr}</td>
                  <td className="p-3">{product.stock}</td>

                  <td className="p-3 flex gap-3">
                    <Link
                      href={`/admin/products/${product.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </Link>

                    <DeleteProductButton productId={product.id} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}