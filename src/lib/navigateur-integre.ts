"use client";

import { useSyncExternalStore } from "react";

/**
 * Nom de l'app dont le navigateur intégré affiche la page (Snapchat,
 * Instagram…), ou `null` dans un vrai navigateur.
 *
 * Ces navigateurs n'ouvrent pas les liens universels : un lien
 * `safe-back.fr/i/<code>` touché dans Snapchat reste dans Snapchat, même avec
 * l'app installée — alors que « Ouvrir dans le navigateur » l'ouvre bien.
 */
export function navigateurIntegre(ua: string): string | null {
  if (/Snapchat/i.test(ua)) return "Snapchat";
  if (/Instagram/i.test(ua)) return "Instagram";
  if (/MessengerForiOS|Orca-Android|\bMessenger\b/i.test(ua)) return "Messenger";
  if (/FBAN|FBAV|FB_IAB|FBIOS|FB4A/i.test(ua)) return "Facebook";
  if (/musical_ly|BytedanceWebview|TikTok|trill/i.test(ua)) return "TikTok";
  if (/LinkedInApp/i.test(ua)) return "LinkedIn";
  if (/Pinterest/i.test(ua)) return "Pinterest";
  if (/\bLine\//i.test(ua)) return "Line";
  return null;
}

const rien = () => () => {};

/** Côté serveur : `null` (vrai navigateur), corrigé à l'hydratation. */
export function useNavigateurIntegre(): string | null {
  return useSyncExternalStore(rien, () => navigateurIntegre(navigator.userAgent), () => null);
}
