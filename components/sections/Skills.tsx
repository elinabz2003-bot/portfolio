"use client";

import { useLanguage } from "@/app/context/LanguageContext";

type Skill = {
  name: string;
  level: number;
  noteFr: string;
  noteEn: string;
  proof?: string[];
};

type SkillGroup = {
  titleFr: string;
  titleEn: string;
  subtitleFr: string;
  subtitleEn: string;
  accent: "cyan" | "violet" | "pink";
  skills: Skill[];
};

const GROUPS: SkillGroup[] = [
  {
    titleFr: "Cybersécurité",
    titleEn: "Cybersecurity",
    subtitleFr: "Hardening • audit • bonnes pratiques",
    subtitleEn: "Hardening • audit • best practices",
    accent: "violet",
    skills: [
      {
        name: "Hardening Linux",
        level: 75,
        noteFr: "users, perms, services, logs",
        noteEn: "users, permissions, services, logs",
        proof: ["TP Linux", "secure setup"],
      },
      {
        name: "Network Security",
        level: 70,
        noteFr: "ACL, filtrage, segmentation",
        noteEn: "ACL, filtering, segmentation",
        proof: ["labs", "firewall rules"],
      },
      {
        name: "Web basics",
        level: 55,
        noteFr: "OWASP, auth, validation d’input",
        noteEn: "OWASP, auth, input validation",
        proof: ["mini audits"],
      },
    ],
  },
  {
    titleFr: "Réseaux",
    titleEn: "Networking",
    subtitleFr: "Architecture • routage • troubleshooting",
    subtitleEn: "Architecture • routing • troubleshooting",
    accent: "cyan",
    skills: [
      {
        name: "TCP/IP",
        level: 80,
        noteFr: "subnetting, dépannage",
        noteEn: "subnetting, troubleshooting",
        proof: ["TP réseau"],
      },
      {
        name: "Routing (OSPF)",
        level: 70,
        noteFr: "topologies, convergence",
        noteEn: "topologies, convergence",
        proof: ["lab OSPF"],
      },
      {
        name: "Firewalls / NAT",
        level: 65,
        noteFr: "rules, NAT, filtrage",
        noteEn: "rules, NAT, filtering",
        proof: ["policy design"],
      },
    ],
  },
  {
    titleFr: "Développement",
    titleEn: "Development",
    subtitleFr: "Backend • code propre • data",
    subtitleEn: "Backend • clean code • data",
    accent: "pink",
    skills: [
      {
        name: "C (Sockets)",
        level: 75,
        noteFr: "client/serveur, multi-clients",
        noteEn: "client/server, multi-clients",
        proof: ["Secure TCP Server"],
      },
      {
        name: "Python",
        level: 70,
        noteFr: "automation, scripting",
        noteEn: "automation, scripting",
        proof: ["tools", "scripts"],
      },
      {
        name: "SQL",
        level: 65,
        noteFr: "requêtes, schéma, jointures",
        noteEn: "queries, schema, joins",
        proof: ["projets DB"],
      },
    ],
  },
];

function accentClass(accent: SkillGroup["accent"]) {
  switch (accent) {
    case "cyan":
      return "from-cyan-300/60 via-cyan-300/30 to-transparent";
    case "violet":
      return "from-violet-400/60 via-violet-400/30 to-transparent";
    case "pink":
      return "from-pink-400/50 via-pink-400/25 to-transparent";
  }
}

function accentBorder(accent: SkillGroup["accent"]) {
  switch (accent) {
    case "cyan":
      return "border-cyan-300/15";
    case "violet":
      return "border-violet-400/15";
    case "pink":
      return "border-pink-400/15";
  }
}

export default function Skills() {
  const { lang } = useLanguage();

  return (
    <section id="skills" className="mt-16">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-white/90">
            {lang === "fr" ? "Compétences" : "Skills"}
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-white/60">
            {lang === "fr"
              ? "Une vue claire de mes compétences + ce que j’ai déjà appliqué en TP / projets."
              : "A clear overview of my skills and what I’ve already applied in labs and projects."}
          </p>
        </div>

        <div className="hidden text-xs text-white/45 md:block">
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
            {lang === "fr" ? "échelle : 0 → 100" : "scale: 0 → 100"}
          </span>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {GROUPS.map((group) => (
          <div
            key={group.titleEn}
            className={`glass glow-hover p-6 border ${accentBorder(group.accent)}`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-white/85">
                  {lang === "fr" ? group.titleFr : group.titleEn}
                </p>
                <p className="mt-1 text-xs text-white/50">
                  {lang === "fr" ? group.subtitleFr : group.subtitleEn}
                </p>
              </div>

              <span className="text-[11px] text-white/40">
                {lang === "fr" ? "axe principal" : "core focus"}
              </span>
            </div>

            <div className="mt-5 grid gap-4">
              {group.skills.map((s) => (
                <div key={s.name}>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-white/80">{s.name}</p>
                    <p className="text-xs text-white/45">{s.level}%</p>
                  </div>

                  <div className="mt-2 h-2 rounded-full bg-white/5 border border-white/10 overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${accentClass(
                        group.accent
                      )}`}
                      style={{ width: `${s.level}%` }}
                    />
                  </div>

                  <p className="mt-1 text-xs text-white/45">
                    {lang === "fr" ? s.noteFr : s.noteEn}
                  </p>

                  {s.proof && s.proof.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {s.proof.map((p) => (
                        <span
                          key={p}
                          className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/60"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}