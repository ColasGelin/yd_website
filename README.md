# Youdontneedtopayforthat — Site web

Site statique (HTML / CSS / JavaScript) pour une association qui accompagne
les personnes nouvellement arrivées en France dans leurs démarches
administratives.

## Lancer le site en local

Le site utilise `fetch()` pour charger les données JSON, il doit donc être
servi via HTTP (ouvrir directement `index.html` avec `file://` **ne
fonctionnera pas** pour le questionnaire et la documentation).

```bash
cd /home/colas/YD
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```

## Deployer sur Vercel

Le projet est configure pour un deploiement statique via `vercel.json`.

Reglages recommandes dans Vercel:

- Framework Preset: Other
- Build Command: vide
- Output Directory: vide
- Install Command: vide

Ensuite, redeployer le projet.

## Structure

```
index.html              # Page unique, 6 sections (onglets)
styles/main.css         # Thème pastel
scripts/app.js          # Navigation par onglets
scripts/questionnaire.js# Moteur du questionnaire (10 arbres)
scripts/docs.js         # Liste des documents PDF
data/questions.json     # Contenu du questionnaire (modifiable)
data/docs.json          # Manifeste des PDF disponibles
public/docs/            # Déposer les fichiers PDF ici
public/images/          # hero.svg, france.svg
```

## Modifier le questionnaire

Éditer `data/questions.json`. Chaque arbre a :

- `id`, `label` (affiché en haut)
- `root` : identifiant du nœud de départ
- `nodes` : chaque nœud est soit une **question** (`question`, `yes`, `no`),
  soit une **feuille** (`outcome`). Un `no: null` signifie « sortir de l'arbre
  avec la mention *Non concerné* ».

Règles :
- « Oui » suit `yes` → si c'est une feuille (`outcome`), le résultat est
  enregistré et l'on passe à l'arbre suivant.
- « Non » quitte immédiatement l'arbre et passe au suivant.
- La barre de progression avance d'un cran à chaque arbre terminé.

## Ajouter un document PDF

1. Déposer le fichier dans `public/docs/`.
2. Ajouter une entrée dans `data/docs.json` :

```json
{ "title": "…", "description": "…", "file": "public/docs/mon-fichier.pdf", "category": "…" }
```

## À compléter plus tard

- Contenu réel du questionnaire (les questions actuelles sont des
  exemples plausibles).
- URL / moyen de don sur la page *Engagez-vous*.
- Véritables adresses et horaires sur la page *Infos pratiques*.
