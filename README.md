# Learning at Work Week 2026 — Quantexa

Single-file static site for Quantexa's Learning at Work Week 2026 page. All styles, fonts, and speaker photos are inlined in `index.html`, so there is no build step and no dependencies.

## Run locally

Just open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

## Deploy

**GitHub Pages**
1. Push this repo to GitHub.
2. In the repo, go to Settings → Pages.
3. Under "Build and deployment", set Source to "Deploy from a branch", pick `main` and `/ (root)`.
4. Your site will be live at `https://<username>.github.io/<repo-name>/`.

**Netlify (via GitHub)**
1. Push this repo to GitHub.
2. In Netlify, click "Add new site" → "Import an existing project" → connect GitHub → pick this repo.
3. Leave the build command empty and the publish directory as `/` (or `.`).
4. Deploy.

## Structure

```
index.html   the entire site (HTML + CSS + JS, self-contained)
```
