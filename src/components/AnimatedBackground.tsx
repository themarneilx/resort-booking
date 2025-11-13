"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Animated floating gradient blobs that subtly parallax on scroll
export default function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const blobs = gsap.utils.toArray<HTMLDivElement>(".bg-blob");
      blobs.forEach((blob, i) => {
        // gentle floating loop
        gsap.to(blob, {
          y: 40,
          x: i % 2 === 0 ? 30 : -30,
          scale: 1.15,
          duration: 6 + i,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut"
        });
        // parallax on scroll
        gsap.to(blob, {
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: true
          },
          y: `+=${120 + i * 40}`,
          ease: "none"
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="bg-blob absolute w-[38rem] h-[38rem] rounded-full bg-gradient-to-br from-indigo-500/30 to-sky-400/30 blur-3xl top-[-10%] left-[-10%]" />
      <div className="bg-blob absolute w-[30rem] h-[30rem] rounded-full bg-gradient-to-tr from-emerald-400/25 to-teal-500/25 blur-3xl bottom-[-10%] right-[-5%]" />
      <div className="bg-blob absolute w-[26rem] h-[26rem] rounded-full bg-gradient-to-bl from-pink-500/25 to-purple-500/25 blur-3xl top-[30%] right-[15%]" />
    </div>
  );
}
