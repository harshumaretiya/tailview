# TailView UI - Rails Component Library

<div align="center">
  <img src="https://img.shields.io/badge/Rails-8.0.2-red.svg" alt="Rails Version">
  <img src="https://img.shields.io/badge/Ruby-3.4.1-red.svg" alt="Ruby Version">
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.0+-blue.svg" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/License-MIT-green.svg" alt="License">
</div>

A comprehensive collection of modern, production-ready UI components built with Rails, Tailwind CSS, and Stimulus. Perfect for developers who want beautiful, accessible components without the complexity of heavy JavaScript frameworks.

## ✨ Features

### 🎨 **20+ Production-Ready Components**
- **Basic Components**: Buttons, Badges, Avatars
- **Layout Components**: Cards, Breadcrumbs, Tabs, Accordions
- **Interactive Components**: Alerts, Modals, Popovers, Toasts
- **Data Components**: Tables with sorting/filtering, Progress bars
- **Form Components**: Inputs, Selects, Checkboxes, Validation states
- **Navigation Components**: Breadcrumbs, Pagination

### 🚀 **Modern Rails Stack**
- **Rails 8.0.2** with latest features
- **ViewComponent** for clean, testable components
- **Tailwind CSS** for utility-first styling
- **Stimulus** for lightweight JavaScript interactions
- **Turbo** for seamless page updates
- **Solid Queue/Cache/Cable** for production infrastructure

### 🎯 **Developer Experience**
- **Copy-paste ready** code snippets
- **Interactive examples** with live demos
- **Comprehensive documentation** for each component
- **Responsive design** out of the box
- **Accessibility compliant** components
- **TypeScript-ready** Stimulus controllers

### 🔧 **Production Ready**
- **Docker support** with optimized Dockerfile
- **Kamal deployment** configuration
- **Security headers** and CSRF protection
- **Performance optimized** with caching
- **Health checks** and monitoring ready

## 🚀 Quick Start

### Prerequisites
- Ruby 3.4.1 or higher
- Rails 8.0 or higher
- Node.js 18+ (for Tailwind CSS)
- SQLite3

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/tailview-ui.git
cd tailview-ui
```

2. **Install dependencies**
```bash
bundle install
npm install
```

3. **Setup the database**
```bash
rails db:create
rails db:migrate
```

4. **Start the development server**
```bash
rails server
```

5. **Visit the application**
Open [http://localhost:3000](http://localhost:3000) in your browser

## 📚 Usage

### Using Components in Your Rails App

#### 1. Copy Individual Components
```erb
<!-- Copy this button code into your Rails view -->
<button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
  Click me
</button>
```

#### 2. Using ViewComponents
```erb
<!-- In your view -->
<%= render AlertComponent.new(
  variant: :success,
  title: "Success!",
  message: "Your action was completed successfully.",
  dismissible: true
) %>
```

#### 3. With Stimulus Controllers
```erb
<!-- Add interactivity -->
<div data-controller="alert" data-alert-auto-dismiss-value="5000">
  <%= render AlertComponent.new(variant: :info, message: "Auto-dismissing alert") %>
</div>
```

### Available Components

| Component | Description | Example |
|-----------|-------------|---------|
| **Buttons** | Various button styles and states | [View Examples](/buttons) |
| **Alerts** | Success, error, warning, info notifications | [View Examples](/alerts) |
| **Cards** | Content containers with headers/footers | [View Examples](/cards) |
| **Tables** | Data tables with sorting and filtering | [View Examples](/tables) |
| **Modals** | Overlay dialogs and popups | [View Examples](/modals) |
| **Forms** | Input fields and form controls | [View Examples](/forms) |
| **Tabs** | Tabbed content organization | [View Examples](/tabs) |
| **Accordions** | Collapsible content sections | [View Examples](/accordions) |
| **Badges** | Status indicators and labels | [View Examples](/badges) |
| **Avatars** | User profile images and initials | [View Examples](/avatars) |
| **Toasts** | Toast notifications and messages | [View Examples](/toasts) |
| **Popovers** | Contextual tooltips and hints | [View Examples](/popovers) |
| **Breadcrumbs** | Navigation breadcrumb trails | [View Examples](/breadcrumbs) |

## 🎨 Customization

### Tailwind Configuration
The project uses Tailwind CSS with a custom configuration. You can modify `config/tailwind.config.js` to customize colors, spacing, and other design tokens.

### Component Customization
All components are built with ViewComponent, making them easy to customize:

```ruby
# app/components/custom_button_component.rb
class CustomButtonComponent < ButtonComponent
  def initialize(variant: :primary, **options)
    super(variant: variant, **options)
  end

  private

  def button_classes
    # Override default classes
    "custom-button #{super}"
  end
end
```

### Color Themes
Components support multiple color variants:
- **Primary**: Blue theme
- **Success**: Green theme  
- **Warning**: Yellow theme
- **Error**: Red theme
- **Info**: Blue theme
- **Neutral**: Gray theme

## 🧪 Testing

### Running Tests
```bash
# Run all tests
rails test

# Run specific test files
rails test test/components/alert_component_test.rb

# Run with coverage
COVERAGE=true rails test
```

### Test Coverage
- **Component Tests**: Comprehensive test coverage for all ViewComponents
- **Controller Tests**: Full test coverage for all controllers
- **Integration Tests**: End-to-end testing for user workflows
- **System Tests**: Browser-based testing with Capybara

## 🚀 Deployment

### Docker Deployment
```bash
# Build the image
docker build -t tailview-ui .

# Run the container
docker run -d -p 80:80 -e RAILS_MASTER_KEY=<your-key> tailview-ui
```

### Kamal Deployment
```bash
# Deploy to production
kamal deploy

# Deploy with specific environment
kamal deploy -d production
```

### Environment Variables
```bash
# Required for production
RAILS_MASTER_KEY=your_master_key
RAILS_ENV=production

# Optional
RAILS_LOG_LEVEL=info
WEB_CONCURRENCY=2
JOB_CONCURRENCY=3
```

## 📖 Documentation

- **[Component Guide](app/views/components/README.md)** - Detailed component documentation
- **[API Reference](docs/api.md)** - Component API documentation
- **[Guidelines](guidelines)** - Development and contribution guidelines
- **[Examples](examples/)** - Real-world usage examples

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Add tests for your changes
5. Run the test suite: `rails test`
6. Commit your changes: `git commit -m 'Add amazing feature'`
7. Push to the branch: `git push origin feature/amazing-feature`
8. Open a Pull Request

### Code Style
- Follow Rails conventions
- Use RuboCop for code formatting
- Write tests for new features
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Rails Team** for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Hotwire** for Stimulus and Turbo
- **ViewComponent** for component architecture
- **Contributors** who help make this project better

## 📞 Support

- **Documentation**: [View Documentation](docs/)
- **Issues**: [Report Issues](https://github.com/yourusername/tailview-ui/issues)
- **Discussions**: [Join Discussions](https://github.com/yourusername/tailview-ui/discussions)
- **Email**: support@tailview-ui.com

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=yourusername/tailview-ui&type=Date)](https://star-history.com/#yourusername/tailview-ui&Date)

---

<div align="center">
  <p>Built with ❤️ using Rails, Tailwind CSS, and Stimulus</p>
  <p>
    <a href="https://github.com/yourusername/tailview-ui">GitHub</a> •
    <a href="https://tailview-ui.com">Documentation</a> •
    <a href="https://twitter.com/tailview_ui">Twitter</a>
  </p>
</div>