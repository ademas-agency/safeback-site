"use client";

export function TopBar() {
  return (
    <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-3 py-2">
      <div className="flex items-center gap-1">
        <svg width="16" height="16" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="11" fill="#2F6BFF" />
          <path d="M7.5 12.5l3 3 6-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
        <span className="text-[10px] font-extrabold tracking-wide">
          <span className="text-white">SAFE</span>
          <span className="text-lavande">BACK</span>
        </span>
      </div>
      <div className="w-[30px] h-[30px] rounded-full bg-blue flex items-center justify-center">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </div>
    </div>
  );
}

export function TabBar({ active = "carte" }: { active?: "carte" | "alerte" }) {
  const carte = active === "carte";
  const alerte = active === "alerte";
  return (
    <div className="flex items-center justify-around px-6 pb-5 pt-1 bg-[#0B1230] border-t border-white/[0.04] shrink-0">
      <div className="flex flex-col items-center gap-[2px]">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={carte ? "#3B82F6" : "rgba(255,255,255,0.3)"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
          <line x1="8" y1="2" x2="8" y2="18" />
          <line x1="16" y1="6" x2="16" y2="22" />
        </svg>
        <span className={`text-[8px] ${carte ? "text-blue font-semibold" : "text-white/30"}`}>Carte</span>
      </div>
      <div className="flex flex-col items-center gap-[2px]">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={alerte ? "#7C3AED" : "rgba(255,255,255,0.3)"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <span className={`text-[8px] ${alerte ? "text-lavande font-semibold" : "text-white/30"}`}>Alerte</span>
      </div>
    </div>
  );
}
