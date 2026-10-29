import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * Sur-titre rouge, titre de section et filet rouge.
 *
 * Quand `intro` est fourni, le texte d'accompagnement se place à droite du
 * titre comme dans la maquette ; sinon le titre occupe toute la largeur.
 */
@Component({
  selector: 'app-section-heading',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="layoutClass()">
      <div>
        <p class="text-sm font-bold uppercase tracking-wide text-accent-500">{{ eyebrow() }}</p>
        <h2 class="mt-3 text-3xl font-black tracking-tight sm:text-4xl" [class]="titleToneClass()">
          {{ title() }}
        </h2>
        <span class="mt-4 block h-1 w-20 rounded-full bg-accent-500"></span>
      </div>
      @if (intro(); as introText) {
        <p class="text-lg md:pb-2" [class]="introToneClass()">{{ introText }}</p>
      }
    </div>
  `,
})
export class SectionHeading {
  readonly eyebrow = input.required<string>();
  readonly title = input.required<string>();
  readonly intro = input('');
  /** `dark` pour un fond sombre : titre et intro passent en clair. */
  readonly variant = input<'light' | 'dark'>('light');

  protected readonly layoutClass = computed(() =>
    this.intro()
      ? 'grid gap-x-12 gap-y-5 md:grid-cols-2 md:items-end'
      : 'grid gap-y-5',
  );

  protected readonly titleToneClass = computed(() =>
    this.variant() === 'dark' ? 'text-white' : 'text-ink-700',
  );

  protected readonly introToneClass = computed(() =>
    this.variant() === 'dark' ? 'text-brand-100' : 'text-ink-400',
  );
}
