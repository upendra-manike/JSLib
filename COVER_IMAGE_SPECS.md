# Cover Image Specifications for LinkedIn Newsletters

## How to Generate Cover Images

### Option 1: Using HTML Templates (Easiest)

1. Open the HTML files in a browser:
   - `cover-image-1-smart-date.html`
   - `cover-image-2-api-chain.html`
   - `cover-image-3-tiny-utils.html`
   - `cover-image-4-lite-fetcher.html`
   - `cover-image-5-react-motion-kit.html`

2. Take a screenshot or use a browser extension to capture at 1200x628px
   - Chrome extension: "Full Page Screen Capture" or "GoFullPage"
   - Or use browser DevTools to set viewport to 1200x628 and screenshot

### Option 2: Using Design Tools

#### Canva (Recommended - Free)
1. Go to canva.com
2. Create custom size: 1200 x 628 pixels
3. Use the templates below as reference
4. Export as PNG

#### Figma
1. Create frame: 1200 x 628px
2. Follow the HTML template designs
3. Export as PNG

#### Photoshop/Illustrator
1. Create document: 1200 x 628px
2. Follow specifications below
3. Export as PNG (high quality)

## Individual Cover Image Details

### 1. Smart Date (@upendra.manike/smart-date)
- **Color**: Purple gradient (#667eea to #764ba2)
- **Icon**: 📅 Calendar emoji or calendar illustration
- **Title**: "Making Dates Human Again"
- **Subtitle**: "Natural Language for Modern Apps"
- **Package**: `@upendra.manike/smart-date`

### 2. API Chain (@upendra.manike/api-chain)
- **Color**: LinkedIn Blue gradient (#0a66c2 to #0077b5)
- **Icon**: 🔗 Chain link emoji or chain illustration
- **Title**: "Clean API Workflows"
- **Subtitle**: "From Callback Hell to Declarative Chains"
- **Package**: `@upendra.manike/api-chain`
- **Visual Element**: Chain nodes connected by links

### 3. Tiny Utils (@upendra.manike/tiny-utils)
- **Color**: Pink/Red gradient (#f093fb to #f5576c)
- **Icon**: 🪄 Magic wand emoji or sparkle
- **Title**: "Beyond Lodash"
- **Subtitle**: "Modern, Tree-Shakable Utilities"
- **Package**: `@upendra.manike/tiny-utils`
- **Visual Element**: Sparkles or magical elements

### 4. Lite Fetcher (@upendra.manike/lite-fetcher)
- **Color**: Green gradient (#11998e to #38ef7d)
- **Icon**: ⚡ Lightning bolt emoji or speed lines
- **Title**: "Smart Caching"
- **Subtitle**: "localStorage + Fetch = Perfect Combo"
- **Package**: `@upendra.manike/lite-fetcher`
- **Visual Element**: Speed lines suggesting fast performance

### 5. React Motion Kit (@upendra.manike/react-motion-kit)
- **Color**: Pink/Yellow gradient (#fa709a to #fee140)
- **Icon**: 🎭 Theater masks emoji or motion elements
- **Title**: "Animations That Don't Hurt"
- **Subtitle**: "Prebuilt React Hooks for Beautiful UIs"
- **Package**: `@upendra.manike/react-motion-kit`
- **Visual Element**: Animated circles or motion waves

## Typography Guidelines

### Headline (64px, Bold)
- Font: Inter, Poppins, or Montserrat
- Weight: 800 (Extra Bold)
- Color: White
- Letter Spacing: -2px
- Text Shadow: 0 2px 10px rgba(0,0,0,0.3)

### Subtitle (32px, Regular)
- Font: Inter, Poppins, or Montserrat
- Weight: 400 (Regular)
- Color: White at 95% opacity
- No text shadow

### Package Name (24px, Monospace)
- Font: Fira Code, JetBrains Mono, or Courier New
- Background: rgba(255,255,255,0.2) with backdrop blur
- Border: 1px solid rgba(255,255,255,0.3)
- Padding: 12px 24px
- Border Radius: 8px

## Quick Design Tools

### Free Online Tools:
1. **Canva** - canva.com (has LinkedIn post templates)
2. **Figma** - figma.com (free tier available)
3. **Photopea** - photopea.com (free Photoshop alternative)
4. **GIMP** - gimp.org (free image editor)

### AI Image Generators:
- **DALL-E** - Can generate backgrounds
- **Midjourney** - For artistic covers
- **Stable Diffusion** - Open source option

## Quick Command to Capture HTML as Image

If you have Node.js installed:

```bash
npm install -g puppeteer
node -e "
const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 628 });
  await page.goto('file:///absolute/path/to/cover-image-1-smart-date.html');
  await page.screenshot({ path: 'smart-date-cover.png' });
  await browser.close();
})();
"
```

## Alternative: Use AI to Generate

You can use ChatGPT, Claude, or other AI tools with prompts like:

"Create a 1200x628px LinkedIn cover image with:
- Purple gradient background (#667eea to #764ba2)
- Calendar icon
- Bold white text: 'Making Dates Human Again'
- Subtitle: 'Natural Language for Modern Apps'
- Package name: '@upendra.manike/smart-date'
- Modern, professional design"

## File Naming Convention

Save images as:
- `linkedin-cover-1-smart-date.png`
- `linkedin-cover-2-api-chain.png`
- `linkedin-cover-3-tiny-utils.png`
- `linkedin-cover-4-lite-fetcher.png`
- `linkedin-cover-5-react-motion-kit.png`

