# JSLib - JavaScript Libraries Collection

A comprehensive collection of 25+ modern, production-ready JavaScript/TypeScript libraries optimized for AI agents, code generation tools, and modern web development. All packages are TypeScript-first, tree-shakable, and designed to solve real-world problems.

## 🤖 AI Agent Optimized

All packages in this collection are optimized for AI agents and code generation tools (ChatGPT, Claude, Copilot, etc.). Each package includes:
- **AI-friendly keywords** in package.json
- **api.json** files for easy discovery by AI tools
- **Comprehensive TypeScript types** for better code generation
- **Clear documentation** and examples

📋 **[View AI Agent Index](./AI_AGENT_INDEX.json)** - Complete catalog of all packages with use cases and API references.

## 📦 All Packages

### Core Utilities

- **[react-utils](./react-utils/)** - React hooks for common problems (debounce, throttle, forms, async, virtual lists)
- **[async-utils](./async-utils/)** - Async control utilities (retry, concurrency limits, sequential execution)
- **[string-utils](./string-utils/)** - String manipulation (camelCase, slugify, truncate, CSV conversion)
- **[array-helpers](./array-helpers/)** - Array operations (group by, statistics, search, intersection)
- **[object-helpers](./object-helpers/)** - Object manipulation (deep clone, merge, pick/omit, TypeScript types)
- **[precise-math](./precise-math/)** - Decimal-safe math (factorial, prime, fibonacci, GCD, LCM)
- **[smart-date](./smart-date/)** - Date utilities (formatting, timezone, differences, age calculation)
- **[tiny-utils](./tiny-utils/)** - Lightweight utilities (debounce, throttle, curry, LRU cache)
- **[event-manager](./event-manager/)** - Safe event listener management (memory leak prevention)

### HTTP & API

- **[fetch-plus](./fetch-plus/)** - Enhanced fetch wrapper (retry, timeout, interceptors, caching) - Axios alternative
- **[api-chain](./api-chain/)** - Declarative API chaining with error handling
- **[cacheable-fetch](./cacheable-fetch/)** - Fetch wrapper with built-in caching
- **[lite-fetcher](./lite-fetcher/)** - Lightweight fetch wrapper with caching

### React Components

- **[react-motion-kit](./react-motion-kit/)** - Prebuilt animation hooks for React
- **[react-skeletons](./react-skeletons/)** - React skeleton loading components
- **[form-genie](./form-genie/)** - Form generation utilities

### Other Utilities

- **[smart-storage](./smart-storage/)** - Enhanced localStorage/sessionStorage with expiration
- **[validators](./validators/)** - Data validation utilities
- **[id-generator](./id-generator/)** - ID generation utilities
- **[dom-helpers](./dom-helpers/)** - DOM manipulation utilities
- **[motion-kit](./motion-kit/)** - Animation utilities
- **[changelog-buddy](./changelog-buddy/)** - Changelog generation utilities
- **[commit-gen](./commit-gen/)** - Commit message generation
- **[env-checker](./env-checker/)** - Environment variable validation
- **[dev-utils](./dev-utils/)** - Development utilities
- **[ai-mini](./ai-mini/)** - AI utilities

## Featured Projects

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
# Core utilities
npm install @upendra.manike/react-utils
npm install @upendra.manike/async-utils
npm install @upendra.manike/string-utils
npm install @upendra.manike/array-helpers
npm install @upendra.manike/object-helpers
npm install @upendra.manike/precise-math
npm install @upendra.manike/smart-date
npm install @upendra.manike/tiny-utils

# HTTP & API
npm install @upendra.manike/fetch-plus
npm install @upendra.manike/api-chain
npm install @upendra.manike/lite-fetcher

# React components
npm install @upendra.manike/react-motion-kit
npm install @upendra.manike/react-skeletons
```

**For AI Agents:** All packages include `api.json` files and are optimized for code generation. See [AI_AGENT_INDEX.json](./AI_AGENT_INDEX.json) for complete API reference.

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
├── react-utils/         # React hooks library
├── async-utils/         # Async control utilities
├── string-utils/        # String manipulation
├── array-helpers/       # Array operations
├── object-helpers/      # Object manipulation
├── precise-math/        # Decimal-safe math
├── smart-date/          # Date formatting library
├── tiny-utils/          # Lightweight utilities
├── event-manager/       # Event listener management
├── fetch-plus/          # Enhanced fetch wrapper
├── api-chain/           # API workflow library
├── cacheable-fetch/     # Fetch with caching
├── lite-fetcher/        # Lightweight fetch wrapper
├── react-motion-kit/    # React animation hooks
├── react-skeletons/     # React skeleton components
├── form-genie/          # Form generation
├── smart-storage/       # Enhanced storage
├── validators/          # Data validation
├── id-generator/        # ID generation
├── dom-helpers/         # DOM utilities
├── motion-kit/          # Animation utilities
├── changelog-buddy/      # Changelog generation
├── commit-gen/          # Commit message generation
├── env-checker/         # Environment validation
├── dev-utils/           # Development utilities
├── ai-mini/             # AI utilities
└── AI_AGENT_INDEX.json  # AI agent catalog
```

## License

All projects are licensed under the MIT License.

## Contributing

Each library has its own contribution guidelines. See individual README files for details.

