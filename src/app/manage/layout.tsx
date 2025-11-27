import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { verifyRefreshToken } from "@/lib/auth/jwt";
import { eq } from "drizzle-orm";
import ManageLayoutClient from "@/components/ManageLayoutClient";

export default async function ManageLayout({
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

  if (!payload) {
    redirect("/login");
  }

  // Fetch user for name
  const user = await db.query.users.findFirst({
    where: eq(users.id, payload.userId),
  });

  if (!user) {
      redirect("/login");
  }

  const userName = user.name || user.email.split("@")[0];

  return (
    <ManageLayoutClient userName={userName}>
      {children}
    </ManageLayoutClient>
  );
}