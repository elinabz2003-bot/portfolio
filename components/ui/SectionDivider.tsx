type DividerAccent = "neutral" | "cyan" | "violet" | "pink";

interface Props {
  accent?: DividerAccent;
}

export default function SectionDivider({ accent = "cyan" }: Props) {
  const accentClass = {
    neutral: "via-white/12",
    cyan: "via-cyan-300/50",
    violet: "via-violet-400/50",
    pink: "via-pink-400/50",
  }[accent];

  const glowClass = {
    neutral: "",
    cyan: "shadow-[0_0_30px_rgba(34,211,238,0.25)]",
    violet: "shadow-[0_0_30px_rgba(167,139,250,0.25)]",
    pink: "shadow-[0_0_30px_rgba(244,114,182,0.25)]",
  }[accent];

  return (
    <div className="my-16 flex items-center gap-4">
      <div
        className={`h-px flex-1 bg-gradient-to-r from-transparent ${accentClass} to-transparent ${glowClass}`}
      />

      <div
        className={`h-2 w-2 rounded-full bg-cyan-300/70 ${glowClass} animate-pulse`}
      />

      <div
        className={`h-px flex-1 bg-gradient-to-r from-transparent ${accentClass} to-transparent ${glowClass}`}
      />
    </div>
  );
}
