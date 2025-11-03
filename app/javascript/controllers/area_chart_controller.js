import { Controller } from "@hotwired/stimulus"

/**
 * Area Chart Controller
 * Handles interactive area charts with tooltips, legends, and smooth animations
 * 
 * Features:
 * - SVG-based area charts with smooth curves
 * - Interactive tooltips on hover
 * - Legend toggle functionality
 * - Smooth animations on load
 * - Responsive canvas calculations
 * - Multiple data series support
 * 
 * Usage: data-controller="area-chart"
 */
export default class extends Controller {
  // Only include targets that are actually used
  static targets = [
    "canvas",                    // SVG element for coordinate calculations
    "tooltipContainer",          // Single tooltip container
    "tooltipLabel",              // Tooltip label element
    "tooltipValue",              // Tooltip value element
    "tooltipPrevious",           // Optional: for comparison charts
    "point",                     // Point groups (for animations)
    "pointCircle",               // Individual point circles
    "pulse",                     // Pulse effect circles
    "legendItem",                // Legend toggle items
    "desktopArea",               // Stacked chart areas
    "mobileArea",
    "tabletArea"
  ]
  
  static values = {
    data: Array,
    animated: { type: Boolean, default: true },
    tooltipOffsetX: { type: Number, default: 60 },  // Tooltip horizontal offset
    tooltipOffsetY: { type: Number, default: 100 }  // Tooltip vertical offset
  }

  // Constants for point animations
  static POINT_SIZES = {
    default: { r: 5, strokeWidth: 3 },
    hover: { r: 7, strokeWidth: 4 }
  }

  static PULSE_SIZES = {
    default: { r: 10, opacity: 0 },
    hover: { r: 12, opacity: 0.2 }
  }

  static ANIMATION_DELAYS = {
    hide: 100,      // Delay before hiding tooltip (prevents flicker)
    fadeOut: 200   // Fade out duration
  }

  connect() {
    this.activeDataSets = new Set()
    this.hoveredPoint = null
    this.isHovering = false
    this.hideTimeout = null
    
    // Initialize all legends as active (for stacked charts)
    if (this.hasLegendItemTarget) {
      this.legendItemTargets.forEach(item => {
        const dataset = item.dataset.dataset
        if (dataset) {
          this.activeDataSets.add(dataset)
        }
      })
    }

    // Subtle entrance animations if enabled
    if (this.animatedValue) {
      // Delay to allow initial render
      requestAnimationFrame(() => this.animateIn())
    }
  }

  // Show tooltip on point hover
  showTooltip(event) {
    if (!this.hasTooltipContainerTarget || !this.hasCanvasTarget) return
    
    const pointGroup = event.currentTarget
    const circle = pointGroup.querySelector('circle[data-area-chart-target="pointCircle"]')
    if (!circle) return
    
    // Clear any pending hide timeout
    this.clearHideTimeout()
    
    this.isHovering = true
    
    // Update tooltip content
    this.updateTooltipContent(pointGroup)
    
    // Calculate and position tooltip
    const position = this.calculateTooltipPosition(circle)
    this.positionTooltip(position.x, position.y)
    
    // Animate point on hover
    this.animatePointHover(pointGroup)
    
    this.hoveredPoint = pointGroup
  }

  // Update tooltip text content
  updateTooltipContent(pointGroup) {
    const { label, value, previous } = pointGroup.dataset
    
    if (this.hasTooltipLabelTarget && label) {
      this.tooltipLabelTarget.textContent = label
    }
    if (this.hasTooltipValueTarget && value) {
      this.tooltipValueTarget.textContent = value
    }
    if (this.hasTooltipPreviousTarget && previous) {
      this.tooltipPreviousTarget.textContent = previous
    }
  }

  // Calculate tooltip position from SVG coordinates to viewport pixels
  calculateTooltipPosition(circle) {
    const svg = this.canvasTarget
    const svgRect = svg.getBoundingClientRect()
    const viewBox = svg.viewBox.baseVal
    
    const cx = parseFloat(circle.getAttribute('cx'))
    const cy = parseFloat(circle.getAttribute('cy'))
    
    // Scale SVG coordinates to viewport
    const scaleX = svgRect.width / viewBox.width
    const scaleY = svgRect.height / viewBox.height
    
    return {
      x: (cx * scaleX) - this.tooltipOffsetXValue,
      y: (cy * scaleY) - this.tooltipOffsetYValue
    }
  }

  // Position tooltip at calculated coordinates
  positionTooltip(x, y) {
    this.tooltipContainerTarget.style.transform = `translate(${x}px, ${y}px)`
    this.tooltipContainerTarget.classList.remove('hidden', 'opacity-0')
    this.tooltipContainerTarget.classList.add('opacity-100')
  }

  // Animate point elements on hover
  animatePointHover(pointGroup) {
    const pulse = pointGroup.querySelector('[data-area-chart-target="pulse"]')
    const circle = pointGroup.querySelector('circle[data-area-chart-target="pointCircle"]')
    
    if (pulse) {
      pulse.setAttribute('opacity', this.constructor.PULSE_SIZES.hover.opacity)
      pulse.setAttribute('r', this.constructor.PULSE_SIZES.hover.r)
    }
    
    if (circle) {
      circle.setAttribute('r', this.constructor.POINT_SIZES.hover.r)
      circle.setAttribute('stroke-width', this.constructor.POINT_SIZES.hover.strokeWidth)
    }
  }

  // Reset point animation to default state
  resetPointAnimation(pointGroup) {
    const pulse = pointGroup.querySelector('[data-area-chart-target="pulse"]')
    const circle = pointGroup.querySelector('circle[data-area-chart-target="pointCircle"]')
    
    if (pulse) {
      pulse.setAttribute('opacity', this.constructor.PULSE_SIZES.default.opacity)
      pulse.setAttribute('r', this.constructor.PULSE_SIZES.default.r)
    }
    
    if (circle) {
      circle.setAttribute('r', this.constructor.POINT_SIZES.default.r)
      circle.setAttribute('stroke-width', this.constructor.POINT_SIZES.default.strokeWidth)
    }
  }

  // Clear hide timeout if exists
  clearHideTimeout() {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout)
      this.hideTimeout = null
    }
  }

  // Hide tooltip when mouse leaves
  hideTooltip(event) {
    if (!this.hasTooltipContainerTarget) return
    
    const pointGroup = event.currentTarget
    this.isHovering = false
    
    // Debounce hiding to prevent flickering
    this.hideTimeout = setTimeout(() => {
      if (this.isHovering) return // Cancel if mouse re-entered
      
      this.hideTooltipWithAnimation()
      this.resetPointAnimation(pointGroup)
      
      if (this.hoveredPoint === pointGroup) {
        this.hoveredPoint = null
      }
    }, this.constructor.ANIMATION_DELAYS.hide)
  }

  // Hide tooltip with fade animation
  hideTooltipWithAnimation() {
    this.tooltipContainerTarget.classList.remove('opacity-100')
    this.tooltipContainerTarget.classList.add('opacity-0')
    
    setTimeout(() => {
      if (!this.isHovering) {
        this.tooltipContainerTarget.classList.add('hidden')
      }
    }, this.constructor.ANIMATION_DELAYS.fadeOut)
  }

  // Toggle legend item and associated data
  toggleLegend(event) {
    const legendItem = event.currentTarget
    const dataset = legendItem.dataset.dataset
    
    if (!dataset) return

    const isActive = this.activeDataSets.has(dataset)
    
    if (isActive) {
      // Don't allow hiding the last active dataset
      if (this.activeDataSets.size <= 1) return
      
      this.activeDataSets.delete(dataset)
      this.deactivateLegend(legendItem)
      this.hideDataset(dataset)
    } else {
      this.activeDataSets.add(dataset)
      this.activateLegend(legendItem)
      this.showDataset(dataset)
    }
  }

  // Activate legend item styling
  activateLegend(item) {
    item.classList.remove("opacity-50")
    item.classList.add("opacity-100")
    
    const indicator = item.querySelector(".legend-indicator")
    if (indicator) {
      indicator.classList.remove("opacity-30")
      indicator.classList.add("opacity-100")
    }
  }

  // Deactivate legend item styling
  deactivateLegend(item) {
    item.classList.remove("opacity-100")
    item.classList.add("opacity-50")
    
    const indicator = item.querySelector(".legend-indicator")
    if (indicator) {
      indicator.classList.remove("opacity-100")
      indicator.classList.add("opacity-30")
    }
  }

  // Toggle dataset visibility (for stacked charts)
  hideDataset(dataset) {
    const areaTarget = this[`${dataset}AreaTarget`]
    if (areaTarget) {
      areaTarget.style.opacity = "0"
      areaTarget.style.pointerEvents = "none"
    }
  }

  showDataset(dataset) {
    const areaTarget = this[`${dataset}AreaTarget`]
    if (areaTarget) {
      areaTarget.style.opacity = "1"
      areaTarget.style.pointerEvents = "auto"
    }
  }

  // Animate chart elements on initial load (subtle entrance effect)
  animateIn() {
    // Animate points with stagger (if present)
    if (this.hasPointTarget) {
      this.pointTargets.forEach((point, index) => {
        const circles = point.querySelectorAll('circle')
        circles.forEach(circle => {
          circle.style.opacity = "0"
          circle.style.transform = "scale(0)"
        })
        
        setTimeout(() => {
          circles.forEach(circle => {
            circle.style.transition = "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)"
            circle.style.opacity = "1"
            circle.style.transform = "scale(1)"
          })
        }, 300 + (index * 50))
      })
    }
  }

  // Export chart data as CSV
  exportData() {
    if (!this.dataValue || this.dataValue.length === 0) return

    let csv = "Label,Value\n"
    this.dataValue.forEach(point => {
      csv += `${point.label},${point.value}\n`
    })

    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `chart-data-${Date.now()}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }


  disconnect() {
    // Cleanup all resources
    this.clearHideTimeout()
    this.activeDataSets.clear()
    this.hoveredPoint = null
    this.isHovering = false
  }
}

