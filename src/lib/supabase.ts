/**
 * Accès public à Supabase depuis le navigateur.
 *
 * La clé ci-dessous est la clé « publishable » du projet : elle est faite pour
 * être embarquée côté client (l'app iOS l'embarque aussi). Elle ne donne accès
 * qu'à ce que les règles de sécurité de la base autorisent — ici, la seule
 * fonction `suivre_alerte`, qui ne révèle une position que tant qu'une alerte
 * est ouverte.
 *
 * Les deux valeurs peuvent être remplacées chez l'hébergeur si le projet
 * Supabase change ; sans variable, celles du projet actuel s'appliquent, pour
 * qu'un lien d'alerte ne tombe jamais sur une page cassée.
 */
export const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "") ||
  "https://weicxlefdrvpxbsdqhwo.supabase.co";

export const SUPABASE_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim() ||
  "sb_publishable_WL6dTq4mL76Z6fYxHat1jw_tcABjrlQ";

/** Ce que renvoie `suivre_alerte` pour une alerte existante. */
export type Alerte = {
  user_id: string;
  full_name: string | null;
  /** Position : renseignée SEULEMENT tant que l'alerte est en cours. */
  latitude: number | null;
  longitude: number | null;
  en_cours: boolean;
  /** Heure du dernier relevé de position ; null si aucun relevé, ou alerte close. */
  mise_a_jour: string | null;
};

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function estUnIdentifiantAlerte(id: string): boolean {
  return UUID.test(id);
}

/**
 * Interroge la fonction `suivre_alerte`.
 *
 * Renvoie `null` si aucune alerte ne porte cet identifiant. Lève une erreur
 * en cas de problème réseau ou de réponse inattendue : à l'appelant de garder
 * la dernière position connue plutôt que d'afficher un écran vide.
 */
export async function suivreAlerte(id: string, signal?: AbortSignal): Promise<Alerte | null> {
  const r = await fetch(`${SUPABASE_URL}/rest/v1/rpc/suivre_alerte`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_PUBLISHABLE_KEY,
      Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ p_alerte: id }),
    cache: "no-store",
    signal,
  });
  if (!r.ok) throw new Error(`suivre_alerte : HTTP ${r.status}`);
  const rows: unknown = await r.json();
  if (!Array.isArray(rows)) throw new Error("suivre_alerte : réponse inattendue");
  return (rows[0] as Alerte | undefined) ?? null;
}
