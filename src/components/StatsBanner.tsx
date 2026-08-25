"use client";

const stats = [
  { value: "87%", label: "des femmes ont subi du harcèlement de rue" },
  { value: "52%", label: "des Français évitent certains lieux par peur" },
  { value: "72%", label: "des agressions ont lieu le soir ou la nuit" },
  { value: "66%", label: "des femmes ne se sentent pas en sécurité le soir" },
  { value: "44%", label: "des victimes ne portent pas plainte" },
];

export default function StatsBanner() {
  return (
    <div className="relative py-10 bg-[#0a0e1f] overflow-hidden">
      {/* Néon haut */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue to-transparent" />
      <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-blue/10 to-transparent blur-sm" />

      {/* Néon bas */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-violet to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-violet/10 to-transparent blur-sm" />

      <div className="absolute inset-0 bg-gradient-to-r from-blue/5 via-violet/5 to-blue/5" />

      {/* Bandeau défilant CSS */}
      <div className="relative z-10 flex [--gap:3.5rem]">
        <div className="flex shrink-0 items-center gap-[var(--gap)] animate-scroll">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-4 shrink-0">
              <span className="text-4xl md:text-5xl font-bold gradient-text whitespace-nowrap">
                {stat.value}
              </span>
              <span className="text-white/50 text-base md:text-lg whitespace-nowrap">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
        <div className="flex shrink-0 items-center gap-[var(--gap)] animate-scroll ml-[var(--gap)]" aria-hidden>
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-4 shrink-0">
              <span className="text-4xl md:text-5xl font-bold gradient-text whitespace-nowrap">
                {stat.value}
              </span>
              <span className="text-white/50 text-base md:text-lg whitespace-nowrap">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
