import semver from "semver";
import { npmInstalledVersion, npmVersions, npmView } from "./npm.js";

/**
 * Returns true if the given package has peer dependencies, false
 * otherwise.
 */
export function hasPeerDependencies(packageName) {
  return npmView(`${packageName}@latest`, "peerDependencies") !== undefined;
}

/**
 * Returns the latest version of the given package that satisfies the
 * peerDependencies of the packages in the project.
 *
 * @returns string | undefined
 */
export function findCompatibleVersion(packageName, onEvent) {
  const versions = npmVersions(packageName).filter(
    (version) => !semver.prerelease(version),
  );
  return versions.find((version) => {
    onEvent &&
      onEvent({ type: "checkversion", details: { packageName, version } });
    return isCompatibleWithProject(packageName, version, onEvent);
  });
}

/**
 * Returns true if the peerDependencies of the given package/version
 * are fully satisfied by the dependencies in the current project.
 *
 * @returns boolean
 */
function isCompatibleWithProject(packageName, version, onEvent) {
  const peerDependencies = npmView(
    `${packageName}@${version}`,
    "peerDependencies",
  );
  return satisfiesDependencies(peerDependencies, onEvent) === "full";
}

/**
 * Returns "full" if all dependencies are satisified, "partial" if only
 * some or "no" if none.
 *
 * @returns "full" | "partial" | "no"
 */
function satisfiesDependencies(dependencies, onEvent) {
  let satisfies = true;
  let partial = false;

  if (!dependencies || dependencies.length === 0) {
    return "no";
  }

  for (const [requestedName, requestedVersion] of Object.entries(
    dependencies,
  )) {
    onEvent && onEvent({ type: "checkinstalled" });
    const installedVersion = npmInstalledVersion(requestedName);
    if (installedVersion) {
      const requestedSatisfies = semver.satisfies(
        installedVersion,
        requestedVersion,
      );
      satisfies = satisfies && requestedSatisfies;
      partial = partial || (satisfies && !requestedSatisfies);
    }
  }

  if (partial) {
    return "partial";
  }
  return satisfies ? "full" : "no";
}
