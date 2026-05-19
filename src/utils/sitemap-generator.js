
import path from 'path';
import fs from 'fs';

const routes = [
  '/',
  '/about',
  '/students',
  '/teachers',
  '/academics',
  '/gallery',
  '/notices',
  '/routine',
  '/results',
  '/contact',
  '/alumni',
  '/blog',
  '/forum',
  '/syllabus',
  '/exam-schedule',
  '/previous-year-papers',
  '/admissions',
];

const baseUrl = (process.env.SITE_URL || process.env.VITE_SITE_URL || 'https://dtnhs.netlify.app').replace(/\/+$/, '');

const buildUrl = (route) => `${baseUrl}${route === '/' ? '/' : route}`;

const sitemapEntries = routes
  .map((route) => `  <url>\n    <loc>${buildUrl(route)}</loc>\n  </url>`)
  .join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries}\n</urlset>\n`;

const robots = `User-agent: *\nAllow: /\n\nSitemap: ${baseUrl}/sitemap.xml\n`;

const outputPath = path.resolve('./public/sitemap.xml');
const robotsPath = path.resolve('./public/robots.txt');

fs.writeFileSync(outputPath, sitemap);
fs.writeFileSync(robotsPath, robots);

console.log('Sitemap and robots generated successfully!');
