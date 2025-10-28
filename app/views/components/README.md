# TailView Components - Copy & Paste Ready

> Simple, copy-pasteable UI components for Rails with Tailwind CSS

## 🚀 Quick Start

1. **Browse the components** in the folders below
2. **Copy the HTML** you need
3. **Paste into your Rails views**
4. **Customize as needed**
5. **Done!**

## 📁 Available Components

### **Buttons**
- [Basic Buttons](buttons/basic.html.erb) - All button variants (primary, secondary, danger, etc.)
- [Button Sizes](buttons/sizes.html.erb) - Different button sizes (sm, md, lg, xl)

### **Forms**
- [Input Fields](forms/inputs.html.erb) - Text inputs with validation states
- [Select Dropdowns](forms/selects.html.erb) - Dropdown selects with search
- [Textareas](forms/textareas.html.erb) - Multi-line text inputs
- [Checkboxes](forms/checkboxes.html.erb) - Checkboxes and radio buttons
- [Form Validation](forms/validation.html.erb) - Form validation states

### **Cards**
- [Basic Cards](cards/basic.html.erb) - Simple cards with headers and footers
- [Card Grids](cards/grids.html.erb) - Card layouts in grids
- [Card Stats](cards/stats.html.erb) - Cards with statistics and metrics

### **Alerts**
- [Basic Alerts](alerts/basic.html.erb) - Success, error, warning, info alerts
- [Dismissible Alerts](alerts/dismissible.html.erb) - Alerts that can be closed
- [Alert Lists](alerts/lists.html.erb) - Alerts with bullet points

### **Navigation**
- [Breadcrumbs](navigation/breadcrumbs.html.erb) - Navigation breadcrumbs
- [Tabs](navigation/tabs.html.erb) - Tab navigation
- [Pagination](navigation/pagination.html.erb) - Page navigation

### **Data Display**
- [Tables](data/tables.html.erb) - Data tables with sorting
- [Badges](data/badges.html.erb) - Status badges and labels
- [Avatars](data/avatars.html.erb) - User avatars with fallbacks
- [Progress Bars](data/progress.html.erb) - Progress indicators

### **Overlays**
- [Modals](overlays/modals.html.erb) - Modal dialogs
- [Tooltips](overlays/tooltips.html.erb) - Contextual tooltips
- [Popovers](overlays/popovers.html.erb) - Content overlays
- [Dropdowns](overlays/dropdowns.html.erb) - Dropdown menus

### **Layout**
- [Containers](layout/containers.html.erb) - Page containers
- [Grids](layout/grids.html.erb) - Grid layouts
- [Spacing](layout/spacing.html.erb) - Spacing utilities
- [Headers](layout/headers.html.erb) - Page headers

## 💡 How to Use

### 1. Copy Individual Components
```erb
<!-- Copy this button code into your Rails view -->
<button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
  Click me
</button>
```

### 2. Copy Complete Sections
```erb
<!-- Copy entire form sections -->
<div class="space-y-4">
  <div>
    <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
    <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="Enter your name">
  </div>
  <!-- More form fields... -->
</div>
```

### 3. Customize for Your Needs
- **Change colors**: Replace `bg-blue-600` with your brand colors
- **Adjust spacing**: Modify `px-4 py-2` for different padding
- **Add functionality**: Add Rails form helpers, Stimulus controllers, etc.

## 🎨 Tailwind Classes Used

### **Colors**
- `bg-blue-600` - Primary blue
- `bg-green-600` - Success green  
- `bg-red-600` - Error red
- `bg-yellow-500` - Warning yellow
- `bg-gray-200` - Neutral gray

### **Spacing**
- `px-4 py-2` - Medium padding
- `px-3 py-1.5` - Small padding
- `px-6 py-3` - Large padding
- `space-y-4` - Vertical spacing

### **Borders & Radius**
- `border border-gray-300` - Light border
- `rounded-lg` - Medium border radius
- `rounded-md` - Small border radius
- `rounded-xl` - Large border radius

### **Focus States**
- `focus:ring-2 focus:ring-blue-500` - Focus ring
- `focus:border-blue-500` - Focus border color
- `hover:bg-blue-700` - Hover background

## 🚀 Pro Tips

1. **Start simple**: Copy basic components first
2. **Customize gradually**: Change colors and spacing as needed
3. **Use consistently**: Apply the same patterns throughout your app
4. **Add interactivity**: Combine with Stimulus controllers for dynamic behavior
5. **Test thoroughly**: Check on different screen sizes

## 📚 More Examples

Check out the main example app at `http://localhost:3000` to see all components in action with live examples and code snippets.

---

**Happy coding!** 🎉
