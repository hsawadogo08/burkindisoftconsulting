import { BootstrapContext, bootstrapApplication } from '@angular/platform-browser';

import { App } from './app/app';
import { serverConfig } from './app/app.config.server';

/**
 * Point d'entrée utilisé uniquement au moment du build, par le prérendu.
 *
 * Le site est livré en statique (`outputMode: "static"`) : aucun serveur Node
 * ne tourne en production, ce bundle ne sert qu'à produire le HTML des pages.
 *
 * Le `context` doit impérativement être transmis à `bootstrapApplication` :
 * c'est lui qui porte la plateforme serveur. L'omettre fait échouer le
 * prérendu sur un NG0401 (PLATFORM_NOT_FOUND).
 */
const bootstrap = (context: BootstrapContext) => bootstrapApplication(App, serverConfig, context);

export default bootstrap;
