import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, inject, input } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router, RouterLink } from '@angular/router';
import { LucideArrowRight, LucideCheck, LucideDynamicIcon } from '@lucide/angular';
import { Reveal } from '../../core/animations/reveal.directive';
import { SiteContentService } from '../../core/site-content.service';
import { Breadcrumb } from '../../shared/ui/breadcrumb';
import { SectionHeading } from '../../shared/ui/section-heading';
import { CtaSection } from '../home/sections/cta-section';

@Component({
  selector: 'app-service-detail',
  imports: [
    NgOptimizedImage,
    RouterLink,
    Breadcrumb,
    SectionHeading,
    CtaSection,
    Reveal,
    LucideDynamicIcon,
    LucideArrowRight,
    LucideCheck,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    @if (domain(); as service) {
      <article>
        <section class="relative overflow-hidden bg-mist-100">
          <span
            aria-hidden="true"
            class="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-brand-600/10"
          ></span>

          <div class="relative mx-auto max-w-7xl px-6 py-10 lg:py-14">
            <app-breadcrumb
              parentLabel="Services"
              parentFragment="services"
              [current]="service.title"
            />

            <div class="mt-10 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <div appReveal>
                <span
                  class="flex size-14 items-center justify-center rounded-2xl shadow-lg"
                  [class]="service.tone === 'accent' ? 'bg-accent-500' : 'bg-brand-600'"
                >
                  <svg [lucideIcon]="service.icon" class="size-7 text-white" [strokeWidth]="2" />
                </span>

                <h1 class="mt-6 text-4xl font-black tracking-tight sm:text-5xl">
                  {{ service.title }}
                </h1>
                <p class="mt-6 text-lg text-ink-400">{{ service.summary }}</p>

                <a
                  routerLink="/"
                  fragment="contact"
                  class="mt-9 inline-flex items-center gap-10 rounded-xl bg-brand-600 px-8 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-brand-600/25 transition hover:bg-brand-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 motion-safe:active:scale-[0.98]"
                >
                  Discuter de votre projet
                  <svg lucideArrowRight class="size-5" />
                </a>
              </div>

              <div
                class="relative aspect-3/2 w-full overflow-hidden rounded-3xl shadow-2xl shadow-ink-900/15"
                appReveal="right"
              >
                <img
                  [ngSrc]="service.image.src"
                  [alt]="service.image.alt"
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  class="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section class="bg-white">
          <div class="mx-auto max-w-7xl px-6 py-16 lg:py-20">
            <app-section-heading
              appReveal
              eyebrow="Bénéfices clients"
              title="Ce que vous y gagnez"
            />

            <ul class="mt-10 grid gap-5 sm:grid-cols-2" appReveal revealStagger="li">
              @for (benefit of service.detailBenefits; track benefit) {
                <li
                  class="flex gap-4 rounded-2xl border border-brand-100 bg-white p-6 shadow-sm transition duration-300 hover:shadow-md motion-safe:hover:-translate-y-1"
                >
                  <svg lucideCheck class="mt-1 size-5 shrink-0 text-brand-600" [strokeWidth]="3" />
                  <span class="text-lg text-ink-700">{{ benefit }}</span>
                </li>
              }
            </ul>
          </div>
        </section>

        <section class="bg-mist-100">
          <div class="mx-auto max-w-7xl px-6 py-16 lg:py-20">
            <app-section-heading
              appReveal
              eyebrow="Notre approche"
              title="Quatre phases, du cadrage au suivi"
              [intro]="content.phasesIntro"
            />

            <ol class="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4" appReveal revealStagger="li">
              @for (phase of content.projectPhases; track phase.step) {
                <li
                  class="flex flex-col rounded-2xl border border-brand-100 bg-white p-6 shadow-sm transition duration-300 hover:shadow-md motion-safe:hover:-translate-y-1"
                >
                  <div class="flex items-center justify-between">
                    <svg
                      [lucideIcon]="phase.icon"
                      class="size-7 text-brand-600"
                      [strokeWidth]="1.75"
                    />
                    <span class="text-2xl font-black tabular-nums text-brand-100">
                      {{ phase.step }}
                    </span>
                  </div>
                  <h3 class="mt-5 text-lg font-bold">{{ phase.title }}</h3>
                  <p class="mt-3 text-ink-400">{{ phase.description }}</p>
                </li>
              }
            </ol>
          </div>
        </section>

        <section class="bg-white">
          <div class="mx-auto max-w-7xl px-6 py-16 lg:py-20">
            <app-section-heading
              appReveal
              eyebrow="Nos autres domaines"
              title="Poursuivre l'exploration"
            />

            <ul class="mt-10 grid gap-5 sm:grid-cols-3" appReveal revealStagger="li">
              @for (other of otherDomains(); track other.slug) {
                <li>
                  <a
                    [routerLink]="['/services', other.slug]"
                    class="flex h-full flex-col rounded-2xl border border-brand-100 bg-white p-6 shadow-sm transition duration-300 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 motion-safe:hover:-translate-y-1"
                  >
                    <svg
                      [lucideIcon]="other.icon"
                      class="size-7"
                      [class]="other.tone === 'accent' ? 'text-accent-500' : 'text-brand-600'"
                      [strokeWidth]="1.75"
                    />
                    <h3 class="mt-4 flex-1 text-lg font-bold">{{ other.title }}</h3>
                    <span class="mt-4 inline-flex items-center gap-2 font-bold text-brand-600">
                      En savoir plus
                      <svg lucideArrowRight class="size-4" />
                    </span>
                  </a>
                </li>
              }
            </ul>
          </div>
        </section>

        <app-cta-section />
      </article>
    }
  `,
})
export class ServiceDetail {
  /** Alimenté par `withComponentInputBinding()` depuis le paramètre de route. */
  readonly slug = input.required<string>();

  protected readonly content = inject(SiteContentService);
  private readonly router = inject(Router);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  protected readonly domain = computed(() => this.content.expertiseBySlug(this.slug()));

  protected readonly otherDomains = computed(() =>
    this.content.expertiseDomains.filter((item) => item.slug !== this.slug()),
  );

  constructor() {
    effect(() => {
      const service = this.domain();

      // Slug inconnu : on renvoie vers la section correspondante de l'accueil
      // plutôt que d'afficher une page vide.
      if (!service) {
        void this.router.navigate(['/'], { fragment: 'services' });
        return;
      }

      this.title.setTitle(`${service.title} — ${this.content.companyName}`);
      this.meta.updateTag({ name: 'description', content: service.summary });
    });
  }
}
