"use client";
import { useEffect, useRef } from "react";
import Image from "next/image"; // Import the Image component
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
            { opacity: 0, y: 40, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              ease: "power3.out",
              stagger: { each: 0.1 },
            }
          ),
        once: true,
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const galleryItems = [
    {
      src: "/frontpage.jpg",
      alt: "Resort view 1",
      title: "Enchanting Vistas",
      description: "A glimpse into the serene and captivating atmosphere of our resort.",
    },
    {
      src: "/beach1.jpg",
      alt: "Resort view 2",
      title: "Pristine Beaches",
      description: "Relax on our white-sand beaches and enjoy the crystal-clear water.",
    },
    {
      src: "/frontpage.jpg",
      alt: "Resort view 3",
      title: "Luxurious Pools",
      description: "Take a dip in one of our infinity pools with a stunning ocean view.",
    },
    {
      src: "/beach1.jpg",
      alt: "Resort view 4",
      title: "Gourmet Dining",
      description: "Savor the exquisite flavors from our world-class restaurants.",
    },
    {
      src: "/frontpage.jpg",
      alt: "Resort view 5",
      title: "Private Villas",
      description: "Experience ultimate privacy and comfort in our exclusive villas.",
    },
    {
      src: "/beach1.jpg",
      alt: "Resort view 6",
      title: "Rejuvenating Spa",
      description: "Indulge in a variety of treatments at our award-winning spa.",
    },
  ];

  return (
    <section ref={containerRef} id="gallery" className="w-full py-20 sm:py-28 bg-base-200/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">Scenes from Paradise</h2>
            <p className="mt-4 text-lg text-base-content/70 max-w-2xl mx-auto">Explore the stunning beauty and luxurious corners of our exclusive resort.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map((item, i) => (
            <div key={i} className="gallery-card card bg-base-100 shadow-lg overflow-hidden group transform-gpu will-change-transform">
              {/* We add 'relative' here to provide a container for 
                the <Image> component when using layout="fill".
              */}
              <div className="overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={400}
                  height={300}
                  className="object-cover transform-gpu will-change-transform scale-100 group-hover:scale-110 transition-transform duration-500 ease-in-out"
                />
              </div>
              <div className="card-body p-5">
                <h3 className="card-title text-lg font-semibold">{item.title}</h3>
                <p className="text-sm text-base-content/60">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}