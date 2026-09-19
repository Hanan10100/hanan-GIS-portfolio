# Muhammad Hanan — Portfolio (v2)

## What's new in v2
- Your photo is now in the About section.
- Your real maps are in place: the Lahore Heat Hotspots final map (Project 1), and
  three cartography maps (Pakistan elevation, Gilgit-Baltistan DEM/terrain, Gilgit
  watershed) in "Other Work."
- Click any map image anywhere on the site → it opens full size in a lightbox.
- Each project now has its own detail page (`project-1.html` etc.) with a
  "View full project →" button, while the summary still shows on the home page.
- A "Download CV" button is in the nav bar and the Contact section.

## What's in this folder
```
portfolio/
├── index.html            ← home page content
├── project-1.html         ← Lahore Heat & Vegetation (full detail page)
├── project-2.html         ← LULC Classification (full detail page)
├── project-3.html         ← Islamabad LULC Analysis (full detail page)
├── project-4.html         ← Flood Risk (Coming Next) (full detail page)
├── css/style.css          ← all colors, fonts, spacing (used by every page)
├── js/globe.js            ← the 3D Earth (home page only)
├── js/main.js             ← scroll behavior, nav menu, lightbox (home page only)
├── assets/
│   ├── textures/           ← Earth texture goes here (see Step 1)
│   ├── img/                ← your photo + map images (already added)
│   └── cv/                 ← your CV PDF goes here (see below)
└── README.md
```

## Step 1 — Add the free Earth texture (if you haven't yet)
1. Go to **https://www.solarsystemscope.com/textures/** (free, no signup).
2. Download **"8k Earth Day Map"** (2k/4k also fine — smaller, loads faster).
3. Rename it to exactly `earth-day.jpg`.
4. Put it in `portfolio/assets/textures/earth-day.jpg`.

## Step 2 — Add your CV
1. Export your CV/resume as a PDF.
2. Name the file exactly: `Muhammad-Hanan-CV.pdf`
3. Put it in `portfolio/assets/cv/Muhammad-Hanan-CV.pdf` (replacing the
   placeholder text file there).

Both "Download CV" buttons already point to this exact path — nothing else
to change.

## Step 3 — Preview locally
1. Open the `portfolio` folder in **VS Code**.
2. Install the **"Live Server"** extension.
3. Right-click `index.html` → **"Open with Live Server"**.

## Step 4 — Put it on GitHub Pages
1. Create a GitHub repo, e.g. `hanan-portfolio`.
2. Upload everything **inside** `portfolio` to the repo root.
3. **Settings → Pages → Branch: main → Save.**
4. Live at: `https://<your-username>.github.io/hanan-portfolio/`

---

## How to add a new photo or map image (do this yourself, anytime)
This is the same 3-step pattern every time:

1. **Drop the image file** into `portfolio/assets/img/`. Give it a short,
   lowercase, hyphenated name — e.g. `my-new-map.jpg`.
   - Keep images under ~1–2 MB if you can (resize to ~1600px wide max) so the
     site stays fast. Any image editor or a free tool like
     https://squoosh.app can resize/compress for you.
2. **Add an `<img>` tag** where you want it to appear, in `index.html`:
   ```html
   <img class="lightbox-trigger" src="assets/img/my-new-map.jpg"
        alt="Describe the map in a few words" loading="lazy" />
   ```
   The `lightbox-trigger` class is what makes it click-to-enlarge — it works
   automatically, no extra JavaScript needed.
3. **Write a one-line caption** next to it if you want one — copy the pattern
   used in the "Other Work" gallery (a `<figure class="gallery__item">` block)
   or the pattern used under Project 1 (a `<p class="project__caption">`).

### Adding a whole new gallery image to "Other Work"
Copy one of the existing `<figure class="gallery__item">...</figure>` blocks
in the Other Work section of `index.html`, then change the `src`, `alt`, and
`figcaption` text.

### Adding a brand-new project (with its own page)
1. Duplicate `project-3.html`, rename it `project-5.html`.
2. Edit its title, description, tools, and pipeline steps.
3. In `index.html`, copy one `<section class="section project">...</section>`
   block under Projects, edit its content, and point its button to
   `href="project-5.html"`.

## What to edit, and where
| I want to change...                     | Edit this file        |
|------------------------------------------|------------------------|
| Any text, project details, contact info  | `index.html`           |
| A project's full write-up                | `project-1.html` … `project-4.html` |
| Colors, fonts, spacing                   | `css/style.css` (top — the `:root` variables) |
| How the globe moves / zoom levels        | `js/globe.js` — the `SCENES` object |
| Scroll behavior, nav menu, lightbox      | `js/main.js`           |

## Still to do (v3 ideas)
- Once you're happy with content, we can add a subtle "flight path" line
  animation across the globe connecting Lahore → Islamabad as you scroll.
- If you'd like, project pages 2–4 can get real screenshots too, the same
  way Project 1 now has the Lahore Heat map.

Nothing here was invented — all project data, stats, and skills come
directly from what you provided. Project 4 is intentionally marked
"Coming Next" and has no results shown.
