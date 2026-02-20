"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Skills from "@/components/sections/Skills";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Projets from "@/components/sections/Projets";
import SectionDivider from "@/components/ui/SectionDivider";

export default function Home() {
  const [showBtn, setShowBtn] = useState(false);
  const lastClickRef = useRef<number>(0);

  const sectionOrder = [
    "contact",
    "projets",
    "skills",
    "about",
    "hero",
  ];

  useEffect(() => {
    const onScroll = () => {
      setShowBtn(window.scrollY > 250);
    };

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToId(id: string) {
    const el = document.getElementById(id);
    if (!el) return;

    const y = el.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top: y, behavior: "smooth" });
  }

  function scrollStepUp() {
    const scrollY = window.scrollY + 120;

    for (let i = 0; i < sectionOrder.length; i++) {
      const id = sectionOrder[i];
      const el = document.getElementById(id);
      if (!el) continue;

      const top = el.getBoundingClientRect().top + window.scrollY;

      if (scrollY >= top) {
        const next = sectionOrder[i + 1];

        if (next) {
          scrollToId(next);
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }

        return;
      }
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleScrollUp() {
    const now = Date.now();
    const delta = now - lastClickRef.current;
    lastClickRef.current = now;

    if (delta < 300) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    scrollStepUp();
  }

  return (
    <main className="min-h-screen bg-cosmic">
      <div className="pointer-events-none fixed inset-0 grid-overlay" />

      <div className="relative mx-auto max-w-6xl px-6 py-10">
        <Navbar />
        <SectionDivider />

        <div id="hero">
          <Hero />
        </div>
        <SectionDivider />

        <div id="about">
          <About />
        </div>
        <SectionDivider />

        <div id="skills">
          <Skills />
        </div>
        <SectionDivider />

        <div id="projets">
          <Projets />
        </div>
        <SectionDivider />

        <div id="contact">
          <Contact />
        </div>
      </div>

      <div
        className={`fixed bottom-8 right-8 z-50 transition-all duration-300 ${
          showBtn
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-3 pointer-events-none"
        }`}
      >
        <button
          onClick={handleScrollUp}
          className="group relative grid place-items-center h-14 w-14 rounded-full
                     border border-white/10 bg-white/5 backdrop-blur-xl
                     shadow-[0_12px_60px_rgba(0,0,0,0.35)]
                     transition hover:scale-[1.05] active:scale-[0.95]
                     hover:border-pink-300/40 overflow-hidden"
        >
          <span
            aria-hidden="true"
            className="absolute -inset-2 rounded-full blur-xl opacity-70
                       bg-[radial-gradient(circle_at_30%_30%,rgba(244,114,182,0.35),transparent_55%),
                           radial-gradient(circle_at_70%_70%,rgba(167,139,250,0.28),transparent_55%)]"
          />

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="relative h-6 w-6 text-white/85 transition group-hover:text-pink-100"
          >
            <path d="M12 19V6" />
            <path d="m5 12 7-7 7 7" />
          </svg>
        </button>
      </div>
    </main>
  );
}