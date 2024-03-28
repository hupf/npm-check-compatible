#!/usr/bin/env node
import process from "process";
import { findCompatibleVersion } from "./index.js";

const args = process.argv.slice(
  process.argv.findIndex(
    (arg) => arg.endsWith("cli.js") || arg === "npm-check-compatible",
  ),
);
const packageName = args[1];

if (args.length !== 2) {
  console.log(`Usage: npm-check-compatible <package name>`);
  process.exit(1);
}

process.stdout.write(
  `Searching for a version of ${packageName} whose peer dependencies are satisfied\n` +
    `by the packages installed in the current project:`,
);
const compatibleVersion = findCompatibleVersion(packageName, logEvent);
process.stdout.write("\n");

if (compatibleVersion) {
  process.stdout.write(
    `Latest compatible version: ${packageName}@${compatibleVersion}`,
  );
} else {
  process.stderr.write(
    "Package not found or no compatible version available\n",
  );
  process.exit(1);
}

function logEvent(event) {
  switch (event.type) {
    case "checkversion": {
      const { packageName, version } = event.details;
      process.stdout.write(`\nChecking ${packageName}@${version}`);
      break;
    }
    case "checkinstalled": {
      process.stdout.write(".");
      break;
    }
  }
}
