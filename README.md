# dclin.me

Personal academic website of Daocheng Lin, served by GitHub Pages from `main` at https://dclin.me.

Plain HTML and CSS with one small script. There is no build step.

## Updating content

Everything visible lives in `index.html`. Each kind of entry is one block to copy:

- **News & Travels:** copy an `<li>` inside `<ul class="news timeline">`. Keep it to one short line with a month date, newest first; the date needs `class="when"` to get its timeline dot.
- **Publications:** copy an `<li class="pub">`. Thumbnails are 16:9 images in `assets/img/`. Use `tag-journal` or `tag-conference` for the label.
- **Teaching:** copy an `<li>` inside `<ol class="courses">`.
- **Projects:** copy an `<article class="project">`. Feature images are 16:9 so the cards stay the same size.
- **Conference Presentations:** copy an `<li>` inside `<ol class="news records">`. This is the full record; News only summarizes it.
- **CV:** replace `assets/Daocheng_Lin_CV.pdf` with the new PDF. Keep the same filename so the link keeps working.

## Files

- `index.html`: the page
- `assets/css/site.css`: styles; the palette and fonts are set as variables at the top
- `assets/js/site.js`: section index and pinned profile column
- `assets/fonts/`: Jost, Lora, and JetBrains Mono, self-hosted under the SIL Open Font License (license files alongside)

GitHub Pages lets browsers cache files for 10 minutes, so after changing `site.css` or `site.js`, bump the `?v=` date on its link in `index.html`. Otherwise visitors can get the new page with the old styles.
