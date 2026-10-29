import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  NgZone,
  signal,
  viewChild,
} from '@angular/core';
import { LucideChevronLeft, LucideChevronRight } from '@lucide/angular';
import { Reveal } from '../../../core/animations/reveal.directive';
import { prefersReducedMotion } from '../../../core/animations/gsap-setup';
import { SiteContentService } from '../../../core/site-content.service';
import { SectionHeading } from '../../../shared/ui/section-heading';

/** Intervalle entre deux avances automatiques, en millisecondes. */
const AUTOPLAY_DELAY = 4000;

@Component({
  selector: 'app-partners-section',
  imports: [SectionHeading, Reveal, LucideChevronLeft, LucideChevronRight],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <section id="partenaires" class="bg-mist-100">
      <div class="mx-auto max-w-7xl px-6 py-16 lg:py-20">
        <app-section-heading
          appReveal
          eyebrow="Nos partenaires"
          title="Ils nous accompagnent"
          [intro]="content.partnersIntro"
        />

        <!--
          Le défilement s'appuie sur le scroll natif et scroll-snap plutôt que
          sur des transformations calculées : le glissement tactile, la molette
          et la navigation au clavier fonctionnent sans code supplémentaire.
        -->
        <div
          class="relative mt-12"
          appReveal
          (mouseenter)="pauseAutoplay()"
          (mouseleave)="resumeAutoplay()"
          (focusin)="pauseAutoplay()"
          (focusout)="resumeAutoplay()"
        >
          <ul
            #track
            tabindex="0"
            role="group"
            aria-label="Logos de nos partenaires"
            class="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth rounded-2xl [-ms-overflow-style:none] [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600 [&::-webkit-scrollbar]:hidden"
          >
            @for (partner of content.partners; track partner.name) {
              <li
                class="w-full shrink-0 snap-start sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.834rem)]"
              >
                @if (partner.href; as href) {
                  <a
                    [href]="href"
                    target="_blank"
                    rel="noopener noreferrer"
                    [attr.aria-label]="partner.name + ' (nouvelle fenêtre)'"
                    [class]="cardClass"
                  >
                    <img
                      [src]="partner.logo.src"
                      [width]="partner.logo.width"
                      [height]="partner.logo.height"
                      [alt]="partner.logo.alt"
                      loading="lazy"
                      decoding="async"
                      [class]="logoClass"
                    />
                  </a>
                } @else {
                  <!--
                    Pas d'adresse fournie pour ce partenaire : on rend une boîte
                    non cliquable plutôt qu'un lien mort.
                  -->
                  <div [class]="cardClass">
                    <img
                      [src]="partner.logo.src"
                      [width]="partner.logo.width"
                      [height]="partner.logo.height"
                      [alt]="partner.logo.alt"
                      loading="lazy"
                      decoding="async"
                      [class]="logoClass"
                    />
                  </div>
                }
              </li>
            }
          </ul>

          @if (hasOverflow()) {
            <!-- Les flèches bouclent, comme le défilement automatique. -->
            <button
              type="button"
              aria-label="Partenaires précédents"
              (click)="scrollByCard(-1)"
              [class]="navButtonClass + ' -left-3 lg:-left-5'"
            >
              <svg lucideChevronLeft class="size-5" />
            </button>

            <button
              type="button"
              aria-label="Partenaires suivants"
              (click)="scrollByCard(1)"
              [class]="navButtonClass + ' -right-3 lg:-right-5'"
            >
              <svg lucideChevronRight class="size-5" />
            </button>
          }
        </div>
      </div>
    </section>
  `,
})
export class PartnersSection {
  protected readonly content = inject(SiteContentService);

  private readonly track = viewChild.required<ElementRef<HTMLUListElement>>('track');
  private readonly zone = inject(NgZone);

  protected readonly hasOverflow = signal(false);

  private autoplayId?: ReturnType<typeof setInterval>;
  private pausedByUser = false;

  /**
   * Anneau de focus en retrait négatif : le conteneur de défilement masque ce
   * qui déborde, un anneau extérieur serait donc rogné sur les cartes de bord.
   */
  protected readonly cardClass =
    'flex h-28 items-center justify-center rounded-2xl border border-brand-100 bg-white px-6 py-8 shadow-sm transition duration-300 hover:shadow-md focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-600 motion-safe:hover:-translate-y-1';

  protected readonly logoClass =
    'max-h-12 w-auto max-w-full object-contain sm:max-h-14 lg:max-h-16';

  protected readonly navButtonClass =
    'absolute top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-brand-100 bg-white text-ink-700 shadow-md transition hover:bg-brand-50 hover:text-brand-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 disabled:pointer-events-none disabled:opacity-0';

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      this.syncScrollState();

      // Hors zone : l'observateur se déclenche à chaque redimensionnement et
      // n'a pas à provoquer de cycle de détection de changement par lui-même.
      this.zone.runOutsideAngular(() => {
        const observer = new ResizeObserver(() =>
          this.zone.run(() => this.syncScrollState()),
        );
        observer.observe(this.track().nativeElement);
        destroyRef.onDestroy(() => observer.disconnect());
      });

      this.resumeAutoplay();
    });

    destroyRef.onDestroy(() => this.clearAutoplay());
  }

  /** Avance ou recule d'une carte, en bouclant aux deux extrémités. */
  protected scrollByCard(direction: 1 | -1): void {
    const track = this.track().nativeElement;
    const first = track.firstElementChild as HTMLElement | null;
    if (!first) {
      return;
    }

    const maxScroll = track.scrollWidth - track.clientWidth;
    const atEnd = track.scrollLeft >= maxScroll - 1;
    const atStart = track.scrollLeft <= 1;

    if (direction === 1 && atEnd) {
      track.scrollTo({ left: 0 });
      return;
    }
    if (direction === -1 && atStart) {
      track.scrollTo({ left: maxScroll });
      return;
    }

    const gap = parseFloat(getComputedStyle(track).columnGap || '0') || 0;
    track.scrollBy({ left: direction * (first.offsetWidth + gap) });
  }

  protected pauseAutoplay(): void {
    this.pausedByUser = true;
    this.clearAutoplay();
  }

  protected resumeAutoplay(): void {
    this.pausedByUser = false;
    this.clearAutoplay();

    // Le défilement automatique est une animation : on le supprime pour qui
    // demande un mouvement réduit, et il est inutile s'il n'y a pas de
    // débordement à parcourir.
    if (prefersReducedMotion() || !this.hasOverflow()) {
      return;
    }

    this.zone.runOutsideAngular(() => {
      this.autoplayId = setInterval(() => {
        if (!this.pausedByUser) {
          this.scrollByCard(1);
        }
      }, AUTOPLAY_DELAY);
    });
  }

  private clearAutoplay(): void {
    if (this.autoplayId !== undefined) {
      clearInterval(this.autoplayId);
      this.autoplayId = undefined;
    }
  }

  /** Les flèches et le défilement automatique n'ont de sens qu'en cas de débordement. */
  private syncScrollState(): void {
    const track = this.track().nativeElement;
    this.hasOverflow.set(track.scrollWidth - track.clientWidth > 1);
  }
}
