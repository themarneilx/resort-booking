import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { verifyRefreshToken } from "@/lib/auth/jwt";
import { eq } from "drizzle-orm";
import UserDashboardClient from "@/components/UserDashboardClient";
import { redirect } from "next/navigation";

export default async function ManagePage() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (!refreshToken) redirect("/login");

  const payload = await verifyRefreshToken(refreshToken);
  if (!payload) redirect("/login");

  const user = await db.query.users.findFirst({
    where: eq(users.id, payload.userId),
  });

  if (!user) redirect("/login");

  // Fallback name if null
  const userName = user.name || user.email.split("@")[0];

  return <UserDashboardClient userName={userName} />;
}
