import {
  afterNextRender,
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  input,
  NgZone,
} from '@angular/core';
import { ANIM, prefersReducedMotion, setupGsap } from './gsap-setup';

/**
 * Incrémente une valeur numérique depuis zéro à l'entrée dans le viewport.
 *
 * `immediateRender: false` est essentiel : sans lui, le compteur écrirait « 0 »
 * dès le rendu initial, alors que le bandeau est sous la ligne de flottaison.
 * La valeur réelle du template reste donc dans le DOM — pour les moteurs de
 * recherche comme pour les lecteurs d'écran — jusqu'au déclenchement.
 *
 * Le nombre de chiffres est constant (`countUpPad`) et l'élément porte
 * `tabular-nums` : la largeur ne varie pas, donc aucun décalage de mise en page.
 */
@Directive({ selector: '[appCountUp]' })
export class CountUp {
  /** Valeur finale à atteindre. */
  readonly value = input.required<number>({ alias: 'appCountUp' });
  /** Nombre de chiffres, complété par des zéros à gauche (« 04 »). */
  readonly countUpPad = input(1);

  constructor() {
    const host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const zone = inject(NgZone);
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      if (prefersReducedMotion()) {
        return;
      }

      const render = (n: number) =>
        (host.textContent = String(Math.round(n)).padStart(this.countUpPad(), '0'));

      zone.runOutsideAngular(() => {
        const gsap = setupGsap();
        const finalValue = this.value();

        const context = gsap.context(() => {
          const counter = { current: 0 };

          gsap.fromTo(
            counter,
            { current: 0 },
            {
              current: finalValue,
              duration: 1.4,
              ease: 'power1.out',
              immediateRender: false,
              onUpdate: () => render(counter.current),
              scrollTrigger: { trigger: host, start: ANIM.start, once: true },
            },
          );
        }, host);

        destroyRef.onDestroy(() => {
          context.revert();
          render(finalValue);
        });
      });
    });
  }
}
