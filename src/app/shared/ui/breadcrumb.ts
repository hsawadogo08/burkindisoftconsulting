import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideChevronRight } from '@lucide/angular';

/**
 * Fil d'Ariane des pages de détail.
 *
 * Les deux premiers niveaux renvoient vers la page d'accueil (et sa section),
 * le site restant organisé en page unique.
 */
@Component({
  selector: 'app-breadcrumb',
  imports: [RouterLink, LucideChevronRight],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav aria-label="Fil d'Ariane">
      <ol class="flex flex-wrap items-center gap-2 text-sm text-ink-400">
        <li>
          <a
            routerLink="/"
            fragment="accueil"
            class="transition-colors hover:text-brand-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600"
          >
            Accueil
          </a>
        </li>
        <li aria-hidden="true" class="flex items-center">
          <svg lucideChevronRight class="size-4" />
        </li>
        <li>
          <a
            routerLink="/"
            [fragment]="parentFragment()"
            class="transition-colors hover:text-brand-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600"
          >
            {{ parentLabel() }}
          </a>
        </li>
        <li aria-hidden="true" class="flex items-center">
          <svg lucideChevronRight class="size-4" />
        </li>
        <li class="font-bold text-ink-700" aria-current="page">{{ current() }}</li>
      </ol>
    </nav>
  `,
})
export class Breadcrumb {
  readonly parentLabel = input.required<string>();
  readonly parentFragment = input.required<string>();
  readonly current = input.required<string>();
}
