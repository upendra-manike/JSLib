# Contributing to RudraCSS

Thank you for your interest in contributing to RudraCSS! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Be patient and understanding

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:
- A clear title and description
- Steps to reproduce the issue
- Expected vs actual behavior
- Browser and OS information
- Screenshots if applicable

### Suggesting Features

Feature suggestions are welcome! Please create an issue with:
- A clear description of the feature
- Use cases and examples
- Potential implementation approach (if you have ideas)

### Pull Requests

1. **Fork the repository**
   ```bash
   git clone https://github.com/upendra-manike/JSLib.git
   cd JSLib/rudra-css
   ```

2. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Make your changes**
   - Follow the existing code style
   - Add comments for complex logic
   - Update documentation if needed
   - Test your changes

5. **Build and test**
   ```bash
   npm run build
   npm run preview  # Test the build
   ```

6. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```
   
   Use conventional commit messages:
   - `feat:` for new features
   - `fix:` for bug fixes
   - `docs:` for documentation changes
   - `style:` for formatting changes
   - `refactor:` for code refactoring
   - `test:` for adding tests
   - `chore:` for maintenance tasks

7. **Push and create a Pull Request**
   ```bash
   git push origin feature/your-feature-name
   ```

## Development Guidelines

### Project Structure

```
rudra-css/
├── src/
│   ├── base/          # Base styles (reset, variables, typography)
│   ├── utilities/     # Utility classes
│   ├── components/    # Component styles
│   └── index.scss     # Main entry point
├── dist/              # Compiled CSS (generated)
└── README.md          # Documentation
```

### Code Style

- Use SCSS syntax
- Follow BEM-like naming for components (`.component`, `.component-element`)
- Use kebab-case for class names
- Keep utility classes atomic and single-purpose
- Use CSS variables for theming

### Adding New Utilities

1. Create or edit a file in `src/utilities/`
2. Follow the existing pattern
3. Add documentation to README.md
4. Test across browsers

### Adding New Components

1. Create a file in `src/components/`
2. Use CSS variables for colors and spacing
3. Ensure responsive behavior
4. Add to `src/index.scss`
5. Document in README.md with examples

### Testing

- Test in multiple browsers (Chrome, Firefox, Safari, Edge)
- Test responsive behavior on different screen sizes
- Verify dark mode support
- Check accessibility (keyboard navigation, screen readers)

## Questions?

Feel free to open an issue for questions or discussions. We're here to help!

## License

By contributing, you agree that your contributions will be licensed under the MIT License.




