"use client";
import { usePathname, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function LayoutClient({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";
  const isDashboard = pathname?.startsWith("/dashboard");
  const mainRef = useRef<HTMLDivElement>(null);
  const hideLayout = isLoginPage || isDashboard;
  const isInitialRender = useRef(true);


  const animateAndNavigate = (href: string) => {
    gsap.to(mainRef.current, {
      x: "-100%", // Always exit to the left
      duration: 0.3,
      ease: "power3.inOut",
      onComplete: () => {
        router.push(href);
      },
    });
  };

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    // Determine entry direction based on the destination path
    const entryX = pathname === '/login' ? '100%' : '-100%';

    gsap.fromTo(
      mainRef.current,
      { x: entryX },
      { x: "0%", duration: 0.3, ease: "power3.inOut" }
    );
  }, [pathname]);

  return (
    <>
      {!isLoginPage && <Navbar animateAndNavigate={animateAndNavigate} />}
      <main ref={mainRef}>{children}</main>
      <Footer />
    </>
  );
}