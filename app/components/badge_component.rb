# frozen_string_literal: true

class BadgeComponent < ViewComponent::Base
  VARIANTS = {
    gray: {
      light: "bg-gray-100 text-gray-800",
      solid: "bg-gray-600 text-white",
      dot_color: "fill-gray-400"
    },
    blue: {
      light: "bg-blue-100 text-blue-800",
      solid: "bg-blue-600 text-white",
      dot_color: "fill-blue-400"
    },
    green: {
      light: "bg-green-100 text-green-800",
      solid: "bg-green-600 text-white",
      dot_color: "fill-green-400"
    },
    yellow: {
      light: "bg-yellow-100 text-yellow-800",
      solid: "bg-yellow-500 text-white",
      dot_color: "fill-yellow-400"
    },
    red: {
      light: "bg-red-100 text-red-800",
      solid: "bg-red-600 text-white",
      dot_color: "fill-red-400"
    },
    purple: {
      light: "bg-purple-100 text-purple-800",
      solid: "bg-purple-600 text-white",
      dot_color: "fill-purple-400"
    },
    pink: {
      light: "bg-pink-100 text-pink-800",
      solid: "bg-pink-600 text-white",
      dot_color: "fill-pink-400"
    },
    indigo: {
      light: "bg-indigo-100 text-indigo-800",
      solid: "bg-indigo-600 text-white",
      dot_color: "fill-indigo-400"
    },
    orange: {
      light: "bg-orange-100 text-orange-800",
      solid: "bg-orange-600 text-white",
      dot_color: "fill-orange-400"
    }
  }.freeze

  SIZES = {
    xs: "px-2 py-0.5 text-xs",
    sm: "px-2.5 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-base"
  }.freeze

  SHAPES = {
    rounded: "rounded-full",
    square: "",
    pill: "rounded-md"
  }.freeze

  def initialize(
    text,
    variant: :gray,
    size: :sm,
    shape: :rounded,
    style: :light,
    dot: false,
    icon: nil,
    removable: false,
    **html_options
  )
    @text = text
    @variant = variant.to_sym
    @size = size.to_sym
    @shape = shape.to_sym
    @style = style.to_sym
    @dot = dot
    @icon = icon
    @removable = removable
    @html_options = html_options
  end

  def badge_classes
    base = "inline-flex items-center font-medium"
    color = variant_config[@style]
    size = SIZES[@size]
    shape = SHAPES[@shape]
    
    [base, color, size, shape, @html_options[:class]].compact.join(" ")
  end

  def icon_size_class
    case @size
    when :xs then "h-3 w-3"
    when :sm then "h-3.5 w-3.5"
    when :md then "h-4 w-4"
    when :lg then "h-5 w-5"
    end
  end

  def dot_size_class
    case @size
    when :xs then "h-1.5 w-1.5"
    when :sm then "h-2 w-2"
    when :md then "h-2.5 w-2.5"
    when :lg then "h-3 w-3"
    end
  end

  def remove_button_class
    base = "ml-1 inline-flex flex-shrink-0"
    
    case @style
    when :light
      color_map = {
        gray: "text-gray-400 hover:text-gray-600",
        blue: "text-blue-400 hover:text-blue-600",
        green: "text-green-400 hover:text-green-600",
        yellow: "text-yellow-400 hover:text-yellow-600",
        red: "text-red-400 hover:text-red-600",
        purple: "text-purple-400 hover:text-purple-600",
        pink: "text-pink-400 hover:text-pink-600",
        indigo: "text-indigo-400 hover:text-indigo-600",
        orange: "text-orange-400 hover:text-orange-600"
      }
      "#{base} #{color_map[@variant]}"
    when :solid
      "#{base} text-white hover:text-gray-200"
    end
  end

  private

  def variant_config
    VARIANTS[@variant] || VARIANTS[:gray]
  end
end

