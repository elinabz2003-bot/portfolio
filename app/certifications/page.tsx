"use client";

import Link from "next/link";
import { useLanguage } from "@/app/context/LanguageContext";

type CertStatus = "obtenue" | "en_cours" | "prévue";

type Certification = {
  title: string;
  org: string;
  status: CertStatus;

  dateFr?: string;
  dateEn?: string;
  descFr: string;
  descEn: string;

  tags: string[];
  image?: string;
  proof?: {
    labelFr: string;
    labelEn: string;
    href: string;
  };
};

const CERTS: Certification[] = [
  {
    title: "Google Cybersecurity (Professional Certificate)",
    org: "Coursera • Google",
    status: "obtenue",
    dateFr: "Juin 2025",
    dateEn: "Jun 2025",
    descFr:
      "Spécialisation Google Cybersecurity : bases sécurité, gestion des risques, SIEM, IDS, Linux, SQL, Python et bonnes pratiques pour l’analyse et la réponse aux incidents.",
    descEn:
      "Google Cybersecurity specialization: security foundations, risk management, SIEM, IDS, Linux, SQL, Python, and best practices for incident analysis and incident response.",
    tags: [
      "Security foundations",
      "Risk management",
      "SIEM",
      "IDS",
      "Linux",
      "SQL",
      "Python",
      "Incident response",
    ],
    image: "/certs/googlecyber.jpg",
    proof: {
      labelFr: "Voir certificat (Coursera)",
      labelEn: "View certificate (Coursera)",
      href: "https://www.coursera.org/account/accomplishments/specialization/U3COCQFSX1XU",
    },
  },

  {
    title: "Learning AI Through Visualization",
    org: "Columbia University • Columbia+",
    status: "obtenue",
    dateFr: "Juin 2025",
    dateEn: "Jun 2025",
    descFr:
      "Cours en ligne sur les concepts d’Intelligence Artificielle expliqués via la visualisation : compréhension des modèles, interprétation des données et approche pédagogique des systèmes IA.",
    descEn:
      "Online course on Artificial Intelligence concepts taught through visualization: understanding models, interpreting data, and a teaching-oriented approach to AI systems.",
    tags: ["Artificial Intelligence", "Data Visualization", "AI concepts", "Model interpretation"],
    image: "/certs/IA.png",
    proof: {
      labelFr: "Voir badge officiel (Columbia+)",
      labelEn: "View official badge (Columbia+)",
      href: "https://badges.plus.columbia.edu/a2965cba-ca25-4404-a0f1-39a563f6c07e#acc.ZxGqXQfc",
    },
  },

  {
    title: "CCNA: Introduction to Networks",
    org: "Cisco Networking Academy",
    status: "obtenue",
    dateFr: "Janvier 2025",
    dateEn: "Jan 2025",
    descFr:
      "Fondamentaux réseaux : TCP/IP, adressage IP, Ethernet, subnetting, configuration de base et connectivité LAN/accès distant (labs Packet Tracer).",
    descEn:
      "Networking fundamentals: TCP/IP, IP addressing, Ethernet, subnetting, basic configuration, and LAN/remote connectivity (Packet Tracer labs).",
    tags: [
      "TCP/IP",
      "IPv4 / IPv6",
      "Subnetting",
      "Ethernet",
      "Routing basics",
      "Packet Tracer",
    ],
    image: "/certs/CCNA1.png",
    proof: {
      labelFr: "Voir badge officiel (Credly)",
      labelEn: "View official badge (Credly)",
      href: "https://www.credly.com/badges/100b59b9-aac4-4699-8884-262664e990e6/linked_in_profile",
    },
  },

  {
    title: "Linux Fundamentals",
    org: "Coursera • LearnQuest",
    status: "obtenue",
    dateFr: "Janvier 2023",
    dateEn: "Jan 2023",
    descFr:
      "Cours Linux Fundamentals (16h environ) : systèmes d’exploitation, gestion des services, ligne de commande, serveurs web, MySQL et bases d’automatisation IT.",
    descEn:
      "Linux Fundamentals course (~16 hours): operating systems, service management, command line, web servers, MySQL, and IT automation basics.",
    tags: [
      "Linux",
      "CLI",
      "Operating Systems",
      "Service Management",
      "Web Servers",
      "MySQL",
      "Automation",
    ],
    image: "/certs/linux.jpg",
    proof: {
      labelFr: "Voir certificat (Coursera)",
      labelEn: "View certificate (Coursera)",
      href: "https://www.coursera.org/account/accomplishments/verify/J97Q9K8HV7A9",
    },
  },

  {
    title: "Fondements des réseaux informatiques (Network+)",
    org: "Jihad Daneshgahi Tehran",
    status: "obtenue",
    dateFr: "Septembre 2022",
    dateEn: "Sep 2022",
    descFr:
      "Formation spécialisée de 30 heures en fondamentaux des réseaux informatiques, validée avec la note maximale de 100/100.",
    descEn:
      "Specialized 30-hour training in computer networking fundamentals, completed with the maximum grade (100/100).",
    tags: ["Network fundamentals", "30h training", "Topology", "Network protocols", "100/100"],
    image: "/certs/network-jtehran.png",
    proof: {
      labelFr: "Voir certificat",
      labelEn: "View certificate",
      href: "/certs/network-jtehran.png",
    },
  },

  {
    title: "Programmation en Python (60h)",
    org: "Jihad Daneshgahi Tehran",
    status: "obtenue",
    dateFr: "Novembre 2022",
    dateEn: "Nov 2022",
    descFr:
      "Formation de 60 heures en programmation Python (8h théorie + 52h pratique), validée avec une note de 95/100. Certificat traduit et cacheté.",
    descEn:
      "60-hour Python programming training (8h theory + 52h practice), completed with a grade of 95/100. Certificate translated and stamped.",
    tags: ["Python", "Programming", "60h", "Practice", "95/100"],
    image: "/certs/python-jtehran.png",
    proof: {
      labelFr: "Voir certificat",
      labelEn: "View certificate",
      href: "/certs/python-jtehran.png",
    },
  },

  {
    title: "CCNA 200-301 (Exam)",
    org: "Cisco",
    status: "en_cours",
    dateFr: "Objectif : 2026",
    dateEn: "Target: 2026",
    descFr:
      "Préparation à l’examen officiel CCNA 200-301 : routing & switching, VLAN, OSPF, NAT, ACL, sécurité réseau, troubleshooting.",
    descEn:
      "Preparation for the official CCNA 200-301 exam: routing & switching, VLANs, OSPF, NAT, ACLs, network security, and troubleshooting.",
    tags: ["Routing", "Switching", "VLAN", "OSPF", "ACL", "NAT", "Network Security"],
    proof: { labelFr: "Examen en préparation", labelEn: "Exam in preparation", href: "#" },
  },

  {
    title: "Introduction to Cybersecurity",
    org: "Cisco Networking Academy",
    status: "prévue",
    dateFr: "2026",
    dateEn: "2026",
    descFr:
      "Fondamentaux cybersécurité : menaces, bonnes pratiques, sensibilisation.",
    descEn:
      "Cybersecurity fundamentals: threats, best practices, and awareness.",
    tags: ["Cyber", "Best practices", "Risk"],
    proof: { labelFr: "Attestation", labelEn: "Certificate", href: "#" },
  },
];

function statusBadge(status: CertStatus) {
  if (status === "obtenue") return "border-emerald-300/20 bg-emerald-300/10 text-emerald-100";
  if (status === "en_cours") return "border-amber-300/20 bg-amber-300/10 text-amber-100";
  return "border-white/10 bg-white/5 text-white/70";
}

function statusLabel(status: CertStatus, lang: "fr" | "en") {
  if (status === "obtenue") return lang === "fr" ? "Obtenue" : "Completed";
  if (status === "en_cours") return lang === "fr" ? "En cours" : "In progress";
  return lang === "fr" ? "Prévue" : "Planned";
}

export default function CertificationsPage() {
  const { lang } = useLanguage();

  const countObtenues = CERTS.filter((c) => c.status === "obtenue").length;
  const countEnCours = CERTS.filter((c) => c.status === "en_cours").length;
  const countPrevues = CERTS.filter((c) => c.status === "prévue").length;

  return (
    <main className="min-h-screen bg-cosmic">
      <div className="pointer-events-none fixed inset-0 grid-overlay" />

      <div className="relative mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-white">
              {lang === "fr" ? "Certifications" : "Certifications"}
            </h1>
          </div>

          <Link
            href="/"
            className="rounded-full px-4 py-2 text-sm font-semibold text-white/85 btn-soft"
          >
            ← {lang === "fr" ? "Retour" : "Back"}
          </Link>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="glass glow-hover p-5">
            <p className="text-xs text-white/50">
              {lang === "fr" ? "Obtenues" : "Completed"}
            </p>
            <p className="mt-2 text-2xl font-semibold text-white/85">{countObtenues}</p>
          </div>

          <div className="glass glow-hover p-5">
            <p className="text-xs text-white/50">
              {lang === "fr" ? "En cours" : "In progress"}
            </p>
            <p className="mt-2 text-2xl font-semibold text-white/85">{countEnCours}</p>
          </div>

          <div className="glass glow-hover p-5">
            <p className="text-xs text-white/50">
              {lang === "fr" ? "Prévues" : "Planned"}
            </p>
            <p className="mt-2 text-2xl font-semibold text-white/85">{countPrevues}</p>
          </div>
        </div>

        <section className="mt-10">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-white/90">
                {lang === "fr" ? "Liste" : "List"}
              </h2>
            </div>

            <span className="hidden rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/45 md:block">
              {lang === "fr" ? "mise à jour manuelle" : "manually updated"}
            </span>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {CERTS.map((c) => (
              <div
                key={c.title}
                className="glass glow-hover p-6 border border-white/10"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-white/90">{c.title}</p>

                    <div className="mt-2 h-px w-24 bg-gradient-to-r from-cyan-300/60 to-transparent" />

                    <p className="mt-2 text-xs text-white/50">{c.org}</p>
                  </div>

                  <span
                    className={[
                      "shrink-0 rounded-full border px-3 py-1 text-[11px] font-semibold",
                      statusBadge(c.status),
                    ].join(" ")}
                  >
                    {statusLabel(c.status, lang)}
                  </span>
                </div>

                {c.image ? (
                  <div className="mt-4 flex items-center gap-4">
                    <img
                      src={c.image}
                      alt={c.title}
                      className="h-20 w-20 rounded-xl border border-white/10 bg-white/5 object-cover"
                      loading="lazy"
                    />
                    <p className="text-sm text-white/65">
                      {lang === "fr" ? c.descFr : c.descEn}
                    </p>
                  </div>
                ) : (
                  <p className="mt-3 text-sm text-white/65">
                    {lang === "fr" ? c.descFr : c.descEn}
                  </p>
                )}

                <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-white/60">
                  {c.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1"
                    >
                      {t}
                    </span>
                  ))}

                  {(c.dateFr || c.dateEn) && (
                    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1">
                      {lang === "fr" ? c.dateFr : c.dateEn}
                    </span>
                  )}
                </div>

                {c.proof?.href && c.proof.href !== "#" ? (
                  <div className="mt-4">
                    <a
                      href={c.proof.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-semibold text-cyan-100 hover:bg-cyan-300/15"
                    >
                      {lang === "fr" ? c.proof.labelFr : c.proof.labelEn} →
                    </a>
                  </div>
                ) : (
                  <p className="mt-4 text-xs text-white/40">
                    {lang === "fr" ? "Preuve : prochainement" : "Proof: coming soon"}
                  </p>
                )}
              </div>
            ))}
          </div>

          <p className="mt-8 text-xs text-white/40">
            {lang === "fr"
              ? "Note : Les preuves sont fournies via PDF, badge ou lien public vérifiable."
              : "Note: Proof is provided via PDF, badge, or a publicly verifiable link."}
          </p>
        </section>
      </div>
    </main>
  );
}