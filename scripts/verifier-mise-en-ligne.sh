#!/usr/bin/env bash
#
# Vérifie, après chaque mise en ligne, que le site n'a pas cassé l'application.
#
# Le site ne sert pas que des pages : il porte la chaîne d'alerte (/a/<id>, qui
# affiche la position d'une personne tant que son alerte est ouverte) et la
# plomberie des liens universels (les deux fichiers .well-known, qui décident
# qu'un lien s'ouvre dans l'app plutôt que dans le navigateur). Ces deux
# parties cassent en silence : rien ne plante, le lien s'ouvre simplement dans
# Safari, et personne ne s'en aperçoit avant qu'une alerte se passe mal.
#
# Ce script les regarde depuis l'extérieur, comme un téléphone le ferait.
#
#   bash scripts/verifier-mise-en-ligne.sh
#   bash scripts/verifier-mise-en-ligne.sh https://safeback-site-preview.vercel.app
#
# Sort en 1 si une vérification échoue, pour pouvoir servir de garde-fou dans
# une CI ou un script de déploiement.

set -uo pipefail

DOMAINE="${1:-https://safe-back.fr}"
HOTE="${DOMAINE#https://}"
HOTE="${HOTE#http://}"

# Les valeurs que les apps attendent. Elles viennent du code qui sert les
# fichiers : src/app/.well-known/*/route.ts. Si elles changent là-bas, elles
# changent ici — et c'est précisément le genre de modification qu'on veut voir.
APP_ID_IOS="CRL3QPB532.com.safeback.SafeBack"
PAQUET_ANDROID="fr.safeback.app"

rouge=$'\033[31m'; vert=$'\033[32m'; gris=$'\033[90m'; zero=$'\033[0m'
echecs=0

ok()     { printf "  %s✓%s %s\n" "$vert" "$zero" "$1"; }
echec()  { printf "  %s✗%s %s\n" "$rouge" "$zero" "$1"; echecs=$((echecs + 1)); }
titre()  { printf "\n%s\n" "$1"; }
detail() { printf "    %s%s%s\n" "$gris" "$1" "$zero"; }

# Code HTTP seul.
code() { curl -s -o /dev/null -w "%{http_code}" --max-time 15 "$1"; }

# --------------------------------------------------------------------------
# 1. Les fichiers de liaison, sur les deux hôtes
#
# Apple et Android les lisent séparément sur le domaine nu ET sur www. Ils
# exigent une réponse 200 directe : une redirection 301/308, même correcte,
# suffit à faire échouer la vérification côté système.
# --------------------------------------------------------------------------
titre "Fichiers de liaison avec l'app"

for hote in "$HOTE" "www.$HOTE"; do
  for fichier in apple-app-site-association assetlinks.json; do
    url="https://$hote/.well-known/$fichier"
    entetes=$(curl -s -o /dev/null -D - --max-time 15 "$url")
    statut=$(printf "%s" "$entetes" | awk 'tolower($1) ~ /^http/ { print $2; exit }')
    type=$(printf "%s" "$entetes" | awk 'tolower($1) == "content-type:" { print $2; exit }')

    if [ "$statut" != "200" ]; then
      echec "$hote/$fichier — statut $statut"
      redirection=$(printf "%s" "$entetes" | awk 'tolower($1) == "location:" { print $2; exit }')
      [ -n "$redirection" ] && detail "redirigé vers $redirection — Apple et Android refusent une redirection ici"
      continue
    fi
    case "$type" in
      application/json*) ;;
      *) echec "$hote/$fichier — servi en « ${type:-aucun type} » au lieu de application/json"; continue ;;
    esac
    if ! curl -s --max-time 15 "$url" | jq empty 2>/dev/null; then
      echec "$hote/$fichier — ce n'est pas du JSON valide"
      continue
    fi
    ok "$hote/$fichier"
  done
done

# Le contenu, pas seulement la présence : un fichier valide qui désigne la
# mauvaise app ne sert à rien, et c'est invisible à l'œil nu.
aasa=$(curl -s --max-time 15 "https://$HOTE/.well-known/apple-app-site-association")
if [ "$(printf "%s" "$aasa" | jq -r '[.applinks.details[].appIDs[]] | index("'"$APP_ID_IOS"'") // "absent"')" = "absent" ]; then
  echec "iOS — l'identifiant d'app attendu est absent du fichier"
  detail "attendu : $APP_ID_IOS"
  detail "trouvé  : $(printf "%s" "$aasa" | jq -rc '[.applinks.details[].appIDs[]]' 2>/dev/null)"
else
  ok "iOS — identifiant d'app conforme"
fi

for chemin in "/i/*" "/a/*"; do
  if [ "$(printf "%s" "$aasa" | jq -r '[.applinks.details[].components[]["/"]] | index("'"$chemin"'") // "absent"')" = "absent" ]; then
    echec "iOS — le chemin $chemin n'est plus déclaré"
    detail "les liens correspondants s'ouvriront dans le navigateur, pas dans l'app"
  else
    ok "iOS — chemin $chemin déclaré"
  fi
done

liens=$(curl -s --max-time 15 "https://$HOTE/.well-known/assetlinks.json")
if [ "$(printf "%s" "$liens" | jq -r '[.[].target.package_name] | index("'"$PAQUET_ANDROID"'") // "absent"')" = "absent" ]; then
  echec "Android — le paquet attendu est absent du fichier"
  detail "attendu : $PAQUET_ANDROID"
else
  ok "Android — paquet conforme"
fi

empreintes=$(printf "%s" "$liens" | jq -r '[.[].target.sha256_cert_fingerprints[]] | length' 2>/dev/null || echo 0)
if [ "${empreintes:-0}" -lt 2 ]; then
  echec "Android — $empreintes empreinte(s) de signature au lieu des deux attendues"
  detail "clé d'upload et clé de signature Google Play : les deux sont nécessaires"
else
  ok "Android — $empreintes empreintes de signature"
fi

# --------------------------------------------------------------------------
# 2. La redirection www
#
# Elle doit ramener les pages ordinaires sur le domaine nu, et laisser
# .well-known tranquille. Les deux moitiés comptent autant l'une que l'autre.
# --------------------------------------------------------------------------
titre "Redirection www"

cible=$(curl -s -o /dev/null -w "%{redirect_url}" --max-time 15 "https://www.$HOTE/produit")
case "$cible" in
  "https://$HOTE/produit") ok "www/produit → $HOTE/produit" ;;
  "") echec "www/produit n'est pas redirigé — le site existe à deux adresses pour Google" ;;
  *) echec "www/produit → $cible (inattendu)" ;;
esac

# --------------------------------------------------------------------------
# 3. Les pages qui servent l'app
#
# Un identifiant qui n'existe pas doit donner une page propre, jamais une
# erreur serveur : c'est le cas d'un lien périmé, et il arrive souvent.
# --------------------------------------------------------------------------
titre "Pages liées à l'app"

inexistant="00000000-0000-4000-8000-000000000000"
for url in "$DOMAINE/a/$inexistant" "$DOMAINE/i/CODEINEXISTANT" "$DOMAINE/app?via=verification"; do
  statut=$(code "$url")
  affichage="${url#"$DOMAINE"}"
  case "$statut" in
    200|404) ok "$affichage — $statut" ;;
    *) echec "$affichage — $statut"; detail "attendu : une page, pas une erreur serveur" ;;
  esac
done

# --------------------------------------------------------------------------
# 4. Indexation
#
# L'indexation est pilotée par NEXT_PUBLIC_ALLOW_INDEXING chez l'hébergeur.
# Un déploiement sans cette variable remet le site en « ne pas indexer » sans
# rien casser de visible — et le référencement disparaît en silence.
# --------------------------------------------------------------------------
titre "Indexation"

robots=$(curl -s --max-time 15 "$DOMAINE/robots.txt")
if printf "%s" "$robots" | grep -qi "^Disallow: /$"; then
  echec "robots.txt interdit toute indexation"
  detail "définir NEXT_PUBLIC_ALLOW_INDEXING=true chez l'hébergeur, puis redéployer"
else
  ok "robots.txt autorise l'indexation"
fi

statut=$(code "$DOMAINE/sitemap.xml")
[ "$statut" = "200" ] && ok "sitemap.xml — 200" || echec "sitemap.xml — $statut"

# --------------------------------------------------------------------------
titre "Résultat"
if [ "$echecs" -eq 0 ]; then
  printf "  %sTout est en place sur %s.%s\n\n" "$vert" "$DOMAINE" "$zero"
  exit 0
fi
printf "  %s%d vérification(s) en échec sur %s.%s\n\n" "$rouge" "$echecs" "$DOMAINE" "$zero"
exit 1
