# frozen_string_literal: true

require "test_helper"

class AlertComponentTest < ViewComponent::TestCase
  test "renders basic success alert" do
    render_inline(AlertComponent.new(variant: :success, message: "Success message"))

    assert_selector ".bg-green-50.border.border-green-200"
    assert_text "Success message"
  end

  test "renders error alert" do
    render_inline(AlertComponent.new(variant: :error, message: "Error message"))

    assert_selector ".bg-red-50.border.border-red-200"
    assert_text "Error message"
  end

  test "renders warning alert" do
    render_inline(AlertComponent.new(variant: :warning, message: "Warning message"))

    assert_selector ".bg-yellow-50.border.border-yellow-200"
    assert_text "Warning message"
  end

  test "renders info alert" do
    render_inline(AlertComponent.new(variant: :info, message: "Info message"))

    assert_selector ".bg-blue-50.border.border-blue-200"
    assert_text "Info message"
  end

  test "renders with title" do
    render_inline(AlertComponent.new(
      variant: :success,
      title: "Success Title",
      message: "Success message"
    ))

    assert_selector "h3", text: "Success Title"
    assert_text "Success message"
  end

  test "renders with title only" do
    render_inline(AlertComponent.new(variant: :info, title: "Just a Title"))

    assert_selector "h3", text: "Just a Title"
  end

  test "renders dismissible alert" do
    render_inline(AlertComponent.new(
      variant: :info,
      message: "Dismissible message",
      dismissible: true
    ))

    assert_selector "button[data-action='click->alert#dismiss']"
    assert_selector ".flex-1" # dismissible alerts use flex-1 class
  end

  test "renders compact alert" do
    render_inline(AlertComponent.new(
      variant: :success,
      message: "Compact message",
      compact: true
    ))

    assert_selector ".border-l-4.border-green-400.p-3"
    assert_text "Compact message"
  end

  test "renders alert without icon" do
    render_inline(AlertComponent.new(
      variant: :info,
      message: "No icon",
      show_icon: false
    ))

    assert_no_selector "svg"
    assert_text "No icon"
  end

  test "compact alert does not show icon" do
    render_inline(AlertComponent.new(
      variant: :success,
      message: "Compact",
      compact: true,
      show_icon: true # should be ignored
    ))

    assert_no_selector "svg"
  end

  test "renders alert with list items" do
    render_inline(AlertComponent.new(
      variant: :error,
      title: "Errors occurred",
      list_items: ["Error 1", "Error 2", "Error 3"]
    ))

    assert_selector "h3", text: "Errors occurred"
    assert_selector "ul.list-disc"
    assert_selector "li", text: "Error 1"
    assert_selector "li", text: "Error 2"
    assert_selector "li", text: "Error 3"
  end

  test "renders alert with block content" do
    render_inline(AlertComponent.new(variant: :warning, title: "Warning")) do
      "<p>Custom content</p>".html_safe
    end

    assert_selector "h3", text: "Warning"
    assert_selector "p", text: "Custom content"
  end

  test "renders alert with custom class" do
    render_inline(AlertComponent.new(
      variant: :info,
      message: "Custom class",
      class: "custom-class mb-4"
    ))

    assert_selector ".custom-class.mb-4"
  end

  test "defaults to info variant for unknown variant" do
    render_inline(AlertComponent.new(variant: :unknown, message: "Test"))

    # Should fall back to info variant (blue)
    assert_selector ".bg-blue-50.border.border-blue-200"
  end

  test "renders with message only (no title)" do
    render_inline(AlertComponent.new(variant: :success, message: "Just a message"))

    assert_no_selector "h3"
    assert_text "Just a message"
  end

  test "renders icon with correct path for each variant" do
    # Success icon
    render_inline(AlertComponent.new(variant: :success, message: "Test"))
    assert_selector "svg path[d*='M10 18a8 8 0 100-16']"

    # Error icon
    render_inline(AlertComponent.new(variant: :error, message: "Test"))
    assert_selector "svg path[d*='M10 18a8 8 0 100-16']"

    # Warning icon
    render_inline(AlertComponent.new(variant: :warning, message: "Test"))
    assert_selector "svg path[d*='M8.257 3.099c.765-1.36']"

    # Info icon
    render_inline(AlertComponent.new(variant: :info, message: "Test"))
    assert_selector "svg path[d*='M18 10a8 8 0 11-16 0']"
  end

  test "applies correct text colors for each variant" do
    # Success
    render_inline(AlertComponent.new(variant: :success, title: "Title", message: "Message"))
    assert_selector ".text-green-800", text: "Title"
    assert_selector ".text-green-700", text: "Message"

    # Error
    render_inline(AlertComponent.new(variant: :error, title: "Title", message: "Message"))
    assert_selector ".text-red-800", text: "Title"
    assert_selector ".text-red-700", text: "Message"

    # Warning
    render_inline(AlertComponent.new(variant: :warning, title: "Title", message: "Message"))
    assert_selector ".text-yellow-800", text: "Title"
    assert_selector ".text-yellow-700", text: "Message"

    # Info
    render_inline(AlertComponent.new(variant: :info, title: "Title", message: "Message"))
    assert_selector ".text-blue-800", text: "Title"
    assert_selector ".text-blue-700", text: "Message"
  end

  test "dismissible button has sr-only text" do
    render_inline(AlertComponent.new(
      variant: :info,
      message: "Test",
      dismissible: true
    ))

    assert_selector ".sr-only", text: "Dismiss"
  end
end

