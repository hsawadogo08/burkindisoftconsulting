import {
  afterNextRender,
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  input,
  NgZone,
} from '@angular/core';
import { DESKTOP_QUERY, prefersReducedMotion, setupGsap } from './gsap-setup';

/**
 * Flottement sinusoïdal très léger, réservé aux éléments purement décoratifs.
 *
 * Désactivé sous `prefers-reduced-motion` et sous le point de rupture `lg` :
 * une boucle infinie sur mobile coûte de la batterie pour un gain nul, les
 * décors concernés y étant de toute façon hors champ.
 */
@Directive({ selector: '[appFloat]' })
export class Float {
  /** Amplitude du déplacement vertical, en pixels. */
  readonly floatAmplitude = input(14);
  /** Décalage de phase, pour désynchroniser plusieurs décors. */
  readonly floatDelay = input(0);

  constructor() {
    const host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const zone = inject(NgZone);
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      if (prefersReducedMotion()) {
        return;
      }

      zone.runOutsideAngular(() => {
        const gsap = setupGsap();

        const context = gsap.context(() => {
          gsap.matchMedia().add(DESKTOP_QUERY, () => {
            gsap.to(host, {
              y: this.floatAmplitude(),
              duration: 4.5,
              delay: this.floatDelay(),
              ease: 'sine.inOut',
              repeat: -1,
              yoyo: true,
            });
          });
        }, host);

        destroyRef.onDestroy(() => context.revert());
      });
    });
  }
}
