import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideArrowRight } from '@lucide/angular';
import { Reveal } from '../../../core/animations/reveal.directive';
import { SiteContentService } from '../../../core/site-content.service';

@Component({
  selector: 'app-cta-section',
  imports: [NgOptimizedImage, LucideArrowRight, Reveal, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <section class="relative isolate overflow-hidden bg-ink-900">
      <!-- Fond décoratif : fill car le cadrage dépend de la hauteur de la bande. -->
      <img
        [ngSrc]="content.ctaBackground.src"
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        class="-z-10 object-cover opacity-25"
      />
      <span aria-hidden="true" class="absolute inset-0 -z-10 bg-ink-900/70"></span>

      <div
        class="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-14 md:flex-row md:items-center md:justify-between"
      >
        <div appReveal revealStagger="p,h2">
          <p class="text-sm font-bold uppercase tracking-wide text-brand-200">
            {{ content.ctaEyebrow }}
          </p>
          <h2 class="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
            {{ content.ctaTitle }}
          </h2>
          <p class="mt-3 text-lg text-brand-100">{{ content.ctaSubtitle }}</p>
        </div>

        <a
          routerLink="/"
          fragment="contact"
          class="inline-flex w-fit shrink-0 items-center gap-8 rounded-xl bg-accent-500 px-8 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-accent-500/30 transition hover:bg-accent-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-safe:hover:scale-105 motion-safe:active:scale-[0.98]"
          appReveal="scale"
          [revealDelay]="0.15"
        >
          {{ content.ctaButton }}
          <svg lucideArrowRight class="size-5" />
        </a>
      </div>
    </section>
  `,
})
export class CtaSection {
  protected readonly content = inject(SiteContentService);

}
