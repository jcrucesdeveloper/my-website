# jcrucesdeveloper.com

Personal portfolio of Jorge Cruces. Plain HTML, CSS and a small vanilla JS file —
no build step. Deployed to GitHub Pages from `master` (see `.github/workflows/static.yml`).

```
index.html          single-page portfolio (SEO meta + JSON-LD in <head>)
css/main.css        design tokens, light/dark themes, layout
js/main.js          theme toggle, active-section nav, copy email
imgs/projects/      project icons (WebP, 192px)
imgs/logos/         company and organization logos (WebP, 96px)
og-image.png        1200×630 social preview
CV.pdf              résumé, built from the `cv` repo
*_policy.html, ios/ app privacy policies and support pages (linked from the stores)
```

Preview locally with `python3 -m http.server` and open http://localhost:8000.
