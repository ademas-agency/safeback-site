/**
 * Fichier `apple-app-site-association` (AASA) — ce qui permet à iOS d'ouvrir
 * `https://safe-back.fr/i/<code>` et `https://safe-back.fr/a/<id>` directement
 * dans l'app SafeBack quand elle est installée, au lieu d'afficher la page web.
 *
 * Servi par une route plutôt que déposé dans `public/` : Apple exige un
 * `Content-Type: application/json` sur une URL SANS extension `.json`, et un
 * fichier statique sans extension part chez l'hébergeur avec un type de contenu
 * imprévisible. Ici, l'en-tête est fixé explicitement.
 *
 * Les trois exigences d'Apple, toutes bloquantes :
 *   - HTTPS, sans redirection (une 301 vers `www` suffit à tout casser) ;
 *   - `Content-Type: application/json`, pas de `.json` dans l'URL ;
 *   - accessible sans authentification.
 *
 * Vérification une fois en ligne :
 *   curl -sI https://safe-back.fr/.well-known/apple-app-site-association
 *
 * Apple met ce fichier en cache côté appareil : après une correction, il faut
 * désinstaller puis réinstaller l'app pour forcer une nouvelle lecture.
 */

// Identifiant d'équipe Apple + bundle de l'app, tels que déclarés dans Xcode.
const APP_ID = "CRL3QPB532.com.safeback.SafeBack";

const AASA = {
  applinks: {
    details: [
      {
        appIDs: [APP_ID],
        components: [
          // Seuls ces deux chemins ouvrent l'app. Le reste du site (accueil,
          // offres, CGU…) doit continuer à s'afficher dans Safari.
          {
            "/": "/i/*",
            comment:
              "Lien d'invitation personnel : ouvre l'app si elle est installée.",
          },
          {
            "/": "/a/*",
            comment:
              "Lien d'une alerte : ouvre l'app sur la personne en difficulté.",
          },
        ],
      },
    ],
  },
};

// Contenu fixe : on le laisse prérendre au build, il sera servi tel quel.
export const dynamic = "force-static";

export function GET() {
  return new Response(JSON.stringify(AASA), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      // Cinq minutes : ces fichiers changent au fil des clés et des chemins, et
      // un cache intermédiaire d'une heure a déjà fait voir un fichier périmé.
      // Apple et Google gardent de toute façon leur propre copie.
      "Cache-Control": "public, max-age=300, must-revalidate",
    },
  });
}
