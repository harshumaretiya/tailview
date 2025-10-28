class AccordionsController < ApplicationController
  def index
    # Sample data for different accordion examples
    @faq_data = [
      {
        id: 1,
        question: "How do I get started with TailView?",
        answer: "Getting started is easy! Simply install the gem, add it to your Gemfile, and run the generator to set up the components in your Rails application.",
        category: "Getting Started",
        open: true
      },
      {
        id: 2,
        question: "Can I customize the components?",
        answer: "Absolutely! All components are built with Tailwind CSS and can be easily customized by modifying the classes or extending the base styles.",
        category: "Customization",
        open: false
      },
      {
        id: 3,
        question: "Is TailView compatible with Hotwire?",
        answer: "Yes! TailView is designed to work seamlessly with Hotwire, Turbo Frames, and Stimulus controllers for dynamic interactions.",
        category: "Integration",
        open: false
      },
      {
        id: 4,
        question: "What browsers are supported?",
        answer: "TailView supports all modern browsers including Chrome, Firefox, Safari, and Edge. Internet Explorer is not supported.",
        category: "Browser Support",
        open: false
      }
    ]

    @product_specs = [
      {
        id: 1,
        name: "Performance",
        icon: "lightning",
        color: "blue",
        specs: [
          { label: "Load Time", value: "< 100ms", status: "excellent" },
          { label: "Bundle Size", value: "45KB", status: "good" },
          { label: "Memory Usage", value: "Low", status: "excellent" }
        ],
        open: true
      },
      {
        id: 2,
        name: "Accessibility",
        icon: "accessibility",
        color: "green",
        specs: [
          { label: "WCAG Compliance", value: "AA", status: "excellent" },
          { label: "Screen Reader", value: "Supported", status: "excellent" },
          { label: "Keyboard Navigation", value: "Full Support", status: "excellent" }
        ],
        open: false
      },
      {
        id: 3,
        name: "Browser Support",
        icon: "globe",
        color: "purple",
        specs: [
          { label: "Chrome", value: "100%", status: "excellent" },
          { label: "Firefox", value: "100%", status: "excellent" },
          { label: "Safari", value: "100%", status: "excellent" },
          { label: "Edge", value: "100%", status: "excellent" }
        ],
        open: false
      }
    ]

    @user_settings = [
      {
        id: 1,
        title: "Account Information",
        icon: "user",
        fields: [
          { name: "email", label: "Email Address", value: "user@example.com", type: "email" },
          { name: "name", label: "Full Name", value: "John Doe", type: "text" },
          { name: "phone", label: "Phone Number", value: "+1 (555) 123-4567", type: "tel" }
        ],
        open: true
      },
      {
        id: 2,
        title: "Privacy Settings",
        icon: "shield",
        fields: [
          { name: "profile_visibility", label: "Profile Visibility", value: "Public", type: "select" },
          { name: "data_sharing", label: "Data Sharing", value: "Limited", type: "select" },
          { name: "notifications", label: "Email Notifications", value: "Enabled", type: "toggle" }
        ],
        open: false
      },
      {
        id: 3,
        title: "Security",
        icon: "lock",
        fields: [
          { name: "two_factor", label: "Two-Factor Authentication", value: "Enabled", type: "toggle" },
          { name: "password", label: "Password", value: "••••••••", type: "password" },
          { name: "session_timeout", label: "Session Timeout", value: "30 minutes", type: "select" }
        ],
        open: false
      }
    ]

    @order_details = [
      {
        id: 1,
        order_number: "ORD-2024-001",
        status: "shipped",
        date: "2024-01-15",
        total: "$299.99",
        items: [
          { name: "Premium Widget", quantity: 2, price: "$149.99" },
          { name: "Standard Widget", quantity: 1, price: "$99.99" }
        ],
        shipping_address: "123 Main St, Anytown, USA 12345",
        tracking_number: "TRK123456789",
        open: true
      },
      {
        id: 2,
        order_number: "ORD-2024-002",
        status: "processing",
        date: "2024-01-20",
        total: "$149.99",
        items: [
          { name: "Basic Widget", quantity: 1, price: "$149.99" }
        ],
        shipping_address: "456 Oak Ave, Somewhere, USA 67890",
        tracking_number: nil,
        open: false
      }
    ]
  end

  def load_faq_details
    @faq_item = {
      id: params[:id],
      question: "Detailed FAQ Information",
      answer: "This is dynamically loaded content via Turbo Frame. The content can be updated without refreshing the entire page.",
      category: "Dynamic Content",
      related_questions: [
        "How does Turbo Frame work?",
        "What are the benefits of dynamic loading?",
        "Can I customize the loading behavior?"
      ]
    }

    respond_to do |format|
      format.html
    end
  end

  def update_setting
    # Simple setting update - in real app, update database
    setting_name = params[:setting_name]
    setting_value = params[:setting_value]
    
    respond_to do |format|
      format.turbo_stream do
        render turbo_stream: turbo_stream.replace(
          "setting_#{setting_name}",
          partial: "accordions/setting_field",
          locals: { 
            field: { 
              name: setting_name, 
              label: setting_name.humanize, 
              value: setting_value, 
              type: "text" 
            },
            updated: true
          }
        )
      end
    end
  end
end

