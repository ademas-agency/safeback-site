"use client";

import { useSyncExternalStore } from "react";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/site";

export type Plateforme = "ios" | "android" | "autre";

function detecter(): Plateforme {
  const ua = navigator.userAgent;
  if (/Android/i.test(ua)) return "android";
  if (/iPhone|iPad|iPod/i.test(ua)) return "ios";
  return "autre";
}

// La plateforme ne change jamais en cours de page : rien à écouter.
const rien = () => () => {};

/**
 * Plateforme du téléphone qui lit la page, déduite du navigateur.
 *
 * Côté serveur on ne sait rien : on rend « ios », de loin le cas le plus
 * fréquent aujourd'hui, et le client corrige à l'hydratation sans
 * clignotement grâce à `useSyncExternalStore`.
 */
export function usePlateforme(): Plateforme {
  return useSyncExternalStore(rien, detecter, () => "ios");
}

/**
 * Où envoyer quelqu'un pour installer l'app, selon son téléphone.
 * `null` quand il n'existe pas encore de magasin pour sa plateforme : à
 * l'appelant d'afficher autre chose qu'un bouton, jamais un lien vers le
 * mauvais magasin.
 */
export function lienInstallation(plateforme: Plateforme): string | null {
  if (plateforme === "android") return PLAY_STORE_URL || null;
  return APP_STORE_URL;
}
