# Area Charts - Interactive Data Visualization

Beautiful, production-ready area charts built with Rails, Hotwire, Stimulus, and Turbo.

## Features

### 🎨 Multiple Chart Types
- **Basic Area Chart** - Clean single-dataset visualization with period filtering
- **Stacked Area Chart** - Multi-dataset visualization (Desktop, Mobile, Tablet)
- **Gradient Area Chart** - Stunning gradient fills with dark mode canvas
- **Comparison Chart** - Side-by-side period comparison
- **Multi-Metric Chart** - Dashboard with multiple KPIs

### ⚡ Interactive Features
- **Smooth Animations** - Entrance animations with staggered effects
- **Interactive Tooltips** - Hover over data points for detailed information
- **Period Filtering** - Switch between week, month, and year views
- **Legend Controls** - Toggle datasets on/off (stacked charts)
- **Export Functionality** - Download chart data as CSV
- **Dark Mode** - Seamless dark mode support

### 🚀 Performance
- **Lazy Loading** - Charts load asynchronously via Turbo Frames
- **Responsive Design** - Optimized for all screen sizes
- **SVG-based** - Crisp rendering at any resolution
- **Efficient Updates** - Only affected frames reload

## Usage

### Basic Implementation

```erb
<!-- Include in your view -->
<turbo-frame id="my_chart" src="/charts/basic_area_chart?period=week" loading="lazy">
  <!-- Loading state -->
</turbo-frame>
```

### Controller Action

```ruby
def my_chart
  @period = params[:period] || 'week'
  @data = generate_data(@period)
  render :my_chart
end
```

### Stimulus Controller

```html
<div data-controller="area-chart" data-area-chart-animated-value="true">
  <!-- Chart content -->
</div>
```

## Components

### Reusable Partials

#### Chart Header
```erb
<%= render 'charts/chart_header', 
     title: 'Visitor Analytics',
     description: 'Track your website traffic',
     icon_class: 'from-blue-500 to-indigo-600',
     icon_path: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' %>
```

#### Period Selector
```erb
<%= render 'charts/period_selector',
     current_period: @period,
     endpoint: '/charts/basic_area_chart',
     frame_id: 'basic_area_chart' %>
```

#### Stat Card
```erb
<%= render 'charts/stat_card',
     label: 'Total Visitors',
     value: '52,143',
     change: '+12.5%',
     trend: 'up',
     icon_color: 'blue' %>
```

#### Export Button
```erb
<%= render 'charts/export_button', text: 'Export CSV' %>
```

## Stimulus Controller API

### Targets
- `canvas` - Main SVG canvas
- `tooltip` - Tooltip elements
- `point` - Data point markers
- `area` - Area path elements
- `legend` - Legend container
- `legendItem` - Individual legend items

### Actions
- `showTooltip` - Display tooltip on hover
- `hideTooltip` - Hide tooltip on leave
- `toggleLegend` - Toggle dataset visibility
- `exportData` - Export chart data to CSV
- `handleResize` - Handle window resize

### Values
- `data` (Array) - Chart data array
- `height` (Number) - Chart height in pixels
- `padding` (Number) - Chart padding
- `animated` (Boolean) - Enable animations

## Real-World Use Cases

### Analytics Dashboard
Track website traffic, user engagement, and conversion metrics with interactive charts that update in real-time.

### Revenue Tracking
Monitor revenue trends across different time periods with beautiful gradient visualizations.

### Device Analytics
Understand your audience's device preferences with stacked area charts showing desktop, mobile, and tablet usage.

### Period Comparison
Compare current performance against previous periods to identify growth trends and anomalies.

### Multi-Metric Dashboards
Display multiple KPIs in a single view for comprehensive performance monitoring.

## Best Practices

### 1. Data Generation
Keep data generation logic in the controller for testability:
```ruby
def generate_visitor_data(period)
  # Generate appropriate data based on period
end
```

### 2. Responsive Design
Use SVG `preserveAspectRatio="none"` for responsive charts that adapt to container size.

### 3. Performance
- Use Turbo Frame lazy loading for initial page load
- Implement auto-refresh with reasonable intervals (30s+)
- Cache expensive data calculations

### 4. Accessibility
- Add proper ARIA labels to interactive elements
- Ensure keyboard navigation works
- Provide text alternatives for visual data

### 5. Dark Mode
Use CSS custom properties or Tailwind's dark mode utilities for seamless theme switching.

## Customization

### Colors
Customize gradient colors in the SVG `<defs>` section:
```erb
<linearGradient id="customGradient" x1="0%" y1="0%" x2="0%" y2="100%">
  <stop offset="0%" style="stop-color:rgb(YOUR_COLOR);stop-opacity:0.4" />
  <stop offset="100%" style="stop-color:rgb(YOUR_COLOR);stop-opacity:0" />
</linearGradient>
```

### Animations
Adjust animation timing in the Stimulus controller:
```javascript
setTimeout(() => {
  element.style.transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
  element.style.opacity = "1"
}, index * 100)
```

### Tooltips
Customize tooltip content in the view template:
```erb
<foreignObject>
  <div data-area-chart-target="tooltip">
    <!-- Your custom tooltip content -->
  </div>
</foreignObject>
```

## Technical Stack

- **Rails 7+** - Backend framework
- **Hotwire/Turbo** - Real-time updates without custom JavaScript
- **Stimulus** - Minimal JavaScript for interactivity
- **SVG** - Scalable vector graphics for charts
- **Tailwind CSS** - Utility-first styling

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS 14+, Android 10+)

## Future Enhancements

- [ ] More chart types (line, bar, pie)
- [ ] Data point editing
- [ ] Custom date range picker
- [ ] CSV/PDF export options
- [ ] Chart annotations
- [ ] Zoom and pan controls
- [ ] Animation controls
- [ ] Print-friendly styles

## Contributing

When adding new chart types:
1. Create controller action in `charts_controller.rb`
2. Add view template in `app/views/charts/`
3. Update routes in `config/routes.rb`
4. Add Turbo Frame to index page
5. Update this README

## License

Part of the Tailview component library.

