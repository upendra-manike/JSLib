# Individual LinkedIn Posts for Each NPM Package

## Post 1: @upendra.manike/smart-date

🚀 Introducing @upendra.manike/smart-date - A human-friendly date library for modern web apps!

Tired of showing raw timestamps like "2024-01-15T10:30:00Z"? Smart Date converts them into natural, human-readable formats:

✨ **Features:**
• "2h ago" instead of timestamps
• "yesterday", "tomorrow", "next Monday"
• Flexible absolute date formatting
• Locale support for internationalization
• Full TypeScript support

Perfect for:
✅ Social media apps
✅ Activity feeds
✅ Dashboard timestamps
✅ User notifications

```bash
npm install @upendra.manike/smart-date
```

Check it out: https://www.npmjs.com/package/@upendra.manike/smart-date

Open source (MIT). Feedback welcome! 🙏

#JavaScript #TypeScript #WebDevelopment #FrontendDevelopment #NPM #OpenSource

---

## Post 2: @upendra.manike/api-chain

🔗 Just published @upendra.manike/api-chain - Declarative API chaining made simple!

Create clean, sequential API workflows without callback hell or complex async/await chains.

✨ **What it does:**
• Chain API calls sequentially
• Built-in error handling with hooks
• Step completion tracking
• Type-safe workflows
• Continue on error option

Perfect for:
✅ Loading dashboard data
✅ Multi-step API workflows
✅ Data dependency chains
✅ Complex API integrations

```typescript
const result = await chain(
  getUser,
  getPosts,
  getComments
).run();
```

Check it out: https://www.npmjs.com/package/@upendra.manike/api-chain

Open source (MIT). Let me know what you think! 💭

#JavaScript #TypeScript #WebDevelopment #API #NPM #OpenSource #BackendDevelopment

---

## Post 3: @upendra.manike/tiny-utils

🪄 Meet @upendra.manike/tiny-utils - Your modern Lodash replacement!

Ultra-lightweight utility library using native ES6+ methods. Import only what you need, tree-shake the rest.

✨ **What's inside:**
• Array utilities: chunk, uniq, groupBy, flatten
• Object utilities: omit, pick, merge, get, set
• Function utilities: debounce, throttle, memoize
• String utilities: camelCase, kebabCase, capitalize
• Type guards: isDefined, isNil, isObject

Why choose this?
✅ Zero dependencies
✅ Tree-shakable
✅ TypeScript-first
✅ Modern ES6+ patterns
✅ Smaller bundle size than Lodash

```bash
npm install @upendra.manike/tiny-utils
```

Check it out: https://www.npmjs.com/package/@upendra.manike/tiny-utils

Perfect for projects where bundle size matters! 📦

#JavaScript #TypeScript #WebDevelopment #Lodash #NPM #OpenSource #Performance

---

## Post 4: @upendra.manike/lite-fetcher

⚡ Introducing @upendra.manike/lite-fetcher - Modern API client with built-in caching!

A lightweight fetch wrapper that handles caching, retries, and timeouts out of the box.

✨ **Features:**
• Built-in caching (localStorage, sessionStorage, memory)
• TTL (Time To Live) support
• Auto-retry on failures
• Request timeout handling
• Works in browser & Node.js
• Zero dependencies

Perfect for:
✅ RESTful API calls
✅ Data fetching with caching
✅ Reducing API load
✅ Offline-first apps
✅ Performance optimization

```typescript
const data = await api.get('/users', { 
  cache: { ttl: 60000 } // Cache for 1 minute
});
```

Check it out: https://www.npmjs.com/package/@upendra.manike/lite-fetcher

Open source (MIT). Try it out! 🚀

#JavaScript #TypeScript #WebDevelopment #API #Caching #NPM #OpenSource #Performance

---

## Post 5: @upendra.manike/react-motion-kit

🎭 Just launched @upendra.manike/react-motion-kit - Prebuilt animation hooks for React!

Stop writing the same animation code over and over. Use production-ready hooks built on Framer Motion.

✨ **What's included:**
• Animation hooks: fadeIn, slideIn, bounce, shake, pulse, rotate, scale
• Pre-built components: AnimatedButton, AnimatedModal
• Hover effects
• Fully customizable
• TypeScript support

Perfect for:
✅ Landing pages
✅ Dashboards
✅ Interactive UIs
✅ Marketing sites
✅ Prototyping

```typescript
import { useFadeIn } from '@upendra.manike/react-motion-kit';

const fade = useFadeIn({ duration: 0.5 });
<motion.div {...fade}>Content</motion.div>
```

Check it out: https://www.npmjs.com/package/@upendra.manike/react-motion-kit

Requires: framer-motion

Open source (MIT). Let me know your feedback! 💬

#React #JavaScript #TypeScript #Animation #WebDevelopment #NPM #OpenSource #FramerMotion #FrontendDevelopment

