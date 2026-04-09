"use server";

import prisma from "@/lib/prisma";

/* =====================
   CREATE PRODUCT
===================== */
export async function createProduct(formData: FormData) {
  try {
    const imagesRaw = formData.get("images");
    const images = imagesRaw ? JSON.parse(imagesRaw as string) : [];

    const product = await prisma.product.create({
      data: {
        name: formData.get("name") as string,
        category: formData.get("category") as string,
        description: (formData.get("description") as string) || "",
        priceInr: Number(formData.get("priceInr")),
        priceUsd: formData.get("priceUsd")
          ? Number(formData.get("priceUsd"))
          : null,
        stock: Number(formData.get("stock")),
        unit: formData.get("unit") as string,
        origin: (formData.get("origin") as string) || "",
        isOrganic: formData.get("isOrganic") === "true",
        images: JSON.stringify(images), // ✅ must exist for new product
        isAvailable: true,
      },
    });

    return { success: true, product };
  } catch (error) {
    console.error("Create product error:", error);
    return { success: false, error: "Create failed" };
  }
}

/* =====================
   UPDATE PRODUCT
===================== */
export async function updateProduct(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    if (!id) return { success: false, error: "Product ID missing" };

    // ✅ IMPORTANT FIX:
    // Only update images if they are explicitly provided
    const imagesRaw = formData.get("images");
    const images = imagesRaw ? JSON.parse(imagesRaw as string) : undefined;

    const data: any = {
      name: formData.get("name") as string,
      category: formData.get("category") as string,
      description: (formData.get("description") as string) || "",
      priceInr: Number(formData.get("priceInr")),
      priceUsd: formData.get("priceUsd")
        ? Number(formData.get("priceUsd"))
        : null,
      stock: Number(formData.get("stock")),
      unit: formData.get("unit") as string,
      origin: (formData.get("origin") as string) || "",
      isOrganic: formData.get("isOrganic") === "true",
    };

    // ✅ Only overwrite images if new images were sent
    if (images !== undefined) {
      data.images = JSON.stringify(images);
    }

    await prisma.product.update({
      where: { id },
      data,
    });

    return { success: true };
  } catch (error) {
    console.error("Update product error:", error);
    return { success: false, error: "Update failed" };
  }
}