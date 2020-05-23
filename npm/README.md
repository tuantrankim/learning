
- In general, all packages should be installed locally


- A package should be installed globally when it provides an executable command that you run from the shell (CLI), and it’s reused across projects

# View global package
```
npm list -g --depth 0
```

# Uninstall global package
```
npm uninstall -g @angular/cli
npm cache clean --force
```

# Uninstall global package
```
npm install -g @angular/cli
OR
npm install -g @angular/cli@8.3.14
```
# npm prune removes "extraneous" packages in app_modules

```
npm prune [<name> [<name ...]]
Extraneous packages are packages that are not listed on the parent package's dependencies list in package.json
```
