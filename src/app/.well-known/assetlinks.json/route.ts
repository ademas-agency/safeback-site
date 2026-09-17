/**
 * Fichier `assetlinks.json` — le pendant Android de l'AASA d'Apple. C'est lui
 * qui permet à Android d'ouvrir `https://safe-back.fr/i/<code>` directement
 * dans l'app SafeBack quand elle est installée (« App Links » vérifiés).
 *
 * Servi par une route, comme l'AASA, pour fixer le `Content-Type` et garder
 * les empreintes commentées au même endroit.
 *
 * Exigences de Google, toutes bloquantes :
 *   - HTTPS, sans redirection, sans authentification ;
 *   - `Content-Type: application/json` ; l'URL GARDE son extension `.json`
 *     (contrairement au fichier Apple) ;
 *   - servi sur CHAQUE hôte déclaré dans le manifeste Android : `safe-back.fr`
 *     ET `www.safe-back.fr`. Android vérifie chacun séparément — un seul des
 *     deux publié, et la moitié des liens ouvre un navigateur.
 *
 * Vérification une fois en ligne :
 *   curl -s https://safe-back.fr/.well-known/assetlinks.json
 *   curl -s https://www.safe-back.fr/.well-known/assetlinks.json
 *   adb shell pm verify-app-links --re-verify fr.safeback.app
 *   adb shell pm get-app-links fr.safeback.app   → « verified » pour les deux hôtes
 */

// `applicationId` de l'app Android. Doit correspondre EXACTEMENT à celui de
// android/app/build.gradle.kts : Android compare le paquet installé à celui-ci,
// et n'ouvre les liens dans l'app qu'en cas d'égalité stricte.
const PACKAGE = "fr.safeback.app";

/**
 * Empreintes SHA-256 des certificats autorisés à revendiquer le domaine.
 * Plusieurs sont acceptées, une par clé légitime. Celle de la clé de
 * DÉBOGAGE n'y figure pas, volontairement : son mot de passe est public.
 */
const SHA256_FINGERPRINTS = [
  // Clé d'UPLOAD (safeback-upload.keystore, générée le 27/08/2026) : signe les
  // APK et bundles installés hors store, pour tester les invitations.
  "BF:22:9B:DC:7B:BE:98:BF:8F:A5:4A:6A:6E:8B:AC:BD:7C:BC:25:F3:E3:53:AD:48:E5:2D:E7:D2:4E:0A:2C:64",
  // Clé de SIGNATURE DE GOOGLE PLAY : c'est elle que voient les téléphones qui
  // installent depuis le store, Play resignant le binaire distribué. Lue dans
  // la Play Console (Tester et publier → Configuration → Signature de
  // l'application), fournie le 17/09/2026.
  "92:B6:94:5C:D9:12:4F:C6:E0:38:DB:41:60:2D:C6:F3:33:14:9F:D1:01:A1:F4:E1:FC:1C:06:A2:42:83:EA:BC",
  // Troisième clé demandée par Thomas (côté app) le 17/09/2026. Ce n'est ni
  // l'upload, ni Play, ni la clé de débogage du poste web : lui demander
  // laquelle c'est, et la retirer si c'est une clé de débogage (mot de passe
  // public), comme le recommande le README de l'app.
  "D8:42:9B:35:64:12:86:F7:07:F1:AA:5F:C8:3F:C8:1B:AA:E9:03:9F:DB:AD:88:F2:D4:65:94:6D:14:77:7F:FF",
];

const ASSETLINKS = [
  {
    relation: ["delegate_permission/common.handle_all_urls"],
    target: {
      namespace: "android_app",
      package_name: PACKAGE,
      sha256_cert_fingerprints: SHA256_FINGERPRINTS,
    },
  },
];

// Contenu fixe : prérendu au build, servi tel quel.
export const dynamic = "force-static";

export function GET() {
  return new Response(JSON.stringify(ASSETLINKS), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=300, must-revalidate",
    },
  });
}
