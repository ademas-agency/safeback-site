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
 * Deux étages de détection, et ce n'est pas du luxe :
 *
 * 1. Côté serveur, d'après le navigateur annoncé : iPhone ou Android → le
 *    store, tout de suite, sans page intermédiaire.
 * 2. Sinon, une page minuscule qui refait la détection SUR L'APPAREIL et
 *    redirige elle-même. Parce que TikTok (et parfois Instagram) ne donne pas
 *    le lien au téléphone : leur serveur va chercher la page, comme un
 *    ordinateur, suit les redirections, et ouvre l'adresse FINALE dans le
 *    navigateur intégré. Avec une redirection serveur vers /telecharger, c'est
 *    /telecharger que la personne voyait — constaté par Louis le 14/10/2026.
 *    Une page qui répond 200 et redirige en JavaScript, elle, s'ouvre dans le
 *    navigateur du téléphone, où la détection trouve le bon store.
 *    Si vraiment rien n'est reconnu (un ordinateur), la page montre les deux
 *    boutons, avec la source conservée.
 *
 * Même rôle que go.lacachette.app, sans domaine ni infrastructure dédiés.
 * Aucun outil d'analyse tiers, aucun cookie : la seule trace est une ligne de
 * journal côté serveur (source + type d'appareil), sans adresse ni identifiant.
 */
export const dynamic = "force-dynamic";

export function GET(request: Request) {
  const url = new URL(request.url);
  const source = nettoyerSource(url.searchParams.get("via"));
  const appareil = detecterAppareil(request.headers.get("user-agent") ?? "");

  console.log(JSON.stringify({ evenement: "clic_lien_app", source, appareil }));

  if (appareil !== "autre") {
    // 307, pas 308 : un store ou un lien peut changer, et rien ne doit être
    // mémorisé par le navigateur.
    return NextResponse.redirect(lienStore(appareil, source), {
      status: 307,
      headers: { "Cache-Control": "no-store" },
    });
  }

  return new NextResponse(pageDeRepli(source), {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
  });
}

/** La page de secours : détection sur l'appareil, puis les deux boutons. */
function pageDeRepli(source: string): string {
  const android = lienStore("android", source);
  const ios = lienStore("ios", source);
  return `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>Safe Back</title>
<script>
(function () {
  var u = navigator.userAgent || "";
  // Un iPad récent se présente comme un Mac : le tactile le trahit.
  var ipad = navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
  if (/Android/i.test(u)) location.replace(${JSON.stringify(android)});
  else if (/iPhone|iPad|iPod/i.test(u) || ipad) location.replace(${JSON.stringify(ios)});
})();
</script>
<style>
  body{margin:0;min-height:100vh;display:grid;place-items:center;background:#0B1230;color:#fff;
       font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Inter,sans-serif;text-align:center;padding:24px}
  h1{font-size:1.5rem;margin:0 0 .5rem}
  p{color:rgba(255,255,255,.6);margin:0 0 1.5rem}
  a{display:block;margin:.6rem auto;max-width:320px;padding:1rem;border-radius:16px;background:#fff;color:#0B1230;
    font-weight:600;text-decoration:none}
</style>
</head>
<body>
  <div>
    <h1>Télécharger Safe Back</h1>
    <p>Choisis ton téléphone.</p>
    <a href="${ios}">iPhone · App Store</a>
    <a href="${android}">Android · Google Play</a>
  </div>
</body>
</html>`;
}
