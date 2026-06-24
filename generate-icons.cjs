// Simple script to generate placeholder PWA icons using pure node
// Creates a minimal PNG with a colored background
const fs = require('fs')
const path = require('path')

// Minimal 1x1 transparent PNG base64 — we'll create a proper colored one using SVG conversion
// For now generate a simple SVG-based icon and rely on vite-plugin-pwa to use it

const svgIcon = (size) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" rx="${size * 0.2}" fill="#111111"/>
  <text x="${size/2}" y="${size * 0.65}" font-family="system-ui" font-weight="bold" font-size="${size * 0.45}" fill="white" text-anchor="middle">C</text>
</svg>`

fs.writeFileSync(path.join(__dirname, 'public', 'icon.svg'), svgIcon(512))
console.log('SVG icon created')
