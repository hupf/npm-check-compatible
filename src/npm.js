import { execSync } from "child_process";

/**
 * Returns all available versions of a package, from newest to oldest.
 */
export function npmVersions(packageSpec) {
  const versions = npmView(packageSpec, "versions");
  if (versions.error) {
    return [];
  }
  return versions.reverse();
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
  return npmJson(args);
}

export function npmList(packageName) {
  const args = ["list", "--json", packageName];
  return npmJson(args);
}

export function npmJson(args) {
  try {
    const result = npm(`${args.join(" ")} 2>/dev/null || true`);
    return JSON.parse(result);
  } catch (error) {
    return JSON.parse(error.stdout.toString());
  }
}

export function npm(args) {
  return execSync(`npm ${args}`).toString();
}
