"use client";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LayoutClient({
  children,
  userName,
}: Readonly<{
  children: React.ReactNode;
  userName: string | null;
}>) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/signup";
  const isDashboard = pathname?.startsWith("/dashboard") || pathname?.startsWith("/manage") || pathname?.startsWith("/admin") || pathname?.startsWith("/rooms");
  const hideLayout = isAuthPage || isDashboard;

  return (
    <>
      {!hideLayout && <Navbar userName={userName} />}
      <main>{children}</main>
      {!hideLayout && <Footer />}
    </>
  );
}
