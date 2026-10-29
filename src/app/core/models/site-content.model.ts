import { LucideIcon } from '@lucide/angular';

/** Lien de navigation vers une section de la page d'accueil. */
export interface NavLink {
  readonly label: string;
  readonly fragment: string;
}

/** Vignette d'un métier, affichée sous l'accroche du hero. */
export interface Pillar {
  readonly label: string;
  readonly icon: LucideIcon;
}

/** Carte Vision / Mission / Nos valeurs. */
export interface Principle {
  readonly title: string;
  readonly description: string;
  readonly icon: LucideIcon;
  readonly tone: 'brand' | 'accent';
}

/** Teinte d'accentuation d'une carte. */
export type Tone = 'brand' | 'accent' | 'success';

/**
 * Carte de la section « Nos domaines d'expertise », et page de détail associée.
 *
 * `benefits` alimente la carte de l'accueil (formulations courtes de la
 * maquette) ; `summary` et `detailBenefits` proviennent de la brochure
 * commerciale et ne servent qu'à la page de détail.
 */
export interface ExpertiseDomain {
  readonly slug: string;
  readonly title: string;
  readonly benefits: readonly string[];
  readonly icon: LucideIcon;
  readonly tone: 'brand' | 'accent';
  readonly image: ImageAsset;
  readonly summary: string;
  readonly detailBenefits: readonly string[];
}

/** Étape de la méthodologie projet, commune à toutes les pages de service. */
export interface ProjectPhase {
  readonly step: string;
  readonly title: string;
  readonly description: string;
  readonly icon: LucideIcon;
}

/** Visuel statique, dimensions incluses pour NgOptimizedImage. */
export interface ImageAsset {
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
}

/**
 * Plateforme SaaS éditée par le cabinet.
 *
 * `summary`, `features` et `benefits` proviennent de la brochure commerciale.
 * Les plateformes qu'elle ne documente pas portent `contentPending: true` :
 * leur page de détail affiche alors un encart signalant le contenu à fournir,
 * plutôt que des fonctionnalités inventées.
 */
export interface SaasSolution {
  readonly slug: string;
  readonly name: string;
  readonly category: string;
  readonly description: string;
  readonly tag: string;
  /** Logo du produit, affiché à la place d'une icône générique. */
  readonly logo: ImageAsset;
  readonly tone: Tone;
  readonly summary?: string;
  readonly features?: readonly string[];
  readonly benefits?: readonly string[];
  readonly contentPending?: boolean;
  /**
   * Vrai pour un projet livré à un client, par opposition aux plateformes SaaS
   * éditées et exploitées par le cabinet. Les deux cohabitent dans la section
   * « Nos solutions et nos réalisations » mais ne se décrivent pas pareil.
   */
  readonly isRealisation?: boolean;
}

/** Chiffre clé du bandeau bleu. */
export interface KeyFigure {
  readonly value: string;
  readonly label: string;
  readonly icon: LucideIcon;
  /**
   * Valeur numérique à incrémenter depuis zéro. Absente pour une année, qu'il
   * n'aurait pas de sens de « compter » : elle apparaît alors en fondu.
   */
  readonly count?: number;
}

/** Argument de la section « Pourquoi nous choisir ? ». */
export interface Advantage {
  readonly title: string;
  readonly description: string;
  readonly icon: LucideIcon;
}

/** Référence terrain de la section « Des résultats concrets ». */
export interface UseCase {
  readonly sector: string;
  readonly description: string;
  readonly tag: string;
  /** Résultat mesuré, repris de la brochure commerciale. */
  readonly result: string;
}

/**
 * Partenaire affiché dans la section « Nos partenaires ».
 *
 * `name` sert d'alternative textuelle ; `href` est optionnel, les sites des
 * partenaires n'ayant pas été fournis.
 */
export interface Partner {
  readonly name: string;
  readonly logo: ImageAsset;
  readonly href?: string;
}

/** Conviction de la section « Approche produit ». */
export interface Conviction {
  readonly title: string;
  readonly description: string;
  readonly icon: LucideIcon;
}

/** Colonne de liens du pied de page. */
export interface FooterColumn {
  readonly title: string;
  readonly links: readonly NavLink[];
}

/** Ligne de coordonnées du pied de page. `href` absent pour une mention non cliquable. */
export interface ContactDetail {
  readonly value: string;
  readonly icon: LucideIcon;
  readonly href?: string;
}

/** Mention légale du pied de page, pointant vers une page dédiée. */
export interface LegalLink {
  readonly label: string;
  readonly path: string;
}
