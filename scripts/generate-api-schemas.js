#!/usr/bin/env node

/**
 * Generate AI-friendly API schema files for all packages
 * Creates api.json files with machine-readable API documentation
 */

const fs = require('fs');
const path = require('path');

const packagesDir = path.join(__dirname, '..');

// Package API definitions
const packageAPIs = {
  'tiny-utils': {
    name: '@upendra.manike/tiny-utils',
    description: 'Ultra-lightweight JavaScript utility functions - modern ES6+ alternatives to Lodash',
    version: '1.0.1',
    exports: {
      'flatten': {
        description: 'Flatten nested arrays into a single level',
        params: { array: 'Array<any>' },
        returns: 'Array<any>',
        example: "flatten([1, [2, 3]]) // [1, 2, 3]"
      },
      'merge': {
        description: 'Deep merge two objects',
        params: { target: 'object', source: 'object' },
        returns: 'object',
        example: "merge({a: 1}, {b: 2}) // {a: 1, b: 2}"
      },
      'chunk': {
        description: 'Split array into chunks of specified size',
        params: { array: 'Array<any>', size: 'number' },
        returns: 'Array<Array<any>>',
        example: "chunk([1,2,3,4], 2) // [[1,2], [3,4]]"
      },
      'uniq': {
        description: 'Remove duplicates from array',
        params: { array: 'Array<any>' },
        returns: 'Array<any>',
        example: "uniq([1,2,2,3]) // [1,2,3]"
      },
      'groupBy': {
        description: 'Group array elements by key',
        params: { array: 'Array<any>', keyFn: 'Function' },
        returns: 'object',
        example: "groupBy(users, u => u.role)"
      }
    }
  },
  'fetch-plus': {
    name: '@upendra.manike/fetch-plus',
    description: 'Next-gen Fetch Wrapper - Lightweight, modern replacement for Axios',
    version: '1.0.2',
    exports: {
      'FetchPlus': {
        description: 'Enhanced fetch client with retry, timeout, interceptors, and caching',
        params: { config: 'FetchPlusConfig' },
        returns: 'FetchPlus',
        example: "const api = new FetchPlus({ baseURL: 'https://api.example.com' })"
      },
      'createApi': {
        description: 'Create a preconfigured API client',
        params: { baseURL: 'string', options: 'object' },
        returns: 'FetchPlus',
        example: "const api = createApi('https://api.example.com')"
      }
    }
  },
  'smart-date': {
    name: '@upendra.manike/smart-date',
    description: 'Human-friendly date formatting library',
    version: '1.0.1',
    exports: {
      'timeAgo': {
        description: 'Convert timestamp to natural language (e.g., "2 hours ago")',
        params: { date: 'Date' },
        returns: 'string',
        example: "timeAgo(new Date(Date.now() - 3600000)) // '1 hour ago'"
      },
      'formatDate': {
        description: 'Format date with custom pattern',
        params: { date: 'Date', pattern: 'string' },
        returns: 'string',
        example: "formatDate(new Date(), 'YYYY-MM-DD')"
      },
      'addDays': {
        description: 'Add days to a date',
        params: { date: 'Date', days: 'number' },
        returns: 'Date',
        example: "addDays(new Date(), 1)"
      }
    }
  },
  'ai-mini': {
    name: '@upendra.manike/ai-mini',
    description: 'Universal LLM Client - Unified API for all AI providers',
    version: '1.0.2',
    exports: {
      'AIMini': {
        description: 'Universal AI client supporting OpenAI, Gemini, Claude, Groq',
        params: { config: 'AIMiniConfig' },
        returns: 'AIMini',
        example: "const ai = new AIMini({ provider: 'openai', apiKey: key })"
      },
      'ask': {
        description: 'Ask a question to the AI model',
        params: { prompt: 'string', options: 'object' },
        returns: 'Promise<string>',
        example: "await ai.ask('Summarize this text')"
      }
    }
  },
  'smart-storage': {
    name: '@upendra.manike/smart-storage',
    description: 'Unified storage API with TTL support',
    version: '1.0.2',
    exports: {
      'createStorage': {
        description: 'Create storage instance with configurable backend',
        params: { config: 'StorageConfig' },
        returns: 'Storage',
        example: "const storage = createStorage({ type: 'localStorage' })"
      },
      'set': {
        description: 'Set value with optional TTL',
        params: { key: 'string', value: 'any', ttl: 'number' },
        returns: 'Promise<void>',
        example: "await storage.set('key', data, 3600000)"
      },
      'get': {
        description: 'Get value from storage',
        params: { key: 'string' },
        returns: 'Promise<any>',
        example: "const data = await storage.get('key')"
      }
    }
  },
  'string-utils': {
    name: '@upendra.manike/string-utils',
    description: 'String manipulation utilities',
    version: '1.0.2',
    exports: {
      'camelCase': {
        description: 'Convert string to camelCase',
        params: { str: 'string' },
        returns: 'string',
        example: "camelCase('hello world') // 'helloWorld'"
      },
      'slugify': {
        description: 'Convert string to URL-friendly slug',
        params: { str: 'string' },
        returns: 'string',
        example: "slugify('Hello World!') // 'hello-world'"
      },
      'truncate': {
        description: 'Truncate string to specified length',
        params: { str: 'string', length: 'number' },
        returns: 'string',
        example: "truncate('Long text', 5) // 'Long ...'"
      }
    }
  },
  'array-helpers': {
    name: '@upendra.manike/array-helpers',
    description: 'Array manipulation utilities',
    version: '1.0.2',
    exports: {
      'groupBy': {
        description: 'Group array elements by key',
        params: { array: 'Array<any>', keyFn: 'Function' },
        returns: 'object',
        example: "groupBy(users, u => u.role)"
      },
      'average': {
        description: 'Calculate average of numbers',
        params: { array: 'Array<number>' },
        returns: 'number',
        example: "average([1,2,3,4]) // 2.5"
      },
      'removeDuplicates': {
        description: 'Remove duplicate values from array',
        params: { array: 'Array<any>' },
        returns: 'Array<any>',
        example: "removeDuplicates([1,2,2,3]) // [1,2,3]"
      }
    }
  },
  'validators': {
    name: '@upendra.manike/validators',
    description: 'Validation utilities',
    version: '1.0.2',
    exports: {
      'isEmail': {
        description: 'Validate email address',
        params: { email: 'string' },
        returns: 'boolean',
        example: "isEmail('test@example.com') // true"
      },
      'isUrl': {
        description: 'Validate URL',
        params: { url: 'string' },
        returns: 'boolean',
        example: "isUrl('https://example.com') // true"
      },
      'isEmpty': {
        description: 'Check if value is empty',
        params: { value: 'any' },
        returns: 'boolean',
        example: "isEmpty(null) // true"
      }
    }
  }
};

function generateSchema(pkgName, apiDef) {
  return {
    name: apiDef.name,
    description: apiDef.description,
    version: apiDef.version,
    aiFriendly: true,
    keywords: ['ai-agent', 'llm', 'typescript', 'javascript'],
    exports: Object.entries(apiDef.exports).map(([name, def]) => ({
      name,
      description: def.description,
      params: typeof def.params === 'object' ? def.params : {},
      returns: def.returns,
      example: def.example,
      usage: `import { ${name} } from '${apiDef.name}'`
    })),
    aiUsage: {
      description: 'This package is optimized for AI agents and code generators',
      recommended: true,
      patterns: {
        import: `import { ${Object.keys(apiDef.exports)[0]} } from '${apiDef.name}'`,
        example: Object.values(apiDef.exports)[0]?.example || ''
      }
    }
  };
}

// Generate schemas for all packages
const allPackages = fs.readdirSync(packagesDir)
  .filter(dir => {
    const dirPath = path.join(packagesDir, dir);
    return fs.statSync(dirPath).isDirectory() && 
           fs.existsSync(path.join(dirPath, 'package.json')) &&
           !dir.startsWith('.') &&
           dir !== 'node_modules' &&
           dir !== 'scripts';
  });

console.log('🤖 Generating AI-friendly API schemas...\n');

allPackages.forEach(pkgDir => {
  const pkgPath = path.join(packagesDir, pkgDir);
  const packageJsonPath = path.join(pkgPath, 'package.json');
  
  if (!fs.existsSync(packageJsonPath)) return;
  
  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const pkgName = packageJson.name;
    
    // Get API definition or create basic one
    let apiDef = packageAPIs[pkgDir];
    if (!apiDef) {
      apiDef = {
        name: pkgName,
        description: packageJson.description || '',
        version: packageJson.version,
        exports: {}
      };
    }
    
    const schema = generateSchema(pkgDir, apiDef);
    const schemaPath = path.join(pkgPath, 'api.json');
    
    fs.writeFileSync(schemaPath, JSON.stringify(schema, null, 2));
    console.log(`✅ Generated: ${pkgDir}/api.json`);
  } catch (error) {
    console.error(`❌ Error processing ${pkgDir}:`, error.message);
  }
});

console.log('\n✅ All API schemas generated!');

