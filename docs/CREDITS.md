# Crédits photographiques

> Ce document vit dans `docs/` et non dans `public/`. Tout le contenu de `public/` est copié
> tel quel dans le build et donc publié : ces notes internes étaient servies aux visiteurs à
> l'adresse `/images/CREDITS.md`. Ne pas l'y remettre.

Visuels de substitution issus de **Pexels**, téléchargés le 2026-10-28.

Licence Pexels : utilisation gratuite, y compris commerciale, sans attribution obligatoire.
Référence : https://www.pexels.com/license/

Ces images sont des **placeholders de production** : elles sont conformes à la maquette sur
le plan du cadrage et de la colorimétrie, mais n'ont pas été produites pour Burkindi Soft
Consulting. Pour les remplacer, déposez un fichier de mêmes nom et ratio dans
`public/images/` — aucune modification de code n'est nécessaire (les dimensions sont
déclarées dans `src/app/core/site-content.service.ts`).

| Fichier                       | Dimensions | Source                                 | Rôle dans la page                                 |
| ----------------------------- | ---------- | -------------------------------------- | ------------------------------------------------- |
| `hero-consultant.webp`        | 1536×1024  | fourni par le client                   | Visuel principal du hero                          |
| `expertise-developpement.jpg` | 900×600    | https://www.pexels.com/photo/6424583/  | Carte « Développement logiciel sur mesure »       |
| `expertise-integration.jpg`   | 900×600    | https://www.pexels.com/photo/8386440/  | Carte « Intégration IT & Systèmes d'information » |
| `expertise-cloud.jpg`         | 900×602    | https://www.pexels.com/photo/17489151/ | Carte « DevOps & Infrastructure Cloud »           |
| `expertise-formation.jpg`     | 900×600    | https://www.pexels.com/photo/9301761/  | Carte « Formation IT & Montée en compétences »    |
| `cta-background.jpg`          | 1280×853   | https://www.pexels.com/photo/7367472/  | Fond de la bande « Vous avez un projet ? »        |

Le hero est servi en WebP : c'est l'élément LCP de la page, et le PNG fourni pesait 1,6 Mo.
Commande de conversion, à rejouer si le visuel est remplacé :

```sh
cwebp -q 86 -m 6 <source.png> -o public/images/hero-consultant.webp
```

À cette qualité le PSNR est de 48,8 dB pour 36,5 Ko, soit 44 fois moins que la source.

## Fichiers sources retirés

`public/` est copié intégralement dans le build : tout fichier qui y séjourne est livré au
visiteur, même si aucun code ne le référence. Les originaux et les visuels remplacés en ont
donc été retirés — 3,3 Mo au total, dont 1,6 Mo pour le seul PNG du hero.

Ils restent récupérables dans l'historique git : `git checkout HEAD -- <chemin>` pour ceux
déjà commités, `git checkout -- public/images/hero-consultant.png` pour le PNG du hero, qui
n'était qu'indexé. Les tableaux ci-dessus et ci-dessous conservent les dimensions et la
provenance de chacun, afin que la chaîne de dérivation reste documentée.

## Logos

`public/logo/logo_icon.png` est généré à partir de `logo_burkindisoftconsulting.png` :
recadrage de la zone de l'icône (lignes 159→487), détourage sur les pixels opaques et
centrage dans un carré. L'original `logo_icon_burkindisoftconsulting.png` n'avait pas été
retenu car il est dépourvu de canal alpha (fond blanc opaque), donc inutilisable sur les
fonds sombres du footer et de la bande CTA ; il a depuis été retiré du dossier.

## Logos partenaires

Les fichiers `public/partenaires/*_web.png` sont des **dérivés générés** des logos fournis.
Les originaux ne sont plus dans le dossier — ils étaient livrés au visiteur sans jamais être
affichés — mais restent la source de référence et se récupèrent avec
`git checkout HEAD -- public/partenaires/<fichier>`.

| Dérivé                         | Original                               | Traitement                                                      | Poids          |
| ------------------------------ | -------------------------------------- | --------------------------------------------------------------- | -------------- |
| `argonz_web.png`               | `argonz.png` (1511×559)                | redimensionné à 346×128, palette 64 couleurs                    | 20,1 → 5,2 Ko  |
| `perspective_partners_web.png` | `perspective_partners.png` (1024×1024) | détouré puis redimensionné à 519×128, palette 64                | 38,3 → 10,4 Ko |
| `savet_sas_web.png`            | `savet_sas.png` (666×234)              | redimensionné à 364×128, palette 64 couleurs                    | 104,2 → 7,0 Ko |
| `nalokecom_web.png`            | `nalokecom.png` (640×640)              | détouré puis redimensionné à 152×128, palette 64                | 27,4 → 6,0 Ko  |
| `djenstar_web.png`             | `logo-djenstar.png` (1579×996)         | détouré avec tolérance puis redimensionné à 193×128, palette 64 | 1004 → 8,0 Ko  |
| `web_genious.svg`              | —                                      | utilisé tel quel (vectoriel)                                    | 8,1 Ko         |

Le fond de `logo-djenstar.png` est « presque » blanc (254,253,255) et légèrement bruité :
un détourage par différence stricte ne trouvait aucune marge. Il faut binariser avec une
tolérance (seuil 18) avant de chercher la boîte englobante.

Hauteur cible de 128 px = deux fois la hauteur d'affichage (56 px), pour rester net sur
écran à haute densité. `perspective_partners.png` est un carré dont le logo n'occupait
qu'une bande centrale : sans détourage, il serait apparu minuscule à côté des autres.

Pour remplacer un logo, déposez le nouveau fichier dans `public/partenaires/` et régénérez
son dérivé, puis mettez à jour `width` / `height` dans
`src/app/core/site-content.service.ts`.

Les noms des partenaires ont été relevés sur les logos eux-mêmes, aucun fichier de
métadonnées n'ayant été fourni. Aucune adresse de site n'étant connue, les logos ne sont
pas cliquables.
