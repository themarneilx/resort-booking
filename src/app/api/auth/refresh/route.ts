import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { refreshTokens } from "@/lib/db/schema";
import { verifyRefreshToken, signAccessToken } from "@/lib/auth/jwt";
import { verifyPassword } from "@/lib/auth/password";
import { eq, and, gt } from "drizzle-orm";

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (!refreshToken) {
    return NextResponse.json({ success: false, message: "No refresh token" }, { status: 401 });
  }

  const payload = await verifyRefreshToken(refreshToken);

  if (!payload) {
    return NextResponse.json({ success: false, message: "Invalid refresh token" }, { status: 401 });
  }

  // Find valid tokens for user
  const validTokens = await db.query.refreshTokens.findMany({
    where: and(
      eq(refreshTokens.userId, payload.userId),
      eq(refreshTokens.revoked, false),
      gt(refreshTokens.expiresAt, new Date())
    ),
  });

  let matchedToken = null;
  for (const dbToken of validTokens) {
    const isMatch = await verifyPassword(refreshToken, dbToken.tokenHash);
    if (isMatch) {
      matchedToken = dbToken;
      break;
    }
  }

  if (!matchedToken) {
    return NextResponse.json({ success: false, message: "Invalid or revoked refresh token" }, { status: 401 });
  }

  // Issue new Access Token
  const newAccessToken = await signAccessToken({ userId: payload.userId, role: payload.role });

  return NextResponse.json(
    { success: true, accessToken: newAccessToken },
    { status: 200 }
  );
}
