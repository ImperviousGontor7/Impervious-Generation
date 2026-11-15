
const fs = require("node:fs");
const path = require("node:path");

const distDir = path.join(__dirname, "dist", "client");

const indexFile = path.join(distDir, "index.html");
const errorFile = path.join(distDir, "404.html");

if (!fs.existsSync(indexFile)) {
  throw new Error(
    `File index.html tidak ditemukan: ${indexFile}`
  );
}

fs.copyFileSync(indexFile, errorFile);

console.log("✅ GitHub Pages fallback berhasil dibuat!");
console.log(`📁 Lokasi: ${errorFile}`);
