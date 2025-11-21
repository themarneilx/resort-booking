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
  const hideLayout = isLoginPage || isDashboard;
  const mainRef = useRef<HTMLDivElement>(null);

  const animateAndNavigate = (href: string) => {
    gsap.to(mainRef.current, {
      x: "-100%",
      duration: 0.5,
      ease: "power3.inOut",
      onComplete: () => {
        router.push(href);
      },
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (isDashboard) {
        gsap.set(mainRef.current, { x: "0%" });
      } else {
        gsap.fromTo(
          mainRef.current,
          { x: "100%" },
          { x: "0%", duration: 0.5, ease: "power3.inOut" }
        );
      }
    });

    return () => ctx.revert();
  }, [pathname, isDashboard]);

  return (
    <>
      {!hideLayout && <Navbar animateAndNavigate={animateAndNavigate} />}
      <main ref={mainRef}>{children}</main>
      {!hideLayout && <Footer />}
    </>
  );
}
