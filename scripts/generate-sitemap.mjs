/**
 * Génère sitemap.xml à partir de la sortie prérendue.
 *
 * Le sitemap est dérivé des fichiers réellement produits par le build, et non
 * d'une liste d'URL maintenue à la main : il ne peut donc pas se désynchroniser
 * des routes prérendues. Ajouter une solution dans SiteContentService suffit à
 * la voir apparaître ici.
 *
 * À lancer après `ng build` (voir le script npm `build:prod`).
 */
import { readdir, stat, writeFile } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';

const SITE_URL = 'https://burkindisoftconsulting.com';
const OUTPUT_DIR = 'dist/burkindisoftconsulting/browser';

/** Collecte récursivement les chemins de tous les index.html de la sortie. */
async function findPrerenderedPages(root, current = root, found = []) {
  for (const entry of await readdir(current, { withFileTypes: true })) {
    const path = join(current, entry.name);

    if (entry.isDirectory()) {
      await findPrerenderedPages(root, path, found);
    } else if (entry.name === 'index.html') {
      found.push(relative(root, path));
    }
  }

  return found;
}

/** `services/x/index.html` → `/services/x` ; `index.html` → `/` */
function toUrlPath(file) {
  const segments = file.split(sep).slice(0, -1);
  return segments.length === 0 ? '/' : `/${segments.join('/')}`;
}

const pages = await findPrerenderedPages(OUTPUT_DIR);

if (pages.length === 0) {
  // Le prérendu a échoué ou n'est pas activé : mieux vaut interrompre le build
  // qu'expédier un sitemap vide, qui ferait désindexer le site.
  console.error(`✗ Aucune page prérendue trouvée dans ${OUTPUT_DIR}.`);
  process.exit(1);
}

// Une seule date pour tout le sitemap : toutes les pages sont régénérées à
// chaque build, leurs dates de modification individuelles n'ont pas de sens.
const lastmod = new Date().toISOString().slice(0, 10);

const urls = pages
  .map(toUrlPath)
  .sort((a, b) => a.localeCompare(b))
  .map((path) => `  <url>\n    <loc>${SITE_URL}${path}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`)
  .join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

const target = join(OUTPUT_DIR, 'sitemap.xml');
await writeFile(target, sitemap, 'utf8');

console.log(`✓ ${target} — ${pages.length} pages`);
