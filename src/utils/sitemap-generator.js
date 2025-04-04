
const { sitemapBuilder } = require('react-router-sitemap');
const path = require('path');
const fs = require('fs');

// Define the routes
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
];

// Build the sitemap
const sitemap = sitemapBuilder('https://dtnhs.edu.in', routes);

// Output path
const outputPath = path.resolve('./public/sitemap.xml');

// Write sitemap to file
fs.writeFileSync(outputPath, sitemap.toString());
