// Minimal local static server for previewing the brochure. Localhost only.
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const PORT = 8137;
const HOST = '127.0.0.1';

const MIME = {
  '.pdf': 'application/pdf', '.html': 'text/html; charset=utf-8',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.json': 'application/json',
  '.js': 'text/javascript', '.css': 'text/css',
};

const PDF = 'DR018 - The Signal-Led GTM Playbook.pdf';
const HTML = 'DR018 - The Signal-Led GTM Playbook.html';

const server = http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split('?')[0]);
  if (urlPath === '/' ) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    return res.end(`<!doctype html><meta charset=utf-8><title>DR018 preview</title>
      <style>body{font-family:system-ui,Arial;background:#0f1720;color:#e6f7f7;margin:0;padding:48px;text-align:center}
      a{display:inline-block;margin:10px;padding:14px 22px;border-radius:12px;background:#0DCFCF;color:#062; text-decoration:none;font-weight:700}
      h1{font-weight:800} .s{color:#8fb}</style>
      <h1>DR018 — The Signal-Led GTM Playbook</h1>
      <p class=s>Local preview server</p>
      <p><a href="/pdf">Open the PDF (17 pages)</a>
         <a href="/html">Open the live HTML</a></p>`);
  }
  let file;
  if (urlPath === '/pdf') file = PDF;
  else if (urlPath === '/html') file = HTML;
  else file = urlPath.replace(/^\/+/, '');

  const full = path.join(ROOT, file);
  if (!full.startsWith(ROOT)) { res.writeHead(403); return res.end('forbidden'); }
  fs.readFile(full, (err, data) => {
    if (err) { res.writeHead(404, {'Content-Type':'text/plain'}); return res.end('not found: ' + file); }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(full).toLowerCase()] || 'application/octet-stream' });
    res.end(data);
  });
});

server.listen(PORT, HOST, () => console.log(`Serving brochure at http://${HOST}:${PORT}/`));
