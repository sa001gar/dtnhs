import fs from "fs";
import path from "path";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { Helmet } from "react-helmet";
import { AppProviders } from "../src/AppProviders";
import { AppRoutes } from "../src/AppRoutes";

const routes = [
  "/",
  "/about",
  "/academics",
  "/students",
  "/teachers",
  "/gallery",
  "/notices",
  "/routine",
  "/results",
  "/contact",
  "/alumni",
  "/alumni/register",
  "/blog",
  "/blog/1",
  "/forum",
  "/forum/1",
  "/syllabus",
  "/exam-schedule",
  "/previous-year-papers",
  "/admissions",
];

const distDir = path.resolve("./dist");
const templatePath = path.join(distDir, "index.html");

const template = fs.readFileSync(templatePath, "utf8");

const renderRoute = (route: string) => {
  const markup = renderToString(
    <AppProviders>
      <StaticRouter location={route}>
        <AppRoutes />
      </StaticRouter>
    </AppProviders>
  );

  const helmet = Helmet.renderStatic();
  const headTags = [
    helmet.title.toString(),
    helmet.meta.toString(),
    helmet.link.toString(),
    helmet.script.toString(),
  ].join("\n");

  const html = template
    .replace('<div id="root"></div>', `<div id="root">${markup}</div>`)
    .replace("</head>", `${headTags}\n</head>`);

  const outputPath = route === "/" ? path.join(distDir, "index.html") : path.join(distDir, route.slice(1), "index.html");
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, html);
};

routes.forEach(renderRoute);

console.log(`Prerendered ${routes.length} routes.`);