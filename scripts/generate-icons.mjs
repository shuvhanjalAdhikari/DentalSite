import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const { siteConfig } = await import('../site.config.ts').catch(async () => {
  const raw = await fs.readFile(path.resolve('site.config.ts'), 'utf8');
  const nameMatch = raw.match(/name:\s*['"]([^'"]*)['"]/);
  const taglineMatch = raw.match(/tagline:\s*['"]([^'"]*)['"]/);
  const cityMatch = raw.match(/city:\s*['"]([^'"]*)['"]/);
  const countryMatch = raw.match(/country:\s*['"]([^'"]*)['"]/);
  return {
    siteConfig: {
      name: nameMatch?.[1] || '',
      tagline: taglineMatch?.[1] || '',
      address: { city: cityMatch?.[1] || '', country: countryMatch?.[1] || '' },
    },
  };
});

const name = siteConfig.name || 'Dental practice';
const letter = name.trim().charAt(0).toUpperCase() || 'D';
const tagline = siteConfig.tagline || 'Calm, careful dentistry.';
const cityLine = [siteConfig.address?.city, siteConfig.address?.country]
  .filter(Boolean)
  .join(', ');

const PETROL = '#123039';
const ENAMEL = '#FAF6F1';
const ROSE = '#C0717E';

function letterMark(size) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="${PETROL}"/>
  <text x="50%" y="50%" text-anchor="middle" dominant-baseline="central"
        fill="${ENAMEL}" font-family="Georgia, 'Times New Roman', serif"
        font-size="${Math.round(size * 0.62)}" font-weight="500"
        style="letter-spacing:-0.02em">${escapeXml(letter)}</text>
</svg>`;
}

function escapeXml(s) {
  return s.replace(/[<>&'"]/g, (c) =>
    ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[c],
  );
}

function ogCard(w, h) {
  const wrap = (str, max) => {
    const words = str.split(/\s+/);
    const lines = [];
    let cur = '';
    for (const w of words) {
      if ((cur + ' ' + w).trim().length > max) {
        if (cur) lines.push(cur);
        cur = w;
      } else {
        cur = (cur + ' ' + w).trim();
      }
    }
    if (cur) lines.push(cur);
    return lines;
  };
  const nameLines = wrap(name, 24);
  const taglineLines = wrap(tagline, 46);
  const nameFs = nameLines.length > 1 ? 76 : 96;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect width="${w}" height="${h}" fill="${PETROL}"/>
  <text x="96" y="130" fill="${ROSE}" font-family="Helvetica, Arial, sans-serif"
        font-size="22" font-weight="600" letter-spacing="3.5">
    ${escapeXml((cityLine || 'DENTAL PRACTICE').toUpperCase())}
  </text>
  ${nameLines
    .map(
      (line, i) =>
        `<text x="96" y="${360 + i * (nameFs + 6)}" fill="${ENAMEL}"
               font-family="Georgia, 'Times New Roman', serif"
               font-size="${nameFs}" font-weight="500"
               style="letter-spacing:-0.02em">${escapeXml(line)}</text>`,
    )
    .join('\n  ')}
  ${taglineLines
    .map(
      (line, i) =>
        `<text x="96" y="${480 + nameLines.length * (nameFs + 6) + i * 42}"
               fill="${ENAMEL}" opacity="0.8"
               font-family="Helvetica, Arial, sans-serif"
               font-size="30">${escapeXml(line)}</text>`,
    )
    .join('\n  ')}
  <rect x="96" y="${h - 90}" width="96" height="2" fill="${ROSE}"/>
</svg>`;
}

async function writePng(svg, outPath) {
  await fs.mkdir(path.dirname(outPath), { recursive: true });
  await sharp(Buffer.from(svg)).png().toFile(outPath);
  const size = (await fs.stat(outPath)).size;
  console.log(`  ${outPath}  (${(size / 1024).toFixed(1)} KB)`);
}

console.log('\nGenerating icons\n');
await writePng(letterMark(32), 'app/icon.png');
await writePng(letterMark(180), 'app/apple-icon.png');
await writePng(ogCard(1200, 630), 'app/opengraph-image.png');
console.log('\nDone.\n');
