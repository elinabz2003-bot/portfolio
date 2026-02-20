"use client";

import Link from "next/link";
import { useLanguage } from "@/app/context/LanguageContext";

type ProjectStatus = "terminé" | "en_cours" | "académique";

type Project = {
  titleFr: string;
  titleEn: string;

  stack: string;
  status: ProjectStatus;

  dateFr?: string;
  dateEn?: string;

  descFr: string;
  descEn: string;

  tags: string[];

  github?: string;
  demo?: string;
};

const PROJECTS: Project[] = [
  {
    titleFr: "Client / Serveur TCP en C",
    titleEn: "TCP Client / Server in C",
    stack: "C • Sockets • Linux",
    status: "académique",
    dateFr: "2025",
    dateEn: "2025",
    descFr:
      "Implémentation d’un serveur TCP multi-client en C utilisant les sockets BSD. Gestion des connexions, envoi/réception de messages et gestion d’erreurs réseau.",
    descEn:
      "Implementation of a multi-client TCP server in C using BSD sockets. Connection handling, message send/receive, and network error management.",
    tags: ["C", "Sockets", "TCP", "Linux", "Network"],
    github: "https://github.com/ton-user/tcp-project",
  },

  {
    titleFr: "Lab OSPF & NAT (Simulation Réseau)",
    titleEn: "OSPF & NAT Lab (Network Simulation)",
    stack: "Cisco • Packet Tracer",
    status: "terminé",
    dateFr: "2025",
    dateEn: "2025",
    descFr:
      "Mise en place d’un réseau multi-routeurs avec OSPF, configuration VLAN, NAT, ACL et haute disponibilité WAN.",
    descEn:
      "Deployment of a multi-router network using OSPF, VLAN configuration, NAT, ACL, and WAN high availability.",
    tags: ["OSPF", "NAT", "ACL", "VLAN", "Routing"],
  },

  {
    titleFr: "Portfolio Next.js",
    titleEn: "Next.js Portfolio",
    stack: "Next.js • Tailwind • TypeScript",
    status: "en_cours",
    dateFr: "2026",
    dateEn: "2026",
    descFr:
      "Développement d’un portfolio moderne avec design glass futuriste, animations custom, disponibilité dynamique et gestion API contact.",
    descEn:
      "Development of a modern portfolio with futuristic glass design, custom animations, dynamic availability, and contact API integration.",
    tags: ["Next.js", "React", "Tailwind", "TypeScript"],
    github: "https://github.com/ton-user/portfolio",
  },
];

function statusBadge(status: ProjectStatus) {
  if (status === "terminé")
    return "border-emerald-300/20 bg-emerald-300/10 text-emerald-100";
  if (status === "en_cours")
    return "border-amber-300/20 bg-amber-300/10 text-amber-100";
  return "border-violet-300/20 bg-violet-300/10 text-violet-100";
}

function statusLabel(status: ProjectStatus, lang: "fr" | "en") {
  if (status === "terminé")
    return lang === "fr" ? "Terminé" : "Completed";
  if (status === "en_cours")
    return lang === "fr" ? "En cours" : "In progress";
  return lang === "fr" ? "Académique" : "Academic";
}

export default function ProjectsPage() {
  const { lang } = useLanguage();

  const countFinished = PROJECTS.filter(
    (p) => p.status === "terminé"
  ).length;

  const countOngoing = PROJECTS.filter(
    (p) => p.status === "en_cours"
  ).length;

  const countAcademic = PROJECTS.filter(
    (p) => p.status === "académique"
  ).length;

  return (
    <main className="min-h-screen bg-cosmic">
      <div className="pointer-events-none fixed inset-0 grid-overlay" />

      <div className="relative mx-auto max-w-6xl px-6 py-10">
        {/* HEADER */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-white">
              {lang === "fr" ? "Projets" : "Projects"}
            </h1>
          </div>

          <Link
            href="/"
            className="rounded-full px-4 py-2 text-sm font-semibold text-white/85 btn-soft"
          >
            ← {lang === "fr" ? "Retour" : "Back"}
          </Link>
        </div>

        {/* STATS */}
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="glass glow-hover p-5">
            <p className="text-xs text-white/50">
              {lang === "fr" ? "Terminés" : "Completed"}
            </p>
            <p className="mt-2 text-2xl font-semibold text-white/85">
              {countFinished}
            </p>
          </div>

          <div className="glass glow-hover p-5">
            <p className="text-xs text-white/50">
              {lang === "fr" ? "En cours" : "In progress"}
            </p>
            <p className="mt-2 text-2xl font-semibold text-white/85">
              {countOngoing}
            </p>
          </div>

          <div className="glass glow-hover p-5">
            <p className="text-xs text-white/50">
              {lang === "fr" ? "Académiques" : "Academic"}
            </p>
            <p className="mt-2 text-2xl font-semibold text-white/85">
              {countAcademic}
            </p>
          </div>
        </div>

        {/* LIST */}
        <section className="mt-10">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-white/90">
                {lang === "fr" ? "Liste" : "List"}
              </h2>
            </div>

            <span className="hidden rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/45 md:block">
              {lang === "fr"
                ? "mise à jour manuelle"
                : "manually updated"}
            </span>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {PROJECTS.map((p) => (
              <div
                key={p.titleFr}
                className="glass glow-hover p-6 border border-white/10"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-white/90">
                      {lang === "fr" ? p.titleFr : p.titleEn}
                    </p>

                    <div className="mt-2 h-px w-24 bg-gradient-to-r from-cyan-300/60 to-transparent" />

                    <p className="mt-2 text-xs text-white/50">
                      {p.stack}
                    </p>
                  </div>

                  <span
                    className={[
                      "shrink-0 rounded-full border px-3 py-1 text-[11px] font-semibold",
                      statusBadge(p.status),
                    ].join(" ")}
                  >
                    {statusLabel(p.status, lang)}
                  </span>
                </div>

                <p className="mt-4 text-sm text-white/65">
                  {lang === "fr" ? p.descFr : p.descEn}
                </p>

                <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-white/60">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1"
                    >
                      {t}
                    </span>
                  ))}

                  {(p.dateFr || p.dateEn) && (
                    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1">
                      {lang === "fr" ? p.dateFr : p.dateEn}
                    </span>
                  )}
                </div>

                <div className="mt-4 flex flex-wrap gap-3">
                  {p.github && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80 hover:bg-white/10"
                    >
                      GitHub →
                    </a>
                  )}

                  {p.demo && (
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-semibold text-cyan-100 hover:bg-cyan-300/15"
                    >
                      {lang === "fr" ? "Démo" : "Demo"} →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 text-xs text-white/40">
            {lang === "fr"
              ? "Les projets incluent des travaux académiques, des laboratoires réseau et des développements personnels."
              : "Projects include academic work, network labs, and personal developments."}
          </p>
        </section>
      </div>
    </main>
  );
}