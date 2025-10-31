import { Controller } from "@hotwired/stimulus"

/**
 * Chart Tooltip Controller
 * Handles show/hide tooltips on chart bars
 * Usage: data-controller="chart-tooltip" on chart container
 *        data-action="mouseenter->chart-tooltip#show mouseleave->chart-tooltip#hide" on bars
 */
export default class extends Controller {
  static targets = ["tooltip"]

  // Show tooltip on hover
  show(event) {
    const tooltip = event.currentTarget.querySelector('[data-chart-tooltip-target="tooltip"]')
    if (tooltip) {
      tooltip.classList.remove("hidden")
      tooltip.classList.add("block")
    }
  }

  // Hide tooltip when mouse leaves
  hide(event) {
    const tooltip = event.currentTarget.querySelector('[data-chart-tooltip-target="tooltip"]')
    if (tooltip) {
      tooltip.classList.remove("block")
      tooltip.classList.add("hidden")
    }
  }
}

