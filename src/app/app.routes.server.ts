import { inject } from '@angular/core';
import { RenderMode, ServerRoute } from '@angular/ssr';

import { SiteContentService } from './core/site-content.service';

/**
 * Modes de rendu côté serveur.
 *
 * Tout est prérendu au build : le site n'a pas de données dynamiques, les
 * contenus vivent dans `SiteContentService`.
 *
 * Les listes de slugs sont lues directement depuis ce service plutôt que
 * recopiées ici. Ajouter un domaine d'expertise ou une solution SaaS suffit
 * donc à la faire prérendre au build suivant, sans rien toucher à ce fichier.
 */
export const serverRoutes: ServerRoute[] = [
  {
    path: 'services/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () =>
      inject(SiteContentService).expertiseDomains.map(({ slug }) => ({ slug })),
  },
  {
    path: 'solutions/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () =>
      inject(SiteContentService).saasSolutions.map(({ slug }) => ({ slug })),
  },
  // Accueil et pages légales : aucun paramètre à énumérer.
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
