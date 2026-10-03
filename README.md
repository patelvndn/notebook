# Notebook blog

## Set up
1. Open `index.html` and edit `SITE` near the bottom (name, role, company, and `paper`: `"graph"` or `"ruled"`).
2. Run `node build.js`, then `npx serve` and open the address it prints.

## Add a post
1. Copy `posts/_template.md` to `posts/my-post-name.md`. The file name becomes the URL (`/#/my-post-name`).
2. Fill in the front matter (title, date, tags, summary) and write below it.
3. Run `node build.js` to refresh the home page list.
4. Commit and push.

Set `draft: true` to hide a post until it's ready. Newest date shows first.

## Add images
1. Drop the file in `images/` (PNG, JPG, SVG, GIF all work).
2. In your post: `![Caption text](images/my-image.png)` on its own line.

Keep images under about 1 MB each; resize big photos first.

## Deploy
Any static host works (GitHub Pages, Netlify, Cloudflare Pages). Upload the whole folder. Remember to run `node build.js` first so `posts/index.json` is up to date.
