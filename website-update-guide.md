# Website Update Guide

## How to Update https://upendra-manike.github.io/JSLibUseage/

### Step 1: Clone the Website Repository

```bash
cd ~/Documents/GitHub
git clone https://github.com/upendra-manike/JSLibUseage.git
cd JSLibUseage
```

### Step 2: Update Documentation

Copy the content from `WEBSITE_DOCUMENTATION.md` to your website's main documentation file (likely `index.html`, `README.md`, or `docs/index.md`).

### Step 3: Structure Recommendations

**For GitHub Pages (HTML):**

1. Create `index.html` with:
   - Navigation menu
   - Package cards with descriptions
   - Expandable code examples
   - Installation instructions
   - Search functionality

2. Structure:
   ```
   JSLibUseage/
   ├── index.html
   ├── styles.css
   ├── script.js
   ├── packages/
   │   ├── tiny-utils.html
   │   ├── smart-date.html
   │   └── ...
   └── examples/
       └── ...
   ```

**For Markdown-based site:**

1. Update `README.md` or `docs/index.md`
2. Add package-specific markdown files
3. Use a static site generator if needed

### Step 4: Key Sections to Include

1. **Homepage:**
   - Overview of all 22 packages
   - Quick links by category
   - Installation guide
   - Search functionality

2. **Package Pages:**
   - Description
   - Installation
   - Usage examples
   - API reference
   - Use cases

3. **Examples Section:**
   - Code examples for each package
   - Common use cases
   - Integration examples

### Step 5: Add Interactive Features

- Live code examples (CodePen/JSFiddle embeds)
- Copy-to-clipboard for code blocks
- Search functionality
- Category filters
- Package comparison table

### Step 6: SEO Optimization

- Add meta tags
- Include keywords from package.json
- Add structured data (JSON-LD)
- Optimize page titles

### Step 7: Deploy

```bash
git add .
git commit -m "Update website with comprehensive package documentation"
git push origin main
```

GitHub Pages will automatically deploy the changes.

---

## Quick Update Command

If you have the website repo cloned:

```bash
cd ~/Documents/GitHub/JSLibUseage
# Copy documentation
cp ../JSLib/WEBSITE_DOCUMENTATION.md content/packages.md
git add .
git commit -m "Update package documentation"
git push
```

