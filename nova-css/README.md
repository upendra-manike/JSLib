# NovaCSS

> A modern, hybrid CSS framework combining utility-first classes with polished components. Built for fast development without sacrificing aesthetics.

[![npm version](https://img.shields.io/npm/v/@upendra.manike/nova-css)](https://www.npmjs.com/package/@upendra.manike/nova-css)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

NovaCSS is engineered for modern dashboards, SaaS products, and marketing sites that need a fast workflow with a beautiful, glassmorphism-inspired design system.

## ✨ Features

- **🎨 Utility-first layer** for spacing, colors, flexbox, shadows, borders, and more
- **🧩 Component layer** with opinionated styling for buttons, cards, modals, navbars, and inputs
- **🌓 Themeable design** powered by CSS variables (light & dark ready)
- **💎 Glassmorphism-inspired** with graceful blur, glow, and gradients
- **⚡ Animation helpers** for smooth fade, slide, scale transitions
- **📱 Mobile-first & responsive** utilities
- **🔧 Zero JavaScript** - pure CSS/SCSS
- **📦 Lightweight** - minimal bundle size

## 📦 Installation

```bash
npm install @upendra.manike/nova-css
# or
yarn add @upendra.manike/nova-css
# or
pnpm add @upendra.manike/nova-css
```

## 🚀 Quick Start

### Import in JavaScript/TypeScript

```ts
import '@upendra.manike/nova-css/dist/nova.css';
```

### Include in HTML

```html
<link rel="stylesheet" href="node_modules/@upendra.manike/nova-css/dist/nova.css" />
```

### CDN (unpkg)

```html
<link rel="stylesheet" href="https://unpkg.com/@upendra.manike/nova-css@latest/dist/nova.css" />
```

## 📚 Documentation

### Table of Contents

- [Utility Classes](#utility-classes)
  - [Flexbox](#flexbox)
  - [Spacing](#spacing)
  - [Colors](#colors)
  - [Borders](#borders)
  - [Shadows](#shadows)
- [Components](#components)
  - [Button](#button)
  - [Card](#card)
  - [Input](#input)
  - [Navbar](#navbar)
  - [Modal](#modal)
- [Theming](#theming)
- [Animations](#animations)
- [Examples](#examples)
- [Browser Support](#browser-support)
- [Development](#development)

---

## Utility Classes

### Flexbox

Control flexbox layout with utility classes:

```html
<!-- Display -->
<div class="flex">Flex container</div>
<div class="inline-flex">Inline flex</div>

<!-- Direction -->
<div class="flex-col">Column</div>
<div class="flex-row">Row</div>

<!-- Justify Content -->
<div class="justify-center">Center</div>
<div class="justify-between">Space between</div>
<div class="justify-end">End</div>

<!-- Align Items -->
<div class="items-start">Start</div>
<div class="items-center">Center</div>
<div class="items-end">End</div>

<!-- Gap -->
<div class="gap-1">0.25rem</div>
<div class="gap-2">0.5rem</div>
<div class="gap-3">0.75rem</div>
<div class="gap-4">1rem</div>
<div class="gap-6">1.5rem</div>
```

**Available Classes:**
- `.flex`, `.inline-flex`
- `.flex-col`, `.flex-row`
- `.justify-center`, `.justify-between`, `.justify-end`
- `.items-start`, `.items-center`, `.items-end`
- `.gap-1`, `.gap-2`, `.gap-3`, `.gap-4`, `.gap-6`

### Spacing

Control margins and padding:

```html
<!-- Margins -->
<div class="m-0">No margin</div>
<div class="m-auto">Auto margin</div>
<div class="mt-1">Margin top 0.25rem</div>
<div class="mt-2">Margin top 0.5rem</div>
<div class="mt-3">Margin top 0.75rem</div>
<div class="mt-4">Margin top 1rem</div>
<div class="mt-6">Margin top 1.5rem</div>
<div class="mb-2">Margin bottom 0.5rem</div>
<div class="mb-4">Margin bottom 1rem</div>
<div class="mx-auto">Auto horizontal margin</div>
<div class="mx-4">Horizontal margin 1rem</div>
<div class="my-6">Vertical margin 1.5rem</div>

<!-- Padding -->
<div class="p-0">No padding</div>
<div class="p-2">Padding 0.5rem</div>
<div class="p-3">Padding 0.75rem</div>
<div class="p-4">Padding 1rem</div>
<div class="p-6">Padding 1.5rem</div>
<div class="px-3">Horizontal padding 0.75rem</div>
<div class="px-4">Horizontal padding 1rem</div>
<div class="px-6">Horizontal padding 1.5rem</div>
<div class="py-2">Vertical padding 0.5rem</div>
<div class="py-3">Vertical padding 0.75rem</div>
<div class="py-4">Vertical padding 1rem</div>
<div class="py-6">Vertical padding 1.5rem</div>

<!-- Space Between Children -->
<div class="space-y-2">
  <div>Item 1</div>
  <div>Item 2</div> <!-- 0.5rem margin-top -->
</div>
<div class="space-y-4">
  <div>Item 1</div>
  <div>Item 2</div> <!-- 1rem margin-top -->
</div>
<div class="space-x-4">
  <span>Item 1</span>
  <span>Item 2</span> <!-- 1rem margin-left -->
</div>
```

**Available Classes:**
- Margins: `.m-0`, `.m-auto`, `.mt-1` through `.mt-6`, `.mb-2`, `.mb-4`, `.mx-auto`, `.mx-4`, `.my-6`
- Padding: `.p-0`, `.p-2`, `.p-3`, `.p-4`, `.p-6`, `.px-3`, `.px-4`, `.px-6`, `.py-2`, `.py-3`, `.py-4`, `.py-6`
- Space utilities: `.space-y-2`, `.space-y-4`, `.space-x-4`

### Colors

Text and background color utilities:

```html
<!-- Text Colors -->
<p class="text-primary">Primary text</p>
<p class="text-secondary">Secondary text</p>
<p class="text-success">Success text</p>
<p class="text-warning">Warning text</p>
<p class="text-danger">Danger text</p>
<p class="text-info">Info text</p>
<p class="text-inverse">Inverse text (white)</p>

<!-- Background Colors -->
<div class="bg-surface">Surface background</div>
<div class="bg-elevated">Elevated surface</div>
<div class="bg-primary">Primary background</div>
<div class="bg-secondary">Secondary background</div>
<div class="bg-success">Success background</div>
<div class="bg-warning">Warning background</div>
<div class="bg-danger">Danger background</div>
<div class="bg-info">Info background</div>

<!-- Borders -->
<div class="border-primary">Primary border</div>
<div class="border-secondary">Secondary border</div>
<div class="border-muted">Muted border</div>

<!-- Gradients -->
<div class="gradient-primary">Primary gradient</div>
<div class="gradient-secondary">Secondary gradient</div>
```

**Available Classes:**
- Text: `.text-primary`, `.text-secondary`, `.text-success`, `.text-warning`, `.text-danger`, `.text-info`, `.text-inverse`
- Background: `.bg-surface`, `.bg-elevated`, `.bg-primary`, `.bg-secondary`, `.bg-success`, `.bg-warning`, `.bg-danger`, `.bg-info`
- Borders: `.border-primary`, `.border-secondary`, `.border-muted`
- Gradients: `.gradient-primary`, `.gradient-secondary`

### Borders

Border and border-radius utilities:

```html
<!-- Borders -->
<div class="border">1px border</div>
<div class="border-2">2px border</div>
<div class="border-none">No border</div>

<!-- Border Radius -->
<div class="rounded-sm">Small radius (6px)</div>
<div class="rounded">Default radius (12px)</div>
<div class="rounded-lg">Large radius (18px)</div>

<!-- Focus Rings -->
<input class="ring">Focus ring</input>
<input class="ring-primary">Primary focus ring</input>
```

**Available Classes:**
- Borders: `.border`, `.border-2`, `.border-none`
- Radius: `.rounded-sm`, `.rounded`, `.rounded-lg`
- Rings: `.ring`, `.ring-primary`

### Shadows

Box shadow utilities:

```html
<div class="shadow-none">No shadow</div>
<div class="shadow-xs">Extra small shadow</div>
<div class="shadow-sm">Small shadow</div>
<div class="shadow">Default shadow (soft)</div>
<div class="shadow-lg">Large shadow (hard)</div>
<div class="shadow-glow">Glow shadow with primary color</div>
<div class="shadow-soft">Soft shadow (CSS variable)</div>
<div class="shadow-hard">Hard shadow (CSS variable)</div>
```

**Available Classes:**
- `.shadow-none`, `.shadow-xs`, `.shadow-sm`, `.shadow`, `.shadow-lg`, `.shadow-glow`, `.shadow-soft`, `.shadow-hard`

### Typography

Text styling utilities:

```html
<h1>Heading 1 (responsive clamp)</h1>
<h2>Heading 2 (responsive clamp)</h2>
<h3>Heading 3 (responsive clamp)</h3>
<p class="text-muted">Muted text color</p>
<h1 class="text-display">Display heading (large)</h1>
<p class="text-gradient">Gradient text effect</p>
```

**Available Classes:**
- `.text-display` - Large display heading
- `.text-muted` - Muted text color
- `.text-gradient` - Gradient text effect (primary to secondary)

### Glass & Surface Effects

Glassmorphism and elevated surface utilities:

```html
<div class="bg-glass">Glass effect with blur</div>
<div class="surface-elevated">Elevated surface with blur</div>
```

**Available Classes:**
- `.bg-glass` - Glassmorphism background with blur
- `.surface-elevated` - Elevated surface with backdrop blur

### Additional Utilities

```html
<!-- Border Radius -->
<div class="rounded">Default radius</div>
<div class="rounded-2">Large radius</div>
<div class="rounded-3">Extra large radius (24px)</div>

<!-- Container -->
<div class="max-w-screen">Centered container (max-width)</div>

<!-- Divider -->
<div class="divider"></div>

<!-- Badge -->
<span class="badge">New</span>
```

**Available Classes:**
- `.rounded`, `.rounded-2`, `.rounded-3` - Border radius variants
- `.max-w-screen` - Centered container with max-width
- `.divider` - Horizontal gradient divider line
- `.badge` - Badge component for labels

---

## Components

### Button

Beautiful, gradient buttons with hover effects:

```html
<!-- Variants -->
<button class="btn btn-primary">Primary</button>
<button class="btn btn-secondary">Secondary</button>
<button class="btn btn-ghost">Ghost</button>
<button class="btn btn-outline">Outline</button>
<button class="btn btn-destructive">Destructive</button>
<button class="btn btn-success">Success</button>

<!-- Sizes -->
<button class="btn btn-primary btn-sm">Small</button>
<button class="btn btn-primary">Default</button>
<button class="btn btn-primary btn-lg">Large</button>
```

**Available Classes:**
- Variants: `.btn-primary`, `.btn-secondary`, `.btn-ghost`, `.btn-outline`, `.btn-destructive`, `.btn-success`
- Sizes: `.btn-sm`, `.btn-lg` (default if omitted)

**Example:**
```html
<div class="flex gap-3">
  <button class="btn btn-primary">Get Started</button>
  <button class="btn btn-secondary btn-outline">Learn More</button>
  <button class="btn btn-ghost btn-sm">Cancel</button>
</div>
```

### Card

Glassmorphism card component with header, body, and footer:

```html
<div class="card">
  <div class="card-header">
    <h3 class="card-title">Card Title</h3>
    <p class="card-subtitle">Subtitle text</p>
  </div>
  <div class="card-body">
    <p>Card content goes here. The card has a beautiful glassmorphism effect with backdrop blur.</p>
  </div>
  <div class="card-footer">
    <button class="btn btn-primary btn-sm">Action</button>
    <button class="btn btn-ghost btn-sm">Cancel</button>
  </div>
</div>
```

**Available Classes:**
- `.card` - Main card container
- `.card-header` - Header section
- `.card-title` - Title text
- `.card-subtitle` - Subtitle text
- `.card-body` - Main content area
- `.card-footer` - Footer section

**Example:**
```html
<div class="card shadow-lg">
  <div class="card-header">
    <h3 class="card-title">User Profile</h3>
    <p class="card-subtitle">Member since 2024</p>
  </div>
  <div class="card-body">
    <p>Welcome to your dashboard!</p>
  </div>
  <div class="card-footer">
    <button class="btn btn-primary">Edit Profile</button>
  </div>
</div>
```

### Input

Styled input fields with focus states:

```html
<!-- Basic Input -->
<input type="text" class="input" placeholder="Enter text...">

<!-- Input Group with Icon -->
<div class="input-group">
  <span class="input-group__icon">🔍</span>
  <input type="text" class="input" placeholder="Search...">
</div>

<!-- Disabled Input -->
<input type="text" class="input" placeholder="Disabled" disabled>
```

**Available Classes:**
- `.input` - Input field
- `.input-group` - Container for input with icon/prefix
- `.input-group__icon` - Icon element inside input group

**Example:**
```html
<div class="flex flex-col gap-4">
  <input type="email" class="input" placeholder="Email address">
  <div class="input-group">
    <span class="input-group__icon">🔒</span>
    <input type="password" class="input" placeholder="Password">
  </div>
</div>
```

### Navbar

Fully styled navigation bar with glassmorphism effect:

```html
<nav class="navbar">
  <div class="navbar-brand">Logo</div>
  <div class="navbar-menu">
    <a href="#" class="navbar-link">Home</a>
    <a href="#" class="navbar-link">About</a>
    <a href="#" class="navbar-link">Contact</a>
  </div>
  <div class="navbar-actions">
    <button class="btn btn-primary btn-sm">Get Started</button>
  </div>
</nav>
```

**Available Classes:**
- `.navbar` - Main navbar container (sticky, glassmorphism)
- `.navbar-brand` - Logo/brand text
- `.navbar-menu` - Navigation links container
- `.navbar-link` - Navigation link (with hover underline effect)
- `.navbar-actions` - Action buttons container

**Features:**
- Sticky positioning (stays at top on scroll)
- Glassmorphism background with blur
- Hover underline animation on links
- Responsive (menu hides on mobile < 768px)

**Example:**
```html
<nav class="navbar">
  <div class="navbar-brand">NovaCSS</div>
  <div class="navbar-menu">
    <a href="#home" class="navbar-link">Home</a>
    <a href="#docs" class="navbar-link">Docs</a>
    <a href="#examples" class="navbar-link">Examples</a>
  </div>
  <div class="navbar-actions">
    <button class="btn btn-ghost btn-sm">Sign In</button>
    <button class="btn btn-primary btn-sm">Get Started</button>
  </div>
</nav>
```

### Modal

Fully styled modal component with backdrop (JavaScript required for show/hide):

```html
<div class="modal-backdrop">
  <div class="modal">
    <div class="modal-header">
      <h3 class="modal-title">Modal Title</h3>
      <button class="modal-close">×</button>
    </div>
    <div class="modal-body">
      <p>Modal content goes here.</p>
    </div>
    <div class="modal-footer">
      <button class="btn btn-primary">Confirm</button>
      <button class="btn btn-ghost">Cancel</button>
    </div>
  </div>
</div>
```

**Available Classes:**
- `.modal-backdrop` - Backdrop overlay (fixed, blurred)
- `.modal` - Modal container (glassmorphism, animated)
- `.modal-header` - Header section
- `.modal-title` - Title text
- `.modal-close` - Close button
- `.modal-body` - Main content area
- `.modal-footer` - Footer section

**Features:**
- Glassmorphism backdrop with blur
- Scale-in animation on open
- Responsive max-width (560px)
- Styled close button with hover effects

**Example with JavaScript:**
```html
<!-- Toggle visibility with JavaScript -->
<div class="modal-backdrop" id="myModal" style="display: none;">
  <div class="modal">
    <div class="modal-header">
      <h3 class="modal-title">Confirm Action</h3>
      <button class="modal-close" onclick="document.getElementById('myModal').style.display='none'">×</button>
    </div>
    <div class="modal-body">
      <p>Are you sure you want to proceed?</p>
    </div>
    <div class="modal-footer">
      <button class="btn btn-primary">Confirm</button>
      <button class="btn btn-ghost" onclick="document.getElementById('myModal').style.display='none'">Cancel</button>
    </div>
  </div>
</div>
```

---

## Theming

NovaCSS uses CSS variables for easy theming. Override variables in your stylesheet:

```css
:root {
  /* Brand colors */
  --primary: #6366f1;
  --secondary: #22d3ee;
  --success: #10b981;
  --warning: #f59e0b;
  --danger: #ef4444;
  --info: #38bdf8;

  /* Surfaces */
  --surface: #f8fafc;
  --surface-elevated: rgba(255, 255, 255, 0.75);
  --surface-border: rgba(15, 23, 42, 0.08);

  /* Typography */
  --text-primary: #0f172a;
  --text-muted: #64748b;
  --text-inverse: #ffffff;

  /* Effects */
  --blur: 24px;
  --shadow-soft: 0 12px 40px rgba(15, 23, 42, 0.12);
  --shadow-hard: 0 18px 44px rgba(15, 23, 42, 0.18);
  --radius-sm: 6px;
  --radius: 12px;
  --radius-lg: 18px;
  --transition: 0.25s ease;
}
```

### Dark Mode

Enable dark mode by adding `data-theme="dark"` to your HTML:

```html
<html data-theme="dark">
  <!-- Your content -->
</html>
```

Or toggle dynamically:

```javascript
document.documentElement.setAttribute('data-theme', 'dark');
```

Dark mode automatically adjusts:
- Surface colors
- Text colors
- Shadow intensities
- Border opacities

---

## Animations

Use animation utility classes for smooth transitions:

```html
<div class="fade-in">Fades in</div>
<div class="fade-in-up">Fades in from bottom</div>
<div class="slide-up">Slides up</div>
<div class="scale-in">Scales in</div>
```

**Available Classes:**
- `.fade-in` - Fade in animation (0.5s)
- `.fade-in-up` - Fade in from bottom (0.45s)
- `.slide-up` - Slide up animation (0.4s)
- `.scale-in` - Scale in animation (0.35s)

**Example:**
```html
<div class="card fade-in-up">
  <h3 class="card-title">Animated Card</h3>
  <p class="card-body">This card animates on page load.</p>
</div>
```

---

## Examples

### Dashboard Card

```html
<div class="card shadow-lg fade-in-up">
  <div class="card-header">
    <h3 class="card-title">Analytics</h3>
    <p class="card-subtitle">Last 30 days</p>
  </div>
  <div class="card-body">
    <div class="flex justify-between items-center">
      <div>
        <p class="text-2xl font-bold text-primary">1,234</p>
        <p class="text-muted">Total views</p>
      </div>
      <div class="bg-primary rounded-lg p-4">
        <span class="text-inverse">📊</span>
      </div>
    </div>
  </div>
  <div class="card-footer">
    <button class="btn btn-primary btn-sm">View Details</button>
  </div>
</div>
```

### Login Form

```html
<div class="card shadow-lg max-w-md mx-auto">
  <div class="card-header">
    <h3 class="card-title">Welcome Back</h3>
    <p class="card-subtitle">Sign in to your account</p>
  </div>
  <div class="card-body space-y-4">
    <div>
      <label class="text-sm text-muted mb-2 block">Email</label>
      <input type="email" class="input" placeholder="you@example.com">
    </div>
    <div>
      <label class="text-sm text-muted mb-2 block">Password</label>
      <div class="input-group">
        <span class="input-group__icon">🔒</span>
        <input type="password" class="input" placeholder="••••••••">
      </div>
    </div>
  </div>
  <div class="card-footer">
    <button class="btn btn-primary w-full">Sign In</button>
  </div>
</div>
```

### Button Group

```html
<div class="flex gap-3">
  <button class="btn btn-primary">Primary</button>
  <button class="btn btn-secondary">Secondary</button>
  <button class="btn btn-outline">Outline</button>
  <button class="btn btn-ghost">Ghost</button>
</div>
```

### Responsive Layout

```html
<div class="flex flex-col gap-4 md:flex-row">
  <div class="card flex-1">Card 1</div>
  <div class="card flex-1">Card 2</div>
  <div class="card flex-1">Card 3</div>
</div>
```

---

## Browser Support

NovaCSS works in all modern browsers that support:
- CSS Custom Properties (CSS Variables)
- Flexbox
- `backdrop-filter` (for glassmorphism effects)

**Supported Browsers:**
- Chrome 76+
- Firefox 103+
- Safari 9+
- Edge 79+

**Note:** Glassmorphism effects (`backdrop-filter`) may not work in older browsers. The framework gracefully degrades to solid backgrounds.

---

## Development

### Setup

```bash
# Clone or navigate to the package
cd nova-css

# Install dependencies
npm install

# Start development server (with hot reload)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Project Structure

```
nova-css/
├── src/
│   ├── base/
│   │   ├── _reset.scss          # CSS reset
│   │   ├── _variables.scss      # CSS variables
│   │   ├── _typography.scss     # Typography styles
│   │   ├── _grid.scss           # Grid system
│   │   ├── _animations.scss     # Animation keyframes
│   │   └── _utilities.scss      # Base utilities
│   ├── utilities/
│   │   ├── _flex.scss           # Flexbox utilities
│   │   ├── _spacing.scss        # Margin/padding utilities
│   │   ├── _colors.scss         # Color utilities
│   │   ├── _borders.scss        # Border utilities
│   │   └── _shadows.scss        # Shadow utilities
│   ├── components/
│   │   ├── _button.scss         # Button component
│   │   ├── _card.scss           # Card component
│   │   ├── _input.scss          # Input component
│   │   ├── _navbar.scss         # Navbar component
│   │   └── _modal.scss          # Modal component
│   └── index.scss               # Main entry point
├── dist/
│   └── nova.css                 # Compiled CSS
├── package.json
├── vite.config.ts               # Vite build config
└── README.md
```

### Building

The build process compiles SCSS to CSS using Vite:

```bash
npm run build
```

Output: `dist/nova.css`

### Customization

To customize NovaCSS:

1. **Override CSS variables** in your stylesheet (recommended)
2. **Extend SCSS files** by importing and modifying variables
3. **Create custom utilities** by adding to `src/utilities/`
4. **Add components** by creating files in `src/components/`

---

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## Roadmap

- [ ] Responsive variants (`.md:flex`, `.lg:px-8`, etc.)
- [ ] Additional components (tabs, alerts, toast, dropdown)
- [ ] Theme generator & dark mode presets
- [ ] Documentation site with examples (VitePress)
- [ ] Playground with CodeSandbox integration
- [ ] Tailwind plugin for NovaCSS theme extension
- [ ] TypeScript definitions for class names (optional)

---

## License

MIT © Upendra Manike

---

## 📖 Additional Documentation

- **[EXAMPLES.md](./EXAMPLES.md)** - Comprehensive examples and use cases
- **[CHANGELOG.md](./CHANGELOG.md)** - Version history and changes
- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - Guidelines for contributing
- **[LICENSE](./LICENSE)** - MIT License

## Support

If you find NovaCSS useful, please consider:
- ⭐ Starring the repository
- 🐛 Reporting bugs
- 💡 Suggesting features
- 📖 Improving documentation

---

**Made with ❤️ by [Upendra Manike](https://github.com/upendrakumarmanike)**
