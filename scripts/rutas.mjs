// Tras el build: copia dist/index.html a cada ruta (categorías, productos, colores, guía)
// para que GitHub Pages responda 200 en vez del 404 de respaldo. Uso: node scripts/rutas.mjs
import { copyFileSync, mkdirSync, readFileSync } from "node:fs";

const data = readFileSync("src/data.ts", "utf8");
const conjuntos = JSON.parse(readFileSync("src/conjuntos.json", "utf8"));
const cats = [...data.matchAll(/slug: "([a-z0-9-]+)",\n\s+name:/g)].map((m) => m[1]);
const prods = [...data.matchAll(/slug: "([a-z0-9-]+)",\n\s+category:/g)].map((m) => m[1]);

const rutas = [
  "colores",
  "guia-de-medidas",
  ...cats.map((s) => `categoria/${s}`),
  ...prods.map((s) => `producto/${s}`),
  ...conjuntos.map((c) => `producto/${c.slug}`),
];
for (const r of rutas) {
  mkdirSync(`dist/${r}`, { recursive: true });
  copyFileSync("dist/index.html", `dist/${r}/index.html`);
}
copyFileSync("dist/index.html", "dist/404.html");
console.log(`rutas: ${rutas.length} (${cats.length} categorías, ${prods.length + conjuntos.length} productos)`);
