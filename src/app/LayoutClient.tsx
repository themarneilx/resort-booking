"use client";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LayoutClient({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/signup";
  const isDashboard = pathname?.startsWith("/dashboard");
  const hideLayout = isAuthPage || isDashboard;

  return (
    <>
      {!hideLayout && <Navbar />}
      <main>{children}</main>
      {!hideLayout && <Footer />}
    </>
  );
}