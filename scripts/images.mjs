import fs from 'node:fs/promises';
import path from 'node:path';
import fg from 'fast-glob';
import sharp from 'sharp';

const SOURCE = '_source';
const OUT = 'public/images';
const WIDTHS = [640, 960, 1440, 1920];

const FORMATS = [
  { ext: 'avif', encode: (img) => img.avif({ quality: 50, effort: 4 }) },
  { ext: 'webp', encode: (img) => img.webp({ quality: 72 }) },
  { ext: 'jpg', encode: (img) => img.jpeg({ quality: 78, mozjpeg: true }) },
];

async function mtimeMs(p) {
  try {
    return (await fs.stat(p)).mtimeMs;
  } catch {
    return null;
  }
}

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

function pad(s, n, right = false) {
  s = String(s);
  return right ? s.padStart(n) : s.padEnd(n);
}

async function main() {
  const patterns = [`${SOURCE}/**/*.{jpg,jpeg,png,JPG,JPEG,PNG}`];
  const files = await fg(patterns, { onlyFiles: true, dot: false });

  if (files.length === 0) {
    console.log(`No images found under ${SOURCE}/`);
    console.log(`Drop originals in ${SOURCE}/<subfolder>/ and re-run.`);
    return;
  }

  const rows = [];
  let totalIn = 0;
  let totalOut = 0;
  let generated = 0;
  let skipped = 0;

  for (const file of files) {
    const rel = path.relative(SOURCE, file).replace(/\\/g, '/');
    const subdir = path.dirname(rel);
    const basename = path.basename(rel, path.extname(rel));
    const outDir = path.join(OUT, subdir);
    await fs.mkdir(outDir, { recursive: true });

    const srcStat = await fs.stat(file);
    const srcMtime = srcStat.mtimeMs;
    totalIn += srcStat.size;

    let srcWidth = Infinity;
    try {
      const meta = await sharp(file).metadata();
      srcWidth = meta.width || Infinity;
    } catch (err) {
      console.error(`  ! Could not read metadata for ${rel}: ${err.message}`);
      continue;
    }

    let fileOutBytes = 0;

    for (const w of WIDTHS) {
      if (w > srcWidth) continue;

      for (const fmt of FORMATS) {
        const outPath = path.join(outDir, `${basename}-${w}.${fmt.ext}`);
        const outMtime = await mtimeMs(outPath);

        if (outMtime !== null && outMtime >= srcMtime) {
          fileOutBytes += (await fs.stat(outPath)).size;
          skipped++;
          continue;
        }

        // sharp strips metadata by default (no .withMetadata() / .keepMetadata()).
        // .rotate() with no args honors EXIF orientation, then bakes it in.
        const pipeline = sharp(file, { failOn: 'error' })
          .rotate()
          .resize({ width: w, withoutEnlargement: true });

        const buf = await fmt.encode(pipeline).toBuffer();
        await fs.writeFile(outPath, buf);
        fileOutBytes += buf.length;
        generated++;
      }
    }

    totalOut += fileOutBytes;
    rows.push({ file: rel, in: srcStat.size, out: fileOutBytes });
  }

  const nameCol = Math.max(4, Math.min(52, ...rows.map((r) => r.file.length + 2), 52));
  const line = '─'.repeat(nameCol + 12 + 12 + 6);

  console.log('');
  console.log(line);
  console.log(
    '  ' +
      pad('File', nameCol) +
      pad('Input', 12, true) +
      pad('Output', 12, true) +
      pad('Δ', 6, true),
  );
  console.log(line);
  for (const r of rows) {
    const delta = r.in > 0 ? `${Math.round((r.out / r.in) * 100)}%` : '—';
    console.log(
      '  ' +
        pad(r.file, nameCol) +
        pad(formatSize(r.in), 12, true) +
        pad(formatSize(r.out), 12, true) +
        pad(delta, 6, true),
    );
  }
  console.log(line);
  const totalDelta = totalIn > 0 ? `${Math.round((totalOut / totalIn) * 100)}%` : '—';
  console.log(
    '  ' +
      pad(`Total (${rows.length} source, ${generated} generated, ${skipped} cached)`, nameCol) +
      pad(formatSize(totalIn), 12, true) +
      pad(formatSize(totalOut), 12, true) +
      pad(totalDelta, 6, true),
  );
  console.log('');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
