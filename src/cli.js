import process from "process";
import { findCompatibleVersion } from "./index.js";

const packageName = "@ng-bootstrap/ng-bootstrap";

process.stdout.write(
  `Searching for a version of ${packageName} whose peer dependencies are satisfied\n` +
    `by the packages installed in the current project:`
);
const result = findCompatibleVersion(packageName, logEvent)
process.stdout.write(`\nLatest compatible version: ${result}`);

function logEvent(event) {
  switch(event.type) {
    case "checkversion": {
      const { packageName, version } = event.details;
      process.stdout.write(`\nChecking ${packageName}@${version}`)
      break;
    }
    case "checkinstalled": {
      process.stdout.write(".");
      break;
    }
  }
}
