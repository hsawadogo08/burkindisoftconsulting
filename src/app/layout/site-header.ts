import { DOCUMENT } from '@angular/common';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  Injector,
  NgZone,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { LucideMenu, LucideX } from '@lucide/angular';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { filter } from 'rxjs';
import { setupGsap } from '../core/animations/gsap-setup';
import { Reveal } from '../core/animations/reveal.directive';
import { SiteContentService } from '../core/site-content.service';
import { BrandLogo } from '../shared/ui/brand-logo';

@Component({
  selector: 'app-site-header',
  imports: [BrandLogo, LucideMenu, LucideX, Reveal, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    // Seule l'ombre évolue au défilement : la hauteur de la barre reste
    // constante, donc aucun décalage du contenu sous-jacent.
    class: 'sticky top-0 z-50 block bg-white/90 backdrop-blur transition-shadow duration-300',
    '[class.shadow-md]': 'isScrolled()',
  },
  template: `
    <div class="border-b border-brand-100" appReveal="down" [revealDuration]="0.6">
      <div class="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
        <a
          routerLink="/"
          fragment="accueil"
          class="rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600"
        >
          <span class="sr-only">{{ content.companyName }} — retour en haut</span>
          <app-brand-logo [priority]="true" [showTagline]="true" [tagline]="content.tagline" />
        </a>

        <nav class="hidden items-center gap-8 lg:flex" aria-label="Navigation principale">
          @for (link of content.navLinks; track link.fragment) {
            <a
              routerLink="/"
              [fragment]="link.fragment"
              [attr.aria-current]="activeFragment() === link.fragment ? 'true' : null"
              class="relative py-2 text-[0.95rem] transition-colors hover:text-brand-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600"
              [class]="linkToneClass(link.fragment)"
            >
              {{ link.label }}
              @if (activeFragment() === link.fragment) {
                <span class="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-brand-600"></span>
              }
            </a>
          }
        </nav>

        <button
          type="button"
          class="rounded-lg p-2 text-ink-700 transition-colors hover:bg-brand-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 lg:hidden"
          [attr.aria-expanded]="isMenuOpen()"
          aria-controls="menu-mobile"
          [attr.aria-label]="isMenuOpen() ? 'Fermer le menu' : 'Ouvrir le menu'"
          (click)="toggleMenu()"
        >
          @if (isMenuOpen()) {
            <svg lucideX class="size-6" />
          } @else {
            <svg lucideMenu class="size-6" />
          }
        </button>
      </div>
    </div>

    @if (isMenuOpen()) {
      <nav
        id="menu-mobile"
        class="border-b border-brand-100 bg-white lg:hidden"
        aria-label="Navigation principale (mobile)"
      >
        <ul class="mx-auto max-w-7xl px-6 py-2">
          @for (link of content.navLinks; track link.fragment) {
            <li>
              <a
                routerLink="/"
                [fragment]="link.fragment"
                class="block border-b border-brand-50 py-3 text-base last:border-0"
                [class]="linkToneClass(link.fragment)"
                (click)="closeMenu()"
              >
                {{ link.label }}
              </a>
            </li>
          }
        </ul>
      </nav>
    }
  `,
})
export class SiteHeader {
  protected readonly content = inject(SiteContentService);
  private readonly document = inject(DOCUMENT);

  protected readonly isMenuOpen = signal(false);
  protected readonly isScrolled = signal(false);
  protected readonly activeFragment = signal(this.content.navLinks[0].fragment);

  private sectionObserver?: IntersectionObserver;

  constructor() {
    const destroyRef = inject(DestroyRef);
    const injector = inject(Injector);

    destroyRef.onDestroy(() => this.sectionObserver?.disconnect());

    // La navigation initiale est non bloquante : au premier rendu du shell, le
    // `router-outlet` est encore vide et aucune section n'existe dans le DOM.
    // Chercher les sections à ce moment-là revenait à n'observer que du vide,
    // et le lien actif restait donc figé sur le premier de la liste.
    //
    // On ré-arme à chaque navigation : les sections disparaissent du DOM sur
    // les pages de détail et réapparaissent au retour sur l'accueil.
    const router = inject(Router);

    router.events
      .pipe(filter((event) => event instanceof NavigationEnd), takeUntilDestroyed(destroyRef))
      .subscribe(() => {
        // Sur une page de détail, il n'y a aucune section à observer : le lien
        // actif se déduit de l'URL, sinon « Accueil » resterait souligné à tort.
        const sectionFromUrl = this.content.navLinks.find((link) =>
          router.url.startsWith(`/${link.fragment}/`),
        );

        if (sectionFromUrl) {
          this.sectionObserver?.disconnect();
          this.sectionObserver = undefined;
          this.activeFragment.set(sectionFromUrl.fragment);
          return;
        }

        afterNextRender(() => this.observeSections(), { injector });
      });

    const zone = inject(NgZone);

    afterNextRender(() => {
      // Remplace une écoute `(window:scroll)` : celle-ci déclenchait un cycle
      // de détection de changement à chaque pixel défilé. Le ScrollTrigger vit
      // hors zone et ne la réintègre qu'au franchissement du seuil.
      zone.runOutsideAngular(() => {
        const gsap = setupGsap();

        const context = gsap.context(() => {
          ScrollTrigger.create({
            start: 'top -8',
            // Sans borne de fin, la plage est vide et `onToggle` ne bascule
            // jamais : `end` doit couvrir tout le reste du document.
            end: 99999,
            onToggle: ({ isActive }) => zone.run(() => this.isScrolled.set(isActive)),
          });
        });

        destroyRef.onDestroy(() => context.revert());
      });
    });
  }

  /**
   * Met en évidence le lien de la section courante.
   *
   * L'observateur ne transmet que les sections dont l'état d'intersection vient
   * de changer : il faut donc maintenir soi-même l'ensemble des sections
   * présentes dans la bande, sinon le lien actif reste figé dès qu'une section
   * la quitte sans qu'une autre y entre dans le même lot.
   */
  private observeSections(): void {
    // Un ré-armage remplace l'observateur précédent : sans cela, les anciennes
    // cibles continueraient d'alimenter l'ensemble après un changement de page.
    this.sectionObserver?.disconnect();

    const visibleFragments = new Set<string>();
    const documentOrder = this.content.navLinks.map((link) => link.fragment);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visibleFragments.add(entry.target.id);
          } else {
            visibleFragments.delete(entry.target.id);
          }
        }

        // La première section de la navigation encore dans la bande est la plus
        // haute à l'écran. Si l'ensemble est vide (entre deux sections), on
        // conserve le dernier lien actif plutôt que de tout éteindre.
        const current = documentOrder.find((fragment) => visibleFragments.has(fragment));
        if (current) {
          this.activeFragment.set(current);
        }
      },
      { rootMargin: '-112px 0px -55% 0px' },
    );

    for (const fragment of documentOrder) {
      const section = this.document.getElementById(fragment);
      if (section) {
        observer.observe(section);
      }
    }

    this.sectionObserver = observer;
  }

  protected toggleMenu(): void {
    this.isMenuOpen.update((open) => !open);
  }

  protected closeMenu(): void {
    this.isMenuOpen.set(false);
  }

  protected linkToneClass(fragment: string): string {
    return this.activeFragment() === fragment
      ? 'font-bold text-brand-600'
      : 'font-normal text-ink-700';
  }
}
