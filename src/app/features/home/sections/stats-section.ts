import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LucideDynamicIcon } from '@lucide/angular';
import { CountUp } from '../../../core/animations/count-up.directive';
import { Reveal } from '../../../core/animations/reveal.directive';
import { SiteContentService } from '../../../core/site-content.service';

@Component({
  selector: 'app-stats-section',
  imports: [LucideDynamicIcon, Reveal, CountUp],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <section class="bg-linear-to-r from-brand-700 to-brand-500" aria-labelledby="chiffres-cles">
      <h2 id="chiffres-cles" class="sr-only">Chiffres clés</h2>
      <div class="mx-auto max-w-7xl px-6">
        <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" appReveal revealStagger="li">
          @for (figure of content.keyFigures; track figure.label) {
            <li
              class="flex items-center gap-4 border-brand-400/40 px-2 py-7 lg:border-l lg:px-6 lg:first:border-l-0"
            >
              <svg
                [lucideIcon]="figure.icon"
                class="size-9 shrink-0 text-white"
                [strokeWidth]="1.5"
              />
              <p>
                @if (figure.count !== undefined) {
                  <span
                    [class]="valueClass"
                    [appCountUp]="figure.count"
                    [countUpPad]="figure.value.length"
                    >{{ figure.value }}</span
                  >
                } @else {
                  <span [class]="valueClass">{{ figure.value }}</span>
                }
                <span class="mt-1 block text-sm text-brand-100 sm:text-base">
                  {{ figure.label }}
                </span>
              </p>
            </li>
          }
        </ul>
      </div>
    </section>
  `,
})
export class StatsSection {
  protected readonly content = inject(SiteContentService);

  /** `tabular-nums` fige la largeur des chiffres pendant l'incrémentation. */
  protected readonly valueClass = 'block text-3xl font-black tabular-nums text-white sm:text-4xl';
}
