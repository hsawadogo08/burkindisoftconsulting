import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LucideQuote, LucideTrendingUp } from '@lucide/angular';
import { Reveal } from '../../../core/animations/reveal.directive';
import { SiteContentService } from '../../../core/site-content.service';
import { SectionHeading } from '../../../shared/ui/section-heading';

@Component({
  selector: 'app-use-cases-section',
  imports: [SectionHeading, LucideQuote, LucideTrendingUp, Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <section id="references" class="bg-white">
      <div class="mx-auto max-w-7xl px-6 pb-16 pt-14 lg:pb-20">
        <app-section-heading
          appReveal
          eyebrow="Références & cas d'usage"
          title="Des résultats concrets sur le terrain"
          [intro]="content.useCasesIntro"
        />

        <ul class="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4" appReveal revealStagger="li">
          @for (useCase of content.useCases; track useCase.sector) {
            <li
              class="flex flex-col rounded-2xl border border-brand-100 bg-white p-6 shadow-sm transition duration-300 hover:shadow-md motion-safe:hover:-translate-y-1"
            >
              <div class="flex items-center gap-3">
                <svg lucideQuote class="size-5 shrink-0 fill-brand-600 text-brand-600" />
                <h3 class="text-lg font-bold">{{ useCase.sector }}</h3>
              </div>

              <p class="mt-4 flex-1 text-ink-400">{{ useCase.description }}</p>

              <p class="mt-5 flex gap-2.5 rounded-xl bg-brand-50 p-4 text-ink-700">
                <svg lucideTrendingUp class="mt-0.5 size-5 shrink-0 text-brand-600" />
                <span><span class="font-bold">Résultat :</span> {{ useCase.result }}</span>
              </p>

              <p
                class="mt-5 border-t border-brand-100 pt-4 text-sm font-bold uppercase tracking-wide text-brand-600"
              >
                {{ useCase.tag }}
              </p>
            </li>
          }
        </ul>
      </div>
    </section>
  `,
})
export class UseCasesSection {
  protected readonly content = inject(SiteContentService);
}
