import {
  afterNextRender,
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  input,
  NgZone,
} from '@angular/core';
import { ANIM, DESKTOP_QUERY, prefersReducedMotion, setupGsap } from './gsap-setup';

export type RevealVariant = 'up' | 'down' | 'right' | 'left' | 'fade' | 'scale';

/**
 * Révèle l'élément (ou ses enfants) à l'entrée dans le viewport.
 *
 * Seuls `opacity` et `transform` sont animés : aucun décalage de mise en page.
 * Sous `prefers-reduced-motion`, aucun état initial n'est posé — le contenu
 * reste simplement visible, ce qui garantit aussi qu'une défaillance de GSAP
 * ne peut jamais laisser de contenu invisible.
 *
 * @example
 * <ul appReveal revealStagger="li"> … </ul>
 * <img appReveal="right" [revealDelay]="0.2" />
 */
@Directive({ selector: '[appReveal]' })
export class Reveal {
  /** Direction d'entrée. La chaîne vide (attribut sans valeur) vaut « up ». */
  readonly variant = input<RevealVariant | ''>('up', { alias: 'appReveal' });
  /** Délai avant démarrage, en secondes. */
  readonly revealDelay = input<number>(0);
  /** Sélecteur CSS des enfants à animer en cascade. Vide = l'hôte lui-même. */
  readonly revealStagger = input<string>('');
  readonly revealDuration = input<number>(ANIM.duration);

  constructor() {
    const host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const zone = inject(NgZone);
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      if (prefersReducedMotion()) {
        return;
      }

      // Hors zone Angular : ScrollTrigger pose des écouteurs de scroll qui
      // déclencheraient sinon une détection de changement à chaque pixel.
      zone.runOutsideAngular(() => {
        const gsap = setupGsap();

        const context = gsap.context(() => {
          const selector = this.revealStagger();
          const targets = selector
            ? Array.from(host.querySelectorAll<HTMLElement>(selector))
            : [host];

          if (targets.length === 0) {
            return;
          }

          const distance = matchMedia(DESKTOP_QUERY).matches
            ? ANIM.distance.desktop
            : ANIM.distance.mobile;

          gsap.set(targets, this.initialState(distance));

          gsap.to(targets, {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration: this.revealDuration(),
            ease: ANIM.ease,
            delay: this.revealDelay(),
            stagger: selector ? ANIM.stagger : 0,
            // `clearProps` libère les styles inline une fois l'entrée jouée :
            // les transitions CSS de survol reprennent la main intactes.
            clearProps: 'opacity,transform',
            scrollTrigger: { trigger: host, start: ANIM.start, once: true },
          });
        }, host);

        destroyRef.onDestroy(() => context.revert());
      });
    });
  }

  private initialState(distance: number): gsap.TweenVars {
    switch (this.variant()) {
      case 'down':
        return { opacity: 0, y: -distance };
      case 'right':
        return { opacity: 0, x: distance };
      case 'left':
        return { opacity: 0, x: -distance };
      case 'scale':
        return { opacity: 0, scale: 0.94 };
      case 'fade':
        return { opacity: 0 };
      default:
        return { opacity: 0, y: distance };
    }
  }
}
