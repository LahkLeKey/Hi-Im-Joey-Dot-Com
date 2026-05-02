#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.resolve(scriptDir, "..");
const srcRoot = path.join(appRoot, "src");
const pagesDir = path.join(srcRoot, "pages");
const uiDir = path.join(srcRoot, "components", "ui");

/*
Boundary rules for beginner-friendly scaffold usage:
1) Page modules live in src/pages and should use a *Page.tsx name.
2) Reusable primitives live in src/components/ui.
3) UI primitives must not import from src/pages.
4) Pages should compose at least one component from src/components/ui.
*/

const violations = [];
const warnings = [];

function toPosix(relativePath) {
  return relativePath.split(path.sep).join("/");
}

function collectFiles(dir, matcher, list = []) {
  if (!fs.existsSync(dir)) {
    return list;
  }

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      collectFiles(fullPath, matcher, list);
      continue;
    }

    if (matcher(entry.name)) {
      list.push(fullPath);
    }
  }

  return list;
}

if (!fs.existsSync(pagesDir)) {
  violations.push("Missing required directory: src/pages");
}
if (!fs.existsSync(uiDir)) {
  violations.push("Missing required directory: src/components/ui");
}

const pageFiles = collectFiles(pagesDir, (name) => /\.tsx?$/.test(name));
const uiFiles = collectFiles(uiDir, (name) => /\.tsx?$/.test(name));

for (const file of uiFiles) {
  const rel = toPosix(path.relative(appRoot, file));
  const baseName = path.basename(file);
  const source = fs.readFileSync(file, "utf8");

  if (/page/i.test(baseName)) {
    violations.push(`${rel}: UI file name looks page-specific. Move it to src/pages if it is a page.`);
  }

  if (/from\s+["'][^"']*(?:@\/pages\/|\.\.\/pages\/|\/pages\/)/.test(source)) {
    violations.push(`${rel}: UI primitive imports from pages. Keep UI primitives page-agnostic.`);
  }
}

for (const file of pageFiles) {
  const rel = toPosix(path.relative(appRoot, file));
  const baseName = path.basename(file);
  const source = fs.readFileSync(file, "utf8");

  if (!baseName.endsWith("Page.tsx")) {
    warnings.push(`${rel}: Page modules should use a *Page.tsx suffix for beginner clarity.`);
  }

  if (!/from\s+["'][^"']*(?:@\/components\/ui\/|\.\.\/components\/ui\/|\/components\/ui\/)/.test(source)) {
    warnings.push(`${rel}: Consider composing at least one reusable UI primitive from src/components/ui.`);
  }
}

if (violations.length > 0) {
  console.error("\nScaffold boundary validation failed:\n");
  for (const item of violations) {
    console.error(`- ${item}`);
  }
  if (warnings.length > 0) {
    console.error("\nAdditional guidance:");
    for (const item of warnings) {
      console.error(`- ${item}`);
    }
  }
  process.exit(1);
}

if (warnings.length > 0) {
  console.warn("\nScaffold boundary validation passed with guidance:\n");
  for (const item of warnings) {
    console.warn(`- ${item}`);
  }
} else {
  console.log("\nScaffold boundary validation passed.");
}
