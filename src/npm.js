import { execSync } from "child_process";

/**
 * Returns all available versions of a package, from newest to oldest.
 */
export function npmVersions(packageSpec) {
  return npmView(packageSpec, "versions").reverse();
}

/**
 * Returns the installed version of a package or `undefined` if not
 * installed.
 */
export function npmInstalledVersion(packageName) {
  const result = npmList(packageName);
  return result.dependencies && result.dependencies[packageName]?.version;
}

export function npmView(packageSpec, field) {
  const args = ["view", "--json", packageSpec];
  if (field) {
    args.push(field);
  }
  const result = npm(args.join(" "));
  return JSON.parse(result);
}

export function npmList(packageName) {
  try {
    const result = npm(`list --json ${packageName} 2>/dev/null || true`);
    return JSON.parse(result);
  } catch(error) {
    return JSON.parse(error.stdout.toString());
  }
}

export function npm(...args) {
  return execSync(`npm ${args.join(" ")}`).toString();
}
