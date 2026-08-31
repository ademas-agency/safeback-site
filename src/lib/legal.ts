/**
 * Informations légales de l'éditeur, en UN seul endroit.
 *
 * Elles figurent à la fois dans les CGU et dans la politique de confidentialité.
 * Les recopier dans les deux fichiers, c'est se garantir qu'un jour l'une des
 * deux pages sera à jour et l'autre non — sur des mentions qui engagent
 * juridiquement, et que l'App Store contrôle.
 */

/** Entrepreneur individuel : pas de forme sociétaire, le SIRET fait l'identité. */
export const EDITEUR = "Louis Debernardi, entrepreneur individuel, exploitant sous le nom SafeBack";
export const SIRET = "101 897 668 00014";
export const SIREN = "101 897 668";
export const ADRESSE = "6 rue Émile Aron, 37200 Tours, France";

/** Adresse des demandes RGPD. Doit rester relevée : le délai de réponse est légal. */
export const CONTACT_EMAIL = "contact@safe-back.com";

/** Aucun DPO désigné — ce n'est pas une obligation à cette taille, mais il faut le dire. */
export const DPO = "Non désigné";

/**
 * 15 ans : seuil français au-dessous duquel le consentement seul du mineur ne
 * suffit pas au traitement de ses données (article 45 de la loi Informatique et
 * Libertés). En dessous, l'accord d'un titulaire de l'autorité parentale est requis.
 */
export const AGE_MINIMUM = 15;

/**
 * Date de dernière mise à jour affichée sur les deux pages.
 *
 * À CHANGER ICI, et nulle part ailleurs, à chaque révision de fond des textes.
 * Mise à la date d'ouverture du site à l'indexation — le moment où ces textes
 * deviennent réellement publics et opposables.
 */
export const DATE_MAJ = "31 août 2026";
