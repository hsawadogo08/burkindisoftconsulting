import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LucideDynamicIcon } from '@lucide/angular';
import { RouterLink } from '@angular/router';
import { Reveal } from '../core/animations/reveal.directive';
import { SiteContentService } from '../core/site-content.service';
import { BrandLogo } from '../shared/ui/brand-logo';

@Component({
  selector: 'app-site-footer',
  imports: [BrandLogo, LucideDynamicIcon, Reveal, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block bg-ink-800' },
  template: `
    <div class="mx-auto max-w-7xl px-6 py-14">
      <div
        class="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]"
        appReveal
        revealStagger=":scope > *"
      >
        <div class="lg:pr-8">
          <app-brand-logo variant="dark" size="lg" />
          <p class="mt-5 text-brand-100/80">{{ content.footerTagline }}</p>
          <p class="mt-5 text-sm text-brand-100/60">{{ content.footerKeywords }}</p>
        </div>

        @for (column of content.footerColumns; track column.title) {
          <nav [attr.aria-label]="column.title">
            <h2 class="text-lg font-bold text-white">{{ column.title }}</h2>
            <ul class="mt-5 space-y-3">
              @for (link of column.links; track link.label) {
                <li>
                  <a
                    routerLink="/"
                    [fragment]="link.fragment"
                    class="text-brand-100/80 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                  >
                    {{ link.label }}
                  </a>
                </li>
              }
            </ul>
          </nav>
        }

        <div>
          <h2 class="text-lg font-bold text-white">Contact</h2>
          <ul class="mt-5 space-y-3">
            @for (detail of content.contactDetails; track detail.value) {
              <li class="flex items-center gap-3 text-brand-100/80">
                <svg
                  [lucideIcon]="detail.icon"
                  class="size-4 shrink-0 text-brand-200"
                  [strokeWidth]="2"
                />
                @if (detail.href) {
                  <a
                    [href]="detail.href"
                    class="transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                  >
                    {{ detail.value }}
                  </a>
                } @else {
                  <span>{{ detail.value }}</span>
                }
              </li>
            }
          </ul>
        </div>
      </div>

      <div
        class="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-brand-100/60 sm:flex-row sm:items-center sm:justify-between"
      >
        <p>{{ content.copyright }}</p>
        <ul class="flex items-center gap-3">
          @for (legal of content.legalLinks; track legal; let last = $last) {
            <li class="flex items-center gap-3">
              <span>{{ legal }}</span>
              @if (!last) {
                <span aria-hidden="true" class="text-white/20">|</span>
              }
            </li>
          }
        </ul>
      </div>
    </div>
  `,
})
export class SiteFooter {
  protected readonly content = inject(SiteContentService);
}
