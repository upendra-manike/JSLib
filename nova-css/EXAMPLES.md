# NovaCSS Examples

This document provides practical examples of using NovaCSS in real-world scenarios.

## Table of Contents

- [Dashboard Layout](#dashboard-layout)
- [Login/Authentication Forms](#loginauthentication-forms)
- [Card Grids](#card-grids)
- [Navigation Bars](#navigation-bars)
- [Modal Dialogs](#modal-dialogs)
- [Landing Pages](#landing-pages)
- [Data Tables](#data-tables)
- [Profile Pages](#profile-pages)

---

## Dashboard Layout

### Analytics Dashboard

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dashboard - NovaCSS</title>
  <link rel="stylesheet" href="node_modules/@upendra.manike/nova-css/dist/nova.css">
</head>
<body class="bg-surface">
  <!-- Navbar -->
  <nav class="navbar">
    <div class="navbar-brand">Dashboard</div>
    <div class="navbar-menu">
      <a href="#" class="navbar-link">Home</a>
      <a href="#" class="navbar-link">Analytics</a>
      <a href="#" class="navbar-link">Settings</a>
    </div>
    <div class="navbar-actions">
      <button class="btn btn-ghost btn-sm">Profile</button>
    </div>
  </nav>

  <!-- Main Content -->
  <div class="max-w-screen px-6 py-6">
    <h1 class="text-display mb-6">Analytics Overview</h1>
    
    <!-- Stats Grid -->
    <div class="flex flex-col gap-4 md:flex-row">
      <div class="card flex-1 fade-in-up">
        <div class="card-header">
          <h3 class="card-title">Total Users</h3>
          <p class="card-subtitle">Last 30 days</p>
        </div>
        <div class="card-body">
          <p class="text-3xl font-bold text-primary">12,345</p>
          <p class="text-muted mt-2">↑ 12% from last month</p>
        </div>
      </div>
      
      <div class="card flex-1 fade-in-up">
        <div class="card-header">
          <h3 class="card-title">Revenue</h3>
          <p class="card-subtitle">This month</p>
        </div>
        <div class="card-body">
          <p class="text-3xl font-bold text-success">$45,678</p>
          <p class="text-muted mt-2">↑ 8% from last month</p>
        </div>
      </div>
      
      <div class="card flex-1 fade-in-up">
        <div class="card-header">
          <h3 class="card-title">Active Sessions</h3>
          <p class="card-subtitle">Right now</p>
        </div>
        <div class="card-body">
          <p class="text-3xl font-bold text-info">1,234</p>
          <p class="text-muted mt-2">↑ 5% from yesterday</p>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
```

---

## Login/Authentication Forms

### Login Form

```html
<div class="flex items-center justify-center min-h-screen bg-surface">
  <div class="card shadow-lg max-w-md w-full mx-4 fade-in-up">
    <div class="card-header">
      <h2 class="card-title">Welcome Back</h2>
      <p class="card-subtitle">Sign in to your account</p>
    </div>
    <div class="card-body space-y-4">
      <div>
        <label class="text-sm text-muted mb-2 block">Email Address</label>
        <input 
          type="email" 
          class="input" 
          placeholder="you@example.com"
          required
        >
      </div>
      <div>
        <label class="text-sm text-muted mb-2 block">Password</label>
        <div class="input-group">
          <span class="input-group__icon">🔒</span>
          <input 
            type="password" 
            class="input" 
            placeholder="Enter your password"
            required
          >
        </div>
      </div>
      <div class="flex items-center justify-between">
        <label class="flex items-center gap-2">
          <input type="checkbox">
          <span class="text-sm text-muted">Remember me</span>
        </label>
        <a href="#" class="text-sm text-primary">Forgot password?</a>
      </div>
    </div>
    <div class="card-footer">
      <button class="btn btn-primary w-full">Sign In</button>
      <p class="text-center text-muted text-sm mt-4">
        Don't have an account? 
        <a href="#" class="text-primary">Sign up</a>
      </p>
    </div>
  </div>
</div>
```

### Sign Up Form

```html
<div class="card shadow-lg max-w-lg mx-auto fade-in">
  <div class="card-header">
    <h2 class="card-title">Create Account</h2>
    <p class="card-subtitle">Get started with your free account</p>
  </div>
  <div class="card-body space-y-4">
    <div class="flex gap-4">
      <div class="flex-1">
        <label class="text-sm text-muted mb-2 block">First Name</label>
        <input type="text" class="input" placeholder="John" required>
      </div>
      <div class="flex-1">
        <label class="text-sm text-muted mb-2 block">Last Name</label>
        <input type="text" class="input" placeholder="Doe" required>
      </div>
    </div>
    <div>
      <label class="text-sm text-muted mb-2 block">Email</label>
      <input type="email" class="input" placeholder="john@example.com" required>
    </div>
    <div>
      <label class="text-sm text-muted mb-2 block">Password</label>
      <input type="password" class="input" placeholder="••••••••" required>
    </div>
    <div>
      <label class="flex items-center gap-2">
        <input type="checkbox" required>
        <span class="text-sm text-muted">
          I agree to the <a href="#" class="text-primary">Terms of Service</a>
        </span>
      </label>
    </div>
  </div>
  <div class="card-footer">
    <button class="btn btn-primary w-full">Create Account</button>
  </div>
</div>
```

---

## Card Grids

### Product Grid

```html
<div class="max-w-screen px-6 py-6">
  <h2 class="text-2xl font-bold mb-6">Featured Products</h2>
  <div class="flex flex-wrap gap-6">
    <div class="card shadow-lg flex-1 min-w-[280px] max-w-[320px] fade-in-up">
      <div class="card-body">
        <div class="bg-gradient-primary rounded-lg p-8 mb-4 text-center">
          <span class="text-4xl">📦</span>
        </div>
        <h3 class="card-title mb-2">Product Name</h3>
        <p class="text-muted mb-4">Product description goes here.</p>
        <div class="flex items-center justify-between">
          <span class="text-xl font-bold text-primary">$99.99</span>
          <button class="btn btn-primary btn-sm">Add to Cart</button>
        </div>
      </div>
    </div>
    <!-- Repeat for more products -->
  </div>
</div>
```

### Feature Cards

```html
<div class="flex flex-col gap-6 md:flex-row">
  <div class="card flex-1 shadow-lg fade-in">
    <div class="card-header">
      <div class="bg-primary rounded-lg p-4 w-fit mb-4">
        <span class="text-2xl">⚡</span>
      </div>
      <h3 class="card-title">Fast Performance</h3>
    </div>
    <div class="card-body">
      <p class="text-muted">
        Optimized for speed with minimal CSS footprint and efficient rendering.
      </p>
    </div>
  </div>
  
  <div class="card flex-1 shadow-lg fade-in">
    <div class="card-header">
      <div class="bg-secondary rounded-lg p-4 w-fit mb-4">
        <span class="text-2xl">🎨</span>
      </div>
      <h3 class="card-title">Beautiful Design</h3>
    </div>
    <div class="card-body">
      <p class="text-muted">
        Glassmorphism-inspired design with modern aesthetics and smooth animations.
      </p>
    </div>
  </div>
  
  <div class="card flex-1 shadow-lg fade-in">
    <div class="card-header">
      <div class="bg-success rounded-lg p-4 w-fit mb-4">
        <span class="text-2xl">📱</span>
      </div>
      <h3 class="card-title">Responsive</h3>
    </div>
    <div class="card-body">
      <p class="text-muted">
        Mobile-first approach ensures your site looks great on all devices.
      </p>
    </div>
  </div>
</div>
```

---

## Navigation Bars

### Simple Navbar

```html
<nav class="navbar">
  <div class="navbar-brand">MyApp</div>
  <div class="navbar-menu">
    <a href="#" class="navbar-link">Home</a>
    <a href="#" class="navbar-link">Products</a>
    <a href="#" class="navbar-link">About</a>
    <a href="#" class="navbar-link">Contact</a>
  </div>
  <div class="navbar-actions">
    <button class="btn btn-ghost btn-sm">Login</button>
    <button class="btn btn-primary btn-sm">Sign Up</button>
  </div>
</nav>
```

### Navbar with Search

```html
<nav class="navbar">
  <div class="navbar-brand">MyApp</div>
  <div class="navbar-menu flex-1 justify-center">
    <div class="input-group max-w-md">
      <span class="input-group__icon">🔍</span>
      <input type="search" class="input" placeholder="Search...">
    </div>
  </div>
  <div class="navbar-actions">
    <button class="btn btn-primary btn-sm">Get Started</button>
  </div>
</nav>
```

---

## Modal Dialogs

### Confirmation Modal

```html
<div class="modal-backdrop" id="confirmModal" style="display: none;">
  <div class="modal">
    <div class="modal-header">
      <h3 class="modal-title">Confirm Action</h3>
      <button class="modal-close" onclick="closeModal()">×</button>
    </div>
    <div class="modal-body">
      <p class="text-muted">
        Are you sure you want to delete this item? This action cannot be undone.
      </p>
    </div>
    <div class="modal-footer">
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-destructive" onclick="confirmDelete()">Delete</button>
    </div>
  </div>
</div>

<script>
function closeModal() {
  document.getElementById('confirmModal').style.display = 'none';
}
function confirmDelete() {
  // Your delete logic here
  closeModal();
}
</script>
```

### Form Modal

```html
<div class="modal-backdrop" id="formModal" style="display: none;">
  <div class="modal">
    <div class="modal-header">
      <h3 class="modal-title">Add New Item</h3>
      <button class="modal-close" onclick="closeModal()">×</button>
    </div>
    <div class="modal-body space-y-4">
      <div>
        <label class="text-sm text-muted mb-2 block">Item Name</label>
        <input type="text" class="input" placeholder="Enter name">
      </div>
      <div>
        <label class="text-sm text-muted mb-2 block">Description</label>
        <textarea class="input" rows="4" placeholder="Enter description"></textarea>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary">Save</button>
    </div>
  </div>
</div>
```

---

## Landing Pages

### Hero Section

```html
<section class="bg-glass rounded-3 p-12 text-center fade-in-up">
  <h1 class="text-display text-gradient mb-6">
    Build Beautiful Websites Faster
  </h1>
  <p class="text-xl text-muted mb-8 max-w-2xl mx-auto">
    NovaCSS is a modern CSS framework that combines utility classes with 
    polished components for rapid development.
  </p>
  <div class="flex gap-4 justify-center">
    <button class="btn btn-primary btn-lg">Get Started</button>
    <button class="btn btn-outline btn-lg">View Docs</button>
  </div>
</section>
```

### Feature Section

```html
<section class="max-w-screen px-6 py-12">
  <h2 class="text-3xl font-bold text-center mb-12">Why Choose NovaCSS?</h2>
  <div class="flex flex-col gap-8 md:flex-row">
    <div class="flex-1 text-center">
      <div class="bg-primary rounded-full p-6 w-fit mx-auto mb-4">
        <span class="text-3xl">⚡</span>
      </div>
      <h3 class="text-xl font-bold mb-2">Lightning Fast</h3>
      <p class="text-muted">Minimal CSS footprint for optimal performance</p>
    </div>
    <div class="flex-1 text-center">
      <div class="bg-secondary rounded-full p-6 w-fit mx-auto mb-4">
        <span class="text-3xl">🎨</span>
      </div>
      <h3 class="text-xl font-bold mb-2">Beautiful Design</h3>
      <p class="text-muted">Glassmorphism-inspired modern aesthetics</p>
    </div>
    <div class="flex-1 text-center">
      <div class="bg-success rounded-full p-6 w-fit mx-auto mb-4">
        <span class="text-3xl">📱</span>
      </div>
      <h3 class="text-xl font-bold mb-2">Fully Responsive</h3>
      <p class="text-muted">Mobile-first approach for all devices</p>
    </div>
  </div>
</section>
```

---

## Data Tables

### Simple Table

```html
<div class="card shadow-lg">
  <div class="card-header">
    <h3 class="card-title">User List</h3>
  </div>
  <div class="card-body">
    <table class="w-full">
      <thead>
        <tr class="border-b border-muted">
          <th class="text-left py-3 px-4 text-muted font-semibold">Name</th>
          <th class="text-left py-3 px-4 text-muted font-semibold">Email</th>
          <th class="text-left py-3 px-4 text-muted font-semibold">Status</th>
          <th class="text-left py-3 px-4 text-muted font-semibold">Actions</th>
        </tr>
      </thead>
      <tbody class="space-y-2">
        <tr class="border-b border-muted">
          <td class="py-3 px-4">John Doe</td>
          <td class="py-3 px-4 text-muted">john@example.com</td>
          <td class="py-3 px-4">
            <span class="badge bg-success">Active</span>
          </td>
          <td class="py-3 px-4">
            <button class="btn btn-ghost btn-sm">Edit</button>
          </td>
        </tr>
        <!-- More rows -->
      </tbody>
    </table>
  </div>
</div>
```

---

## Profile Pages

### User Profile Card

```html
<div class="card shadow-lg max-w-2xl mx-auto fade-in-up">
  <div class="card-header">
    <div class="flex items-center gap-4">
      <div class="bg-gradient-primary rounded-full p-8">
        <span class="text-3xl">👤</span>
      </div>
      <div>
        <h2 class="card-title">John Doe</h2>
        <p class="card-subtitle">Software Developer</p>
      </div>
    </div>
  </div>
  <div class="divider my-6"></div>
  <div class="card-body space-y-4">
    <div class="flex justify-between">
      <span class="text-muted">Email</span>
      <span class="font-semibold">john@example.com</span>
    </div>
    <div class="flex justify-between">
      <span class="text-muted">Location</span>
      <span class="font-semibold">San Francisco, CA</span>
    </div>
    <div class="flex justify-between">
      <span class="text-muted">Member Since</span>
      <span class="font-semibold">January 2024</span>
    </div>
  </div>
  <div class="card-footer">
    <button class="btn btn-primary">Edit Profile</button>
    <button class="btn btn-outline">Change Password</button>
  </div>
</div>
```

---

## Dark Mode Example

```html
<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <title>Dark Mode - NovaCSS</title>
  <link rel="stylesheet" href="node_modules/@upendra.manike/nova-css/dist/nova.css">
</head>
<body class="bg-surface">
  <div class="card shadow-lg max-w-md mx-auto mt-12">
    <div class="card-header">
      <h3 class="card-title">Dark Mode Enabled</h3>
      <p class="card-subtitle">Toggle with data-theme attribute</p>
    </div>
    <div class="card-body">
      <p class="text-muted">
        Add <code>data-theme="dark"</code> to your HTML element to enable dark mode.
      </p>
      <button class="btn btn-primary mt-4" onclick="toggleTheme()">
        Toggle Theme
      </button>
    </div>
  </div>

  <script>
    function toggleTheme() {
      const html = document.documentElement;
      const currentTheme = html.getAttribute('data-theme');
      html.setAttribute('data-theme', currentTheme === 'dark' ? 'light' : 'dark');
    }
  </script>
</body>
</html>
```

---

## Tips & Best Practices

1. **Combine Utilities**: Mix utility classes for flexible layouts
   ```html
   <div class="flex items-center justify-between gap-4 p-6 bg-glass rounded-lg shadow">
   ```

2. **Use Components for Structure**: Use card components for consistent containers
   ```html
   <div class="card">
     <div class="card-header">...</div>
     <div class="card-body">...</div>
   </div>
   ```

3. **Leverage Animations**: Add fade-in animations for better UX
   ```html
   <div class="card fade-in-up">...</div>
   ```

4. **Customize with CSS Variables**: Override variables for custom themes
   ```css
   :root {
     --primary: #your-color;
   }
   ```

5. **Responsive Design**: Use flex utilities with responsive considerations
   ```html
   <div class="flex flex-col md:flex-row gap-4">
   ```

---

For more examples and documentation, visit the [README.md](./README.md).

