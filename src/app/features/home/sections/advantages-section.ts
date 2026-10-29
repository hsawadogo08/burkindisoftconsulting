import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LucideDynamicIcon } from '@lucide/angular';
import { Reveal } from '../../../core/animations/reveal.directive';
import { SiteContentService } from '../../../core/site-content.service';
import { SectionHeading } from '../../../shared/ui/section-heading';

@Component({
  selector: 'app-advantages-section',
  imports: [SectionHeading, LucideDynamicIcon, Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <section class="bg-white">
      <div class="mx-auto max-w-7xl px-6 pt-16 lg:pt-20">
        <app-section-heading
          appReveal
          eyebrow="Nos atouts"
          title="Pourquoi nous choisir ?"
          intro="Des arguments solides, vérifiés par nos clients."
        />

        <ul class="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4" appReveal revealStagger="li">
          @for (advantage of content.advantages; track advantage.title) {
            <li
              class="flex flex-col rounded-2xl border border-brand-100 bg-white p-6 shadow-sm transition duration-300 hover:shadow-md motion-safe:hover:-translate-y-1"
            >
              <div class="flex items-start gap-3">
                <svg
                  [lucideIcon]="advantage.icon"
                  class="mt-0.5 size-7 shrink-0 text-brand-600"
                  [strokeWidth]="1.75"
                />
                <h3 class="text-lg font-bold leading-snug">{{ advantage.title }}</h3>
              </div>
              <p class="mt-3 text-ink-400">{{ advantage.description }}</p>
            </li>
          }
        </ul>
      </div>
    </section>
  `,
})
export class AdvantagesSection {
  protected readonly content = inject(SiteContentService);
}
