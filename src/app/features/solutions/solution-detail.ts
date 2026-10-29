import { ChangeDetectionStrategy, Component, computed, effect, inject, input } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router, RouterLink } from '@angular/router';
import {
  LucideArrowRight,
  LucideCheck,
  LucideCircleCheck,
  LucideSparkles,
} from '@lucide/angular';
import { Reveal } from '../../core/animations/reveal.directive';
import { Tone } from '../../core/models/site-content.model';
import { SiteContentService } from '../../core/site-content.service';
import { Breadcrumb } from '../../shared/ui/breadcrumb';
import { SectionHeading } from '../../shared/ui/section-heading';
import { CtaSection } from '../home/sections/cta-section';

@Component({
  selector: 'app-solution-detail',
  imports: [
    RouterLink,
    Breadcrumb,
    SectionHeading,
    CtaSection,
    Reveal,
    LucideArrowRight,
    LucideCheck,
    LucideCircleCheck,
    LucideSparkles,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    @if (solution(); as product) {
      <article>
        <section class="relative overflow-hidden bg-linear-to-b from-mist-200 to-mist-50">
          <span
            aria-hidden="true"
            class="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-brand-600/10"
          ></span>

          <div class="relative mx-auto max-w-7xl px-6 py-10 lg:py-14">
            <app-breadcrumb
              parentLabel="Solutions"
              parentFragment="solutions"
              [current]="product.name"
            />

            <div class="mt-10 max-w-3xl" appReveal>
              <span
                class="inline-flex h-20 items-center justify-center rounded-2xl bg-white px-6 shadow-sm"
              >
                <img
                  [src]="product.logo.src"
                  [width]="product.logo.width"
                  [height]="product.logo.height"
                  [alt]="product.logo.alt"
                  class="max-h-14 w-auto max-w-full object-contain"
                />
              </span>

              <h1 class="mt-6 text-4xl font-black tracking-tight sm:text-5xl">
                {{ product.name }}
              </h1>
              <p class="mt-2 text-xl text-ink-400">{{ product.category }}</p>

              <span
                class="mt-5 inline-block rounded-md px-3 py-1 text-sm font-bold"
                [class]="tagClass(product.tone)"
              >
                {{ product.tag }}
              </span>

              <p class="mt-6 text-lg text-ink-400">{{ product.summary ?? product.description }}</p>

              <a
                routerLink="/"
                fragment="contact"
                class="mt-9 inline-flex items-center gap-10 rounded-xl bg-brand-600 px-8 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-brand-600/25 transition hover:bg-brand-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 motion-safe:active:scale-[0.98]"
              >
                Demander une démonstration
                <svg lucideArrowRight class="size-5" />
              </a>
            </div>
          </div>
        </section>

        @if (product.features?.length) {
          <section class="bg-white">
            <div class="mx-auto max-w-7xl px-6 py-16 lg:py-20">
              <app-section-heading
                appReveal
                eyebrow="Fonctionnalités clés"
                title="Ce que la plateforme couvre"
                [intro]="product.isRealisation ? '' : content.solutionsLead"
              />

              <ul class="mt-10 grid gap-5 sm:grid-cols-2" appReveal revealStagger="li">
                @for (feature of product.features; track feature) {
                  <li
                    class="flex gap-4 rounded-2xl border border-brand-100 bg-white p-6 shadow-sm transition duration-300 hover:shadow-md motion-safe:hover:-translate-y-1"
                  >
                    <svg
                      lucideCircleCheck
                      class="mt-0.5 size-5 shrink-0 text-brand-600"
                      [strokeWidth]="2"
                    />
                    <span class="text-lg text-ink-700">{{ feature }}</span>
                  </li>
                }
              </ul>
            </div>
          </section>
        }

        @if (product.benefits?.length) {
          <section class="bg-mist-100">
            <div class="mx-auto max-w-7xl px-6 py-16 lg:py-20">
              <app-section-heading
                appReveal
                eyebrow="Bénéfices clients"
                title="Ce que vous y gagnez"
              />

              <ul class="mt-10 grid gap-5 sm:grid-cols-2" appReveal revealStagger="li">
                @for (benefit of product.benefits; track benefit) {
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
        }

        @if (product.contentPending) {
          <section class="bg-white">
            <div class="mx-auto max-w-7xl px-6 py-16 lg:py-20">
              <!--
                La brochure commerciale ne documente pas cette plateforme.
                Plutôt que d'inventer des fonctionnalités, la page signale
                explicitement le contenu restant à fournir.
              -->
              <div
                class="flex flex-col gap-4 rounded-2xl border-2 border-dashed border-brand-200 bg-brand-50 p-8 sm:flex-row sm:items-start"
                appReveal
              >
                <svg lucideSparkles class="size-7 shrink-0 text-brand-600" [strokeWidth]="1.75" />
                <div>
                  <h2 class="text-xl font-bold">Fiche produit à compléter</h2>
                  <p class="mt-3 text-ink-400">
                    La brochure commerciale ne documente pas encore
                    <strong class="font-bold text-ink-700">{{ product.name }}</strong
                    >. Fournissez son descriptif, ses fonctionnalités clés et ses bénéfices clients
                    dans <code class="text-sm">site-content.service.ts</code> : la page les affichera
                    automatiquement et cet encart disparaîtra.
                  </p>
                </div>
              </div>
            </div>
          </section>
        }

        <section [class]="product.contentPending ? 'bg-mist-100' : 'bg-white'">
          <div class="mx-auto max-w-7xl px-6 py-16 lg:py-20">
            <app-section-heading
              appReveal
              eyebrow="Nos autres plateformes"
              title="Poursuivre l'exploration"
            />

            <ul class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" appReveal revealStagger="li">
              @for (other of otherSolutions(); track other.slug) {
                <li>
                  <a
                    [routerLink]="['/solutions', other.slug]"
                    class="flex h-full flex-col rounded-2xl border border-brand-100 bg-white p-6 shadow-sm transition duration-300 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 motion-safe:hover:-translate-y-1"
                  >
                    <span class="flex h-12 items-center justify-center">
                      <img
                        [src]="other.logo.src"
                        [width]="other.logo.width"
                        [height]="other.logo.height"
                        [alt]="other.logo.alt"
                        loading="lazy"
                        class="max-h-12 w-auto max-w-full object-contain"
                      />
                    </span>
                    <h3 class="mt-4 text-lg font-bold">{{ other.name }}</h3>
                    <p class="mt-1 flex-1 text-ink-400">{{ other.category }}</p>
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
export class SolutionDetail {
  /** Alimenté par `withComponentInputBinding()` depuis le paramètre de route. */
  readonly slug = input.required<string>();

  protected readonly content = inject(SiteContentService);
  private readonly router = inject(Router);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  protected readonly solution = computed(() => this.content.solutionBySlug(this.slug()));

  protected readonly otherSolutions = computed(() =>
    this.content.saasSolutions.filter((item) => item.slug !== this.slug()),
  );

  constructor() {
    effect(() => {
      const product = this.solution();

      if (!product) {
        void this.router.navigate(['/'], { fragment: 'solutions' });
        return;
      }

      this.title.setTitle(`${product.name} — ${this.content.companyName}`);
      this.meta.updateTag({
        name: 'description',
        content: product.summary ?? product.description,
      });
    });
  }

  protected tagClass(tone: Tone): string {
    switch (tone) {
      case 'success':
        return 'bg-success-50 text-success-600';
      case 'accent':
        return 'bg-accent-50 text-accent-500';
      default:
        return 'bg-brand-50 text-brand-600';
    }
  }
}
