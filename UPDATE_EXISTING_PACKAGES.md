# Update Existing Packages

## tiny-utils - Add Missing Functions

### String Functions (Already exists but can enhance)
- ✅ camelCase - exists
- ✅ kebabCase - exists  
- ✅ snakeCase - exists
- ✅ truncate - exists
- ⚠️ slugify - MISSING
- ⚠️ CSV conversion - MISSING
- ⚠️ normalizeLineEndings - MISSING
- ⚠️ removeBOM - MISSING

### Array Functions (Can add)
- ✅ flatten - exists
- ⚠️ groupBy - MISSING
- ⚠️ countBy - MISSING
- ⚠️ removeDuplicates - MISSING
- ⚠️ countOccurrences - MISSING
- ⚠️ statistics (average/median/mode) - MISSING
- ⚠️ removeFalsy - MISSING

## Recommended Approach

**Option 1**: Keep tiny-utils minimal, use new specialized packages
- Keep tiny-utils as lightweight utilities
- Use string-utils, array-helpers for specialized functions

**Option 2**: Add missing functions to tiny-utils
- Add all missing functions to maintain one-stop utility package

**Option 3**: Hybrid approach
- Keep core functions in tiny-utils
- Create specialized packages for complex operations

## Recommendation: Option 1
Keep packages focused and specialized. This allows:
- Better tree-shaking
- Smaller bundle sizes
- Clear separation of concerns

