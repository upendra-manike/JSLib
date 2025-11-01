# JSLib - JavaScript Libraries Collection

A collection of 5 modern, production-ready JavaScript/TypeScript libraries.

## Projects

### 1. 🪄 [tiny-utils](./tiny-utils/)

Ultra-lightweight modern JS utilities - Replace Lodash with ES6+ native methods and tree-shakable modules.

**Features:**
- Array utilities (chunk, uniq, groupBy, flatten, etc.)
- Object utilities (omit, pick, merge, get, set)
- Function utilities (debounce, throttle, memoize)
- String utilities (capitalize, camelCase, kebabCase, etc.)
- Type guards (isDefined, isNil, isObject, etc.)

### 2. 📅 [smart-date](./smart-date/)

Human-friendly date library - Converts timestamps into natural language like "2h ago", "yesterday", "next Monday".

**Features:**
- Natural language relative time formatting
- Flexible absolute date formatting
- Locale support
- Utility methods (isToday, isYesterday, isTomorrow)

### 3. 🎭 [react-motion-kit](./react-motion-kit/)

Prebuilt animation hooks for React - Plug-and-play Framer Motion-based animations for buttons, modals, and more.

**Features:**
- Pre-built animation hooks (fadeIn, slideIn, bounce, shake, pulse, etc.)
- Animated components (Button, Modal)
- Hover effects
- Fully customizable

### 4. 🔗 [api-chain](./api-chain/)

Declarative API chaining - Create API workflows with ease.

**Features:**
- Chain API calls sequentially
- Error handling with hooks
- Continue on error option
- Step completion hooks

### 5. ⚡ [lite-fetcher](./lite-fetcher/)

Modern, tiny utility library for API calls + caching with fetch + localStorage built-in.

**Features:**
- Built-in caching (localStorage, sessionStorage, memory)
- TTL support
- Auto retry logic
- Timeout handling
- Browser + Node compatible

## Quick Start

Each library is independent and can be used separately:

```bash
# Install individual libraries
npm install @upendra.manike/tiny-utils
npm install @upendra.manike/smart-date
npm install @upendra.manike/react-motion-kit
npm install @upendra.manike/api-chain
npm install @upendra.manike/lite-fetcher
```

## Development

Each project follows the same modern development setup:

- **Language**: TypeScript
- **Bundler**: tsup
- **Testing**: vitest
- **Linting**: ESLint + Prettier

### Build a Project

```bash
cd <project-name>
pnpm install
pnpm build
```

### Test a Project

```bash
cd <project-name>
pnpm test
```

### Publish to npm

```bash
cd <project-name>
npm publish --access public
```

## Tech Stack

All projects use:
- **TypeScript** - Type safety
- **tsup** - Fast bundling
- **vitest** - Fast testing
- **ESLint + Prettier** - Code quality
- **MIT License** - Open source

## Project Structure

```
JSLib/
├── tiny-utils/          # Utility functions library
├── smart-date/          # Date formatting library
├── react-motion-kit/    # React animation hooks
├── api-chain/           # API workflow library
└── lite-fetcher/        # API client with caching
```

## License

All projects are licensed under the MIT License.

## Contributing

Each library has its own contribution guidelines. See individual README files for details.

