// Run `node build.js` after adding or editing posts.
// Reads posts/*.md and writes posts/index.json (the list shown on the home page).
// Files starting with "_" (like _template.md) are ignored. Posts with `draft: true` are skipped.
const fs = require("fs"), path = require("path");
const dir = path.join(__dirname, "posts");
const posts = [];
for (const file of fs.readdirSync(dir)) {
  if (!file.endsWith(".md") || file.startsWith("_")) continue;
  const text = fs.readFileSync(path.join(dir, file), "utf8");
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) { console.warn("Skipping (no front matter):", file); continue; }
  const meta = {};
  for (const line of m[1].split(/\r?\n/)) {
    const i = line.indexOf(":"); if (i < 0) continue;
    meta[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^["']|["']$/g, "");
  }
  if (meta.draft === "true") continue;
  if (!meta.title || !meta.date) { console.warn("Skipping (needs title and date):", file); continue; }
  posts.push({
    slug: file.replace(/\.md$/, ""),
    title: meta.title,
    date: meta.date,
    tags: (meta.tags || "").split(",").map(t => t.trim()).filter(Boolean),
    summary: meta.summary || ""
  });
}
posts.sort((a, b) => b.date.localeCompare(a.date));
fs.writeFileSync(path.join(dir, "index.json"), JSON.stringify(posts, null, 2));
console.log(`Built posts/index.json with ${posts.length} post(s).`);
