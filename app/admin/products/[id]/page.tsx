import prisma from "@/lib/prisma";
import EditProductForm from "./EditProductForm";

export default async function EditProductPage(
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    return <div>Product not found</div>;
  }

  return <EditProductForm product={product} />;
}