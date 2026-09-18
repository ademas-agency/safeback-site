# SafeBack — Site vitrine · Fiche technique de livraison

Document destiné au développeur qui va héberger le site et brancher le nom de domaine.

---

## 1. Résumé

Site vitrine **SafeBack** (application de sécurité personnelle). Site **frontend uniquement** :
pas de base de données, pas d'API, pas de variables d'environnement, aucun secret.

| | |
|---|---|
| **Framework** | Next.js **16.3.1** (App Router, moteur Turbopack) |
| **Langage** | TypeScript |
| **UI** | React 19, Tailwind CSS, Framer Motion (animations) |
| **Icônes** | lucide-react |
| **Node.js requis** | **20 LTS ou plus récent** |
| **Gestionnaire de paquets** | npm (un `package-lock.json` est fourni) |

---

## 2. Installation & lancement

Dans le dossier du projet :

```bash
# 1. Installer les dépendances
npm install

# 2. Build de production
npm run build

# 3. Démarrer en production (port 3000 par défaut)
npm start
```

Pour développer / prévisualiser en local :

```bash
npm run dev
```

---

## 3. Hébergement recommandé

Le site est un projet Next.js standard, déployable partout où Node.js tourne.

- **Recommandé : Vercel** (éditeur de Next.js) ou **Netlify** — détection automatique,
  build et déploiement en quelques clics, HTTPS inclus.
- **Autre serveur Node.js** : lancer `npm run build` puis `npm start` derrière un reverse
  proxy (Nginx, etc.).

### Nom de domaine
Une fois le site déployé, faire pointer le domaine vers le déploiement via la configuration
DNS de l'hébergeur (sur Vercel/Netlify : ajouter le domaine dans le tableau de bord, puis
créer les enregistrements DNS indiqués — généralement un `CNAME` ou un `A`).

### Liens d'invitation de l'app (`/i/<code>`)

Deux éléments du site servent à l'app iOS, à ne pas retirer :

- `/.well-known/apple-app-site-association` — fichier lu par Apple pour ouvrir
  `https://safe-back.fr/i/<code>` (invitation) et `https://safe-back.fr/a/<id>`
  (alerte) directement dans l'app quand elle est installée.
  Il doit rester servi en HTTPS, **sans redirection** (une 301 vers `www` casse tout),
  avec `Content-Type: application/json` et sans authentification. Vérification :
  `curl -sI https://safe-back.fr/.well-known/apple-app-site-association`
- `/.well-known/assetlinks.json` — le pendant Android : fichier lu par Android
  pour ouvrir `https://safe-back.fr/i/<code>` dans l'app. Servi en `application/json`,
  l'URL garde son `.json`. Il doit être servi **aussi sur `www.safe-back.fr`**, sans
  redirection : l'app Android vérifie les deux hôtes séparément, et l'app iOS déclare
  `www` également. Le fichier porte les empreintes des deux clés autorisées, clé d'upload et
  clé de signature de Google Play (voir `src/app/.well-known/assetlinks.json/route.ts`).
- **`www.safe-back.fr`** doit être ajouté chez Vercel comme domaine simple du projet,
  **sans** l'option de redirection vers `safe-back.fr`, avec l'entrée DNS
  correspondante. C'est le site lui-même (`next.config.ts`) qui redirige `www` vers
  `safe-back.fr` pour tout, sauf `/.well-known/*`.
- `/suppression-compte` — page « Supprimer votre compte », exigée par Google Play et
  demandée par Apple : comment supprimer son compte depuis l'app, et par e-mail sans
  l'app. Ce qu'elle annonce reflète l'edge function `delete-account` du dépôt de l'app :
  si celle-ci change, la page change avec. L'adresse affichée est `CONTACT_EMAIL` de
  `src/lib/legal.ts`.
- `/i/<code>` — page vue uniquement par ceux qui n'ont pas l'app. Son bouton
  d'installation pointe vers `NEXT_PUBLIC_APP_DOWNLOAD_URL` (lien TestFlight pour
  l'instant, lien App Store à la publication). À définir chez l'hébergeur, puis
  redéployer. Ne jamais brancher d'outil d'analyse sur cette page : le code de
  l'URL permet de devenir le protecteur de quelqu'un.
- `/a/<id>` — page du lien d'alerte, celui que porte le SMS envoyé aux proches à
  la place d'un lien Google Maps. Vue par ceux qui n'ont pas l'app. Elle interroge
  la fonction publique `suivre_alerte` du projet Supabase toutes les 15 secondes
  et montre la position sur une carte OpenStreetMap tant que l'alerte est ouverte,
  avec deux actions : appeler le 17, ouvrir l'itinéraire dans l'app de cartes du
  téléphone. Une fois l'alerte close, la page dit qu'il n'y a plus de danger et ne
  montre plus aucune position. Le projet Supabase et sa clé publique sont dans
  `src/lib/supabase.ts`, remplaçables par `NEXT_PUBLIC_SUPABASE_URL` et
  `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`. Le lien n'est écrit dans le SMS que si le
  secret `ALERT_LINK_BASE=https://safe-back.fr` est posé sur le projet Supabase ;
  sans lui, le SMS retombe sur Google Maps.

---

## 4. Structure du projet

```
safeback-site/
├── public/              # Images (logo, photos partenaires, mission…)
├── src/
│   ├── app/             # Les pages (App Router)
│   │   ├── page.tsx           → Accueil
│   │   ├── produit/           → L'Application
│   │   ├── offres/            → Offres / abonnements
│   │   ├── statistiques/      → Statistiques
│   │   ├── partenaires/       → Partenaires
│   │   ├── contact/           → Contact
│   │   ├── telecharger/       → Télécharger l'app
│   │   ├── cgu/               → CGU
│   │   └── confidentialite/   → Politique de confidentialité
│   └── components/      # Composants réutilisables (Navbar, Footer, cartes…)
├── package.json
├── next.config.ts
└── tsconfig.json
```

---

## 5. Notes utiles

- **Aucune variable d'environnement** n'est nécessaire (pas de `.env`).
- Les liens **App Store / Google Play** (page *Télécharger*) et le formulaire de **Contact**
  sont des maquettes front : à brancher plus tard sur les vraies URL / un service d'envoi
  d'e-mails si besoin.
- Les dossiers `node_modules/` et `.next/` **ne sont pas fournis** (volumineux, régénérés
  automatiquement par `npm install` et `npm run build`).
- Le site est en **français**, thème sombre, couleurs de marque : bleu `#2F6BFF`,
  violet `#7C3AED`, lavande `#B9A8FF`, nuit `#0B1230`.
