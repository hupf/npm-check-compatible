# npm-check-compatible

Determines latest compatible version of a package.

The command walks back the versions of the given package until it finds a version whose peer dependencies are satisfied by the packages installed in the current projects (i.e. that is compatible with the project). This is very handy for example when installing or updating an Angular library in an Angular project, but also in other use cases.

## Usage

We've updated an Angular project from version 14 to 15 and have to update `@ng-bootstrap/ng-bootstrap` now to the latest version compatible with Angular 15:

```
$ npx npm-check-compatible @ng-bootstrap/ng-bootstrap
Searching for a version of @ng-bootstrap/ng-bootstrap whose peer dependencies are satisfied
by the packages installed in the current project:
Checking @ng-bootstrap/ng-bootstrap@16.0.0......
Checking @ng-bootstrap/ng-bootstrap@15.1.2......
Checking @ng-bootstrap/ng-bootstrap@15.1.1......
Checking @ng-bootstrap/ng-bootstrap@15.1.0......
Checking @ng-bootstrap/ng-bootstrap@15.0.1......
Checking @ng-bootstrap/ng-bootstrap@15.0.0......
Checking @ng-bootstrap/ng-bootstrap@14.2.0......
Latest compatible version: @ng-bootstrap/ng-bootstrap@14.2.0
```

We can now simply update to this version:

```
$ npm install --save @ng-bootstrap/ng-bootstrap@14.2.0
```

Don't forget to check the changelog for breaking changes!

## Contributing

Contributations are welcome, this project is licensed under the terms of the [APL-2.0](./LICENSE) license.

To test the command locally, just clone this repository, then within a project directory, execute the following command:

```
node /path/to/npm-check-compatible/src/cli.js <package>
```
