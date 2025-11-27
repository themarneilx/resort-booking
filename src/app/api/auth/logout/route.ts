import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { refreshTokens } from "@/lib/db/schema";
import { verifyRefreshToken } from "@/lib/auth/jwt";
import { verifyPassword } from "@/lib/auth/password";
import { eq, and } from "drizzle-orm";

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (refreshToken) {
      const payload = await verifyRefreshToken(refreshToken);
      if (payload) {
          // Try to revoke
          const validTokens = await db.query.refreshTokens.findMany({
            where: and(
                eq(refreshTokens.userId, payload.userId),
                eq(refreshTokens.revoked, false)
            ),
          });

          for (const dbToken of validTokens) {
            if (await verifyPassword(refreshToken, dbToken.tokenHash)) {
                await db.update(refreshTokens)
                    .set({ revoked: true })
                    .where(eq(refreshTokens.id, dbToken.id));
                break;
            }
          }
      }
  }

  cookieStore.delete("refresh_token");

  return NextResponse.json({ success: true, message: "Logged out" }, { status: 200 });
}
