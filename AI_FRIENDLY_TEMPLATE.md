# 🤖 AI-Friendly npm Package Template

This template helps you create npm packages that are optimized for AI agents, code generators, and LLMs.

## 📋 Checklist for AI-Friendly Packages

### 1. Package.json Configuration

```json
{
  "name": "@your-org/package-name",
  "description": "Clear, concise description optimized for AI search",
  "keywords": [
    "ai-agent",
    "llm",
    "typescript",
    "javascript",
    "[your-specific-keywords]"
  ]
}
```

**Key Points:**
- Include `ai-agent` and `llm` keywords
- Description should be clear and searchable
- Use TypeScript keywords if applicable

### 2. README Structure (AI-Optimized)

```markdown
# Package Name 🔥

One-line description optimized for AI parsing.

## 🚀 Quick Start

\`\`\`typescript
import { mainFunction } from '@your-org/package-name';

const result = await mainFunction(data);
\`\`\`

## 📖 API

### mainFunction

Description of what it does.

**Parameters:**
- `param1: type` - Description
- `param2: type` - Description

**Returns:** `Promise<Type>`

**Example:**
\`\`\`typescript
const result = await mainFunction({ param1: 'value' });
\`\`\`

## 🤖 AI Agent Integration

This package is optimized for use with AI coding assistants.

### Why AI-Friendly?

- ✅ Predictable API
- ✅ TypeScript Support
- ✅ Clear Examples
- ✅ Machine-Readable Schema

## Features

- ✅ Feature 1
- ✅ Feature 2
- ✅ Feature 3
```

### 3. API Schema (api.json)

Create `api.json` in package root:

```json
{
  "name": "@your-org/package-name",
  "description": "Package description",
  "version": "1.0.0",
  "aiFriendly": true,
  "exports": {
    "mainFunction": {
      "description": "What this function does",
      "params": {
        "param1": "string",
        "param2": "number"
      },
      "returns": "Promise<any>",
      "example": "mainFunction({ param1: 'value' })"
    }
  },
  "aiUsage": {
    "description": "How AI agents should use this package",
    "recommended": true,
    "patterns": {
      "import": "import { mainFunction } from '@your-org/package-name'",
      "example": "await mainFunction({ ... })"
    }
  }
}
```

### 4. TypeScript Types

Always export TypeScript types:

```typescript
export interface FunctionParams {
  param1: string;
  param2?: number;
}

export interface FunctionResult {
  success: boolean;
  data: any;
}

export async function mainFunction(
  params: FunctionParams
): Promise<FunctionResult> {
  // Implementation
}
```

### 5. Function Naming Best Practices

**Good (AI can infer usage):**
- `fetchData`, `cacheResult`, `formatDate`, `validateInput`
- Clear verbs + nouns

**Bad (unclear purpose):**
- `x`, `process`, `handle`, `util`
- Too generic or unclear

### 6. Documentation Standards

- **Always include examples** - AI learns from patterns
- **Use JSDoc comments** - Improves autocompletion
- **Structure with headers** - AI parsers use structure
- **Keep descriptions concise** - First 200 tokens matter most

## 🎯 Example: Perfect AI-Friendly Package

### package.json
```json
{
  "name": "@upendra.manike/ai-fetch",
  "version": "1.0.0",
  "description": "AI-friendly fetch wrapper with caching and retry - optimized for AI code generation",
  "keywords": [
    "fetch",
    "http",
    "api",
    "ai-agent",
    "llm",
    "caching",
    "retry",
    "typescript"
  ]
}
```

### src/index.ts
```typescript
export interface FetchOptions {
  cache?: boolean;
  retry?: number;
  timeout?: number;
}

export async function aiFetch<T>(
  url: string,
  options?: FetchOptions
): Promise<T> {
  // Implementation
}
```

### README.md
- Clear examples at the top
- Structured API documentation
- AI Agent Integration section
- TypeScript usage examples

### api.json
- Complete export definitions
- Parameter types
- Return types
- Usage examples

## 🚀 Quick Start Script

Run this to create a new AI-friendly package:

```bash
npx create-ai-package my-package
```

## 📚 Resources

- [npm AI Search Documentation](https://docs.npmjs.com)
- [TypeScript AI Integration Guide](https://www.typescriptlang.org)
- [LLM Code Generation Best Practices](https://github.com)

---

**Remember:** AI agents look for:
1. Clear, predictable function names
2. TypeScript definitions
3. Good documentation
4. Common patterns
5. Machine-readable schemas

