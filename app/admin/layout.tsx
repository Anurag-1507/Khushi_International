import Link from "next/link";
import { cookies } from "next/headers";
import { ReactNode } from "react";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const cookieStore = await cookies();
  const adminSession = cookieStore.get("admin_session");

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* SIDEBAR */}
      {adminSession && (
        <aside className="w-64 bg-green-800 text-white flex flex-col">
          {/* Brand */}
          <div className="px-6 py-4 text-xl font-bold border-b border-green-700">
            Khushi Admin
          </div>

          {/* Menu */}
          <nav className="flex-1 px-4 py-6 space-y-2 text-sm">
            <SideLink href="/admin/dashboard" label="Dashboard" icon="📊" />
            <SideLink href="/admin/products" label="Products" icon="📦" />
            <SideLink href="/admin/orders" label="Orders" icon="🧾" />
            <SideLink href="/admin/customers" label="Customers" icon="👥" />
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-green-700">
            <form action="/api/admin/logout" method="POST">
              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 py-2 rounded text-sm font-medium"
              >
                Logout
              </button>
            </form>
          </div>
        </aside>
      )}

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}

/* ✅ Sidebar item component */
function SideLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-4 py-2 rounded hover:bg-green-700 transition"
    >
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
    </Link>
  );
}
