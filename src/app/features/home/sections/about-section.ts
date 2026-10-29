import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LucideArrowRight, LucideDynamicIcon, LucideQuote } from '@lucide/angular';
import { RouterLink } from '@angular/router';
import { Reveal } from '../../../core/animations/reveal.directive';
import { SiteContentService } from '../../../core/site-content.service';
import { SectionHeading } from '../../../shared/ui/section-heading';

@Component({
  selector: 'app-about-section',
  imports: [SectionHeading, LucideDynamicIcon, LucideArrowRight, LucideQuote, Reveal, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <section id="a-propos" class="bg-white">
      <div class="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-2 lg:gap-16 lg:py-20">
        <div class="flex flex-col">
          <app-section-heading eyebrow="À propos" title="Qui sommes-nous ?" appReveal />

          <div class="mt-8 space-y-5 text-lg text-ink-400" appReveal revealStagger="p">
            @for (paragraph of content.aboutParagraphs; track $index) {
              <p>{{ paragraph }}</p>
            }
          </div>

          <a
            routerLink="/"
            fragment="services"
            class="mt-10 inline-flex w-fit items-center gap-10 rounded-xl bg-brand-600 px-8 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-brand-600/25 transition hover:bg-brand-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 motion-safe:active:scale-[0.98] lg:mt-auto"
            appReveal
          >
            En savoir plus
            <svg lucideArrowRight class="size-5" />
          </a>
        </div>

        <div class="flex flex-col gap-6">
          <figure class="rounded-2xl bg-brand-50 p-8" appReveal="right">
            <svg lucideQuote class="size-8 fill-brand-600 text-brand-600" />
            <figcaption class="mt-4 text-xl font-bold text-brand-600">
              {{ content.nameStoryTitle }}
            </figcaption>
            <p class="mt-4 text-lg text-ink-400">{{ content.nameStoryBody }}</p>
          </figure>

          <ul class="grid gap-4 sm:grid-cols-3" appReveal revealStagger="li">
            @for (principle of content.principles; track principle.title) {
              <li class="rounded-2xl border border-brand-100 bg-white p-6 transition duration-300 hover:shadow-md motion-safe:hover:-translate-y-1">
                <svg
                  [lucideIcon]="principle.icon"
                  class="size-8"
                  [class]="principle.tone === 'accent' ? 'text-accent-500' : 'text-brand-600'"
                  [strokeWidth]="1.75"
                />
                <h3 class="mt-5 text-lg font-bold">{{ principle.title }}</h3>
                <p class="mt-2 text-ink-400">{{ principle.description }}</p>
              </li>
            }
          </ul>
        </div>
      </div>
    </section>
  `,
})
export class AboutSection {
  protected readonly content = inject(SiteContentService);
}
