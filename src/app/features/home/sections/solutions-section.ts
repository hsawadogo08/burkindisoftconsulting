import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideArrowRight } from '@lucide/angular';
import { Reveal } from '../../../core/animations/reveal.directive';
import { Tone } from '../../../core/models/site-content.model';
import { SiteContentService } from '../../../core/site-content.service';
import { SectionHeading } from '../../../shared/ui/section-heading';

@Component({
  selector: 'app-solutions-section',
  imports: [SectionHeading, Reveal, RouterLink, LucideArrowRight],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <section id="solutions" class="bg-linear-to-b from-mist-200 to-mist-50">
      <div class="mx-auto max-w-7xl px-6 py-16 lg:py-20">
        <app-section-heading
          appReveal
          eyebrow="Solutions & réalisations"
          title="Nos solutions et nos réalisations"
          [intro]="content.solutionsIntro"
        />

        <ul class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" appReveal revealStagger="li">
          @for (solution of content.saasSolutions; track solution.slug) {
            <li>
              <a
                [routerLink]="['/solutions', solution.slug]"
                class="group flex h-full flex-col items-center rounded-2xl border border-brand-100 bg-white p-7 text-center shadow-sm transition duration-300 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 motion-safe:hover:-translate-y-1.5"
              >
                <!--
                  Les logos vont du carré au format 2,9:1. Une hauteur maximale
                  commune, sans hauteur imposée, les harmonise sans déformer
                  aucun ratio.
                -->
                <span class="flex h-16 items-center justify-center">
                  <img
                    [src]="solution.logo.src"
                    [width]="solution.logo.width"
                    [height]="solution.logo.height"
                    [alt]="solution.logo.alt"
                    loading="lazy"
                    decoding="async"
                    class="max-h-16 w-auto max-w-full object-contain transition-transform duration-300 motion-safe:group-hover:scale-105"
                  />
                </span>

                <h3 class="mt-5 text-xl font-bold">{{ solution.name }}</h3>
                <p class="mt-1 text-ink-400">{{ solution.category }}</p>
                <p class="mt-4 flex-1 text-ink-400">{{ solution.description }}</p>

                <span
                  class="mt-6 rounded-md px-3 py-1 text-sm font-bold"
                  [class]="tagClass(solution.tone)"
                >
                  {{ solution.tag }}
                </span>

                <span class="mt-5 inline-flex items-center gap-2 font-bold text-brand-600">
                  En savoir plus
                  <svg lucideArrowRight class="size-4" />
                </span>
              </a>
            </li>
          }
        </ul>
      </div>
    </section>
  `,
})
export class SolutionsSection {
  protected readonly content = inject(SiteContentService);

  protected tagClass(tone: Tone): string {
    switch (tone) {
      case 'success':
        return 'bg-success-50 text-success-600';
      case 'accent':
        return 'bg-accent-50 text-accent-500';
      default:
        return 'bg-brand-50 text-brand-600';
    }
  }
}
