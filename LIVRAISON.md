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
