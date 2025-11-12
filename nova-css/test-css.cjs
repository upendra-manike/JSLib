#!/usr/bin/env node

/**
 * RudraCSS CSS Test Script
 * Validates that the compiled CSS contains expected classes and doesn't have aggressive resets
 */

const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'dist', 'rudra.css');

console.log('🧪 Testing RudraCSS...\n');

// Read the CSS file
if (!fs.existsSync(cssPath)) {
  console.error('❌ Error: dist/rudra.css not found. Run "npm run build" first.');
  process.exit(1);
}

const css = fs.readFileSync(cssPath, 'utf8');

// Test 1: Check for aggressive universal reset
console.log('Test 1: Checking for aggressive universal reset...');
if (css.includes('*{margin:0') || css.includes('*{padding:0')) {
  console.error('❌ FAILED: Found aggressive universal margin/padding reset');
  process.exit(1);
} else {
  console.log('✅ PASSED: No aggressive universal reset found');
}

// Test 2: Check for box-sizing (should be present)
console.log('\nTest 2: Checking for box-sizing normalization...');
if (css.includes('box-sizing:border-box')) {
  console.log('✅ PASSED: Box-sizing normalization present');
} else {
  console.warn('⚠️  WARNING: Box-sizing normalization not found');
}

// Test 3: Check for form element reset (should NOT strip all styling)
console.log('\nTest 3: Checking form element reset...');
if (css.includes('button,input,select,textarea{border:none') || 
    css.includes('button,input,select,textarea{background:none')) {
  console.error('❌ FAILED: Form elements have aggressive reset (border/background removed)');
  process.exit(1);
} else {
  console.log('✅ PASSED: Form elements preserve styling');
}

// Test 4: Check for typography classes (should be class-based, not element-based)
console.log('\nTest 4: Checking typography classes...');
const requiredTypographyClasses = [
  '.text-display',
  '.rudra-h1',
  '.rudra-h2',
  '.rudra-h3',
  '.text-muted',
  '.text-gradient'
];

let typographyPassed = true;
requiredTypographyClasses.forEach(className => {
  if (!css.includes(className)) {
    console.error(`❌ FAILED: Missing typography class ${className}`);
    typographyPassed = false;
  }
});

if (typographyPassed) {
  console.log('✅ PASSED: All typography classes present');
}

// Test 5: Check for component classes
console.log('\nTest 5: Checking component classes...');
const requiredComponents = [
  '.btn',
  '.btn-primary',
  '.card',
  '.input',
  '.navbar',
  '.modal'
];

let componentsPassed = true;
requiredComponents.forEach(className => {
  if (!css.includes(className)) {
    console.error(`❌ FAILED: Missing component class ${className}`);
    componentsPassed = false;
  }
});

if (componentsPassed) {
  console.log('✅ PASSED: All component classes present');
}

// Test 6: Check for utility classes
console.log('\nTest 6: Checking utility classes...');
const requiredUtilities = [
  '.flex',
  '.gap-',
  '.p-',
  '.m-',
  '.bg-',
  '.text-',
  '.rounded',
  '.shadow'
];

let utilitiesPassed = true;
requiredUtilities.forEach(utility => {
  if (!css.includes(utility)) {
    console.error(`❌ FAILED: Missing utility class pattern ${utility}`);
    utilitiesPassed = false;
  }
});

if (utilitiesPassed) {
  console.log('✅ PASSED: All utility class patterns present');
}

// Test 7: Check for CSS variables
console.log('\nTest 7: Checking CSS variables...');
if (css.includes('--primary:') && css.includes('--secondary:')) {
  console.log('✅ PASSED: CSS variables present');
} else {
  console.warn('⚠️  WARNING: Some CSS variables may be missing');
}

// Test 8: Check file size (should be reasonable)
console.log('\nTest 8: Checking file size...');
const stats = fs.statSync(cssPath);
const sizeKB = (stats.size / 1024).toFixed(2);
console.log(`📦 CSS file size: ${sizeKB} KB`);

if (stats.size > 200 * 1024) {
  console.warn('⚠️  WARNING: CSS file is larger than 200KB');
} else {
  console.log('✅ PASSED: File size is reasonable');
}

console.log('\n✨ All CSS tests completed!');
console.log('\n📝 Next steps:');
console.log('   1. Open test.html in a browser to visually verify all components');
console.log('   2. Check that existing CSS styles are preserved (Test 1 & 16 in test.html)');
console.log('   3. Verify all components render correctly');

