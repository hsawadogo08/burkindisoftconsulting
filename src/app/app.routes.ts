import { Routes } from '@angular/router';
import { Home } from './features/home/home';

export const routes: Routes = [
  {
    path: '',
    title: 'Burkindi Soft Consulting — Conseil & solutions digitales',
    // Chargement immédiat, volontairement : c'est la page d'entrée du site. En
    // lazy, le shell s'affichait seul puis le contenu poussait le pied de page
    // vers le bas — un décalage de mise en page (CLS 0,44) pour aucun gain.
    component: Home,
  },
  {
    // Pages secondaires : le chargement différé est ici pleinement justifié.
    path: 'services/:slug',
    loadComponent: () => import('./features/services/service-detail').then((m) => m.ServiceDetail),
  },
  {
    path: 'solutions/:slug',
    loadComponent: () =>
      import('./features/solutions/solution-detail').then((m) => m.SolutionDetail),
  },
  { path: '**', redirectTo: '' },
];
