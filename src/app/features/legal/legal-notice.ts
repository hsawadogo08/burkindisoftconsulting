import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SiteContentService } from '../../core/site-content.service';
import { LEGAL_PROSE, LegalPage } from './legal-page';

/**
 * Mentions légales.
 *
 * La page est complète. Les identifiants de l'entreprise ont été fournis par le
 * cabinet, les crédits logiciels sont relevés dans les paquets installés, et
 * l'identité de l'hébergeur provient de ses propres documents juridiques.
 */
@Component({
  selector: 'app-legal-notice',
  imports: [LegalPage, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <app-legal-page
      eyebrow="Informations légales"
      title="Mentions légales"
      updatedOn="29 octobre 2026"
    >
      <h2 [class]="prose.heading">Éditeur du site</h2>
      <ul [class]="prose.list">
        <li><span [class]="prose.term">Dénomination</span> : {{ content.companyName }}</li>
        <li><span [class]="prose.term">Forme juridique</span> : entreprise individuelle</li>
        <li><span [class]="prose.term">Siège social</span> : {{ content.contactAddress }}</li>
        <li><span [class]="prose.term">Numéro IFU</span> : 00178677M</li>
        <li><span [class]="prose.term">Numéro RCCM</span> : BF-OUA-01-2022-A10-4477</li>
        <li><span [class]="prose.term">Responsable de la publication</span> : SAWADOGO Hubert</li>
      </ul>

      <h2 [class]="prose.heading">Nous contacter</h2>
      <ul [class]="prose.list">
        <li>
          <span [class]="prose.term">Courriel</span> :
          <a [href]="'mailto:' + content.contactEmail" [class]="linkClass">
            {{ content.contactEmail }}</a
          >
        </li>
        <li>
          <span [class]="prose.term">Téléphone</span> :
          <a [href]="content.contactPhoneHref" [class]="linkClass">{{ content.contactPhone }}</a>
        </li>
      </ul>

      <h2 [class]="prose.heading">Hébergement</h2>
      <p [class]="prose.paragraph">
        Le site est hébergé par <span [class]="prose.term">Hostinger International Ltd.</span>,
        société à responsabilité limitée de droit chypriote dont le siège social est situé 61 Lordou
        Vironos str., 6023 Larnaca, Chypre. L'hébergeur est joignable via
        <a
          href="https://www.hostinger.fr/contact"
          target="_blank"
          rel="noopener noreferrer"
          [class]="linkClass"
          >son formulaire de contact</a
        >.
      </p>

      <h2 [class]="prose.heading">Propriété intellectuelle</h2>
      <p [class]="prose.paragraph">
        La structure du site, ses textes, sa charte graphique, son logotype et les noms des
        plateformes présentées sont la propriété de {{ content.companyName }}, sauf mention
        contraire. Toute reproduction ou représentation, totale ou partielle, sans autorisation
        écrite préalable est interdite.
      </p>
      <p [class]="prose.paragraph">
        Les logos de nos partenaires et clients restent la propriété de leurs titulaires respectifs
        et sont affichés avec leur accord, à titre de référence commerciale.
      </p>

      <h2 [class]="prose.heading">Crédits</h2>
      <ul [class]="prose.list">
        <li>
          <span [class]="prose.term">Police de caractères</span> : Lato, par Łukasz Dziedzic, sous
          SIL Open Font License 1.1, auto-hébergée.
        </li>
        <li><span [class]="prose.term">Icônes</span> : Lucide, sous licence ISC.</li>
        <li>
          <span [class]="prose.term">Animations</span> : GSAP, sous sa licence standard sans frais.
        </li>
        <li>
          <span [class]="prose.term">Développement</span> : Angular, sous licence MIT, et Tailwind
          CSS, sous licence MIT.
        </li>
        <li>
          <span [class]="prose.term">Photographies</span> : le visuel principal a été fourni par le
          cabinet ; les autres photographies proviennent de Pexels, dont la licence autorise l'usage
          commercial sans attribution obligatoire.
        </li>
      </ul>

      <h2 [class]="prose.heading">Données personnelles</h2>
      <p [class]="prose.paragraph">
        Le site ne dépose aucun cookie et ne collecte aucune donnée à votre insu. Le détail du
        fonctionnement figure dans notre
        <a routerLink="/confidentialite" [class]="linkClass">politique de confidentialité</a>.
      </p>
    </app-legal-page>
  `,
})
export class LegalNotice {
  protected readonly content = inject(SiteContentService);
  protected readonly prose = LEGAL_PROSE;

  protected readonly linkClass =
    'font-bold text-brand-600 underline transition-colors hover:text-brand-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600';
}
