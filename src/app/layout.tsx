"use client";
import { usePathname, useRouter } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";
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
    gsap.fromTo(
      mainRef.current,
      { x: "100%" },
      { x: "0%", duration: 0.5, ease: "power3.inOut" }
    );
  }, [pathname]);

  return (
    <html lang="en" data-theme="light">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-neutral-900`}
      >
        {!isLoginPage && <Navbar animateAndNavigate={animateAndNavigate} />}
        <main ref={mainRef}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
