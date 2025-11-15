"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function GallerySection() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.batch(".gallery-card", {
        start: "top 85%",
        onEnter: (batch) =>
          gsap.fromTo(
            batch as gsap.TweenTarget,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power2.out",
              stagger: { each: 0.08 },
            }
          ),
        once: true,
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const items = Array.from({ length: 9 }, (_, i) => i);

  return (
    <section ref={containerRef} id="gallery" className="w-full min-h-screen py-24 bg-[#f6f5f1]">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Resort Gallery</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((i) => (
            <div key={i} className="gallery-card card transform-gpu will-change-transform bg-base-100 border border-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 group">
              <figure className="overflow-hidden rounded-t-2xl">
                <img
                  src={i % 2 === 0 ? "/frontpage.jpg" : "/beach1.jpg"}
                  alt={`Resort ${i + 1}`}
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                  className="h-64 w-full object-cover transform-gpu will-change-transform scale-105 group-hover:scale-110 transition-transform duration-500"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title">Picture {i + 1}</h3>
                <p className="text-sm opacity-80">[Text]</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary btn-sm">View</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
