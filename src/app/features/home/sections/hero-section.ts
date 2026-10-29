import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  LucideArrowRight,
  LucideChartColumn,
  LucideCloud,
  LucideCodeXml,
  LucideDynamicIcon,
} from '@lucide/angular';
import { RouterLink } from '@angular/router';
import { Float } from '../../../core/animations/float.directive';
import { HeroIntro } from '../../../core/animations/hero-intro.directive';
import { SiteContentService } from '../../../core/site-content.service';

@Component({
  selector: 'app-hero-section',
  imports: [
    NgOptimizedImage,
    LucideDynamicIcon,
    LucideArrowRight,
    LucideChartColumn,
    LucideCloud,
    LucideCodeXml,
    HeroIntro,
    Float,
    RouterLink,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <section id="accueil" class="relative overflow-hidden bg-mist-100" appHeroIntro>
      <!-- Décors : halos repris de la maquette. -->
      <span
        aria-hidden="true"
        class="pointer-events-none absolute -left-40 top-24 size-[32rem] rounded-full bg-brand-100/50 blur-3xl"
        appFloat
        [floatAmplitude]="18"
      ></span>
      <span
        aria-hidden="true"
        class="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-brand-600/10"
        appFloat
        [floatAmplitude]="12"
        [floatDelay]="0.8"
      ></span>

      <div
        class="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-12 lg:py-20"
      >
        <div>
          <p
            class="inline-block rounded-full bg-brand-100 px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-brand-700 sm:text-sm"
            data-hero="badge"
          >
            {{ content.heroBadge }}
          </p>

          <!-- text-wrap neutralise le text-balance global : la maquette découpe en 3 lignes. -->
          <h1
            class="mt-7 text-wrap text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.4rem]"
            data-hero="title"
          >
            {{ content.heroTitleLead }}
            <span class="text-accent-500">{{ content.heroTitleAccent }}</span>
          </h1>

          <p class="mt-6 max-w-xl text-lg text-ink-400" data-hero="lead">{{ content.heroLead }}</p>

          <ul class="mt-9 grid grid-cols-2 gap-4 sm:grid-cols-4">
            @for (pillar of content.pillars; track pillar.label) {
              <li
                class="rounded-xl border border-brand-100 bg-white p-4 shadow-sm transition duration-300 hover:shadow-md motion-safe:hover:-translate-y-1"
                data-hero="pillar"
              >
                <svg [lucideIcon]="pillar.icon" class="size-7 text-brand-600" [strokeWidth]="1.75" />
                <span class="mt-4 block text-sm font-bold text-ink-700">{{ pillar.label }}</span>
              </li>
            }
          </ul>

          <a
            routerLink="/"
            fragment="contact"
            class="mt-9 inline-flex items-center gap-10 rounded-xl bg-brand-600 px-8 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-brand-600/25 transition hover:bg-brand-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 motion-safe:active:scale-[0.98]"
            data-hero="cta"
          >
            {{ content.heroCta }}
            <svg lucideArrowRight class="size-5" />
          </a>
        </div>

        <div class="relative">
          <!-- Le cadrage est imposé par le conteneur : fill évite tout conflit de ratio. -->
          <div
            class="relative aspect-4/3 w-full overflow-hidden rounded-3xl shadow-2xl shadow-ink-900/15 lg:aspect-square"
            data-hero="visual"
          >
            <img
              [ngSrc]="content.heroImage.src"
              [alt]="content.heroImage.alt"
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              class="object-cover object-[68%_center]"
            />
          </div>

          <!-- Cartes flottantes : masquées sous lg pour ne pas couvrir la photo. -->
          <figure
            class="absolute -left-6 top-10 hidden rounded-2xl bg-white/95 px-4 py-3 shadow-xl backdrop-blur lg:block"
            data-hero="card"
          >
            <svg lucideChartColumn class="size-6 text-brand-600" />
            <figcaption class="mt-2 text-sm font-bold text-ink-700">Solutions<br />métiers</figcaption>
          </figure>

          <figure
            class="absolute bottom-24 left-5 hidden rounded-2xl bg-white/95 px-4 py-3 shadow-xl backdrop-blur xl:block"
            data-hero="card"
          >
            <svg lucideCloud class="size-6 text-brand-600" />
            <figcaption class="mt-2 text-sm font-bold text-ink-700">Cloud & DevOps</figcaption>
          </figure>

          <figure
            class="absolute -right-5 bottom-10 hidden rounded-2xl bg-white/95 px-4 py-3 shadow-xl backdrop-blur lg:block"
            data-hero="card"
          >
            <span class="flex size-9 items-center justify-center rounded-full bg-accent-500">
              <svg lucideCodeXml class="size-5 text-white" />
            </span>
            <figcaption class="mt-2 text-sm font-bold text-ink-700">
              Applications<br />web & mobiles
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  `,
})
export class HeroSection {
  protected readonly content = inject(SiteContentService);
}
