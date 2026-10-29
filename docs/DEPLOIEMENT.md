# Déploiement — Hostinger (hébergement mutualisé)

Le site est **entièrement statique**. Il n'y a aucun serveur Node à faire
tourner en production : le build produit du HTML, du CSS, du JS et des images,
et c'est tout. Un hébergement mutualisé suffit, Docker serait sans objet.

Les pages sont **prérendues au build** (`outputMode: "static"`), ce qui veut
dire que chaque URL a son propre fichier HTML complet, avec son `<h1>`, son
`<title>` et sa `meta description`. C'est ce qui rend le site indexable sans
que les robots aient à exécuter le JavaScript.

---

## 1. Construire

```bash
npm run build:prod
```

Cette commande fait trois choses :

1. `ng build --configuration production` — compile et **prérend les 12 pages**
2. copie `public/.htaccess` à la racine de la sortie
3. `scripts/generate-sitemap.mjs` — génère `sitemap.xml`

Le résultat se trouve dans **`dist/burkindisoftconsulting/browser/`**.

Vérifier que la sortie annonce bien `Prerendered 12 static routes.` Si le
nombre a changé, c'est normal après un ajout de service ou de solution : le
prérendu et le sitemap sont dérivés de `SiteContentService`, ils suivent la
donnée automatiquement.

> **Note :** la solution *KalanSys* est commentée dans
> `src/app/core/site-content.service.ts`. La décommenter la fera prérendre et
> apparaître dans le sitemap au build suivant, sans aucune autre modification.

## 2. Téléverser

```bash
npm run deploy:zip
```

Produit `dist/site.zip`. Puis, dans hPanel :

1. **Fichiers → Gestionnaire de fichiers**
2. Ouvrir `public_html` et **vider son contenu**
3. Téléverser `site.zip`, puis clic droit → **Extraire**
4. Supprimer `site.zip`

⚠️ C'est bien **le contenu** de `dist/burkindisoftconsulting/browser/` qui doit
se retrouver directement dans `public_html`, pas le dossier lui-même.
`public_html/index.html` doit exister, pas `public_html/browser/index.html`.

Le zip est préférable au FTP fichier par fichier : plus rapide, et pas de
risque de transfert partiel laissant le site dans un état incohérent.

**Vérifier que `.htaccess` est bien présent** après extraction — c'est un
fichier caché, il faut activer son affichage dans le Gestionnaire de fichiers.
Sans lui, le routage et le cache ne fonctionnent pas.

## 3. Configurer une seule fois

- **SSL** : hPanel → *Sécurité → SSL* → installer le certificat gratuit, puis
  activer **Forcer le HTTPS**. Le faire côté hPanel plutôt que dans le
  `.htaccess` évite les boucles de redirection derrière leur proxy.
- **Domaine** : vérifier que `burkindisoftconsulting.com` pointe bien sur
  `public_html`.
- **Search Console** : soumettre `https://burkindisoftconsulting.com/sitemap.xml`.

## 4. Après chaque déploiement

Purger le cache LiteSpeed depuis hPanel (*Avancé → Cache Manager*). Les
fichiers JS et CSS portent un nom haché, donc ils ne sont jamais servis
périmés ; mais les fichiers HTML, eux, gardent le même nom d'un déploiement à
l'autre.

---

## Checklist de vérification

À faire une fois, après le premier déploiement, en remplaçant le domaine :

```bash
D=https://burkindisoftconsulting.com

# Chaque URL doit répondre 200 directement, sans redirection.
for u in / /mentions-legales /confidentialite \
         /services/devops-infrastructure-cloud /solutions/ehotelia; do
  echo "$u -> $(curl -s -o /dev/null -w '%{http_code} %{num_redirects}' -L $D$u)"
done

# Le contenu doit être présent dans le HTML servi, sans exécution de JS.
curl -s $D/solutions/ehotelia | grep -o '<title>[^<]*</title>'

# Le JS doit arriver compressé (sinon ~600 ko partent en clair).
curl -s -H 'Accept-Encoding: gzip' -D - -o /dev/null $D/main-*.js \
  | grep -i content-encoding

# Une URL inconnue doit afficher l'application, pas un 404 Apache.
curl -s -o /dev/null -w '%{http_code}\n' $D/nimporte-quoi
```

Attendu : `200 0` pour les cinq URL, le titre propre à la page, `gzip`, et
`200` sur l'URL inconnue.

---

## Points connus

**Année du pied de page.** `SiteContentService.copyright` utilise
`new Date().getFullYear()`, évalué **au moment du build** du fait du prérendu.
L'année est donc figée à la date du dernier build. Un rebuild en janvier suffit
à la mettre à jour.

**URL inconnues.** La route joker `**` d'Angular redirige vers l'accueil, ce
qui renvoie un code **200** sur n'importe quelle URL. Google qualifie ça de
« soft 404 ». Sans conséquence grave, mais une vraie page 404 serait plus
propre.

**Pas de Content-Security-Policy.** Volontairement : `contact-section`
embarque une iframe Google Maps, et une CSP mal calibrée casserait le site en
silence. À traiter séparément si besoin.

**Les pages légales partagent la description générique** de `src/index.html`.
Seules les pages de service et de solution posent leur propre
`meta description`. À compléter dans `legal-page.ts` si le référencement de
ces pages compte.

---

## Pourquoi pas Docker + Caddy ?

Pour un site 100 % statique sans backend, conteneuriser n'apporte rien :
l'image à construire, le registre, la supervision du conteneur et les mises à
jour du serveur web sont du coût pur, pour un service qu'un hébergement
mutualisé rend nativement.

Ça deviendrait pertinent si le site gagnait une API, une base de données, ou
devait cohabiter avec d'autres services sur un VPS déjà en place. Dans ce cas,
la sortie de build resterait la même — seule la façon de la servir changerait,
avec un `file_server` Caddy et ce même jeu de règles de routage.
