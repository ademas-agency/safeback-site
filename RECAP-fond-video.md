# SafeBack — Récap session : fond vidéo sur l'accueil

Date : 2026-08-24

## Ce qui a été fait

### 1. Vidéo compressée pour le web
- Source fournie : `SafeBack final video.mov` — **1,36 Go**, ProRes 1080p, 40,5 s.
- Compressée en vidéo web légère : **`hero.mp4` — 4 Mo** (H.264 1080p, muette, boucle, `+faststart`).
- Image poster générée pour un affichage instantané au chargement : `hero-poster.jpg`.
- Emplacement : `public/video/hero.mp4` et `public/video/hero-poster.jpg`.

> Outil utilisé : **ffmpeg** (installé via winget). Pour recompresser une nouvelle version :
> ```bash
> ffmpeg -i "source.mov" -an -movflags +faststart -pix_fmt yuv420p -vf "scale=1920:1080" -c:v libx264 -preset medium -crf 26 public/video/hero.mp4
> ```
> `-crf` : plus le chiffre est bas, plus la qualité (et le poids) augmentent (26 = bon compromis).

### 2. Fond vidéo sur le hero (première section)
- Nouveau composant : **`src/components/VideoBackground.tsx`**.
- La vidéo est le fond de la **première section uniquement** (le hero), au-dessus de la banderole de statistiques.
- Un voile dégradé (transparent en haut → sombre en bas) garde les textes lisibles.
- Luminosité poussée pour que la vidéo soit bien visible.
- **En dessous du hero, l'animation des « points qui se relient » (NetworkBackground) est conservée** sur tout le reste de la page.

### 3. Hero repensé (bas de l'écran)
Barre en bas du hero, sur une seule rangée (grille 3 colonnes) :
- **Slogan** à gauche : « Sortez l'esprit léger, veillez sur ceux que vous aimez »
- **Boutons** centrés sur la page : *Télécharger l'app* et *Découvrir l'application*
- **100% gratuit** à droite (en gros)

L'ancien cadre vidéo factice (bouton play placeholder) a été supprimé.

## Fichiers modifiés / ajoutés
- `src/app/page.tsx` — hero restructuré, fond vidéo branché.
- `src/components/VideoBackground.tsx` — **nouveau**.
- `public/video/hero.mp4` + `public/video/hero-poster.jpg` — **nouveaux**.

## À noter
- La vidéo source `.mov` (1,36 Go) **n'est pas** dans le projet ni dans le zip (trop lourde) — seule la version web de 4 Mo l'est.
- Navbar et Footer : **non modifiés** (figés).
- Rien d'autre à configurer : toujours un site frontend pur, déployable tel quel (voir `LIVRAISON.md`).
