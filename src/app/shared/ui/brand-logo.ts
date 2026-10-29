import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

/**
 * Lockup horizontal de la marque : l'icône suivie du nom en deux couleurs.
 *
 * Les PNG fournis sont en composition verticale ; le header et le footer de la
 * maquette utilisent une composition horizontale, d'où le texte en HTML.
 *
 * Le nom reste insécable (comme dans la maquette) : les tailles sont donc
 * réduites sous `sm` pour que le lockup tienne sur un écran de 360 px.
 */
@Component({
  selector: 'app-brand-logo',
  imports: [NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="inline-flex items-center gap-2 sm:gap-3">
      <img
        ngSrc="/logo/logo_icon.png"
        [width]="intrinsicSize()"
        [height]="intrinsicSize()"
        [priority]="priority()"
        alt=""
        class="shrink-0"
        [class]="iconSizeClass()"
      />
      <span class="flex flex-col leading-tight">
        <!-- &ngsp; : Angular supprime les nœuds de texte purement blancs entre éléments. -->
        <span class="whitespace-nowrap font-black tracking-tight" [class]="wordmarkSizeClass()">
          <span [class]="primaryToneClass()">Burkindi Soft</span>&ngsp;<span
            class="text-accent-500"
            >Consulting</span
          >
        </span>
        @if (showTagline()) {
          <span class="mt-0.5 hidden text-xs text-ink-400 lg:block">{{ tagline() }}</span>
        }
      </span>
    </span>
  `,
})
export class BrandLogo {
  /** `dark` pour un fond sombre : le nom passe en blanc. */
  readonly variant = input<'light' | 'dark'>('light');
  /** `md` pour l'en-tête, `lg` pour le pied de page. */
  readonly size = input<'md' | 'lg'>('md');
  readonly priority = input(false);
  readonly showTagline = input(false);
  readonly tagline = input('');

  protected readonly intrinsicSize = computed(() => (this.size() === 'lg' ? 56 : 44));

  protected readonly iconSizeClass = computed(() =>
    this.size() === 'lg' ? 'size-11 sm:size-14' : 'size-9 sm:size-11',
  );

  protected readonly wordmarkSizeClass = computed(() =>
    this.size() === 'lg' ? 'text-lg sm:text-2xl' : 'text-base sm:text-xl',
  );

  protected readonly primaryToneClass = computed(() =>
    this.variant() === 'dark' ? 'text-white' : 'text-brand-800',
  );
}
