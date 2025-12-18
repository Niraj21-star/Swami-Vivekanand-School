# CSS Utility Classes Reference

This document provides a quick reference for all utility classes available in the School Management System.

## 🎨 Layout & Display

### Display
```css
.block, .inline-block, .inline
.flex, .inline-flex, .grid
.hidden
```

### Flexbox
```css
.flex-row, .flex-col, .flex-wrap
.flex-1, .flex-shrink-0
.items-start, .items-center, .items-end
.justify-start, .justify-center, .justify-end, .justify-between
```

### Grid
```css
.grid-cols-1, .grid-cols-2, .grid-cols-3, .grid-cols-4
.lg\:col-span-2
```

## 📏 Spacing

### Padding
```css
.p-1, .p-2, .p-3, .p-4, .p-6, .p-8
.px-2, .px-3, .px-4, .px-6
.py-1, .py-2, .py-3, .py-4
```

### Margin
```css
.m-0, .m-2, .m-4
.mt-1, .mt-2, .mt-4, .mt-8
.mb-1, .mb-2, .mb-3, .mb-4
```

### Gap
```css
.gap-1, .gap-2, .gap-3, .gap-4, .gap-6
```

### Space Between
```css
.space-y-1, .space-y-2, .space-y-3, .space-y-4, .space-y-6
```

## 📐 Sizing

### Width
```css
.w-4, .w-5, .w-6, .w-8, .w-10, .w-12, .w-16
.w-full, .w-fit
.min-w-0
.max-w-md, .max-w-lg, .max-w-full
```

### Height
```css
.h-4, .h-5, .h-6, .h-8, .h-10, .h-12, .h-16
.h-full, .h-screen, .h-64
.min-h-screen
.max-h-96
```

## 🎨 Colors

### Background Colors
```css
/* Gray */
.bg-white, .bg-gray-50, .bg-gray-100, .bg-gray-200, .bg-gray-300

/* Blue */
.bg-blue-50, .bg-blue-500, .bg-blue-600, .bg-blue-700

/* Green */
.bg-green-50, .bg-green-100, .bg-green-500, .bg-green-600

/* Red */
.bg-red-50, .bg-red-100, .bg-red-500, .bg-red-600

/* Amber */
.bg-amber-50, .bg-amber-500, .bg-amber-600

/* Purple */
.bg-purple-50, .bg-purple-500
```

### Text Colors
```css
.text-white
.text-gray-400, .text-gray-500, .text-gray-600, .text-gray-700, .text-gray-900
.text-blue-600, .text-blue-700
.text-green-600, .text-green-800
.text-red-600, .text-red-800
.text-amber-700
```

### Border Colors
```css
.border-gray-100, .border-gray-200, .border-gray-300
.border-red-200, .border-red-300
```

## 🔲 Borders

### Border Width
```css
.border, .border-2
.border-t, .border-b, .border-r
```

### Border Radius
```css
.rounded, .rounded-md, .rounded-lg, .rounded-full
.rounded-b-lg
```

## ✨ Effects

### Shadow
```css
.shadow-sm, .shadow, .shadow-lg, .shadow-xl
```

### Opacity
```css
.opacity-50
.bg-opacity-50
```

## 📝 Typography

### Font Size
```css
.text-xs, .text-sm, .text-base, .text-lg, .text-xl, .text-2xl, .text-3xl
```

### Font Weight
```css
.font-medium, .font-semibold, .font-bold
```

### Text Alignment
```css
.text-left, .text-center, .text-right
```

### Text Transform
```css
.uppercase, .capitalize
```

### Other
```css
.truncate
.whitespace-nowrap
.leading-tight
.tracking-wider
```

## 📍 Positioning

### Position
```css
.relative, .absolute, .fixed, .sticky
```

### Placement
```css
.inset-0
.top-0, .top-1, .top-16, .top-20
.right-0, .right-1
.left-0, .left-64
```

### Z-Index
```css
.z-30, .z-40, .z-50
```

## 🔄 Transforms & Transitions

### Transform
```css
.translate-x-0, .-translate-x-full
```

### Transition
```css
.transition-all, .transition-colors, .transition-shadow, .transition-transform
.duration-200, .duration-300
.ease-in-out, .ease-out
```

### Animation
```css
.animate-spin
```

## 🖱️ Interactions

### Cursor
```css
.cursor-pointer, .cursor-not-allowed
```

### Pointer Events
```css
.pointer-events-none
```

## 🎭 Pseudo States

### Hover
```css
.hover\:bg-gray-50, .hover\:bg-gray-100
.hover\:bg-blue-50, .hover\:bg-blue-100, .hover\:bg-blue-700
.hover\:bg-green-100
.hover\:bg-red-50
.hover\:text-blue-700
.hover\:shadow-lg
```

### Focus
```css
.focus\:outline-none
.focus\:ring-2, .focus\:ring-blue-500, .focus\:ring-offset-2
.focus\:border-transparent, .focus\:border-blue-500
```

### Disabled
```css
.disabled\:opacity-50
.disabled\:cursor-not-allowed
.disabled\:bg-gray-50
.disabled\:text-gray-500
```

## 📱 Responsive Design

### Medium Screens (768px+)
```css
.md\:grid-cols-2, .md\:grid-cols-3
.md\:flex, .md\:hidden, .md\:block
.md\:p-6
```

### Large Screens (1024px+)
```css
.lg\:grid-cols-3, .lg\:grid-cols-4
.lg\:col-span-2
.lg\:flex, .lg\:hidden, .lg\:block
.lg\:w-64, .lg\:ml-64, .lg\:ml-0, .lg\:left-64
.lg\:p-8
.lg\:translate-x-0
```

## 💡 Usage Examples

### Flex Container
```jsx
<div className="flex items-center justify-between gap-4">
  <span>Left</span>
  <span>Right</span>
</div>
```

### Grid Layout
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
</div>
```

### Button
```jsx
<button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
  Click Me
</button>
```

### Card
```jsx
<div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
  <h3 className="text-lg font-semibold text-gray-900">Title</h3>
  <p className="text-sm text-gray-600 mt-2">Content</p>
</div>
```

### Input
```jsx
<input 
  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  type="text"
/>
```

---

## 🚀 Tips

1. **Combine classes** for complex styling
2. **Use responsive prefixes** (`md:`, `lg:`) for mobile-first design
3. **Hover and focus states** improve user experience
4. **Keep it consistent** across the application

## 📚 Learn More

- All styles are defined in `src/index.css`
- Custom classes can be added to the same file
- Follow the existing naming pattern for consistency
