"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function GallerySection() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLDivElement>(".gallery-card");
      cards.forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 60,
          rotateX: 6,
          duration: 0.9,
          ease: "power3.out",
          delay: i * 0.05,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const items = Array.from({ length: 9 }, (_, i) => i);

  return (
    <section ref={containerRef} id="gallery" className="w-full py-24 bg-white/30 dark:bg-white/10 backdrop-blur-sm border-y border-white/30">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Resort Gallery</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((i) => (
            <div key={i} className="gallery-card card bg-white/25 dark:bg-neutral/30 backdrop-blur-xl border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 group">
              <figure className="overflow-hidden rounded-t-2xl">
                <img
                  src={i % 2 === 0 ? "/frontpage.jpg" : "/beach1.jpg"}
                  alt={`Resort ${i + 1}`}
                  className="h-64 w-full object-cover scale-105 group-hover:scale-110 transition-transform duration-500"
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
