import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { verifyRefreshToken } from "@/lib/auth/jwt";
import AdminLayoutClient from "@/components/AdminLayoutClient";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (!refreshToken) {
    redirect("/login");
  }

  const payload = await verifyRefreshToken(refreshToken);

  if (!payload || payload.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <AdminLayoutClient>
      {children}
    </AdminLayoutClient>
  );
}