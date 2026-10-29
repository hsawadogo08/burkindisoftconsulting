import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideArrowLeft, LucideSparkles } from '@lucide/angular';
import { Reveal } from '../../core/animations/reveal.directive';

/**
 * Classes de typographie communes aux deux pages légales.
 *
 * `@tailwindcss/typography` n'est pas installé et n'est pas ajouté pour deux
 * pages : les styles reprennent les tokens du site et sont centralisés ici pour
 * que « Confidentialité » et « Mentions légales » ne divergent pas.
 *
 * Les puces passent par `list-disc` plutôt que par un pseudo-élément : le
 * preflight de Tailwind retire les marqueurs, `list-disc` les rétablit et
 * `marker:` les colore, sans dépendre d'un `content` injecté.
 */
export const LEGAL_PROSE = {
  heading: 'mt-10 text-xl font-bold',
  paragraph: 'mt-4 text-ink-400',
  list: 'mt-4 list-disc space-y-2 pl-5 text-ink-400 marker:text-accent-500',
  term: 'font-bold text-ink-700',
  /** Marque une information que le cabinet doit encore fournir. */
  pending: 'rounded bg-accent-50 px-2 py-0.5 font-bold text-accent-500',
} as const;

/**
 * Coquille partagée des pages légales : bandeau de titre, date de mise à jour
 * et corps de texte projeté.
 *
 * `pendingItems` affiche un encart listant les informations manquantes, sur le
 * modèle de l'encart « Fiche produit à compléter » des pages de solution. Il
 * est volontairement visible à l'écran : un `TODO` en commentaire se serait
 * retrouvé en production sans que personne ne le voie.
 */
@Component({
  selector: 'app-legal-page',
  imports: [RouterLink, Reveal, LucideArrowLeft, LucideSparkles],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <article>
      <section class="bg-linear-to-b from-mist-200 to-mist-50">
        <div class="mx-auto max-w-3xl px-6 py-10 lg:py-14" appReveal>
          <a
            routerLink="/"
            fragment="accueil"
            class="inline-flex items-center gap-2 font-bold text-brand-600 transition-colors hover:text-brand-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600"
          >
            <svg lucideArrowLeft class="size-4" />
            Retour à l'accueil
          </a>

          <p class="mt-8 text-sm font-bold uppercase tracking-wide text-accent-500">
            {{ eyebrow() }}
          </p>
          <h1 class="mt-3 text-3xl font-black tracking-tight sm:text-4xl">{{ title() }}</h1>
          <span class="mt-4 block h-1 w-20 rounded-full bg-accent-500"></span>

          <p class="mt-6 text-sm text-ink-400">Dernière mise à jour : {{ updatedOn() }}</p>
        </div>
      </section>

      <section class="bg-white">
        <div class="mx-auto max-w-3xl px-6 py-12 lg:py-16">
          @if (pendingItems().length) {
            <div
              class="mb-10 flex flex-col gap-4 rounded-2xl border-2 border-dashed border-brand-200 bg-brand-50 p-6 sm:flex-row sm:items-start"
              appReveal
            >
              <svg lucideSparkles class="size-7 shrink-0 text-brand-600" [strokeWidth]="1.75" />
              <div>
                <h2 class="text-lg font-bold">Informations à fournir avant la mise en ligne</h2>
                <ul class="mt-3 list-disc space-y-1 pl-5 text-ink-400 marker:text-brand-600">
                  @for (item of pendingItems(); track item) {
                    <li>{{ item }}</li>
                  }
                </ul>
              </div>
            </div>
          }

          <div appReveal>
            <ng-content />
          </div>
        </div>
      </section>
    </article>
  `,
})
export class LegalPage {
  readonly eyebrow = input.required<string>();
  readonly title = input.required<string>();
  readonly updatedOn = input.required<string>();
  readonly pendingItems = input<readonly string[]>([]);
}
