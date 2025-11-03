import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="spinner"
export default class extends Controller {
  static values = {
    autoShow: { type: Boolean, default: false }
  }

  connect() {
    // Only hide overlays/fullscreen spinners by default unless autoShow is true
    // Inline spinners should remain visible
    const hasOverlay = this.element.classList.contains("fixed") || this.element.classList.contains("inset-0")
    
    if (hasOverlay && !this.autoShowValue) {
      this.hide()
    } else if (this.autoShowValue) {
      this.show()
    }
    // Inline spinners without autoShow remain visible (don't hide them)

    // Listen for Turbo events on document for global events
    this.boundShow = this.show.bind(this)
    this.boundHide = this.hide.bind(this)
    
    document.addEventListener("turbo:before-fetch-request", this.boundShow)
    document.addEventListener("turbo:before-fetch-response", this.boundHide)
    document.addEventListener("turbo:frame-load", this.boundHide)
    document.addEventListener("turbo:before-stream-render", this.boundHide)
    
    // Also listen on element for element-specific events
    this.element.addEventListener("turbo:before-fetch-request", this.boundShow)
    this.element.addEventListener("turbo:before-fetch-response", this.boundHide)
  }

  disconnect() {
    // Cleanup event listeners
    document.removeEventListener("turbo:before-fetch-request", this.boundShow)
    document.removeEventListener("turbo:before-fetch-response", this.boundHide)
    document.removeEventListener("turbo:frame-load", this.boundHide)
    document.removeEventListener("turbo:before-stream-render", this.boundHide)
    
    this.element.removeEventListener("turbo:before-fetch-request", this.boundShow)
    this.element.removeEventListener("turbo:before-fetch-response", this.boundHide)
  }

  show(event) {
    if (event && event.target) {
      // For Turbo events, check if there's a form context
      const form = event.target.closest('form')
      if (form && !this.element.closest('form')?.contains(form) && !this.element.contains(form)) {
        // This event is from a different form, ignore it
        return
      }
    }
    
    if (event) {
      event.preventDefault()
    }
    
    this.element.classList.remove("hidden", "opacity-0")
    // Check if element has overlay or fullscreen classes
    const hasOverlay = this.element.classList.contains("fixed") || this.element.classList.contains("inset-0")
    this.element.style.display = hasOverlay ? "flex" : "inline-flex"
    
    // Force reflow for smooth animation
    this.element.offsetHeight
    
    // Add fade-in animation
    this.element.classList.add("transition-opacity", "duration-200", "ease-in", "opacity-100")
  }

  hide(event) {
    if (event) {
      event.preventDefault()
    }
    
    // Add fade-out animation
    this.element.classList.remove("opacity-100")
    this.element.classList.add("transition-opacity", "duration-300", "ease-out", "opacity-0")
    
    setTimeout(() => {
      this.element.classList.add("hidden")
      this.element.style.display = "none"
      this.element.classList.remove("opacity-0")
    }, 300)
  }

  toggle(event) {
    if (event) {
      event.preventDefault()
    }
    
    if (this.element.classList.contains("hidden")) {
      this.show()
    } else {
      this.hide()
    }
  }
}

