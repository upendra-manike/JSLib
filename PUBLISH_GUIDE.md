# Publishing Guide

## Prerequisites

1. **Create an npm account** (if you don't have one):
   - Go to https://www.npmjs.com/signup
   - Create your account

2. **Login to npm**:
   ```bash
   npm login
   ```
   Enter your username, password, and email.

3. **Verify login**:
   ```bash
   npm whoami
   ```

## Publishing Steps

### 1. smart-date ✅ (Ready to publish)

```bash
cd smart-date
npm publish --access public
```

### 2. api-chain ✅ (Ready to publish)

```bash
cd api-chain
npm publish --access public
```

### 3. tiny-utils (Needs fix)

Type error in `flatten` function. After fixing:
```bash
cd tiny-utils
npm run build
npm publish --access public
```

### 4. lite-fetcher (Needs fix)

Type error with RequestOptions. After fixing:
```bash
cd lite-fetcher
npm run build
npm publish --access public
```

### 5. react-motion-kit (Needs fix)

Type error in AnimatedButton. After fixing:
```bash
cd react-motion-kit
npm run build
npm publish --access public
```

## Check Package Availability

Before publishing, check if package names are available:

```bash
npm view <package-name>
```

If it returns 404, the name is available.

## Publishing All Projects

Once all builds are successful:

```bash
# Publish each one
cd smart-date && npm publish --access public && cd ..
cd api-chain && npm publish --access public && cd ..
cd tiny-utils && npm publish --access public && cd ..
cd lite-fetcher && npm publish --access public && cd ..
cd react-motion-kit && npm publish --access public && cd ..
```

## Version Updates

After first publish, to update versions:

```bash
npm version patch  # 1.0.0 -> 1.0.1
npm version minor  # 1.0.0 -> 1.1.0
npm version major  # 1.0.0 -> 2.0.0
npm publish
```

## Notes

- The `--access public` flag is required for scoped packages or new packages
- Make sure each package has unique name in `package.json`
- Verify `package.json` has correct `version`, `name`, and `files` field
- The `dist` folder should be built before publishing

