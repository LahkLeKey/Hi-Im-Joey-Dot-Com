#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "..", "..");

const joeyWorkspacePath = path.join(repoRoot, "For Joey.code-workspace");
const fullWorkspacePath = path.join(repoRoot, "Hi-Im-Joey-Dot-Com.code-workspace");

const expectedJoeyPaths = ["app/src/components/ui", "app/src/pages"];
const requiredFullPaths = [
  ".",
  "app/src/components/ui",
  "app/src/pages",
  ".specify",
  ".github",
];

function normalizeWorkspacePath(value) {
  return String(value || "")
    .replace(/\\/g, "/")
    .replace(/^\.\//, "")
    .replace(/\/$/, "");
}

function readWorkspaceFile(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing workspace file: ${path.basename(filePath)}`);
  }

  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = JSON.parse(raw);
  const folders = Array.isArray(parsed.folders) ? parsed.folders : [];
  return folders.map((folder) => normalizeWorkspacePath(folder.path));
}

const violations = [];

let joeyFolders = [];
let fullFolders = [];

try {
  joeyFolders = readWorkspaceFile(joeyWorkspacePath);
  fullFolders = readWorkspaceFile(fullWorkspacePath);
} catch (error) {
  console.error(String(error));
  process.exit(1);
}

const joeyUnexpected = joeyFolders.filter((folder) => !expectedJoeyPaths.includes(folder));
const joeyMissing = expectedJoeyPaths.filter((folder) => !joeyFolders.includes(folder));

if (joeyUnexpected.length > 0) {
  violations.push(
    `For Joey.code-workspace contains unexpected folders: ${joeyUnexpected.join(", ")}`
  );
}
if (joeyMissing.length > 0) {
  violations.push(`For Joey.code-workspace is missing required folders: ${joeyMissing.join(", ")}`);
}

const fullMissing = requiredFullPaths.filter((folder) => !fullFolders.includes(folder));
if (fullMissing.length > 0) {
  violations.push(`Hi-Im-Joey-Dot-Com.code-workspace is missing required folders: ${fullMissing.join(", ")}`);
}

for (const folder of expectedJoeyPaths) {
  if (!fullFolders.includes(folder)) {
    violations.push(`Workspace mismatch: ${folder} exists in Joey view but not in full view.`);
  }
}

if (violations.length > 0) {
  console.error("\nWorkspace view validation failed:\n");
  for (const item of violations) {
    console.error(`- ${item}`);
  }
  process.exit(1);
}

console.log("\nWorkspace view validation passed.");
console.log(`- Joey view folders: ${joeyFolders.length}`);
console.log(`- Full view folders: ${fullFolders.length}`);
