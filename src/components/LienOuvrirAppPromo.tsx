"use client";

import { usePlateforme } from "@/lib/plateforme";
import { lienSchema } from "@/components/LienOuvrirApp";

/** « Tu as déjà l'app ? » — ouvre l'app en lui confiant le code promo. */
export default function LienOuvrirAppPromo({ code }: { code: string }) {
  const plateforme = usePlateforme();
  return (
    <a href={lienSchema(plateforme, "promo", code)} className="text-white font-semibold underline underline-offset-4 hover:text-lavande">
      Ouvrir Safe Back avec le code
    </a>
  );
}
