import { Controller } from "@hotwired/stimulus"

/**
 * User Filter Controller
 * Handles filtering and showing/hiding user growth bars
 * Usage: data-controller="user-filter"
 * 
 * Filters: 'all', 'new', 'returning', 'churned'
 */
export default class extends Controller {
  static targets = [
    "allButton", "newButton", "returningButton", "churnedButton",
    "newBar", "returningBar", "churnedBar",
    "newValue", "returningValue", "churnedValue",
    "newProgress", "returningProgress", "churnedProgress",
    "tooltip", "total"
  ]

  // Bar configuration mapping
  static barTypes = ['new', 'returning', 'churned']

  connect() {
    this.activeFilter = "all"
    this.storeOriginalValues()
  }

  // Store original values on connect
  storeOriginalValues() {
    this.originalValues = {}
    this.barTypes.forEach(type => {
      const valueTarget = this[`${type}ValueTarget`]
      if (valueTarget) {
        this.originalValues[type] = parseInt(valueTarget.textContent)
      }
    })
    this.originalTotal = parseInt(this.totalTarget.textContent)
  }

  // Filter methods - dynamically called based on button action
  showAll() {
    this.applyFilter('all', this.barTypes)
  }

  filterNew() {
    this.applyFilter('new', ['new'])
  }

  filterReturning() {
    this.applyFilter('returning', ['returning'])
  }

  filterChurned() {
    this.applyFilter('churned', ['churned'])
  }

  // Generic filter application method
  applyFilter(filter, visibleBars) {
    this.setActiveButton(filter)
    
    // Show/hide bars
    this.barTypes.forEach(type => {
      const barTarget = this[`${type}BarTarget`]
      if (visibleBars.includes(type)) {
        this.showBar(barTarget)
      } else {
        this.hideBar(barTarget)
      }
    })

    // Update total based on filter
    if (filter === 'all') {
      this.totalTarget.textContent = this.originalTotal
    } else {
      this.totalTarget.textContent = this.originalValues[filter] || 0
    }
  }

  // Tooltip methods
  showTooltip(event) {
    const tooltip = event.currentTarget.querySelector('[data-user-filter-target="tooltip"]')
    if (tooltip) tooltip.classList.remove("hidden")
  }

  hideTooltip(event) {
    const tooltip = event.currentTarget.querySelector('[data-user-filter-target="tooltip"]')
    if (tooltip) tooltip.classList.add("hidden")
  }

  // Set active button styling
  setActiveButton(filter) {
    const buttons = {
      all: this.allButtonTarget,
      new: this.newButtonTarget,
      returning: this.returningButtonTarget,
      churned: this.churnedButtonTarget
    }

    // Reset all buttons
    Object.values(buttons).forEach(btn => {
      if (btn) {
        btn.classList.remove("bg-white", "text-blue-600", "shadow-sm")
        btn.classList.add("text-gray-600")
      }
    })

    // Activate selected button
    if (buttons[filter]) {
      buttons[filter].classList.remove("text-gray-600")
      buttons[filter].classList.add("bg-white", "text-blue-600", "shadow-sm")
    }

    this.activeFilter = filter
  }

  // Show bar with animation
  showBar(bar) {
    if (!bar) return
    bar.classList.remove("hidden")
    requestAnimationFrame(() => {
      bar.classList.remove("opacity-0")
      bar.classList.add("opacity-100")
    })
  }

  // Hide bar with animation
  hideBar(bar) {
    if (!bar) return
    bar.classList.remove("opacity-100")
    bar.classList.add("opacity-0")
    setTimeout(() => {
      if (bar.classList.contains("opacity-0")) {
        bar.classList.add("hidden")
      }
    }, 300) // Match transition duration
  }
}

