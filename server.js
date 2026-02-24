// Mendix Trainer - Lokaler HTTP Server (zero dependencies)
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const DIR = __dirname;

const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.ico': 'image/x-icon',
};

const server = http.createServer((req, res) => {
    let filePath = req.url === '/' ? '/index.html' : req.url;
    // Remove query string
    filePath = filePath.split('?')[0];
    const fullPath = path.join(DIR, filePath);

    // Security: prevent directory traversal
    if (!fullPath.startsWith(DIR)) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
    }

    const ext = path.extname(fullPath);
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(fullPath, (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // SPA fallback: serve index.html for navigation requests
                fs.readFile(path.join(DIR, 'index.html'), (err2, indexData) => {
                    if (err2) {
                        res.writeHead(500);
                        res.end('Server Error');
                        return;
                    }
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                    res.end(indexData);
                });
                return;
            }
            res.writeHead(500);
            res.end('Server Error');
            return;
        }

        // Cache static assets
        const cacheControl = ext === '.html' ? 'no-cache' : 'public, max-age=86400';
        res.writeHead(200, {
            'Content-Type': contentType,
            'Cache-Control': cacheControl,
        });
        res.end(data);
    });
});

server.listen(PORT, '0.0.0.0', () => {
    const os = require('os');
    const interfaces = os.networkInterfaces();
    let localIP = 'localhost';

    // Find LAN IP for mobile access (prefer Wi-Fi, skip virtual adapters)
    const allIPs = [];
    for (const name in interfaces) {
        for (const iface of interfaces[name]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                allIPs.push({ name, address: iface.address });
            }
        }
    }
    // Prefer Wi-Fi adapter (common names)
    const wifiNames = ['wi-fi', 'wifi', 'wlan', 'wireless'];
    const wifi = allIPs.find(ip => wifiNames.some(w => ip.name.toLowerCase().includes(w)));
    // Fallback: prefer 192.168.x.x range (typical home network)
    const homeNet = allIPs.find(ip => ip.address.startsWith('192.168.'));
    const best = wifi || homeNet || allIPs[0];
    if (best) localIP = best.address;

    console.log('');
    console.log('  ┌─────────────────────────────────────────────┐');
    console.log('  │         Mendix Trainer - Server              │');
    console.log('  ├─────────────────────────────────────────────┤');
    console.log(`  │  Lokal:   http://localhost:${PORT}              │`);
    console.log(`  │  Handy:   http://${localIP}:${PORT}        │`);
    console.log('  │                                             │');
    console.log('  │  iPhone: URL im Safari öffnen,              │');
    console.log('  │  dann "Zum Home-Bildschirm hinzufügen"      │');
    console.log('  │                                             │');
    console.log('  │  Stoppen: Ctrl+C                            │');
    console.log('  └─────────────────────────────────────────────┘');
    console.log('');
});
