import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LucideArrowRight, LucideCheck, LucideDynamicIcon } from '@lucide/angular';
import { RouterLink } from '@angular/router';
import { Reveal } from '../../../core/animations/reveal.directive';
import { SiteContentService } from '../../../core/site-content.service';
import { SectionHeading } from '../../../shared/ui/section-heading';

@Component({
  selector: 'app-expertise-section',
  imports: [
    NgOptimizedImage,
    SectionHeading,
    LucideDynamicIcon,
    LucideArrowRight,
    LucideCheck,
    Reveal,
    RouterLink,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <section id="services" class="bg-mist-100">
      <div class="mx-auto max-w-7xl px-6 py-16 lg:py-20">
        <app-section-heading
          appReveal
          eyebrow="Nos domaines d'expertise"
          title="Nos domaines d'expertise"
          [intro]="content.expertiseIntro"
        />

        <ul class="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4" appReveal revealStagger="li">
          @for (domain of content.expertiseDomains; track domain.title) {
            <li
              class="group flex flex-col overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-sm transition duration-300 hover:shadow-xl motion-safe:hover:-translate-y-1.5"
            >
              <div class="relative">
                <img
                  [ngSrc]="domain.image.src"
                  [width]="domain.image.width"
                  [height]="domain.image.height"
                  [alt]="domain.image.alt"
                  sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                  class="aspect-3/2 w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
                />
                <span
                  class="absolute -bottom-7 left-6 flex size-14 items-center justify-center rounded-full shadow-lg transition-transform duration-300 motion-safe:group-hover:scale-110"
                  [class]="domain.tone === 'accent' ? 'bg-accent-500' : 'bg-brand-600'"
                >
                  <svg [lucideIcon]="domain.icon" class="size-7 text-white" [strokeWidth]="2" />
                </span>
              </div>

              <div class="flex flex-1 flex-col p-6 pt-12">
                <h3 class="text-xl font-bold leading-snug">{{ domain.title }}</h3>

                <ul class="mt-5 flex-1 space-y-3">
                  @for (benefit of domain.benefits; track benefit) {
                    <li class="flex gap-2.5">
                      <svg lucideCheck class="mt-1 size-4 shrink-0 text-brand-600" [strokeWidth]="3" />
                      <span class="text-ink-400">{{ benefit }}</span>
                    </li>
                  }
                </ul>

                <a
                  [routerLink]="['/services', domain.slug]"
                  class="mt-6 inline-flex items-center justify-between gap-4 font-bold text-brand-600 transition-colors hover:text-brand-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600"
                >
                  En savoir plus
                  <svg lucideArrowRight class="size-5" />
                </a>
              </div>
            </li>
          }
        </ul>
      </div>
    </section>
  `,
})
export class ExpertiseSection {
  protected readonly content = inject(SiteContentService);
}
