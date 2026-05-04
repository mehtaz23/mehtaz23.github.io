# mehtaz23.github.io

Personal portfolio site for Muntaqim Mehtaz — built with [Astro](https://astro.build), Tailwind CSS, and TypeScript.

**Live:** [mehtaz23.github.io](https://mehtaz23.github.io)

---

## Stack

| Layer | Tool |
| :--- | :--- |
| Framework | Astro |
| Styling | Tailwind CSS |
| Language | TypeScript |
| Package manager | Bun |
| Hosting | GitHub Pages |
| CI/CD | GitHub Actions — deploys on push to `main` |

---

## Content

Content lives in `src/content/` and is written in Markdown.

| Section | Path | Description |
| :--- | :--- | :--- |
| Blog | `src/content/blog/` | Technical posts — one folder per post with an `index.md` |
| Projects | `src/content/projects/` | Project breakdowns — same folder/`index.md` structure |
| Work | `src/content/work/` | Work history entries |

### Adding a blog post

```
src/content/blog/
└── your-post-slug/
    └── index.md
```

Required frontmatter:

```md
---
title: "Post title"
description: "Short description shown in listings and meta tags."
date: "Mon DD YYYY"
---
```

### Adding a project

```
src/content/projects/
└── your-project-slug/
    └── index.md
```

Required frontmatter:

```md
---
title: "Project title"
description: "Short description."
date: "Mon DD YYYY"
repoURL: "https://github.com/..."   # optional
demoURL: "https://..."              # optional
---
```

### Images

Static assets are served from `public/`. Project and post images live under:

```
public/images/<project-or-post-slug>/image.webp
```

Reference them in Markdown with a root-relative path: `/images/<slug>/image.webp`.

---

## Local Development

```bash
bun install       # install dependencies
bun dev           # start dev server at localhost:4321
bun build         # production build to ./dist
bun preview       # preview production build locally
bun lint          # run ESLint
bun lint:fix      # auto-fix ESLint issues
```

---

## Deployment

Pushes to `main` trigger the GitHub Actions workflow at `.github/workflows/deploy.yml`, which:

1. Installs dependencies with Bun
2. Runs `astro build`
3. Uploads `./dist` as a Pages artifact
4. Deploys to GitHub Pages

No manual steps required after merging to `main`.

---

## Mermaid Diagrams

Mermaid diagrams are supported in Markdown via a custom remark plugin in `astro.config.mjs`. Use a standard fenced code block with the `mermaid` language identifier:

````md
```mermaid
sequenceDiagram
    ...
```
````

---

## License

MIT
