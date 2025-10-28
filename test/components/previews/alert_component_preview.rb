# frozen_string_literal: true
#
# To preview these components in your browser:
# Visit http://localhost:3000/rails/view_components (in development mode)

class AlertComponentPreview < ViewComponent::Preview
  # @label Basic Success Alert
  def success
    render(AlertComponent.new(
      variant: :success,
      message: "Success! Your changes have been saved."
    ))
  end

  # @label Basic Error Alert
  def error
    render(AlertComponent.new(
      variant: :error,
      message: "Error! There was a problem with your request."
    ))
  end

  # @label Basic Warning Alert
  def warning
    render(AlertComponent.new(
      variant: :warning,
      message: "Warning! Please review before proceeding."
    ))
  end

  # @label Basic Info Alert
  def info
    render(AlertComponent.new(
      variant: :info,
      message: "Info: Here's some helpful information."
    ))
  end

  # @label Alert with Title
  def with_title
    render(AlertComponent.new(
      variant: :success,
      title: "Order Completed",
      message: "Your order has been successfully processed and will be shipped within 2-3 business days."
    ))
  end

  # @label Dismissible Alert
  def dismissible
    render(AlertComponent.new(
      variant: :info,
      title: "Dismissible Alert",
      message: "This alert can be dismissed by clicking the X button.",
      dismissible: true
    ))
  end

  # @label Alert with List Items
  def with_list
    render(AlertComponent.new(
      variant: :error,
      title: "Please fix the following errors:",
      list_items: [
        "Email address is required",
        "Password must be at least 8 characters",
        "Phone number format is invalid"
      ]
    ))
  end

  # @label Compact Success Alert
  def compact_success
    render(AlertComponent.new(
      variant: :success,
      message: "Changes saved successfully",
      compact: true
    ))
  end

  # @label Compact Error Alert
  def compact_error
    render(AlertComponent.new(
      variant: :error,
      message: "Error: Unable to process request",
      compact: true
    ))
  end

  # @label Alert without Icon
  def without_icon
    render(AlertComponent.new(
      variant: :info,
      message: "This is an alert without an icon.",
      show_icon: false
    ))
  end

  # @label Alert with Custom Content
  def with_custom_content
    render(AlertComponent.new(variant: :warning, title: "Upgrade your plan")) do
      content_tag(:div) do
        content_tag(:p, "You've reached 90% of your storage limit. Upgrade now to continue uploading files.", class: "text-sm") +
        content_tag(:div, class: "mt-4") do
          content_tag(:div, class: "flex space-x-3") do
            content_tag(:button, "Upgrade Now", class: "bg-yellow-50 px-3 py-2 text-sm font-medium text-yellow-800 border border-yellow-300 rounded-md hover:bg-yellow-100") +
            content_tag(:button, "Remind me later", class: "px-3 py-2 text-sm font-medium text-yellow-800 hover:text-yellow-900")
          end
        end
      end
    end
  end

  # @label Multiple Alerts Stacked
  def multiple_stacked
    content_tag(:div, class: "space-y-4") do
      render(AlertComponent.new(variant: :success, message: "Operation 1 completed successfully")) +
      render(AlertComponent.new(variant: :info, message: "Operation 2 is in progress")) +
      render(AlertComponent.new(variant: :warning, message: "Operation 3 requires attention"))
    end
  end

  # @label All Variants Comparison
  def all_variants
    content_tag(:div, class: "space-y-4") do
      render(AlertComponent.new(variant: :success, title: "Success", message: "This is a success message")) +
      render(AlertComponent.new(variant: :error, title: "Error", message: "This is an error message")) +
      render(AlertComponent.new(variant: :warning, title: "Warning", message: "This is a warning message")) +
      render(AlertComponent.new(variant: :info, title: "Info", message: "This is an info message"))
    end
  end

  # @label Compact Variants Comparison
  def compact_variants
    content_tag(:div, class: "space-y-3") do
      render(AlertComponent.new(variant: :success, message: "Success: Changes saved", compact: true)) +
      render(AlertComponent.new(variant: :error, message: "Error: Unable to save", compact: true)) +
      render(AlertComponent.new(variant: :warning, message: "Warning: Please review", compact: true)) +
      render(AlertComponent.new(variant: :info, message: "Info: New update available", compact: true))
    end
  end
end

