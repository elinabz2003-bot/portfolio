"use client";

import Link from "next/link";
import { useLanguage } from "@/app/context/LanguageContext";

type Card = {
  titleFr: string;
  titleEn: string;
  href: string;
  accent: "cyan" | "violet";
  bulletsFr: string[];
  bulletsEn: string[];
  ctaFr: string;
  ctaEn: string;
};

const CARDS: Card[] = [
  {
    titleFr: "Certifications",
    titleEn: "Certifications",
    href: "/certifications",
    accent: "violet",
    bulletsFr: [
      "Badges & attestations",
      "Formation en cours",
      "Preuves (PDF / liens)",
    ],
    bulletsEn: [
      "Badges & certificates",
      "Ongoing training",
      "Proof (PDF / public links)",
    ],
    ctaFr: "Voir mes certifications",
    ctaEn: "View my certifications",
  },
  {
    titleFr: "Projets",
    titleEn: "Projects",
    href: "/projects",
    accent: "cyan",
    bulletsFr: [
      "Projets C (sockets)",
      "Labs réseau (OSPF/NAT)",
      "Write-up + captures",
    ],
    bulletsEn: [
      "C projects (sockets)",
      "Networking labs (OSPF/NAT)",
      "Write-ups + screenshots",
    ],
    ctaFr: "Voir mes projets",
    ctaEn: "View my projects",
  },
];

function accentStyles(accent: Card["accent"]) {
  return accent === "cyan"
    ? {
        border: "border-cyan-300/15",
        glow: "hover:shadow-[0_20px_80px_rgba(34,211,238,0.12)]",
        line: "from-cyan-300/60 to-transparent",
      }
    : {
        border: "border-violet-400/15",
        glow: "hover:shadow-[0_20px_80px_rgba(167,139,250,0.12)]",
        line: "from-violet-400/55 to-transparent",
      };
}

export default function Projets() {
  const { lang } = useLanguage();

  return (
    <section id="projets" className="mt-16">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-white/90">
            {lang === "fr" ? "Explorer" : "Explore"}
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-white/60">
            {lang === "fr"
              ? "Accès à mes certifications et à mes projets."
              : "Access my certifications and technical projects."}
          </p>
        </div>

        <div className="hidden text-xs text-white/45 md:block">
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
            {lang === "fr" ? "navigation" : "navigation"}
          </span>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {CARDS.map((c) => {
          const a = accentStyles(c.accent);

          const title = lang === "fr" ? c.titleFr : c.titleEn;
          const bullets = lang === "fr" ? c.bulletsFr : c.bulletsEn;
          const cta = lang === "fr" ? c.ctaFr : c.ctaEn;

          return (
            <Link
              key={title}
              href={c.href}
              className={[
                "group glass glow-hover p-6 border transition flex flex-col",
                a.border,
                a.glow,
              ].join(" ")}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-white/85">
                    {title}
                  </p>
                </div>
              </div>

              <div
                className={`mt-4 h-px w-24 bg-gradient-to-r ${a.line}`}
              />

              <ul className="mt-4 space-y-2 text-sm text-white/70">
                {bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2">
                    <span className="text-white/35">▸</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              {/* ✅ CTA aligné à droite + style rose/pink */}
              <div className="mt-6 flex justify-end">
                <span className="rounded-full border border-pink-400/30 bg-pink-400/15 px-4 py-2 text-sm font-semibold text-pink-100 transition hover:bg-pink-400/25 hover:shadow-[0_10px_40px_rgba(244,114,182,0.25)]">
                  {cta}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}