import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import LayoutClient from "./LayoutClient";
import { cookies } from "next/headers";
import { verifyRefreshToken } from "@/lib/auth/jwt";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Brisa Solei | Luxury Resort & Spa",
  description: "Experience unparalleled luxury and tranquility where the ocean meets the sky.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refresh_token")?.value;
  let user: { id: string; name: string | null; email: string; role: string } | null = null;

  if (refreshToken) {
    const payload = await verifyRefreshToken(refreshToken);
    if (payload) {
      try {
        const dbUser = await db.query.users.findFirst({
          where: eq(users.id, payload.userId),
          columns: { id: true, name: true, email: true, role: true }
        });
        if (dbUser) {
          user = {
            id: dbUser.id,
            name: dbUser.name,
            email: dbUser.email,
            role: dbUser.role
          };
        }
      } catch (error) {
        console.error("Failed to fetch user in RootLayout", error);
      }
    }
  }

  return (
    <html lang="en" data-theme="light" className="scroll-smooth">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased bg-sand-50 text-slate-800 selection:bg-brand-500 selection:text-white`}
      >
        <LayoutClient user={user}>{children}</LayoutClient>
      </body>
    </html>
  );
}