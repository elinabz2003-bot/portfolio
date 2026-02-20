"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/app/context/LanguageContext";

type NavLink = { labelFr: string; labelEn: string; href: string };

function cx(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const { lang, toggle } = useLanguage();

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("#about");

  const LINKS: NavLink[] = [
    { labelFr: "About", labelEn: "About", href: "#about" },
    { labelFr: "Skills", labelEn: "Skills", href: "#skills" },
    { labelFr: "Projets", labelEn: "Projects", href: "#projets" },
    { labelFr: "Contact", labelEn: "Contact", href: "#contact" },
  ];

  const ids = useMemo(
    () => LINKS.map((l) => l.href.replace("#", "")).filter(Boolean),
    []
  );

  // Lock scroll when drawer open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Highlight active section on scroll (IntersectionObserver)
  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        // On prend l’entrée la plus visible
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

        if (visible?.target?.id) setActive(`#${visible.target.id}`);
      },
      {
        // déclenche quand le haut de section arrive dans la zone centrale
        root: null,
        threshold: [0.15, 0.25, 0.35, 0.5, 0.65],
        rootMargin: "-25% 0px -55% 0px",
      }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [ids]);

  const close = () => setOpen(false);

  function closeAfterNav() {
    setOpen(false);
    setTimeout(() => {
      document.body.style.overflow = "";
    }, 0);
  }

  return (
    <header className="sticky top-0 z-40 -mx-6 px-6 py-4">
      {/* bande glass pour le sticky */}
      <div className="glass border border-white/10 px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Avatar + Nom */}
          <div className="flex items-center gap-3">
            {/* Avatar + visible : 48px mobile, 56px desktop */}
            <div className="relative h-12 w-12 overflow-hidden rounded-full border border-white/10 md:h-14 md:w-14">
              <Image
                src="/profile.jpg"
                alt="Photo de profil"
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="leading-tight">
              <span className="block text-sm font-semibold tracking-wide text-white/90 md:text-base">
                Elina<span className="text-white/40">.portfolio</span>
              </span>
              <span className="block text-[11px] text-white/45 md:text-xs">
                {lang === "fr"
                  ? "Cybersécurité • Réseaux • Développement"
                  : "Cybersecurity • Networks • Development"}
              </span>
            </div>
          </div>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-2 text-sm md:flex">
            {LINKS.map((l) => {
              const isActive = active === l.href;
              return (
                <a
                  key={l.href}
                  href={l.href}
                  className={cx(
                    "rounded-full px-4 py-2 transition",
                    isActive
                      ? "border border-cyan-300/25 bg-cyan-300/10 text-cyan-100 shadow-[0_0_30px_rgba(34,211,238,0.12)]"
                      : "text-white/70 hover:text-white hover:bg-white/5 border border-transparent"
                  )}
                >
                  {lang === "fr" ? l.labelFr : l.labelEn}
                </a>
              );
            })}

            {/* 🌍 BOUTON LANGUE */}
            <button
              onClick={toggle}
              className="ml-3 rounded-full border border-violet-400/30 bg-violet-400/15 px-4 py-2 text-sm font-semibold text-violet-200 transition hover:bg-violet-400/25 hover:shadow-[0_0_30px_rgba(167,139,250,0.25)]"
            >
              {lang === "fr" ? "EN" : "FR"}
            </button>
          </nav>

          {/* Mobile burger */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10"
            onClick={() => setOpen(true)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile overlay + drawer */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/65"
            onClick={closeAfterNav}
          />

          <aside className="absolute right-0 top-0 h-full w-[84%] max-w-sm border-l border-white/10 bg-black/55 backdrop-blur-xl p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-white/85">
                {lang === "fr" ? "Menu" : "Menu"}
              </p>
              <button onClick={closeAfterNav} className="text-white/60">
                ✕
              </button>
            </div>

            <div className="mt-6 grid gap-3">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={closeAfterNav}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80"
                >
                  {lang === "fr" ? l.labelFr : l.labelEn}
                </a>
              ))}
            </div>
            {/* Bouton langue mobile */}
            <button
              onClick={toggle}
              className="mt-6 w-full rounded-full border border-violet-400/30 bg-violet-400/15 px-4 py-2 text-sm font-semibold text-violet-200"
            >
              {lang === "fr" ? "Switch to English" : "Passer en Français"}
            </button>
          </aside>
        </div>
      )}
    </header>
  );
}
