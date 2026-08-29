import { NextResponse } from "next/server";

/**
 * Réception des formulaires Contact et Partenaire.
 *
 * Les deux formulaires étaient des maquettes : ils attendaient 1,5 s puis
 * affichaient « envoyé » sans rien transmettre. Un établissement qui remplissait
 * le formulaire partenaire croyait avoir été reçu, et personne ne recevait rien.
 *
 * Cette route envoie réellement, via Resend. Elle exige deux variables
 * d'environnement — à définir chez l'hébergeur :
 *
 *   RESEND_API_KEY   clé d'API Resend (resend.com, gratuit jusqu'à 3 000 envois/mois)
 *   CONTACT_TO       adresse qui reçoit les messages
 *   CONTACT_FROM     adresse expéditrice — DOIT être sur un domaine vérifié dans
 *                    Resend, sinon l'envoi est refusé
 *
 * TANT QU'ELLES SONT ABSENTES, la route répond 503 et le formulaire affiche une
 * erreur honnête invitant à écrire directement. C'est délibéré : mieux vaut dire
 * « ça n'a pas marché » que de laisser croire à un envoi qui n'a pas eu lieu.
 */

const MAX = 5000;

type Payload = Record<string, string>;

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const email = (body.email || "").trim();
  const message = (body.message || "").trim();
  const sujet = (body.sujet || "Message depuis le site").trim();

  // Validation minimale côté serveur : le navigateur peut être contourné.
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return NextResponse.json({ error: "Adresse e-mail invalide." }, { status: 400 });
  }
  if (message.length > MAX) {
    return NextResponse.json({ error: "Message trop long." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  // L'expéditeur doit appartenir à un domaine vérifié dans Resend. Il était codé
  // en dur sur « safeback.fr » — sans tiret — qui n'est PAS notre domaine (il
  // appartient à un tiers). Resend aurait refusé chaque envoi.
  const from = process.env.CONTACT_FROM || "SafeBack <contact@safe-back.com>";
  if (!apiKey || !to) {
    console.error("Formulaire : RESEND_API_KEY ou CONTACT_TO absent — rien n'a été envoyé.");
    return NextResponse.json(
      { error: "L'envoi n'est pas encore configuré. Écrivez-nous directement." },
      { status: 503 },
    );
  }

  // Toutes les valeurs reçues sont recopiées : les deux formulaires n'ont pas les
  // mêmes champs, et on ne veut pas perdre une information au passage.
  const lignes = Object.entries(body)
    .filter(([, v]) => typeof v === "string" && v.trim() !== "")
    .map(([k, v]) => `${k} : ${v}`)
    .join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `[Site] ${sujet}`,
        text: lignes,
      }),
    });
    if (!res.ok) {
      console.error("Resend a refusé l'envoi :", res.status, await res.text());
      return NextResponse.json({ error: "L'envoi a échoué. Réessayez." }, { status: 502 });
    }
  } catch (e) {
    console.error("Resend injoignable :", e);
    return NextResponse.json({ error: "L'envoi a échoué. Réessayez." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
