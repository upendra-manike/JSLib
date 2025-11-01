# Package Categorization & Gaps Analysis

## Current Packages by Category

### String / Data Manipulation
- ✅ **tiny-utils** - Has some array utilities (flatten)
- ⚠️ **Missing**: snake_case ↔ camelCase, capitalize, truncate, slugify, CSV conversion, normalize line-endings

### Date / Time Helpers
- ✅ **smart-date** - Has "time ago" format, date formatting
- ⚠️ **Missing**: add/subtract days/hours/minutes, i18n formatting

### Async / Promises / API Helpers
- ✅ **api-chain** - Sequential API calls
- ✅ **fetch-plus** - Retry, timeout, cancel
- ✅ **lite-fetcher** - Caching
- ⚠️ **Missing**: retry with backoff, concurrency limiting, memoize functions

### Validation / Type Checks
- ✅ **form-genie** - Form validation
- ✅ **env-checker** - Env validation
- ⚠️ **Missing**: email/URL/phone validation, empty value checks, type checks, safe property access, runtime detection

### Array / Math / Object Helpers
- ✅ **tiny-utils** - Has flatten, merge
- ⚠️ **Missing**: group by key, aggregate, average/median/mode, deep-clone, deep-pick/omit, remove falsy

### DOM / Browser Helpers
- ❌ **Missing**: copy to clipboard, viewport detection, smooth scroll, debounce/throttle

### Security / ID / Storage
- ✅ **smart-storage** - Storage with TTL
- ⚠️ **Missing**: secure random ID/UUID, hash/mask, encrypt/decrypt

### Developer Quality / CLI
- ✅ **commit-gen** - CLI tool
- ✅ **changelog-buddy** - CLI tool
- ⚠️ **Missing**: logging with timestamp, execution time measurement, query string parser, pub-sub

## Recommended New Packages

1. **string-utils** - String manipulation (camelCase, slugify, truncate, etc.)
2. **array-helpers** - Array operations (group, aggregate, stats)
3. **object-helpers** - Object utilities (deep-clone, deep-pick, etc.)
4. **dom-helpers** - Browser/DOM utilities (clipboard, viewport, scroll, debounce/throttle)
5. **validators** - Validation library (email, URL, phone, etc.)
6. **id-generator** - Secure ID/UUID generation
7. **dev-utils** - Developer utilities (logging, timing, query parser, pub-sub)

