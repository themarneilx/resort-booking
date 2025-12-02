"use client";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/contexts/AuthContext";

interface User {
  id: string;
  name: string | null;
  email: string;
  role: string;
}

export default function LayoutClient({
  children,
  user,
}: Readonly<{
  children: React.ReactNode;
  user: User | null;
}>) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/signup";
  const isDashboard = pathname?.startsWith("/dashboard") || pathname?.startsWith("/manage") || pathname?.startsWith("/admin");
  const hideLayout = isAuthPage || isDashboard;

  return (
    <AuthProvider initialUser={user}>
      {!hideLayout && <Navbar />}
      <main>{children}</main>
      {!hideLayout && <Footer />}
    </AuthProvider>
  );
}
