"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedBackground from "@/components/AnimatedBackground";
import GallerySection from "@/components/GallerySection";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero intro animation
      gsap.from(heroRef.current, {
        y: 60,
        opacity: 0,
        scale: 0.85,
        duration: 1.2,
        ease: "power3.out"
      });
      // Form fade & rise
      gsap.from(formRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        delay: 0.4,
        ease: "power2.out"
      });
      // Subtle scroll reactive scale
      gsap.to(heroRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=400",
          scrub: true
        },
        scale: 1.05,
        ease: "none"
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-6 py-24 sm:py-32 gap-16 relative">
      <AnimatedBackground />
      {/* Background handled globally via body background */}
      <header className="text-center max-w-4xl mx-auto">
        <h1 ref={heroRef} className="text-5xl sm:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-teal-400 to-emerald-300 drop-shadow-xl">
          Escape To Paradise
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
          Book your dream resort stay.
        </p>
      </header>
      <div ref={formRef} className="w-full max-w-3xl bg-white/40 dark:bg-black/30 backdrop-blur-xl rounded-2xl shadow-xl p-8 border border-white/40 dark:border-white/20 ring-1 ring-white/30 grid gap-6">
        <form className="grid gap-6 md:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Arrival</label>
            <input type="date" className="input input-bordered w-full" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Departure</label>
            <input type="date" className="input input-bordered w-full" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Guests</label>
            <input type="number" min={1} defaultValue={2} className="input input-bordered w-full" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Room Type</label>
            <select className="select select-bordered w-full">
              <option>Deluxe Suite</option>
              <option>Ocean View</option>
              <option>Garden Villa</option>
              <option>Presidential</option>
            </select>
          </div>
          <div className="md:col-span-2 flex flex-col gap-2">
            <label className="text-sm font-medium">Special Requests</label>
            <textarea rows={3} className="textarea textarea-bordered resize-none" placeholder="e.g. Late check-in, dietary needs" />
          </div>
          <div className="md:col-span-2 flex items-center justify-between gap-4 flex-wrap">
            <div className="text-sm text-foreground/70">Live availability & dynamic pricing coming next.</div>
            <button className="btn btn-primary btn-lg rounded-full px-8">Search Availability</button>
          </div>
        </form>
      </div>
      {/* Feature cards */}
      <section className="max-w-5xl mx-auto grid gap-10 py-8 text-white">
        <h2 className="text-3xl font-semibold">Why Choose Us</h2>
        <div className="grid gap-6 md:grid-cols-3 text-sm">
          <div className="p-5 rounded-xl bg-gradient-to-br from-indigo-500/30 to-sky-400/30 border border-white/30 backdrop-blur">
            <h3 className="font-semibold mb-2">Curated Luxury</h3>
            <p>Hand-picked resorts ensuring top-tier comfort & unforgettable experiences.</p>
          </div>
          <div className="p-5 rounded-xl bg-gradient-to-br from-teal-500/30 to-emerald-400/30 border border-white/30 backdrop-blur">
            <h3 className="font-semibold mb-2">[Placeholder here]</h3>
            <p>[Text here]</p>
          </div>
          <div className="p-5 rounded-xl bg-gradient-to-br from-pink-500/30 to-purple-500/30 border border-white/30 backdrop-blur">
            <h3 className="font-semibold mb-2">[Placeholder here]</h3>
            <p>[Text here]</p>
          </div>
        </div>
      </section>
      <GallerySection />
    </div>
  );
}
