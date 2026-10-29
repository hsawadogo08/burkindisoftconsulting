import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let registered = false;

/** Enregistre ScrollTrigger une seule fois pour toute l'application. */
export function setupGsap(): typeof gsap {
  if (!registered) {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
  return gsap;
}

/**
 * Respect de `prefers-reduced-motion`.
 *
 * Lu à chaque appel plutôt que mis en cache : l'utilisateur peut changer le
 * réglage système pendant la session.
 */
export function prefersReducedMotion(): boolean {
  return (
    typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/** Durées et courbes communes à toutes les animations du site. */
export const ANIM = {
  duration: 0.7,
  ease: 'power2.out',
  stagger: 0.09,
  /** Distance de translation : réduite sur mobile pour limiter le coût de rendu. */
  distance: { mobile: 16, desktop: 32 },
  /** Déclenchement quand le haut de l'élément atteint 85 % de la hauteur d'écran. */
  start: 'top 85%',
} as const;

/** Point de rupture `lg` de Tailwind, utilisé par `gsap.matchMedia()`. */
export const DESKTOP_QUERY = '(min-width: 1024px)';
