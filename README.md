# 24H EN SAVANE 🐯

Le site de la rentrée des survivants de la Piscine d'août 2026 — **42 Angoulême**, dès le **21 octobre 2026**.

> « On devient enfin stud ! »

Site 100 % statique : HTML + CSS + JavaScript vanilla, aucune dépendance, aucun build.

## Mettre en ligne avec GitHub Pages

1. Crée un dépôt sur GitHub (ex. `24h-en-savane`).
2. **Add file → Upload files** : glisse **tous les fichiers** de ce dossier à la racine du dépôt, puis *Commit changes*.
3. Va dans **Settings → Pages** → *Source* : **Deploy from a branch** → branche `main`, dossier `/ (root)` → **Save**.
4. Au bout d'une minute, le site est en ligne sur `https://<ton-pseudo>.github.io/24h-en-savane/`.

## Les fichiers

| Fichier | Rôle |
|---|---|
| `index.html` | la page (intro, hero, compte à rebours, équipage, missions, Piscine, final, terminal) |
| `style.css` | tout le style et les animations |
| `main.js` | la logique : intro, compte à rebours, cartes, missions, terminal 42, easter eggs |
| `*.svg` | les illustrations (feuillages, canopée, avatars, missions, textures, favicon) |

## Modifier le contenu

Tout est en haut de `main.js` :

- `SITE` — la date cible du compte à rebours (21/10/2026 à 00:00, heure de Paris).
- `CREW` — l'équipage. Pour mettre une vraie photo : ajoute l'image dans le dépôt et mets son nom dans `photo` (ex. `photo: 'melvin.jpg'`).
- `TITLES`, `STATS`, `DESCS` — les titres et stats tirés au sort sur les cartes.
- `MISSIONS` — les 5 missions.

## Tester la fête du compte à rebours

- `index.html?apercu=zero` — simule le passage à zéro (8 secondes avant).
- `index.html?apercu=apres` — affiche le mode « la rentrée a commencé il y a… ».

## Easter eggs 🥚

- Clique 5 fois sur le tigre.
- Le code Konami : ↑ ↑ ↓ ↓ ← → ← → B A.
- Ouvre le **>_ TERMINAL 42** et tape `help` (ou `cat secret_du_tigre.txt`).

PAW RRR ! 🐅
