"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import { useState } from "react";

export default function Hero() {
  const { lang } = useLanguage();

  // ✅ effet pulse au clic (ne change rien d’autre)
  const [downloading, setDownloading] = useState(false);
  function triggerDownloadPulse() {
    setDownloading(true);
    window.setTimeout(() => setDownloading(false), 900);
  }

  const domains = [
    {
      titleFr: "Réseaux",
      titleEn: "Networking",
      levelFr: "Intermédiaire avancé",
      levelEn: "Upper-intermediate",
      detailFr: "TCP/IP • subnetting • dépannage",
      detailEn: "TCP/IP • subnetting • troubleshooting",
      accent: "cyan",
    },
    {
      titleFr: "Cybersécurité",
      titleEn: "Cybersecurity",
      levelFr: "Intermédiaire",
      levelEn: "Intermediate",
      detailFr: "bonnes pratiques • durcissement • analyse",
      detailEn: "best practices • hardening • analysis",
      accent: "violet",
    },
    {
      titleFr: "Développement",
      titleEn: "Development",
      levelFr: "Intermédiaire",
      levelEn: "Intermediate",
      detailFr: "front + back • projets • clean code",
      detailEn: "front + back • projects • clean code",
      accent: "pink",
    },
  ] as const;

  const tagsFr = ["Linux", "TCP/IP", "C (sockets)", "Python", "SQL", "Firewalls"];
  const tagsEn = ["Linux", "TCP/IP", "C (sockets)", "Python", "SQL", "Firewalls"];

  const t = {
    pill:
      lang === "fr"
        ? "Cybersécurité • Réseaux • Développement"
        : "Cybersecurity • Networking • Development",
    openTo: lang === "fr" ? "Ouverte aux opportunités" : "Open to opportunities",

    tagline:
      lang === "fr"
        ? "Sécuriser les réseaux et construire des systèmes fiables."
        : "Securing networks and building reliable systems.",

    intro:
      lang === "fr"
        ? "Je m’intéresse à la sécurité des infrastructures, aux architectures réseau et au développement d’applications robustes. J’aime partir du concret : tester, corriger, documenter, et améliorer jusqu’à obtenir quelque chose de propre et fiable."
        : "I’m interested in infrastructure security, network architectures, and building robust applications. I like working from the practical side: testing, fixing, documenting, and iterating until the result is clean and reliable.",

    btnProjects: lang === "fr" ? "Voir mes projets" : "View my projects",
    btnContact: lang === "fr" ? "Me contacter" : "Get in touch",
    btnCv: lang === "fr" ? "Télécharger CV" : "Download CV",

    rightTitle: lang === "fr" ? "Profil" : "Profile",
    rightChip: "L3 • CERI",

    blockTitle: lang === "fr" ? "Domaines & niveau" : "Domains & level",
    blockHint: lang === "fr" ? "auto-évaluation" : "self-assessment",

    nowTitle: lang === "fr" ? "En ce moment" : "Currently",
    nowLine1:
      lang === "fr"
        ? "> je renforce : sécurité réseau & bonnes pratiques"
        : "> improving: network security & best practices",
    nowLine2:
      lang === "fr"
        ? "> je construis : labs + projets pour progresser"
        : "> building: labs + projects to level up",
  };

  const tags = lang === "fr" ? tagsFr : tagsEn;

  return (
    <section className="mt-14 grid items-center gap-10 md:grid-cols-2">
      {/* LEFT */}
      <div>
        <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-1">
          <span className="avail-dot" aria-hidden="true" />
          <span className="text-xs text-white/75">{t.pill}</span>

          <span className="h-4 w-px bg-white/10" aria-hidden="true" />

          <span className="text-[11px] text-emerald-200/80">{t.openTo}</span>
        </div>

        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white md:text-5xl">
          Elina BAZZAZ ABKENAR
        </h1>

        <div className="mt-4 h-px w-20 bg-gradient-to-r from-cyan-300/60 to-transparent" />

        <p className="mt-4 text-2xl text-white/70">{t.tagline}</p>

        <p className="mt-5 max-w-xl text-base leading-relaxed text-white/65">
          {t.intro}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href="#projets"
            className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black hover:bg-white/90"
          >
            {t.btnProjects}
          </a>

          <a
            href="#contact"
            className="rounded-full px-5 py-2.5 text-sm font-semibold text-white/85 btn-soft"
          >
            {t.btnContact}
          </a>

          <a
            href="/cv_elina.pdf"
            download="CV_Elina_Bazzaz_Abkenar.pdf"
            onClick={triggerDownloadPulse}
            className={[
              "download-btn",
              downloading ? "is-downloading" : "",
              "rounded-full border border-pink-400/30 bg-pink-400/15 px-5 py-2.5 text-sm font-semibold text-pink-100 transition",
              "hover:bg-pink-400/25 hover:shadow-[0_10px_40px_rgba(244,114,182,0.25)]",
            ].join(" ")}
          >
            {t.btnCv}
          </a>
        </div>
      </div>

      {/* RIGHT */}
      <div className="glass glow-hover p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-white/85">{t.rightTitle}</p>
          <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/60">
            {t.rightChip}
          </span>
        </div>

        <div className="mt-5 grid gap-4">
          {/* Domaines & niveaux */}
          <div className="glass p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs text-white/50">{t.blockTitle}</p>
              <p className="text-[11px] text-white/40">{t.blockHint}</p>
            </div>

            <div className="mt-4 grid gap-3">
              {domains.map((d) => {
                const title = lang === "fr" ? d.titleFr : d.titleEn;
                const level = lang === "fr" ? d.levelFr : d.levelEn;
                const detail = lang === "fr" ? d.detailFr : d.detailEn;

                const width = d.levelFr === "Intermédiaire avancé" ? "78%" : "62%";

                return (
                  <div
                    key={d.titleFr}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-white/85">{title}</p>
                        <p className="mt-1 text-xs text-white/55">{detail}</p>
                      </div>

                      <span
                        className={[
                          "shrink-0 rounded-full border px-3 py-1 text-[11px] font-semibold",
                          d.accent === "cyan"
                            ? "border-cyan-300/20 bg-cyan-300/10 text-cyan-100"
                            : d.accent === "violet"
                            ? "border-violet-300/20 bg-violet-300/10 text-violet-100"
                            : "border-pink-300/20 bg-pink-300/10 text-pink-100",
                        ].join(" ")}
                      >
                        {level}
                      </span>
                    </div>

                    {/* barre décorative */}
                    <div className="mt-3 h-2 overflow-hidden rounded-full border border-white/10 bg-black/30">
                      <div
                        className={[
                          "h-full rounded-full",
                          d.accent === "cyan"
                            ? "bg-gradient-to-r from-cyan-300/60 to-cyan-300/10"
                            : d.accent === "violet"
                            ? "bg-gradient-to-r from-violet-400/55 to-violet-400/10"
                            : "bg-gradient-to-r from-pink-400/45 to-pink-400/10",
                        ].join(" ")}
                        style={{ width }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* En ce moment */}
          <div className="glass p-5">
            <p className="text-xs text-white/50">{t.nowTitle}</p>
            <p className="mt-2 font-mono text-sm text-white/80">{t.nowLine1}</p>
            <p className="mt-1 font-mono text-sm text-white/70">{t.nowLine2}</p>
          </div>
        </div>
      </div>
    </section>
  );
}