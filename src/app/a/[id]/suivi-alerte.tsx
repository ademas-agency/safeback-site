"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { APP_DOWNLOAD_URL } from "@/lib/site";
import { estUnIdentifiantAlerte, suivreAlerte, type Alerte } from "@/lib/supabase";

/** Cadence de rafraîchissement tant que l'alerte est ouverte. */
const INTERVALLE_MS = 15_000;

/** Au-delà, la position affichée est signalée comme possiblement ancienne. */
const RELEVE_ANCIEN_MS = 5 * 60_000;

type Etat =
  | { statut: "chargement" }
  // Aucune alerte ne porte cet identifiant, ou l'identifiant est malformé.
  | { statut: "introuvable" }
  // Le réseau a lâché avant la première réponse : rien à montrer encore.
  | { statut: "erreur" }
  | { statut: "ok"; alerte: Alerte; horsLigne: boolean };

/**
 * La page vivante : interroge `suivre_alerte`, affiche la position tant que
 * l'alerte est ouverte, et dit que tout va bien dès qu'elle est close.
 *
 * Une fois une position obtenue, une erreur réseau ne l'efface jamais : on
 * garde la dernière connue, signalée comme telle, et on réessaie au tick
 * suivant. Face à une urgence, une position de 30 secondes vaut mieux qu'un
 * message d'erreur.
 */
export default function SuiviAlerte({ id }: { id: string }) {
  const [etat, setEtat] = useState<Etat>(() =>
    estUnIdentifiantAlerte(id) ? { statut: "chargement" } : { statut: "introuvable" },
  );
  // Horloge pour recalculer « il y a X min » sans attendre la prochaine réponse.
  const [maintenant, setMaintenant] = useState(() => Date.now());
  const enCours = useRef(false);

  const rafraichir = useCallback(async () => {
    if (enCours.current) return;
    enCours.current = true;
    try {
      const alerte = await suivreAlerte(id);
      setEtat(alerte ? { statut: "ok", alerte, horsLigne: false } : { statut: "introuvable" });
    } catch {
      setEtat((e) => (e.statut === "ok" ? { ...e, horsLigne: true } : { statut: "erreur" }));
    } finally {
      enCours.current = false;
      setMaintenant(Date.now());
    }
  }, [id]);

  const termine = etat.statut === "ok" && !etat.alerte.en_cours;
  const actif = etat.statut !== "introuvable" && !termine;

  useEffect(() => {
    if (!actif) return;
    // Premier appel décalé d'un tick : la règle react-hooks/set-state-in-effect
    // ne distingue pas un setState après `await` d'un setState synchrone.
    const t0 = setTimeout(rafraichir, 0);
    const t = setInterval(rafraichir, INTERVALLE_MS);
    // Retour sur l'onglet après un appel ou un passage dans l'app de cartes :
    // on ne fait pas attendre 15 s pour la position à jour.
    const surRetour = () => {
      if (document.visibilityState === "visible") void rafraichir();
    };
    document.addEventListener("visibilitychange", surRetour);
    return () => {
      clearTimeout(t0);
      clearInterval(t);
      document.removeEventListener("visibilitychange", surRetour);
    };
  }, [actif, rafraichir]);

  useEffect(() => {
    if (!actif) return;
    const t = setInterval(() => setMaintenant(Date.now()), 10_000);
    return () => clearInterval(t);
  }, [actif]);

  if (etat.statut === "chargement") return <Message titre="Un instant…" texte="Recherche de la position." />;

  if (etat.statut === "introuvable") {
    return (
      <Message
        titre="Ce lien ne correspond à aucune alerte"
        texte="Vérifie qu'il est complet, tel qu'il apparaît dans le message reçu."
      />
    );
  }

  if (etat.statut === "erreur") {
    return (
      <Message
        titre="Impossible de joindre le serveur"
        texte="Nouvel essai automatique dans quelques secondes. Si l'urgence est immédiate, appelle le 17."
      >
        <Bouton href="tel:17" variante="urgence">
          Appeler le 17
        </Bouton>
      </Message>
    );
  }

  const { alerte, horsLigne } = etat;
  const prenom = premierMot(alerte.full_name);

  if (!alerte.en_cours) {
    return (
      <Message
        pastille="Alerte terminée"
        titre={prenom ? `${prenom} est hors de danger` : "Il n'y a plus de danger"}
        texte="L'alerte a été levée. Ce lien ne montre plus aucune position : elle n'est partagée que le temps de l'alerte."
      >
        <Installer />
      </Message>
    );
  }

  const lat = alerte.latitude;
  const lon = alerte.longitude;
  const aPosition = typeof lat === "number" && typeof lon === "number";
  const releve = alerte.mise_a_jour ? new Date(alerte.mise_a_jour) : null;
  const ancien = releve ? maintenant - releve.getTime() > RELEVE_ANCIEN_MS : false;

  return (
    <div className="w-full max-w-md">
      <div className="flex items-center justify-between gap-3 mb-3">
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-rose-300">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75 animate-ping" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-rose-400" />
          </span>
          Alerte en cours
        </span>
        {horsLigne && (
          <span className="text-xs text-amber-300/90">Connexion perdue · dernière position connue</span>
        )}
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-2">
        {prenom ? <>{prenom} a besoin d&apos;aide</> : <>Quelqu&apos;un a besoin d&apos;aide</>}
      </h1>

      <p className="text-white/55 text-sm leading-relaxed mb-5">
        {releve ? (
          <>
            Dernier relevé à{" "}
            <time dateTime={releve.toISOString()} className="text-white/80">
              {heure(releve)}
            </time>{" "}
            · {ilYA(releve, maintenant)}
            {ancien && (
              <span className="block text-amber-300/90 mt-1">
                Ce relevé date : la position a pu changer depuis.
              </span>
            )}
          </>
        ) : (
          <>Position au moment du déclenchement de l&apos;alerte.</>
        )}
      </p>

      {aPosition ? (
        <Carte lat={lat} lon={lon} prenom={prenom} />
      ) : (
        <div className="glass-card rounded-2xl px-5 py-6 text-center text-white/60 text-sm">
          Position pas encore reçue. Nouvelle tentative dans quelques secondes.
        </div>
      )}

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <Bouton href="tel:17" variante="urgence">
          Appeler le 17
        </Bouton>
        {aPosition && (
          <Bouton href={lienItineraire(lat, lon, prenom)} variante="clair">
            Itinéraire
          </Bouton>
        )}
      </div>
      <p className="mt-3 text-center text-xs text-white/35">
        Le 17, c&apos;est la police. Depuis l&apos;étranger ou sans réseau : 112.
      </p>

      <Installer />
    </div>
  );
}

/**
 * Fond de carte OpenStreetMap, sans compte ni clé : rien ne doit pouvoir
 * expirer sur cette page. Le rectangle affiché fait environ 500 m de côté.
 */
function Carte({ lat, lon, prenom }: { lat: number; lon: number; prenom: string | null }) {
  const d = 0.0025;
  const bbox = [lon - d * 1.4, lat - d, lon + d * 1.4, lat + d].map((n) => n.toFixed(5)).join(",");
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat.toFixed(6)},${lon.toFixed(6)}`;
  return (
    <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-nuit-light aspect-[4/3] w-full">
      <iframe
        // Recharge quand la position bouge, pas à chaque réponse identique.
        key={src}
        src={src}
        title={prenom ? `Position de ${prenom}` : "Position"}
        className="absolute inset-0 w-full h-full border-0"
        loading="eager"
        referrerPolicy="no-referrer"
        sandbox="allow-scripts allow-same-origin"
      />
      <a
        href={`https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=17/${lat}/${lon}`}
        target="_blank"
        rel="noopener"
        className="absolute bottom-2 right-2 rounded-lg bg-nuit/80 px-2 py-1 text-[11px] text-white/70 hover:text-white"
      >
        Agrandir
      </a>
    </div>
  );
}

/** Bandeau discret : la personne est là pour une urgence, pas pour un produit. */
function Installer() {
  const externe = /^https?:\/\//.test(APP_DOWNLOAD_URL);
  return (
    <p className="mt-10 text-center text-xs text-white/35 leading-relaxed">
      Avec l&apos;app SafeBack, ce lien s&apos;ouvre directement sur la personne, avec son trajet.{" "}
      <a
        href={APP_DOWNLOAD_URL}
        rel={externe ? "noopener" : undefined}
        className="text-white/60 underline underline-offset-2 hover:text-white"
      >
        Installer l&apos;app
      </a>
    </p>
  );
}

function Message({
  pastille,
  titre,
  texte,
  children,
}: {
  pastille?: string;
  titre: string;
  texte: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-md text-center">
      {pastille && (
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lavande/80 mb-4">{pastille}</p>
      )}
      <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-4">{titre}</h1>
      <p className="text-white/55 text-base leading-relaxed">{texte}</p>
      {children && <div className="mt-8 flex flex-col items-center gap-3">{children}</div>}
    </div>
  );
}

function Bouton({
  href,
  variante,
  children,
}: {
  href: string;
  variante: "urgence" | "clair";
  children: React.ReactNode;
}) {
  const styles =
    variante === "urgence"
      ? "bg-rose-500 text-white hover:bg-rose-400 shadow-[0_8px_30px_rgba(244,63,94,0.35)]"
      : "bg-white text-nuit hover:shadow-[0_8px_30px_rgba(47,107,255,0.25)]";
  return (
    <a
      href={href}
      className={`inline-flex w-full items-center justify-center px-6 py-4 rounded-2xl font-semibold text-base transition ${styles}`}
    >
      {children}
    </a>
  );
}

/**
 * Ouvre l'itinéraire dans l'app de cartes du téléphone : Plans sur iPhone,
 * l'app par défaut sur Android via `geo:`, Google Maps sur le web ailleurs.
 */
function lienItineraire(lat: number, lon: number, prenom: string | null): string {
  const ua = typeof navigator === "undefined" ? "" : navigator.userAgent;
  const dest = `${lat},${lon}`;
  if (/iPhone|iPad|iPod/i.test(ua)) return `https://maps.apple.com/?daddr=${dest}&dirflg=w`;
  if (/Android/i.test(ua)) return `geo:${dest}?q=${dest}(${encodeURIComponent(prenom ?? "Position")})`;
  return `https://www.google.com/maps/dir/?api=1&destination=${dest}&travelmode=walking`;
}

/** Le prénom seul : le nom complet n'a rien à faire sur une page ouverte à quiconque a le lien. */
function premierMot(nom: string | null): string | null {
  const p = nom?.trim().split(/\s+/)[0];
  return p ? p : null;
}

function heure(d: Date): string {
  return d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
}

function ilYA(d: Date, maintenant: number): string {
  const s = Math.max(0, Math.round((maintenant - d.getTime()) / 1000));
  if (s < 45) return "à l'instant";
  const m = Math.round(s / 60);
  if (m < 60) return `il y a ${m} min`;
  const h = Math.floor(m / 60);
  return `il y a ${h} h${m % 60 ? ` ${m % 60}` : ""}`;
}
