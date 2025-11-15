"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import GallerySection from "@/components/GallerySection";
import VideoBackground from "@/components/VideoBackground";

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
    <div className="min-h-screen w-full flex flex-col items-center gap-16 relative">
      <section className="relative w-full h-screen overflow-hidden flex flex-col justify-center items-center gap-8">
        <div aria-hidden className="absolute inset-0 z-0">
          <VideoBackground />
        </div>
      <header className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <h1 ref={heroRef} className="text-5xl sm:text-7xl font-bold tracking-tight text-white drop-shadow-lg">
          Escape To Paradise
        </h1>
        <p className="mt-6 mb-10 text-lg sm:text-xl text-white/90 drop-shadow max-w-2xl mx-auto">
          Book your dream resort stay.
        </p>
      </header>
      <div id="booking" ref={formRef} className="w-full max-w-6xl mx-auto relative z-10 card bg-base-100 border border-base-200 shadow-xl p-6 rounded-2xl">
        <form className="grid gap-4 md:grid-cols-5 items-end" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Check-in</label>
            <input type="date" className="input input-bordered w-full" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Check-out</label>
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
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>
          </div>
          <div className="flex md:col-span-1">
            <button className="btn btn-primary btn-lg w-full rounded-md">Search Availability</button>
          </div>
        </form>
      </div>
      </section>
      {/* Feature cards */}
      <section id="whyus" className="relative -mt-8 max-w-5xl mx-auto grid gap-10 py-12 text-neutral-900 px-6">
        <h2 className="text-3xl font-semibold">Why Choose Us</h2>
        <div className="grid gap-6 md:grid-cols-3 text-sm">
          <div className="p-5 rounded-xl bg-neutral-100 border border-neutral-200">
            <h3 className="font-semibold mb-2">Curated Luxury</h3>
            <p>Hand-picked resorts ensuring top-tier comfort & unforgettable experiences.</p>
          </div>
          <div className="p-5 rounded-xl bg-neutral-100 border border-neutral-200">
            <h3 className="font-semibold mb-2">Seamless Booking</h3>
            <p>Book in minutes with clear pricing and real-time updates.</p>
          </div>
          <div className="p-5 rounded-xl bg-neutral-100 border border-neutral-200">
            <h3 className="font-semibold mb-2">Trusted Support</h3>
            <p>Our team is here 24/7 to help make your stay perfect.</p>
          </div>
        </div>
      </section>
      <GallerySection />
      
    </div>


  );
}
