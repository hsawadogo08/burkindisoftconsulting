import { afterNextRender, DestroyRef, Directive, ElementRef, inject, NgZone } from '@angular/core';
import { ANIM, DESKTOP_QUERY, prefersReducedMotion, setupGsap } from './gsap-setup';

/**
 * Timeline d'ouverture du hero, jouée au chargement (le bloc est au-dessus de
 * la ligne de flottaison : pas de ScrollTrigger).
 *
 * Les cibles sont désignées par `data-hero` dans le template du hero, ce qui
 * évite de coupler la chorégraphie aux classes utilitaires de mise en forme.
 */
@Directive({ selector: '[appHeroIntro]' })
export class HeroIntro {
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

        const context = gsap.context((self) => {
          const pick = (name: string) => self.selector!(`[data-hero="${name}"]`) as HTMLElement[];
          const isDesktop = matchMedia(DESKTOP_QUERY).matches;
          const d = isDesktop ? ANIM.distance.desktop : ANIM.distance.mobile;

          const timeline = gsap.timeline({
            defaults: { duration: ANIM.duration, ease: ANIM.ease, clearProps: 'opacity,transform' },
          });

          timeline
            .from(pick('badge'), { opacity: 0, y: d * 0.5 })
            .from(pick('title'), { opacity: 0, y: d }, 0.08)
            // Le visuel entre par la droite, en parallèle du titre.
            .from(pick('visual'), { opacity: 0, x: isDesktop ? 56 : d }, 0.12)
            .from(pick('lead'), { opacity: 0, y: d * 0.75 }, 0.24)
            .from(pick('pillar'), { opacity: 0, y: d * 0.75, stagger: ANIM.stagger }, 0.34)
            .from(pick('cta'), { opacity: 0, y: d * 0.75 }, 0.5)
            .from(pick('card'), { opacity: 0, scale: 0.9, stagger: 0.12, duration: 0.6 }, 0.55);
        }, host);

        destroyRef.onDestroy(() => context.revert());
      });
    });
  }
}
