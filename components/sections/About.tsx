"use client";

import { useLanguage } from "@/app/context/LanguageContext";

export default function About() {
  const { lang } = useLanguage();

  const t = {
    title: "About",

    p1:
      lang === "fr"
        ? "Je suis actuellement étudiante en 3e année d’informatique au CERI (Centre d’Enseignement et de Recherche en Informatique) de l’Université d’Avignon. J’ai acquis une base solide grâce à des cours variés et des projets pratiques qui m’ont permis de progresser dans plusieurs domaines techniques."
        : "I’m currently a third-year Computer Science student at CERI (Centre for Teaching and Research in Computer Science), University of Avignon. I’ve built a strong foundation through a wide range of courses and hands-on projects that helped me grow across multiple technical areas.",

    p2:
      lang === "fr"
        ? "Même si je touche à différents aspects de l’informatique, je suis particulièrement attirée par la cybersécurité, les réseaux et le développement (back-end & front-end). J’aime analyser, comprendre et construire des solutions fiables, claires et bien documentées."
        : "While I explore different areas of computer science, I’m especially drawn to cybersecurity, networking, and development (back-end & front-end). I enjoy analyzing, understanding, and building solutions that are reliable, clear, and well documented.",

    p3a:
      lang === "fr"
        ? "Aujourd’hui je suis à la recherche d’une "
        : "I’m currently looking for a ",
    p3strong:
      lang === "fr"
        ? "alternance pour la rentrée 2026/2027"
        : "work-study position starting in 2026/2027",
    p3b:
      lang === "fr"
        ? " afin de renforcer mes compétences sur des projets réels. À long terme, je souhaite intégrer un Master orienté cybersécurité, réseaux ou développement pour continuer à approfondir mes connaissances techniques."
        : " to strengthen my skills on real-world projects. In the long term, I plan to pursue a Master’s degree focused on cybersecurity, networking, or software development to keep deepening my technical expertise.",

    snapshot: "Profile",
    chip: "snapshot",

    whoamiResult:
      lang === "fr" ? "Étudiante en informatique (L3)" : "Computer Science student (3rd year)",

    educationValue:
      lang === "fr"
        ? "3e année Informatique — CERI, Université d’Avignon"
        : "3rd-year Computer Science — CERI, University of Avignon",

    interestsValue:
      lang === "fr"
        ? "cybersécurité • réseaux • développement (front + back)"
        : "cybersecurity • networking • development (front + back)",

    goalValue:
      lang === "fr"
        ? "alternance 2026/2027 → puis master (cyber • réseau • dev)"
        : "work-study 2026/2027 → then a Master’s (cyber • network • dev)",

    workStyleValue:
      lang === "fr"
        ? "méthodique • orientée résultats • documentation soignée"
        : "methodical • results-oriented • polished documentation",
  };

  return (
    <section id="about" className="mt-20">
      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold text-white/90">{t.title}</h2>

          <p className="mt-4 leading-relaxed text-white/65">{t.p1}</p>

          <p className="mt-4 leading-relaxed text-white/65">{t.p2}</p>

          <p className="mt-4 leading-relaxed text-white/65">
            {t.p3a}
            <strong>{t.p3strong}</strong>
            {t.p3b}
          </p>
        </div>

        <div className="glass glow-hover p-6">
          <p className="text-sm font-semibold text-white/85">{t.snapshot}</p>

          <div className="mt-5 rounded-2xl border border-white/10 bg-black/40 p-4 terminal-scanline">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-300/80" />
                <span className="ml-2 text-[11px] text-white/45">
                  elina@ceri:~ (profile)
                </span>
              </div>

              <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/55">
                {t.chip}
              </span>
            </div>

            <div className="mt-4 space-y-3 font-mono text-[13px] leading-relaxed">
              <div className="text-white/80">
                <span className="text-cyan-200/90">elina@ceri</span>
                <span className="text-white/50">:</span>
                <span className="text-violet-200/80">~</span>
                <span className="text-white/50">$</span>{" "}
                <span className="text-white/80">whoami</span>{" "}
                <span className="tx-cursor">▍</span>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-white/75">
                {t.whoamiResult}
              </div>

              <div className="text-white/80">
                <span className="text-cyan-200/90">elina@ceri</span>
                <span className="text-white/50">:</span>
                <span className="text-violet-200/80">~</span>
                <span className="text-white/50">$</span>{" "}
                <span className="text-white/80">cat profile.json</span>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-white/75">
                <div>
                  <span className="text-white/50">education</span>
                  <span className="text-white/40">:</span>{" "}
                  <span>{t.educationValue}</span>
                </div>

                <div className="mt-1">
                  <span className="text-white/50">interests</span>
                  <span className="text-white/40">:</span>{" "}
                  <span>{t.interestsValue}</span>
                </div>

                <div className="mt-1">
                  <span className="text-white/50">goal</span>
                  <span className="text-white/40">:</span>{" "}
                  <span>{t.goalValue}</span>
                </div>

                <div className="mt-1">
                  <span className="text-white/50">work_style</span>
                  <span className="text-white/40">:</span>{" "}
                  <span>{t.workStyleValue}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}