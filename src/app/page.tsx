"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, Users, BedDouble, Search } from 'lucide-react';

import GallerySection from "@/components/GallerySection";
import VideoBackground from "@/components/VideoBackground";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const discoverRef = useRef<HTMLElement>(null);
  const roomsRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);

useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero intro animation
      gsap.from(heroRef.current, { y: 60, opacity: 0, scale: 0.85, duration: 1.2, ease: "power3.out" });
      gsap.from(formRef.current, { y: 40, opacity: 0, duration: 1, delay: 0.4, ease: "power2.out" });

      // Parallax video background
      gsap.to(videoRef.current, {
        scrollTrigger: {
          trigger: mainContainerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        y: "-20%",
        ease: "none",
      });

      // Section fade-in animations
      const sections = [discoverRef.current, roomsRef.current];
      sections.forEach(section => {
        if (section) {
          gsap.from(section, {
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
          });
        }
      });
    }, mainContainerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainContainerRef} className="min-h-screen w-full bg-base-200 text-base-content">
      {/* Hero Section */}
      <section className="relative w-full h-[110vh] overflow-hidden flex flex-col justify-center items-center">
        <div ref={videoRef} aria-hidden className="absolute inset-0 z-0">
          <VideoBackground />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <header className="relative z-10 text-center max-w-5xl mx-auto px-6">
          <h1 ref={heroRef} className="text-6xl sm:text-8xl font-extrabold tracking-tighter text-white drop-shadow-2xl">
            Your Oasis Awaits
          </h1>
          <p className="mt-6 mb-12 text-lg sm:text-xl text-white/95 drop-shadow-lg max-w-3xl mx-auto">
            Experience unparalleled luxury and tranquility. Book your dream escape today.
          </p>
        </header>
        <div id="booking" ref={formRef} className="w-full max-w-md mx-auto relative z-10 -mt-8">
          <div className="card bg-base-100/80 backdrop-blur-md border border-base-300 shadow-2xl p-6 sm:p-8 rounded-2xl">
            <form className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 items-end justify-center" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium flex items-center gap-2"><Calendar size={16} /> Check-in</label>
                <input type="date" className="input input-bordered w-full" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium flex items-center gap-2"><Calendar size={16} /> Check-out</label>
                <input type="date" className="input input-bordered w-full" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium flex items-center gap-2"><Users size={16} /> Guests</label>
                <input type="number" min={1} defaultValue={2} className="input input-bordered w-full" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium flex items-center gap-2"><BedDouble size={16} /> Room Type</label>
                <select className="select select-bordered w-full pl-3"> {/* Added pl-3 here */}
                  <option>Deluxe Suite</option>
                  <option>Ocean View</option>
                  <option>Garden Bungalow</option>
                  <option>Presidential Suite</option>
                </select>
              </div>
              <div className="flex col-span-full justify-center"> {/* Added col-span-full and justify-center here */}
                <button className="btn btn-primary btn-lg w-full sm:w-auto rounded-lg flex items-center gap-2">
                  <Search size={20} />
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Discover Section */}
      <section ref={discoverRef} id="discover" className="py-20 sm:py-28 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">Discover Brisa Solei</h2>
          <p className="mt-4 text-lg text-base-content/70 max-w-2xl mx-auto">From pristine beaches to world-class amenities, every moment is crafted for your delight.</p>
          <div className="grid md:grid-cols-3 gap-8 mt-12 text-left">
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h3 className="card-title">World-Class Spa</h3>
                <p>Rejuvenate your senses with our holistic wellness treatments.</p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h3 className="card-title">Gourmet Dining</h3>
                <p>Savor exquisite flavors from around the globe at our signature restaurants.</p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h3 className="card-title">Private Beaches</h3>
                <p>Relax on secluded shores with crystal-clear waters and breathtaking views.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rooms & Suites Section */}
      <section ref={roomsRef} id="rooms" className="py-20 sm:py-28 bg-base-100 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">Our Accommodations</h2>
            <p className="mt-4 text-lg text-base-content/70 max-w-2xl mx-auto">Elegant rooms, suites, and villas designed for ultimate comfort.</p>
          </div>
          <div className="mt-12 h-96 bg-base-300 rounded-box flex items-center justify-center">
            <p>Rooms & Suites Gallery Coming Soon</p>
          </div>
        </div>
      </section>
      
      <GallerySection />
    </div>
  );
}
