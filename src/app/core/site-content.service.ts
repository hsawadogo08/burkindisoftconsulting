import { Injectable } from '@angular/core';
import {
  LucideActivity,
  LucideBedDouble,
  LucideChartColumn,
  LucideCircleCheck,
  LucideCloud,
  LucideCodeXml,
  LucideDatabase,
  LucideFileText,
  LucideGlobe,
  LucideGraduationCap,
  LucideHeartHandshake,
  LucideLayers,
  LucideMail,
  LucideMapPin,
  LucidePencilRuler,
  LucidePhone,
  LucideRefreshCw,
  LucideRocket,
  LucideRoute,
  LucideSearch,
  LucideSettings,
  LucideShieldCheck,
  LucideSmartphone,
  LucideTarget,
  LucideUsersRound,
  LucideWallet,
} from '@lucide/angular';
import {
  Advantage,
  ContactDetail,
  Conviction,
  ExpertiseDomain,
  FooterColumn,
  KeyFigure,
  LegalLink,
  NavLink,
  Partner,
  Pillar,
  Principle,
  ProjectPhase,
  SaasSolution,
  UseCase,
} from './models/site-content.model';

/**
 * Source unique du contenu éditorial du site.
 *
 * Les textes sont repris mot pour mot de la maquette
 * `Burkindi_Soft_Consulting_Apercu_Site_Web_HD.pdf`.
 */
@Injectable({ providedIn: 'root' })
export class SiteContentService {
  readonly companyName = 'Burkindi Soft Consulting';
  readonly tagline = 'Nous transformons vos idées en solutions digitales performantes';

  readonly navLinks: readonly NavLink[] = [
    { label: 'Accueil', fragment: 'accueil' },
    { label: 'À propos', fragment: 'a-propos' },
    { label: 'Services', fragment: 'services' },
    { label: 'Solutions', fragment: 'solutions' },
    { label: 'Contact', fragment: 'contact' },
  ];

  // --- Hero ---------------------------------------------------------------

  readonly heroBadge = 'Cabinet de conseil & solutions digitales';
  readonly heroTitleLead = 'Nous transformons vos idées en solutions';
  readonly heroTitleAccent = 'digitales performantes';
  readonly heroLead =
    'Conseil, développement logiciel, intégration IT, cloud et formations pour accélérer la transformation digitale de votre organisation.';
  readonly heroCta = 'Donnons vie à vos projets';

  readonly heroImage = {
    src: '/images/hero-consultant.webp',
    alt: "Consultante Burkindi Soft Consulting au travail sur son ordinateur portable",
    width: 1536,
    height: 1024,
  };

  readonly pillars: readonly Pillar[] = [
    { label: 'Conseil', icon: LucideTarget },
    { label: 'Développement', icon: LucideCodeXml },
    { label: 'Cloud & DevOps', icon: LucideCloud },
    { label: 'Formations', icon: LucideGraduationCap },
  ];

  // --- À propos -----------------------------------------------------------

  readonly aboutParagraphs: readonly string[] = [
    "Burkindi Soft Consulting est un cabinet burkinabè de conseil et de développement de solutions digitales. Nos métiers complémentaires : le conseil et l'intégration IT sur mesure, et l'édition de plateformes SaaS sectorielles.",
    'Notre expérience terrain nourrit nos produits et nos produits révèlent les besoins qui orientent notre conseil. Une expertise pensée pour les réalités africaines.',
  ];

  readonly nameStoryTitle = '« Burkindi », le nom qui nous engage';
  readonly nameStoryBody =
    "Le nom Burkindi vient du concept de burkindlim : l'homme intègre, celui qui agit avec droiture. Cet héritage se traduit par la rigueur, la transparence et la responsabilité dans chacune de nos interventions.";

  readonly principles: readonly Principle[] = [
    {
      title: 'Vision',
      description: 'Devenir la référence africaine du conseil et des solutions digitales sur mesure.',
      icon: LucideTarget,
      tone: 'brand',
    },
    {
      title: 'Mission',
      description: 'Concevoir des solutions numériques accessibles, durables et à fort impact.',
      icon: LucideChartColumn,
      tone: 'accent',
    },
    {
      title: 'Nos valeurs',
      description: 'Excellence · Innovation · Proximité · Impact social · Intégrité',
      icon: LucideShieldCheck,
      tone: 'brand',
    },
  ];

  // --- Domaines d'expertise -----------------------------------------------

  readonly expertiseIntro = 'Des solutions complètes, de la conception au déploiement.';

  readonly expertiseDomains: readonly ExpertiseDomain[] = [
    {
      slug: 'developpement-logiciel-sur-mesure',
      title: 'Développement logiciel sur mesure',
      summary:
        'Conception et développement d\'applications web, mobiles et métiers parfaitement adaptées à vos processus. Nous couvrons l\'ensemble du cycle de vie logiciel, de la spécification jusqu\'à la maintenance évolutive.',
      detailBenefits: [
        'Applications robustes, évolutives et sécurisées',
        'Réduction des coûts opérationnels grâce à l\'automatisation',
        'Accélération de la transformation digitale de votre organisation',
        'Solutions interfaçables avec vos systèmes existants',
      ],
      benefits: [
        'Applications web, mobiles et métiers',
        'Solutions robustes et évolutives',
        'Automatisation de vos processus',
        'Interopérabilité avec vos systèmes',
      ],
      icon: LucideCodeXml,
      tone: 'accent',
      image: {
        src: '/images/expertise-developpement.jpg',
        alt: "Écran affichant du code source lors d'un développement sur mesure",
        width: 900,
        height: 600,
      },
    },
    {
      slug: 'integration-it-systemes-information',
      title: "Intégration IT & Systèmes d'information",
      summary:
        'Accompagnement complet dans la mise en place et l\'interconnexion de vos systèmes d\'information. Nous assurons la cohérence, la sécurité et la performance de votre infrastructure numérique.',
      detailBenefits: [
        'Interopérabilité fluide entre vos applications',
        'Centralisation et fiabilisation de vos données',
        'Gain de productivité et de visibilité opérationnelle',
        'Sécurisation et traçabilité de vos échanges de données',
      ],
      benefits: [
        'Interconnexion des systèmes',
        'Centralisation des données',
        'Productivité et visibilité',
        'Sécurisation et traçabilité',
      ],
      icon: LucideDatabase,
      tone: 'brand',
      image: {
        src: '/images/expertise-integration.jpg',
        alt: 'Représentation abstraite de systèmes interconnectés',
        width: 900,
        height: 600,
      },
    },
    {
      slug: 'devops-infrastructure-cloud',
      title: 'DevOps & Infrastructure Cloud',
      summary:
        'Déploiement et gestion d\'infrastructures cloud modernes, mise en place de pipelines CI/CD, conteneurisation et orchestration pour des livraisons rapides et fiables.',
      detailBenefits: [
        'Réduction du time-to-market de vos projets',
        'Haute disponibilité et scalabilité de vos applications',
        'Coûts d\'infrastructure optimisés',
        'Processus de déploiement automatisés et sécurisés',
      ],
      benefits: [
        'Déploiement cloud moderne',
        'Pipelines CI/CD',
        'Conteneurisation',
        'Disponibilité et scalabilité',
      ],
      icon: LucideCloud,
      tone: 'accent',
      image: {
        src: '/images/expertise-cloud.jpg',
        alt: 'Baies de serveurs dans un centre de données',
        width: 900,
        height: 602,
      },
    },
    {
      slug: 'formation-it-montee-en-competences',
      title: 'Formation IT & Montée en compétences',
      summary:
        'Programmes de formation pratiques et adaptés à votre contexte métier. Nos formateurs expérimentés transmettent des compétences immédiatement opérationnelles.',
      detailBenefits: [
        'Équipes autonomes et compétentes sur les outils déployés',
        'Réduction de la dépendance aux prestataires externes',
        'Retour sur investissement mesurable et rapide',
        'Contenu personnalisé selon votre secteur et vos outils',
      ],
      benefits: [
        'Formations pratiques et adaptées',
        'Équipes autonomes',
        'Moins de dépendance externe',
        'Retour sur investissement',
      ],
      icon: LucideGraduationCap,
      tone: 'brand',
      image: {
        src: '/images/expertise-formation.jpg',
        alt: 'Session de formation en salle avec des participants',
        width: 900,
        height: 600,
      },
    },
  ];

  // --- Solutions métiers --------------------------------------------------

  readonly solutionsIntro =
    'Des solutions sectorielles nées des besoins terrain et conçues pour évoluer avec vos usages.';

  readonly solutionsLead =
    "Nos plateformes SaaS sont conçues et exploitées par Burkindi Soft Consulting. Elles ne sont pas de simples outils génériques : chacune est née d'une demande terrain, validée par des utilisateurs réels, et évolutive selon les retours d'usage.";

  readonly saasSolutions: readonly SaasSolution[] = [
    {
      slug: 'ehotelia',
      name: 'eHotelia',
      category: 'Gestion hôtelière intelligente',
      description: 'Réservations, chambres, facturation et expérience client centralisées.',
      tag: 'Hôtellerie',
      logo: { src: '/solutions/ehotelia_web.png', alt: 'Logo eHotelia', width: 177, height: 128 },
      tone: 'accent',
      summary:
        'Plateforme SaaS dédiée à la gestion complète des établissements hôteliers : réservations, facturation, gestion des chambres et expérience client optimisée.',
      features: [
        'Gestion des réservations en ligne et au comptoir',
        'Suivi en temps réel de la disponibilité des chambres',
        'Facturation automatisée et gestion des paiements',
        'Gestion du personnel et des plannings',
        "Rapports d'occupation et d'activité financière",
      ],
      benefits: [
        "Optimisation du taux d'occupation",
        'Réduction des erreurs de réservation',
        "Amélioration de l'expérience client",
        "Pilotage précis de la performance de l'établissement",
      ],
    },
    {
      slug: 'kalansys',
      name: 'KalanSys',
      category: 'Gestion scolaire',
      description: "Toute la gestion de votre établissement scolaire dans une seule plateforme.",
      tag: 'Éducation',
      logo: { src: '/solutions/kalansys_web.png', alt: 'Logo KalanSys', width: 299, height: 128 },
      tone: 'brand',
      // Contenu repris de la brochure kalansys-brochure-v2.pdf.
      summary:
        'Simplifiez vos opérations quotidiennes, automatisez votre administration et pilotez votre établissement avec une solution moderne et performante.',
      features: [
        'Élèves, parents et inscriptions centralisés',
        'Enseignants, classes et emplois du temps',
        'Évaluations, notes, bulletins et délibérations',
        'Paiements scolaires, caisse et comptabilité',
        'Documents scolaires, tableaux de bord et rapports automatiques',
      ],
      benefits: [
        'Automatisation des tâches administratives répétitives',
        'Informations centralisées et faciles à retrouver',
        'Suivi en temps réel des paiements, impayés et trésorerie',
        'Bulletins, statistiques et documents produits en quelques clics',
      ],
    },
    {
      slug: 'assocflow',
      name: 'AssocFlow',
      category: 'Gestion des associations & ONG',
      description: 'Membres, projets, finances et communications en un seul outil.',
      tag: 'Gouvernance',
      logo: { src: '/solutions/assocflow_web.png', alt: 'Logo AssocFlow', width: 128, height: 128 },
      tone: 'success',
      summary:
        'Solution pensée spécifiquement pour les associations, fondations et ONG : gestion des membres, des projets, des finances et des communications en un seul outil.',
      features: [
        'Registre des membres et gestion des adhésions',
        'Suivi des projets et des activités',
        'Gestion budgétaire et rapports financiers',
        "Communication interne et diffusion d'informations",
        'Gestion des dons et des contributions',
      ],
      benefits: [
        'Gouvernance transparente et traçable',
        'Gain de temps sur les tâches administratives récurrentes',
        'Meilleure coordination des équipes et bénévoles',
        'Conformité aux exigences de reporting des bailleurs',
      ],
    },
    {
      slug: 'djenstar',
      name: 'DJENSTAR',
      category: 'Logistique & envoi de colis',
      description: 'Groupage, expédition et suivi de colis entre le Burkina Faso et la France.',
      tag: 'Réalisation',
      logo: { src: '/solutions/djenstar_web.png', alt: 'Logo DJENSTAR', width: 193, height: 128 },
      tone: 'accent',
      isRealisation: true,
      // Description établie à partir du site public djenstar.com.
      summary:
        'Plateforme de groupage et de suivi de colis entre le Burkina Faso et la France : réception des achats, regroupement, expédition, dédouanement et livraison finale.',
      features: [
        'Suivi de colis en ligne',
        'Espace client personnel',
        'Réception et regroupement des achats',
        'Gestion du dédouanement',
        'Livraison finale au destinataire',
      ],
    },
    {
      slug: 'waariko',
      name: 'Waariko',
      category: 'Point de vente mobile',
      description: 'Application POS mobile hors-ligne, simple et efficace.',
      tag: 'POS',
      logo: { src: '/solutions/waariko_web.png', alt: 'Logo Waariko', width: 168, height: 128 },
      tone: 'success',
      contentPending: true,
    },
    {
      slug: 'savet-sas',
      name: 'SAVET SAS',
      category: 'E-commerce santé animale',
      description: 'Plateforme B2B/B2C de vente de produits et services vétérinaires.',
      tag: 'E-commerce',
      logo: { src: '/solutions/savet_web.png', alt: 'Logo SAVET', width: 373, height: 128 },
      tone: 'accent',
      contentPending: true,
    },
  ];

  // --- Méthodologie projet (brochure, « Notre Approche ») -------------------

  readonly phasesIntro =
    'Notre méthodologie est structurée, transparente et orientée résultats. Chaque projet est conduit selon quatre phases clés.';

  readonly projectPhases: readonly ProjectPhase[] = [
    {
      step: '01',
      title: 'Analyse & Cadrage',
      description:
        "Compréhension approfondie de vos besoins, contraintes et objectifs. Audit de l'existant et définition des exigences fonctionnelles et techniques.",
      icon: LucideSearch,
    },
    {
      step: '02',
      title: 'Conception & Architecture',
      description:
        'Design de la solution, maquettage des interfaces, choix technologiques, planification et validation avec les parties prenantes.',
      icon: LucidePencilRuler,
    },
    {
      step: '03',
      title: 'Développement & Déploiement',
      description:
        'Développement agile par sprints, tests rigoureux, mise en production et formation des équipes utilisateurs.',
      icon: LucideRocket,
    },
    {
      step: '04',
      title: 'Suivi & Évolution',
      description:
        'Maintenance préventive et corrective, support réactif, mises à jour continues et accompagnement dans la croissance de votre solution.',
      icon: LucideRefreshCw,
    },
  ];

  // --- Recherche par slug ---------------------------------------------------

  expertiseBySlug(slug: string): ExpertiseDomain | undefined {
    return this.expertiseDomains.find((domain) => domain.slug === slug);
  }

  solutionBySlug(slug: string): SaasSolution | undefined {
    return this.saasSolutions.find((solution) => solution.slug === slug);
  }

  // --- Chiffres clés ------------------------------------------------------

  readonly keyFigures: readonly KeyFigure[] = [
    // Pas de `count` : une année de fondation se lit, elle ne se compte pas.
    { value: '2022', label: 'Année de fondation', icon: LucideFileText },
    { value: '02', label: 'Métiers complémentaires', icon: LucideSettings, count: 2 },
    { value: '04', label: "Domaines d'expertise", icon: LucideChartColumn, count: 4 },
    { value: '04', label: 'Phases de projet', icon: LucideGraduationCap, count: 4 },
  ];

  // --- Atouts -------------------------------------------------------------

  readonly advantages: readonly Advantage[] = [
    {
      title: 'Expertise africaine authentique',
      description:
        'Nous ne plaquons pas des solutions importées, nous construisons à partir des réalités de terrain.',
      icon: LucideGlobe,
    },
    {
      title: "Identité ancrée dans l'intégrité",
      description: 'Le nom Burkindi est une promesse, pas un label.',
      icon: LucideShieldCheck,
    },
    {
      title: 'Double expertise',
      description: 'Conseil sur mesure et édition SaaS, complémentaires et cohérents.',
      icon: LucideLayers,
    },
    {
      title: 'Technologies modernes',
      description: 'Spring Boot, Angular, PostgreSQL, Docker — une stack robuste et éprouvée.',
      icon: LucideCodeXml,
    },
    {
      title: 'Accompagnement de bout en bout',
      description: "De l'idée au déploiement, puis au-delà.",
      icon: LucideRoute,
    },
    {
      title: 'Tarification adaptée',
      description: 'Modèles flexibles pour PME, ONG, institutions et startups.',
      icon: LucideWallet,
    },
    {
      title: 'Engagement qualité',
      description: 'Livrables documentés, testés et maintenables.',
      icon: LucideCircleCheck,
    },
    {
      title: 'Réactivité et proximité',
      description: 'Une équipe disponible, attentive et engagée dans votre succès.',
      icon: LucideUsersRound,
    },
  ];

  // --- Approche produit (brochure) -----------------------------------------

  readonly quote =
    'Nous combinons expertise technique et compréhension terrain pour créer des solutions réellement utilisées, et non simplement développées.';
  readonly quoteAuthor = 'Hubert SAWADOGO';
  readonly quoteRole = 'Manager Gérant de Burkindi Soft Consulting';

  readonly convictionsIntro = 'Notre philosophie produit repose sur trois convictions fondamentales.';

  readonly convictions: readonly Conviction[] = [
    {
      title: "Un logiciel n'a de valeur que s'il est adopté",
      description: 'Nous concevons pour les utilisateurs réels, pas pour les spécifications.',
      icon: LucideUsersRound,
    },
    {
      title: 'La technologie doit servir le métier',
      description: 'Chaque ligne de code doit répondre à un besoin concret et mesurable.',
      icon: LucideTarget,
    },
    {
      title: "L'amélioration continue est une promesse",
      description: 'Nos produits évoluent avec les besoins de nos clients, sur le long terme.',
      icon: LucideRefreshCw,
    },
  ];

  // --- Références ---------------------------------------------------------

  readonly useCasesIntro =
    'Les exemples ci-dessous illustrent la diversité de nos interventions. Les noms de nos clients sont préservés par accord de confidentialité ; des références nominatives sont disponibles sur demande.';

  readonly useCases: readonly UseCase[] = [
    {
      sector: 'Secteur hôtelier',
      description:
        "Déploiement d'eHotelia pour un réseau hôtelier au Burkina Faso : automatisation des réservations, gestion centralisée des chambres et reporting financier en temps réel.",
      tag: 'Gestion hôtelière',
      result:
        'Élimination des doubles réservations, réduction du temps de traitement administratif de plus de 60 %.',
    },
    {
      sector: 'Associations & ONG',
      description:
        "Mise en place d'AssocFlow pour une organisation à vocation sociale : gestion des membres, des projets et des finances, avec traçabilité complète pour les rapports destinés aux bailleurs de fonds.",
      tag: 'Gouvernance & suivi',
      result:
        'Production des rapports financiers réduite de plusieurs jours à quelques heures.',
    },
    {
      sector: 'Commerce & distribution',
      description:
        'Implémentation de la plateforme de gestion commerciale pour une PME en croissance : unification des ventes, des stocks et de la facturation en un seul outil.',
      tag: 'ERP commercial',
      result:
        'Suppression des erreurs de facturation, visibilité stock en temps réel, gain de 2 à 3 heures de traitement journalier.',
    },
    {
      sector: 'Administration & institutions',
      description:
        "Conseil et développement d'un système d'information métier pour une structure institutionnelle : numérisation des processus et intégration de workflows automatisés.",
      tag: "Système d'information",
      result:
        "Réduction du traitement manuel des dossiers de 70 %, amélioration de la traçabilité.",
    },
  ];

  // --- Partenaires ---------------------------------------------------------

  readonly partnersIntro =
    'Ils nous font confiance et nous accompagnent dans la réalisation de nos projets.';

  /**
   * Noms relevés sur les logos eux-mêmes, les fichiers fournis n'étant pas
   * accompagnés de métadonnées.
   *
   * Chaque carte devient un lien vers le site du partenaire, ouvert dans un
   * nouvel onglet. Attention : naloke.com ne répond pas en HTTPS (port 443
   * fermé) — le lien restera inopérant tant que TLS n'y sera pas activé.
   *
   * Les fichiers `*_web.png` sont des versions redimensionnées à deux fois la
   * taille d'affichage et quantifiées ; les originaux restent dans le dossier.
   */
  readonly partners: readonly Partner[] = [
    {
      name: 'Argonz SARL',
      href: 'https://argonz-bf.com/',
      logo: {
        src: '/partenaires/argonz_web.png',
        alt: 'Logo Argonz SARL',
        width: 346,
        height: 128,
      },
    },
    {
      name: 'WEBGENIOUS',
      href: 'https://web-genious.com/',
      logo: {
        src: '/partenaires/web_genious.svg',
        alt: 'Logo WEBGENIOUS',
        width: 451,
        height: 140,
      },
    },
    {
      name: 'Perspective Partners',
      href: 'https://www.perspectivepartners.org/',
      // L'original est un carré de 1024 px dont le logo n'occupe qu'une bande
      // centrale : sans détourage il paraîtrait minuscule dans la grille.
      logo: {
        src: '/partenaires/perspective_partners_web.png',
        alt: 'Logo Perspective Partners',
        width: 519,
        height: 128,
      },
    },
    {
      name: 'SAVET',
      href: 'https://savet-sas.io/',
      logo: {
        src: '/partenaires/savet_sas_web.png',
        alt: 'Logo SAVET — santé, nutrition et bien-être animal',
        width: 364,
        height: 128,
      },
    },
    {
      name: 'DJENSTAR',
      href: 'https://djenstar.com/',
      logo: {
        src: '/partenaires/djenstar_web.png',
        alt: 'Logo DJENSTAR',
        width: 193,
        height: 128,
      },
    },
    {
      name: 'Naloke.com',
      href: 'https://naloke.com',
      logo: {
        src: '/partenaires/nalokecom_web.png',
        alt: 'Logo Naloke.com',
        width: 152,
        height: 128,
      },
    },
  ];

  // --- Bande CTA ----------------------------------------------------------

  readonly ctaEyebrow = 'Votre projet, notre expertise';
  readonly ctaTitle = 'Vous avez un projet ?';
  readonly ctaSubtitle = 'Échangeons sur vos idées et construisons votre solution.';
  readonly ctaButton = 'Nous contacter';

  readonly ctaBackground = {
    src: '/images/cta-background.jpg',
    alt: '',
    width: 1280,
    height: 853,
  };

  // --- Pied de page -------------------------------------------------------

  readonly footerTagline = 'Nous transformons vos idées en solutions digitales performantes.';
  readonly footerKeywords = 'Conseil • Logiciels métiers • SaaS • Cloud';

  /**
   * La colonne « Nos solutions » est dérivée de `saasSolutions` : une liste
   * recopiée finissait toujours par diverger du catalogue réel.
   */
  readonly footerColumns: readonly FooterColumn[] = [
    {
      title: 'Liens rapides',
      links: [
        { label: 'Accueil', fragment: 'accueil' },
        { label: 'À propos', fragment: 'a-propos' },
        { label: 'Nos services', fragment: 'services' },
        { label: 'Nos solutions', fragment: 'solutions' },
        { label: 'Contact', fragment: 'contact' },
      ],
    },
    {
      title: 'Nos solutions',
      links: this.saasSolutions.map((solution) => ({
        label: solution.name,
        fragment: 'solutions',
      })),
    },
  ];

  // --- WhatsApp -----------------------------------------------------------

  /** Format international sans « + » ni séparateurs, exigé par wa.me. */
  readonly whatsappNumber = '22673883940';
  readonly whatsappMessage =
    'Bonjour Burkindi Soft Consulting, je souhaite échanger sur un projet.';
  readonly whatsappLabel = 'Nous écrire sur WhatsApp';
  readonly whatsappUrl = `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(
    this.whatsappMessage,
  )}`;

  // --- Pied de page : coordonnées -----------------------------------------

  // Valeurs atomiques : le formulaire de contact et le pied de page les
  // partagent, il ne doit pas exister deux écritures de la même coordonnée.
  readonly contactEmail = 'hubert.sawadogo@burkindisoftconsulting.com';
  readonly contactPhone = '+226 73 88 39 40';
  readonly contactPhoneHref = 'tel:+22673883940';
  readonly contactAddress = 'Ouagadougou, Burkina Faso';
  readonly websiteLabel = 'burkindisoftconsulting.com';

  readonly contactDetails: readonly ContactDetail[] = [
    { value: this.contactEmail, href: `mailto:${this.contactEmail}`, icon: LucideMail },
    { value: this.contactPhone, href: this.contactPhoneHref, icon: LucidePhone },
    {
      value: this.websiteLabel,
      href: `https://${this.websiteLabel}`,
      icon: LucideGlobe,
    },
    { value: this.contactAddress, icon: LucideMapPin },
  ];

  // --- Section Contact ------------------------------------------------------

  readonly contactIntro =
    'Une question, un projet ou simplement envie d’échanger ? Écrivez-nous, nous répondons sous 48 heures ouvrées.';

  /** Centre la carte sur Ouagadougou. L’embed public ne requiert aucune clé API. */
  readonly mapTitle = 'Carte de Ouagadougou, Burkina Faso';

  readonly legalLinks: readonly LegalLink[] = [
    { label: 'Confidentialité', path: '/confidentialite' },
    { label: 'Mentions légales', path: '/mentions-legales' },
  ];

  readonly copyright = `© ${new Date().getFullYear()} Burkindi Soft Consulting. Tous droits réservés.`;
}
