# JSLib Packages - Complete Usage Documentation

## Overview

This document provides comprehensive usage examples for all 22 packages in the JSLib collection. Use this content to update the website at https://upendra-manike.github.io/JSLibUseage/

---

## 1. @upendra.manike/tiny-utils

**Ultra-lightweight JavaScript utility functions - modern ES6+ alternatives to Lodash**

### Installation
```bash
npm install @upendra.manike/tiny-utils
```

### Usage Examples

```typescript
import { flatten, merge, chunk, uniq, groupBy } from '@upendra.manike/tiny-utils';

// Array operations
const nested = [1, [2, 3], [4, 5]];
flatten(nested); // [1, 2, 3, 4, 5]

const numbers = [1, 2, 2, 3, 4, 4];
uniq(numbers); // [1, 2, 3, 4]

chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]

// Group array by key
const users = [
  { name: 'John', role: 'admin' },
  { name: 'Jane', role: 'user' },
  { name: 'Bob', role: 'admin' }
];
groupBy(users, u => u.role);
// { admin: [{name: 'John', role: 'admin'}, ...], user: [...] }

// Object merging
const obj1 = { a: 1, b: { c: 2 } };
const obj2 = { b: { d: 3 } };
merge(obj1, obj2); // { a: 1, b: { c: 2, d: 3 } }
```

### Use Cases
- ✅ Replace Lodash for smaller bundle size
- ✅ Array manipulation and grouping
- ✅ Object merging and utilities
- ✅ Functional programming helpers

---

## 2. @upendra.manike/smart-date

**Human-friendly date formatting library - Convert timestamps to natural language**

### Installation
```bash
npm install @upendra.manike/smart-date
```

### Usage Examples

```typescript
import { timeAgo, formatDate, addDays, subtractHours } from '@upendra.manike/smart-date';

// Natural language time
timeAgo(new Date(Date.now() - 3600000)); // "1 hour ago"
timeAgo(new Date(Date.now() - 86400000)); // "yesterday"
timeAgo(new Date(Date.now() + 86400000)); // "tomorrow"

// Date formatting
formatDate(new Date(), 'YYYY-MM-DD'); // "2025-11-01"
formatDate(new Date(), 'DD/MM/YYYY'); // "01/11/2025"

// Date arithmetic
const tomorrow = addDays(new Date(), 1);
const yesterday = addDays(new Date(), -1);
const twoHoursAgo = subtractHours(new Date(), 2);
```

### Use Cases
- ✅ Social media timestamps
- ✅ Dashboard date displays
- ✅ User-friendly date formatting
- ✅ Relative time indicators

---

## 3. @upendra.manike/react-motion-kit

**Prebuilt animation hooks for React - Built on Framer Motion**

### Installation
```bash
npm install @upendra.manike/react-motion-kit
```

### Usage Examples

```tsx
import { useHover, useFade, useSlide, AnimatedButton } from '@upendra.manike/react-motion-kit';

// Hover animations
function MyComponent() {
  const { ref, whileHover, whileTap } = useHover({
    scale: 1.1,
    rotate: 5,
  });

  return <button ref={ref} style={whileHover}>Hover me</button>;
}

// Fade animations
function FadeIn() {
  const fadeProps = useFade({ duration: 0.5 });
  return <div {...fadeProps}>Fades in</div>;
}

// Slide animations
function SlideIn() {
  const slideProps = useSlide('up');
  return <div {...slideProps}>Slides up</div>;
}

// Pre-built animated button
<AnimatedButton
  animation={{
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 }
  }}
>
  Click me
</AnimatedButton>
```

### Use Cases
- ✅ Interactive UI elements
- ✅ Page transitions
- ✅ Micro-interactions
- ✅ Hover effects and gestures

---

## 4. @upendra.manike/api-chain

**Declarative API chaining - Transform callback hell into beautiful workflows**

### Installation
```bash
npm install @upendra.manike/api-chain
```

### Usage Examples

```typescript
import { createChain } from '@upendra.manike/api-chain';

const api = createChain('https://api.example.com');

// Sequential API calls
const result = await api
  .get('/users')
  .then(res => res.data[0].id)
  .then(userId => api.get(`/users/${userId}/posts`))
  .then(res => res.data)
  .then(posts => posts.map(p => p.title))
  .execute();

// With error handling
await api
  .get('/data')
  .then(processData)
  .catch(handleError)
  .finally(cleanup)
  .execute();
```

### Use Cases
- ✅ Dashboard data loading
- ✅ Multi-step API workflows
- ✅ Complex data pipelines
- ✅ Sequential data fetching

---

## 5. @upendra.manike/lite-fetcher

**Lightweight API client with built-in caching**

### Installation
```bash
npm install @upendra.manike/lite-fetcher
```

### Usage Examples

```typescript
import { createApiClient } from '@upendra.manike/lite-fetcher';

const api = createApiClient({
  baseURL: 'https://api.example.com',
  cache: {
    enabled: true,
    ttl: 300000, // 5 minutes
  },
});

// Cached GET request
const data = await api.get('/posts'); // Cached for 5 minutes

// POST request (not cached)
await api.post('/posts', { title: 'New Post' });

// Clear cache
api.clearCache();
```

### Use Cases
- ✅ API data fetching with caching
- ✅ Reduce server load
- ✅ Offline-first applications
- ✅ Performance optimization

---

## 6. @upendra.manike/fetch-plus

**Next-gen Fetch Wrapper - Lightweight Axios replacement**

### Installation
```bash
npm install @upendra.manike/fetch-plus
```

### Usage Examples

```typescript
import { FetchPlus } from '@upendra.manike/fetch-plus';

const api = new FetchPlus({
  baseURL: 'https://api.example.com',
  timeout: 5000,
  retry: {
    attempts: 3,
    delay: 1000,
  },
});

// Request with retry
const response = await api.get('/data');

// POST with interceptors
api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.status === 401) {
      // Handle unauthorized
    }
    return Promise.reject(error);
  }
);
```

### Use Cases
- ✅ Axios replacement
- ✅ Request/response interceptors
- ✅ Automatic retry logic
- ✅ Timeout handling

---

## 7. @upendra.manike/form-genie

**Schema to Form generator for React - Build forms from JSON schema automatically**

### Installation
```bash
npm install @upendra.manike/form-genie
```

### Usage Examples

```tsx
import { FormGenie } from '@upendra.manike/form-genie';

const schema = {
  name: { type: 'text', required: true, label: 'Name' },
  email: { type: 'email', required: true, label: 'Email' },
  age: { type: 'number', min: 18, max: 100, label: 'Age' },
  subscribe: { type: 'checkbox', label: 'Subscribe to newsletter' },
};

function MyForm() {
  return (
    <FormGenie
      schema={schema}
      onSubmit={(data) => console.log(data)}
      validation={(field, value) => {
        if (field === 'email' && !value.includes('@')) {
          return 'Invalid email';
        }
      }}
    />
  );
}
```

### Use Cases
- ✅ Dynamic form generation
- ✅ Admin panels
- ✅ Data entry forms
- ✅ Schema-based forms

---

## 8. @upendra.manike/cacheable-fetch

**Offline-first API Layer - Automatic localStorage/IndexedDB caching**

### Installation
```bash
npm install @upendra.manike/cacheable-fetch
```

### Usage Examples

```typescript
import { cacheableFetch } from '@upendra.manike/cacheable-fetch';

// Cache in localStorage (5 minutes TTL)
const data = await cacheableFetch('/api/posts', {
  cache: 'localStorage',
  ttl: 300000,
});

// Cache in IndexedDB (longer storage)
const userData = await cacheableFetch('/api/user', {
  cache: 'indexedDB',
  ttl: 3600000, // 1 hour
});

// Background refresh
await cacheableFetch('/api/data', {
  cache: 'localStorage',
  backgroundRefresh: true,
});
```

### Use Cases
- ✅ Progressive Web Apps (PWA)
- ✅ Offline-first applications
- ✅ Mobile web apps
- ✅ Reduced API calls

---

## 9. @upendra.manike/motion-kit

**Framework-agnostic animation library**

### Installation
```bash
npm install @upendra.manike/motion-kit
```

### Usage Examples

```typescript
import { fadeIn, slideIn, bounce } from '@upendra.manike/motion-kit';

// Fade in animation
const element = document.querySelector('#my-element');
fadeIn(element);

// Slide in from bottom
slideIn(element, 'up');

// Bounce animation
bounce(element);

// Custom animation
fadeIn(element, {
  duration: 1000,
  delay: 200,
});
```

### Use Cases
- ✅ Vanilla JavaScript animations
- ✅ Framework-agnostic projects
- ✅ Page transitions
- ✅ Element animations

---

## 10. @upendra.manike/ai-mini

**Universal LLM Client - Unified API for all AI providers**

### Installation
```bash
npm install @upendra.manike/ai-mini
```

### Usage Examples

```typescript
import { AIMini } from '@upendra.manike/ai-mini';

// OpenAI
const openai = new AIMini({
  provider: 'openai',
  apiKey: process.env.OPENAI_KEY,
});

const response = await openai.ask('Summarize this text');

// Claude
const claude = new AIMini({
  provider: 'claude',
  apiKey: process.env.CLAUDE_KEY,
});

// Switch providers easily
const ai = new AIMini({
  provider: 'gemini', // or 'groq', 'openai', etc.
  apiKey: process.env.GEMINI_KEY,
});
```

### Use Cases
- ✅ Multi-provider AI apps
- ✅ Chatbots
- ✅ AI integrations
- ✅ LLM applications

---

## 11. @upendra.manike/smart-storage

**Unified storage API - LocalStorage + SessionStorage + IndexedDB with TTL**

### Installation
```bash
npm install @upendra.manike/smart-storage
```

### Usage Examples

```typescript
import { createStorage } from '@upendra.manike/smart-storage';

// Create storage instance
const storage = createStorage({
  type: 'localStorage',
  prefix: 'app:',
});

// Set with TTL (1 hour)
await storage.set('user', { id: 1, name: 'John' }, 3600000);

// Get data
const user = await storage.get('user');

// Check if expired
if (await storage.has('user')) {
  // Data exists and not expired
}

// Clear expired entries
await storage.clearExpired();
```

### Use Cases
- ✅ Caching with expiration
- ✅ Session management
- ✅ Data persistence
- ✅ Offline data storage

---

## 12. @upendra.manike/commit-gen

**Natural Language to Conventional Commit - CLI tool**

### Installation
```bash
npm install -g @upendra.manike/commit-gen
```

### Usage Examples

```bash
# Basic usage
npx commit-gen "fix login bug on Safari"
# Output: fix(auth): fix login bug on Safari

npx commit-gen "add new user registration feature"
# Output: feat(auth): add new user registration feature

npx commit-gen "update dependencies"
# Output: chore(deps): update dependencies
```

### Use Cases
- ✅ Git workflow automation
- ✅ CI/CD pipelines
- ✅ Consistent commit messages
- ✅ Semantic versioning

---

## 13. @upendra.manike/env-checker

**Environment Variable Validator - Prevent app crashes from missing config**

### Installation
```bash
npm install @upendra.manike/env-checker
```

### Usage Examples

```typescript
import { checkEnv } from '@upendra.manike/env-checker';

// Validate at startup
checkEnv({
  OPENAI_KEY: 'string',
  API_URL: 'url',
  PORT: 'number',
  DEBUG: 'boolean',
});

// Throws error if missing or invalid
```

### Use Cases
- ✅ Startup validation
- ✅ Configuration checking
- ✅ Error prevention
- ✅ Node.js/React/Next.js apps

---

## 14. @upendra.manike/react-skeletons

**Auto Placeholder Generator for React**

### Installation
```bash
npm install @upendra.manike/react-skeletons
```

### Usage Examples

```tsx
import { Skeleton, SkeletonAuto } from '@upendra.manike/react-skeletons';

// Basic skeleton
<Skeleton width="200px" height="20px" />

// Auto-generate from existing element
<SkeletonAuto target="#profile-card" />

// Loading state
{isLoading ? (
  <Skeleton width="100%" height="100px" />
) : (
  <div>Content loaded</div>
)}
```

### Use Cases
- ✅ Loading states
- ✅ Content placeholders
- ✅ Better UX
- ✅ Performance indicators

---

## 15. @upendra.manike/changelog-buddy

**Auto Changelog Generator - Reads commits and generates markdown changelog**

### Installation
```bash
npm install -g @upendra.manike/changelog-buddy
```

### Usage Examples

```bash
# Generate changelog from git commits
npx changelog-buddy
# Creates CHANGELOG.md

# Custom output file
npx changelog-buddy --output=CHANGES.md

# Since specific version
npx changelog-buddy --since=v1.0.0
```

### Use Cases
- ✅ Automatic changelog generation
- ✅ Release management
- ✅ CI/CD automation
- ✅ Version documentation

---

## 16. @upendra.manike/string-utils

**String manipulation utilities - camelCase, slugify, CSV conversion**

### Installation
```bash
npm install @upendra.manike/string-utils
```

### Usage Examples

```typescript
import { camelCase, slugify, csvToArray, truncate } from '@upendra.manike/string-utils';

// Case conversion
camelCase('hello world'); // 'helloWorld'
snakeCase('hello world'); // 'hello_world'
kebabCase('hello world'); // 'hello-world'
pascalCase('hello world'); // 'HelloWorld'

// String manipulation
slugify('Hello World!'); // 'hello-world'
truncate('Long text here', 10); // 'Long te...'

// CSV operations
const csv = 'name,age\nJohn,30\nJane,25';
const data = csvToArray(csv);
// [{name: 'John', age: '30'}, {name: 'Jane', age: '25'}]
```

### Use Cases
- ✅ URL slug generation
- ✅ Data format conversion
- ✅ String normalization
- ✅ CSV parsing

---

## 17. @upendra.manike/array-helpers

**Array manipulation utilities - group by, aggregate, statistics**

### Installation
```bash
npm install @upendra.manike/array-helpers
```

### Usage Examples

```typescript
import { groupBy, average, removeDuplicates } from '@upendra.manike/array-helpers';

// Grouping
const users = [
  { name: 'John', role: 'admin' },
  { name: 'Jane', role: 'user' }
];
groupBy(users, u => u.role);
// { admin: [...], user: [...] }

// Statistics
average([1, 2, 3, 4]); // 2.5
median([1, 2, 3, 4, 5]); // 3
mode([1, 2, 2, 3]); // 2

// Remove duplicates
removeDuplicates([1, 2, 2, 3]); // [1, 2, 3]
```

### Use Cases
- ✅ Data aggregation
- ✅ Statistical analysis
- ✅ Array operations
- ✅ Data processing

---

## 18. @upendra.manike/object-helpers

**Object manipulation utilities - deep clone, merge, pick/omit**

### Installation
```bash
npm install @upendra.manike/object-helpers
```

### Usage Examples

```typescript
import { deepClone, deepMerge, deepPick } from '@upendra.manike/object-helpers';

// Deep clone
const original = { a: 1, b: { c: 2 } };
const cloned = deepClone(original);

// Deep merge
const merged = deepMerge(target, source);

// Pick specific keys
const picked = deepPick(obj, ['name', 'address.city']);

// Get nested property safely
const city = getNested(obj, 'address.city', 'Unknown');
```

### Use Cases
- ✅ Object manipulation
- ✅ Data transformation
- ✅ Immutable operations
- ✅ Deep object operations

---

## 19. @upendra.manike/validators

**Validation utilities - email, URL, phone, type checks**

### Installation
```bash
npm install @upendra.manike/validators
```

### Usage Examples

```typescript
import { isEmail, isUrl, isEmpty, isBrowser } from '@upendra.manike/validators';

// Validation
isEmail('test@example.com'); // true
isUrl('https://example.com'); // true
isEmpty(null); // true

// Runtime detection
if (isBrowser()) {
  // Browser-specific code
}
if (isNode()) {
  // Node.js-specific code
}
```

### Use Cases
- ✅ Form validation
- ✅ Input validation
- ✅ Runtime detection
- ✅ Type checking

---

## 20. @upendra.manike/dom-helpers

**DOM and browser utilities - clipboard, viewport, scroll, debounce/throttle**

### Installation
```bash
npm install @upendra.manike/dom-helpers
```

### Usage Examples

```typescript
import { copyToClipboard, debounce, isInViewport } from '@upendra.manike/dom-helpers';

// Clipboard
await copyToClipboard('Hello World');

// Viewport detection
if (isInViewport(element)) {
  // Element is visible
}

// Debounce
const debounced = debounce(() => {
  console.log('Search');
}, 300);

// Throttle scroll
const throttled = throttle(() => {
  console.log('Scroll');
}, 100);
```

### Use Cases
- ✅ Performance optimization
- ✅ User interactions
- ✅ Scroll handling
- ✅ Clipboard operations

---

## 21. @upendra.manike/id-generator

**Secure ID generation - UUID, GUID, short unique strings**

### Installation
```bash
npm install @upendra.manike/id-generator
```

### Usage Examples

```typescript
import { uuid, shortId, hash, mask } from '@upendra.manike/id-generator';

// UUID generation
uuid(); // 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'

// Short ID
shortId(8); // 'aB3dE5fG'

// Hash function
hash('hello'); // 'ac62a'

// Mask sensitive data
mask('test@example.com', 4); // 'te****@example.com'
```

### Use Cases
- ✅ Unique identifiers
- ✅ Token generation
- ✅ Data masking
- ✅ Hash functions

---

## 22. @upendra.manike/dev-utils

**Developer utilities - logging, timing, query parser, pub-sub**

### Installation
```bash
npm install @upendra.manike/dev-utils
```

### Usage Examples

```typescript
import { logger, measureTime, parseQueryString, EventEmitter } from '@upendra.manike/dev-utils';

// Logging with context
const log = logger('MyApp');
log.log('Hello'); // [2025-11-01T...] [MyApp] Hello

// Performance measurement
const { result, time } = await measureTime(async () => {
  return await fetchData();
});

// Query string parsing
const params = parseQueryString('?name=John&age=30');
// { name: 'John', age: '30' }

// Event emitter
const emitter = new EventEmitter();
emitter.on('event', (data) => console.log(data));
emitter.emit('event', 'Hello');
```

### Use Cases
- ✅ Development tools
- ✅ Performance measurement
- ✅ Event handling
- ✅ URL parsing

---

## Quick Reference

### By Category

**Utilities:**
- `tiny-utils` - General utilities
- `string-utils` - String manipulation
- `array-helpers` - Array operations
- `object-helpers` - Object manipulation

**Date & Time:**
- `smart-date` - Date formatting

**API & Networking:**
- `fetch-plus` - Fetch wrapper
- `lite-fetcher` - Cached API client
- `cacheable-fetch` - Offline-first fetch
- `api-chain` - Sequential API calls

**React:**
- `react-motion-kit` - Animation hooks
- `form-genie` - Form generator
- `react-skeletons` - Loading placeholders

**Storage:**
- `smart-storage` - Unified storage API

**Validation:**
- `validators` - Input validation
- `env-checker` - Environment validation

**Developer Tools:**
- `dev-utils` - Dev utilities
- `commit-gen` - Commit generator (CLI)
- `changelog-buddy` - Changelog generator (CLI)

**Animations:**
- `motion-kit` - Framework-agnostic animations

**AI:**
- `ai-mini` - Universal LLM client

**Security:**
- `id-generator` - ID generation

---

## Installation Script

Install all packages at once:

```bash
npm install @upendra.manike/tiny-utils \
  @upendra.manike/smart-date \
  @upendra.manike/react-motion-kit \
  @upendra.manike/api-chain \
  @upendra.manike/lite-fetcher \
  @upendra.manike/fetch-plus \
  @upendra.manike/form-genie \
  @upendra.manike/cacheable-fetch \
  @upendra.manike/motion-kit \
  @upendra.manike/ai-mini \
  @upendra.manike/smart-storage \
  @upendra.manike/commit-gen \
  @upendra.manike/env-checker \
  @upendra.manike/react-skeletons \
  @upendra.manike/changelog-buddy \
  @upendra.manike/string-utils \
  @upendra.manike/array-helpers \
  @upendra.manike/object-helpers \
  @upendra.manike/validators \
  @upendra.manike/dom-helpers \
  @upendra.manike/id-generator \
  @upendra.manike/dev-utils
```

---

## Resources

- **npm:** https://www.npmjs.com/org/upendra.manike
- **GitHub:** https://github.com/upendramyorigami/JSLib
- **Website:** https://upendra-manike.github.io/JSLibUseage/

