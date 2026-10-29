import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LucideDynamicIcon, LucideQuote } from '@lucide/angular';
import { Reveal } from '../../../core/animations/reveal.directive';
import { SiteContentService } from '../../../core/site-content.service';
import { SectionHeading } from '../../../shared/ui/section-heading';

@Component({
  selector: 'app-product-approach-section',
  imports: [SectionHeading, LucideDynamicIcon, LucideQuote, Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <section class="bg-mist-100">
      <div class="mx-auto max-w-7xl px-6 py-16 lg:py-20">
        <app-section-heading
          appReveal
          eyebrow="Approche produit"
          title="Concevoir des solutions réellement utilisées"
          [intro]="content.convictionsIntro"
        />

        <figure class="mt-12 rounded-2xl bg-brand-50 p-8 lg:p-10" appReveal>
          <svg lucideQuote class="size-8 fill-brand-600 text-brand-600" />
          <blockquote class="mt-5 text-xl font-bold leading-relaxed text-brand-600 lg:text-2xl">
            {{ content.quote }}
          </blockquote>
          <figcaption class="mt-6 text-ink-400">
            <span class="font-bold text-ink-700">{{ content.quoteAuthor }}</span>
            <span class="mt-0.5 block text-sm">{{ content.quoteRole }}</span>
          </figcaption>
        </figure>

        <ul class="mt-6 grid gap-5 md:grid-cols-3" appReveal revealStagger="li">
          @for (conviction of content.convictions; track conviction.title) {
            <li
              class="flex flex-col rounded-2xl border border-brand-100 bg-white p-6 shadow-sm transition duration-300 hover:shadow-md motion-safe:hover:-translate-y-1"
            >
              <svg
                [lucideIcon]="conviction.icon"
                class="size-7 text-brand-600"
                [strokeWidth]="1.75"
              />
              <h3 class="mt-5 text-lg font-bold leading-snug">{{ conviction.title }}</h3>
              <p class="mt-3 text-ink-400">{{ conviction.description }}</p>
            </li>
          }
        </ul>
      </div>
    </section>
  `,
})
export class ProductApproachSection {
  protected readonly content = inject(SiteContentService);
}
