import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SiteContentService } from '../../core/site-content.service';
import { LEGAL_PROSE, LegalPage } from './legal-page';

/**
 * Politique de confidentialité.
 *
 * Le contenu décrit le fonctionnement réel du site, et non un modèle générique :
 * le formulaire de contact n'envoie rien à un serveur (il ouvre la messagerie du
 * visiteur via `mailto:`), aucun cookie n'est posé, les polices sont
 * auto-hébergées et la carte n'est chargée que sur action explicite. Toute
 * évolution de ces quatre points doit se répercuter ici.
 */
@Component({
  selector: 'app-privacy',
  imports: [LegalPage, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <app-legal-page
      eyebrow="Informations légales"
      title="Politique de confidentialité"
      updatedOn="29 octobre 2026"
    >
      <h2 [class]="prose.heading">Responsable du traitement</h2>
      <p [class]="prose.paragraph">
        Le présent site est édité par {{ content.companyName }}, dont le siège est situé à
        {{ content.contactAddress }}. Pour toute question relative à vos données personnelles,
        écrivez à
        <a [href]="'mailto:' + content.contactEmail" [class]="linkClass">
          {{ content.contactEmail }}</a
        >.
      </p>

      <h2 [class]="prose.heading">Aucune donnée collectée par le site</h2>
      <p [class]="prose.paragraph">
        Ce site est entièrement statique : il n'exécute aucun traitement côté serveur, ne dispose
        d'aucune base de données et ne vous demande jamais de créer un compte.
      </p>
      <p [class]="prose.paragraph">
        Le formulaire de contact mérite une précision, car son fonctionnement n'est pas celui qu'on
        attend habituellement : les informations que vous y saisissez
        <span [class]="prose.term">ne sont transmises à aucun serveur</span>. À la validation, le
        site se contente de préparer un courriel et d'ouvrir votre propre logiciel de messagerie
        avec le message pré-rempli. Rien n'est envoyé avant que vous ne cliquiez vous-même sur «
        Envoyer » dans votre messagerie, et le site n'en conserve aucune trace.
      </p>

      <h2 [class]="prose.heading">Courriels que vous nous adressez</h2>
      <p [class]="prose.paragraph">
        Lorsque vous nous écrivez, nous recevons les informations contenues dans votre message (nom,
        adresse électronique, objet et contenu). Elles sont utilisées pour la seule finalité de
        répondre à votre demande, sur la base de votre démarche volontaire, et ne sont ni cédées ni
        revendues à des tiers.
      </p>

      <h2 [class]="prose.heading">Cookies et mesure d'audience</h2>
      <p [class]="prose.paragraph">
        Le site ne dépose
        <span [class]="prose.term">aucun cookie</span>, n'utilise ni stockage local ni stockage de
        session, et n'embarque aucun outil de mesure d'audience ni aucun traceur publicitaire.
        Aucune bannière de consentement n'est donc nécessaire.
      </p>

      <h2 [class]="prose.heading">Services tiers</h2>
      <p [class]="prose.paragraph">
        Le site est conçu pour n'établir aucune connexion vers un tiers tant que vous ne le demandez
        pas :
      </p>
      <ul [class]="prose.list">
        <li>
          <span [class]="prose.term">Polices de caractères</span> : la police Lato est servie depuis
          notre propre serveur. Aucune requête n'est adressée à Google Fonts, et votre adresse IP
          n'est donc transmise à aucun fournisseur de polices.
        </li>
        <li>
          <span [class]="prose.term">Carte Google Maps</span> : la carte de la section Contact n'est
          pas chargée automatiquement. Elle ne s'affiche qu'après un clic sur « Afficher la carte ».
          À partir de ce moment, Google reçoit votre adresse IP et peut déposer ses propres cookies,
          selon
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            [class]="linkClass"
          >
            sa politique de confidentialité</a
          >.
        </li>
        <li>
          <span [class]="prose.term">Liens sortants</span> : les boutons WhatsApp, les numéros de
          téléphone et les sites de nos partenaires vous redirigent vers des services tiers, qui
          appliquent alors leurs propres règles de confidentialité.
        </li>
      </ul>

      <h2 [class]="prose.heading">Hébergement</h2>
      <p [class]="prose.paragraph">
        Le site est hébergé par <span [class]="prose.term">Hostinger International Ltd.</span>,
        société établie à Larnaca, à Chypre. Les serveurs qui hébergent ce site se trouvent en
        Lituanie, donc au sein de l'Union européenne : vos données ne font l'objet d'aucun transfert
        hors de l'Espace économique européen. Les journaux techniques du serveur peuvent conserver
        temporairement les adresses IP de connexion, à des fins de sécurité et de diagnostic.
      </p>

      <h2 [class]="prose.heading">Durée de conservation</h2>
      <p [class]="prose.paragraph">
        Les courriels que vous nous adressez sont conservés dans notre messagerie aussi longtemps
        qu'ils restent utiles au suivi de la relation, sans durée fixée à l'avance. Vous pouvez en
        demander la suppression à tout moment : nous y procédons alors sans délai.
      </p>

      <h2 [class]="prose.heading">Vos droits</h2>
      <p [class]="prose.paragraph">
        Vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation et
        d'opposition sur les données vous concernant. Pour l'exercer, écrivez à
        <a [href]="'mailto:' + content.contactEmail" [class]="linkClass">
          {{ content.contactEmail }}</a
        >. Nous répondons dans un délai de trente jours.
      </p>
      <p [class]="prose.paragraph">
        Ce traitement relève de la loi n° 010-2004/AN du 20 avril 2004 portant protection des
        données à caractère personnel au Burkina Faso. Si vous estimez que vos droits ne sont pas
        respectés, vous pouvez saisir la Commission de l'informatique et des libertés (CIL),
        autorité de contrôle burkinabè.
      </p>
      <p [class]="prose.paragraph">
        Pour les visiteurs résidant dans l'Union européenne, le règlement général sur la protection
        des données (RGPD) s'applique également. Vous disposez alors, en complément, d'un droit à la
        portabilité de vos données, et pouvez introduire une réclamation auprès de l'autorité de
        contrôle de votre pays de résidence.
      </p>

      <h2 [class]="prose.heading">Mentions légales</h2>
      <p [class]="prose.paragraph">
        Les informations relatives à l'éditeur du site figurent sur la page
        <a routerLink="/mentions-legales" [class]="linkClass">Mentions légales</a>.
      </p>
    </app-legal-page>
  `,
})
export class Privacy {
  protected readonly content = inject(SiteContentService);
  protected readonly prose = LEGAL_PROSE;

  protected readonly linkClass =
    'font-bold text-brand-600 underline transition-colors hover:text-brand-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600';
}
