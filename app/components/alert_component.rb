# frozen_string_literal: true

class AlertComponent < ViewComponent::Base
  VARIANTS = {
    success: {
      container: "bg-green-50 border border-green-200",
      compact_border: "border-green-400 bg-green-50",
      icon_color: "text-green-400",
      title_color: "text-green-800",
      text_color: "text-green-700",
      button_color: "bg-green-50 text-green-500 hover:bg-green-100 focus:ring-2 focus:ring-offset-2 focus:ring-green-600",
      icon_path: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
    },
    error: {
      container: "bg-red-50 border border-red-200",
      compact_border: "border-red-400 bg-red-50",
      icon_color: "text-red-400",
      title_color: "text-red-800",
      text_color: "text-red-700",
      button_color: "bg-red-50 text-red-500 hover:bg-red-100 focus:ring-2 focus:ring-offset-2 focus:ring-red-600",
      icon_path: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
    },
    warning: {
      container: "bg-yellow-50 border border-yellow-200",
      compact_border: "border-yellow-400 bg-yellow-50",
      icon_color: "text-yellow-400",
      title_color: "text-yellow-800",
      text_color: "text-yellow-700",
      button_color: "bg-yellow-50 text-yellow-500 hover:bg-yellow-100 focus:ring-2 focus:ring-offset-2 focus:ring-yellow-600",
      icon_path: "M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
    },
    info: {
      container: "bg-blue-50 border border-blue-200",
      compact_border: "border-blue-400 bg-blue-50",
      icon_color: "text-blue-400",
      title_color: "text-blue-800",
      text_color: "text-blue-700",
      button_color: "bg-blue-50 text-blue-500 hover:bg-blue-100 focus:ring-2 focus:ring-offset-2 focus:ring-blue-600",
      icon_path: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
    }
  }.freeze

  # Simplified initialization with better class handling
  def initialize(
    variant: :info,
    title: nil,
    message: nil,
    dismissible: false,
    compact: false,
    show_icon: true,
    list_items: nil,
    auto_dismiss: false,
    dismiss_after: 5000,
    **html_options
  )
    @variant = variant.to_sym
    @title = title
    @message = message
    @dismissible = dismissible
    @compact = compact
    @show_icon = show_icon
    @list_items = list_items
    @auto_dismiss = auto_dismiss
    @dismiss_after = dismiss_after
    @html_options = html_options
  end

  def container_classes
    base_classes = if @compact
      "border-l-4 p-3 #{variant_config[:compact_border]}"
    else
      "rounded-lg p-4 #{variant_config[:container]}"
    end

    [base_classes, @html_options[:class]].compact.join(" ")
  end

  def icon_classes
    "h-5 w-5 #{variant_config[:icon_color]}"
  end

  def title_classes
    "text-sm font-medium #{variant_config[:title_color]}"
  end

  def text_classes
    "text-sm #{variant_config[:text_color]}"
  end

  def button_classes
    "inline-flex rounded-md p-1.5 focus:outline-none #{variant_config[:button_color]}"
  end

  def show_icon?
    @show_icon && !@compact
  end

  private

  def variant_config
    VARIANTS[@variant] || VARIANTS[:info]
  end
end

