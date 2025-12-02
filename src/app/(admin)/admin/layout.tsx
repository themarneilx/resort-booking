import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { verifyRefreshToken } from "@/lib/auth/jwt";
import AdminLayoutClient from "@/components/AdminLayoutClient";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

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

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, payload.userId))
    .limit(1);

  if (!user) {
    redirect("/login");
  }

  return (
    <AdminLayoutClient user={{ name: user.name, email: user.email, role: user.role }}>
      {children}
    </AdminLayoutClient>
  );
}