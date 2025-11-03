module ApplicationHelper
  # Helper method to render alert components
  def alert_component(variant, options = {}, &block)
    render(AlertComponent.new(variant: variant, **options), &block)
  end

  # Helper method to render badge components
  def badge_component(text, options = {})
    render(BadgeComponent.new(text, **options))
  end

  # Helper method to render spinner partial
  def spinner_component(variant: :primary, size: :md, type: :border, overlay: false, fullscreen: false, text: nil, auto_show: false)
    render partial: 'components/spinners/spinner', locals: {
      variant: variant,
      size: size,
      type: type,
      overlay: overlay,
      fullscreen: fullscreen,
      text: text,
      auto_show: auto_show
    }
  end

  # Render flash messages as alert components
  def flash_alerts
    return if flash.empty?

    content_tag(:div, class: "space-y-4") do
      safe_join(
        flash.map do |type, message|
          variant = flash_type_to_variant(type)
          alert_component(variant, message: message, dismissible: true)
        end
      )
    end
  end

  # Helper for status badges
  def status_badge(status)
    config = {
      draft: { variant: :gray, text: "Draft" },
      pending: { variant: :yellow, text: "Pending", dot: true },
      processing: { variant: :blue, text: "Processing", dot: true },
      active: { variant: :green, text: "Active", dot: true },
      completed: { variant: :green, text: "Completed" },
      shipped: { variant: :purple, text: "Shipped" },
      delivered: { variant: :green, text: "Delivered" },
      cancelled: { variant: :red, text: "Cancelled" },
      failed: { variant: :red, text: "Failed" }
    }
    
    badge_config = config[status.to_sym] || { variant: :gray, text: status.to_s.titleize }
    badge_component(badge_config[:text], variant: badge_config[:variant], dot: badge_config[:dot] || false)
  end

  private

  def flash_type_to_variant(type)
    case type.to_sym
    when :notice, :success then :success
    when :alert, :error then :error
    when :warning then :warning
    else :info
    end
  end
end
