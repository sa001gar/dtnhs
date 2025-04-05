
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
  '/admissions',
];

// Build the sitemap
const sitemap = sitemapBuilder('https://dtnhs.edu.in', routes);

// Output path
const outputPath = path.resolve('./public/sitemap.xml');

// Make sure there's no BOM or whitespace before the XML declaration
// Write sitemap to file ensuring XML declaration is at the start
fs.writeFileSync(outputPath, sitemap.toString().trim());
