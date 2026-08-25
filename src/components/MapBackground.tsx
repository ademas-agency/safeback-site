"use client";

/* Trajet qui suit les routes : avenue x=66 (+ pont) → Rue de Rivoli → avenue x=132 → Grands Boulevards → domicile */
const ROUTE_PATH =
  "M66,398 L66,188 Q66,182 72,182 L126,182 Q132,182 132,176 L132,102 Q132,96 126,96 L116,96 Q110,96 110,90 L110,80";

export { ROUTE_PATH };

/* Terre nord / sud séparées par la Seine (centre y≈276) */
const NORTH_LAND = "M0,0 L264,0 L264,257 Q198,267 132,257 Q66,247 0,257 Z";
const SOUTH_LAND = "M0,295 Q66,285 132,295 Q198,305 264,295 L264,400 L0,400 Z";

export default function MapBackground({ showRoute = false, showFriends = true }: { showRoute?: boolean; showFriends?: boolean }) {
  const main = "rgba(255,255,255,0.1)";   // boulevards & avenues
  const sec = "rgba(255,255,255,0.06)";   // rues secondaires
  const park = "#0e1c17";                   // parcs (opaque, masque les rues)

  return (
    <svg viewBox="0 0 264 400" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <clipPath id="mbNorth">
          <path d={NORTH_LAND} />
        </clipPath>
        <clipPath id="mbSouth">
          <path d={SOUTH_LAND} />
        </clipPath>
      </defs>

      {/* Fond terre */}
      <rect width="264" height="400" fill="#0c1022" />

      {/* ═══════════ RIVE DROITE ═══════════ */}
      <g clipPath="url(#mbNorth)">
        {/* Rue secondaire du haut (un peu de travers, peu ondulée) */}
        <path d="M-4,34 Q88,46 176,50 Q228,52 268,58" stroke={sec} strokeWidth="2.6" fill="none" />

        {/* Grands boulevards horizontaux */}
        <path d="M-4,96 Q66,88 132,96 Q198,104 268,96" stroke={main} strokeWidth="5.5" fill="none" />
        <path d="M-4,182 Q66,177 132,182 Q198,187 268,182" stroke={main} strokeWidth="5" fill="none" />
      </g>

      {/* ═══════════ RIVE GAUCHE ═══════════ */}
      <g clipPath="url(#mbSouth)">
        {/* Boulevard Saint-Germain */}
        <path d="M-4,340 Q80,332 160,340 Q220,346 268,338" stroke={main} strokeWidth="5.5" fill="none" />
      </g>

      {/* ═══════════ SEINE ═══════════ */}
      <path d="M0,276 Q66,266 132,276 Q198,286 264,276" stroke="#0a1836" strokeWidth="32" fill="none" />
      <path d="M0,276 Q66,266 132,276 Q198,286 264,276" stroke="rgba(47,107,255,0.07)" strokeWidth="26" fill="none" />

      {/* Quais — routes qui longent les deux berges */}
      <path d="M0,258 Q66,248 132,258 Q198,268 264,258" stroke={sec} strokeWidth="2.4" fill="none" />
      <path d="M0,294 Q66,284 132,294 Q198,304 264,294" stroke={sec} strokeWidth="2.4" fill="none" />

      {/* Île de la Cité — centrée dans la Seine */}
      <path d="M104,274 Q120,267 132,266 Q144,267 160,274 Q157,286 132,288 Q107,286 104,274 Z" fill="#0c1022" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />

      {/* Nom de la rivière */}
      <text transform="rotate(-6, 16, 276)" x="16" y="276" fill="rgba(96,165,250,0.75)" fontSize="5.2" fontStyle="italic" fontWeight="500" letterSpacing="1.5" fontFamily="system-ui">Seine</text>

      {/* ═══════════ AVENUES VERTICALES = un seul trait continu (route → pont → route) ═══════════ */}
      <path d="M66,-4 Q63,80 66,160 Q69,240 66,320 Q64,380 66,402" stroke={main} strokeWidth="5.5" fill="none" />
      <path d="M132,-4 Q135,80 132,160 Q129,240 132,320 Q134,380 132,402" stroke={main} strokeWidth="4.6" fill="none" />
      <path d="M202,-4 Q205,80 202,160 Q199,240 202,320 Q204,380 202,402" stroke={main} strokeWidth="4.6" fill="none" />

      {/* ═══════════ PARCS (sobres, labels centrés) ═══════════ */}
      {/* Jardin des Tuileries */}
      <rect x="138" y="206" width="52" height="34" rx="4" fill={park} stroke="rgba(52,199,89,0.14)" strokeWidth="0.7" />
      <text x="164" y="225" textAnchor="middle" fill="rgba(120,220,150,0.45)" fontSize="4.6" fontWeight="500" fontFamily="system-ui" letterSpacing="0.3">Tuileries</text>

      {/* Jardin du Luxembourg */}
      <rect x="138" y="346" width="54" height="38" rx="5" fill={park} stroke="rgba(52,199,89,0.14)" strokeWidth="0.7" />
      <text x="165" y="367" textAnchor="middle" fill="rgba(120,220,150,0.45)" fontSize="4.4" fontWeight="500" fontFamily="system-ui" letterSpacing="0.2">Luxembourg</text>

      {/* ═══════════ NOMS DE RUES ═══════════ */}
      <text x="14" y="93" fill="rgba(255,255,255,0.28)" fontSize="5.2" fontWeight="600" letterSpacing="2" fontFamily="system-ui">GRANDS BOULEVARDS</text>
      <text x="128" y="179" fill="rgba(255,255,255,0.26)" fontSize="5" fontWeight="600" letterSpacing="1.8" fontFamily="system-ui">RUE DE RIVOLI</text>
      <text x="14" y="337" fill="rgba(255,255,255,0.26)" fontSize="5" fontWeight="600" letterSpacing="1.8" fontFamily="system-ui">BD SAINT-GERMAIN</text>
      <text transform="rotate(-88, 64, 250)" x="64" y="250" fill="rgba(255,255,255,0.24)" fontSize="4.6" fontWeight="600" letterSpacing="1.6" fontFamily="system-ui">BD ST-MICHEL</text>

      {/* Arrondissement */}
      <text x="212" y="150" fill="rgba(255,255,255,0.12)" fontSize="7" fontWeight="700" letterSpacing="1" fontFamily="system-ui">2E ARR.</text>

      {/* ═══════════ AMIS (personnages nommés, identiques sur toutes les cartes) ═══════════ */}
      {showFriends &&
        [
          { i: "M", name: "Malone", c: "#10B981", x: 90, y: 120 },
          { i: "J", name: "Jules", c: "#14B8A6", x: 210, y: 98 },
          { i: "F", name: "Felix", c: "#60A5FA", x: 44, y: 166 },
          { i: "J", name: "Julien", c: "#F59E0B", x: 214, y: 306 },
          { i: "L", name: "Liam", c: "#EC4899", x: 158, y: 47 },
        ].map((f) => (
          <g key={f.name}>
            <circle cx={f.x} cy={f.y} r="17" fill={f.c} opacity="0.12">
              <animate attributeName="r" values="15;20;15" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.12;0.05;0.12" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx={f.x} cy={f.y} r="12" fill={f.c} />
            <text x={f.x} y={f.y + 4} textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" fontFamily="system-ui">{f.i}</text>
            <text x={f.x} y={f.y + 23} textAnchor="middle" fill="white" fontSize="7" fontWeight="600" opacity="0.85" fontFamily="system-ui">{f.name}</text>
          </g>
        ))}

      {/* ═══════════ ROUTE ═══════════ */}
      {showRoute && (
        <>
          <path d={ROUTE_PATH} stroke="rgba(255,255,255,0.04)" strokeWidth="7" fill="none" strokeLinecap="round" />
          <circle cx="110" cy="75" r="14" fill="#7C3AED" />
          <path d="M110,68 L103,74 L104.5,74 L104.5,81 L108,81 L108,77.5 L112,77.5 L112,81 L115.5,81 L115.5,74 L117,74 Z" fill="white" />
        </>
      )}
    </svg>
  );
}
