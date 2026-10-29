import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SiteFooter } from './layout/site-footer';
import { SiteHeader } from './layout/site-header';
import { WhatsappButton } from './shared/ui/whatsapp-button';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SiteHeader, SiteFooter, WhatsappButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a
      href="#accueil"
      class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2 focus:font-bold focus:text-white"
    >
      Aller au contenu principal
    </a>

    <app-site-header />
    <main>
      <router-outlet />
    </main>
    <app-site-footer />
    <app-whatsapp-button />
  `,
})
export class App {}
