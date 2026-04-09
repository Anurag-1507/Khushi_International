import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminRoot() {
  const cookieStore = await cookies(); // ✅ await
  const adminSession = cookieStore.get("admin_session");

  if (!adminSession) {
    redirect("/admin/login");
  }

  redirect("/admin/dashboard");
}