# Publishing to npm

This document provides instructions for publishing the pascal-tokenizer package to the npm registry.

## Prerequisites

1. You need an npm account. If you don't have one, create it at [npmjs.com](https://www.npmjs.com/signup).
2. You need to be logged in to npm in your terminal:
   ```bash
   npm login
   ```

## Before Publishing

1. Make sure all your changes are committed to your version control system (e.g., git).
2. Update the version number in `package.json` if needed:
   ```bash
   npm version patch  # for bug fixes
   npm version minor  # for new features
   npm version major  # for breaking changes
   ```
3. Build the package to make sure everything compiles correctly:
   ```bash
   npm run build
   ```
4. Test the package locally:
   ```bash
   # Compile and run the example
   npx tsc example.ts
   node example.js
   ```

## Publishing

Once you're ready to publish:

```bash
npm publish
```

The `prepublishOnly` script in `package.json` will automatically run the build process before publishing.

## Publishing a Scoped Package

If you want to publish under your npm username (e.g., @username/pascal-tokenizer):

1. Change the name in `package.json` to `@username/pascal-tokenizer`.
2. Publish with:
   ```bash
   npm publish --access public
   ```

## After Publishing

1. Create a git tag for the version:
   ```bash
   git tag v1.0.0  # replace with your version
   git push origin v1.0.0
   ```
2. Update the README or documentation if needed.

## Unpublishing

If you need to unpublish a version (only possible within 72 hours of publishing):

```bash
npm unpublish pascal-tokenizer@1.0.0  # replace with your version
```

## Resources

- [npm Documentation](https://docs.npmjs.com/)
- [npm Publishing Packages](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)