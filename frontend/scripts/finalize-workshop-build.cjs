// Vite names the output HTML after the input file (workshop.html).
// Rename it to index.html so it works as the subdomain document root.
const fs = require('fs');
const path = require('path');

const distDir = path.resolve(__dirname, '..', 'dist-workshop');
const from = path.join(distDir, 'workshop.html');
const to = path.join(distDir, 'index.html');

if (fs.existsSync(from)) {
  fs.renameSync(from, to);
  console.log('dist-workshop/workshop.html -> index.html');
} else if (!fs.existsSync(to)) {
  console.error('Expected dist-workshop/workshop.html not found — build may have failed.');
  process.exit(1);
}
