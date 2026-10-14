import { NextResponse } from "next/server";
import { detecterAppareil, lienStore, nettoyerSource } from "@/lib/lien-store";

/**
 * Le lien universel : `https://safe-back.fr/app?via=<source>` (alias `/go`).
 *
 * Un seul lien à partager, qui envoie chaque téléphone vers SON store en lui
 * transmettant d'où vient la personne : `?via=instagram`, `?via=tiktok`,
 * `?via=facebook`, ou n'importe quel mot court décidé le jour même — un
 * influenceur, un bar partenaire. Rien à déclarer ici : la source est libre.
 * Les stores comptent ensuite les installations par source (Play Console,
 * rapports d'acquisition ; App Store Connect, App Analytics → Campagnes).
 *
 * Même rôle que go.lacachette.app, sans domaine ni infrastructure dédiés.
 *
 * Aucun outil d'analyse tiers, aucun cookie : la seule trace est une ligne de
 * journal côté serveur (source + type d'appareil), sans adresse ni identifiant.
 */
export const dynamic = "force-dynamic";

export function GET(request: Request) {
  const url = new URL(request.url);
  const source = nettoyerSource(url.searchParams.get("via"));
  const appareil = detecterAppareil(request.headers.get("user-agent") ?? "");
  const destination = lienStore(appareil, source);

  console.log(JSON.stringify({ evenement: "clic_lien_app", source, appareil }));

  // 307, pas 308 : un store ou un lien peut changer, et rien ne doit être
  // mémorisé par le navigateur.
  return NextResponse.redirect(new URL(destination, url.origin), {
    status: 307,
    headers: { "Cache-Control": "no-store" },
  });
}
