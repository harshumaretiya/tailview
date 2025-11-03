import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="popover"
// Handles popover menus that appear on hover/focus
export default class extends Controller {
  static targets = ["panel", "trigger"]
  static values = {
    open: { type: Boolean, default: false }
  }

  connect() {
    this._open = this.openValue
    this._applyState(false)
    
    // Close when clicking outside
    this._boundCloseIfOutside = this.closeIfOutside.bind(this)
    document.addEventListener("click", this._boundCloseIfOutside, true)
    
    // Close on escape
    this._boundHandleKeydown = this.handleKeydown.bind(this)
    document.addEventListener("keydown", this._boundHandleKeydown)
  }

  disconnect() {
    document.removeEventListener("click", this._boundCloseIfOutside, true)
    document.removeEventListener("keydown", this._boundHandleKeydown)
  }

  open(event) {
    if (event) {
      event.preventDefault()
      event.stopPropagation()
    }
    if (this._open) return
    
    // Close other popovers in the same group
    this._closeOtherPopovers()
    
    this._open = true
    this.openValue = true
    this._applyState(true)
  }
  
  _closeOtherPopovers() {
    // Find all popover controllers and close them (except this one)
    const popoverElements = document.querySelectorAll('[data-controller*="popover"]')
    popoverElements.forEach(element => {
      if (element === this.element) return
      
      // Try to get the controller for this element
      const controller = this.application.getControllerForElementAndIdentifier(element, 'popover')
      if (controller && controller._open && controller !== this) {
        controller.close()
      }
    })
  }

  close(event) {
    if (event) {
      event.preventDefault()
      event.stopPropagation()
    }
    if (!this._open) return
    this._open = false
    this.openValue = false
    this._applyState(true)
  }

  toggle(event) {
    if (event) {
      event.preventDefault()
      event.stopPropagation()
    }
    this._open ? this.close() : this.open()
  }

  // Close when clicking outside the popover
  closeIfOutside(event) {
    if (!this._open) return
    if (this.element.contains(event.target)) return
    this.close()
  }

  // Handle escape key
  handleKeydown(event) {
    if (event.key === "Escape" && this._open) {
      this.close(event)
    }
  }

  // Hover handlers for desktop
  handleMouseEnter() {
    if (window.innerWidth >= 1024) { // lg breakpoint
      this.open()
    }
  }

  handleMouseLeave() {
    if (window.innerWidth >= 1024) {
      // Small delay to allow moving to the panel
      setTimeout(() => {
        if (!this.panelTarget.matches(":hover") && !this.triggerTarget.matches(":hover")) {
          this.close()
        }
      }, 100)
    }
  }

  panelMouseEnter() {
    if (window.innerWidth >= 1024 && !this._open) {
      this.open()
    }
  }

  panelMouseLeave() {
    if (window.innerWidth >= 1024) {
      this.close()
    }
  }

  _applyState(animate) {
    const panel = this.panelTarget
    const trigger = this.hasTriggerTarget ? this.triggerTarget : null
    const isOpen = this._open

    if (isOpen) {
      // Position the panel
      if (trigger) {
        const rect = trigger.getBoundingClientRect()
        const panelRect = panel.getBoundingClientRect()
        // Position below the trigger
        panel.style.top = `${rect.bottom}px`
        panel.style.left = '0'
        panel.style.right = '0'
        panel.style.position = 'fixed'
      }

      panel.classList.remove("hidden", "opacity-0", "pointer-events-none")
      panel.classList.add("block", "opacity-100", "pointer-events-auto")
      
      // Update trigger styles for active state
      if (trigger) {
        trigger.classList.add("text-indigo-600")
        const underline = trigger.querySelector("span[aria-hidden='true']")
        if (underline) {
          underline.classList.add("bg-indigo-600")
        }
      }
    } else {
      panel.classList.remove("block", "opacity-100", "pointer-events-auto")
      panel.classList.add("opacity-0", "pointer-events-none")
      
      // Update trigger styles for inactive state
      if (trigger) {
        trigger.classList.remove("text-indigo-600")
        const underline = trigger.querySelector("span[aria-hidden='true']")
        if (underline) {
          underline.classList.remove("bg-indigo-600")
        }
      }
      
      if (!animate) {
        panel.classList.add("hidden")
      } else {
        // Hide after transition
        const handleTransitionEnd = () => {
          if (!this._open) {
            panel.classList.add("hidden")
            panel.removeEventListener("transitionend", handleTransitionEnd)
          }
        }
        panel.addEventListener("transitionend", handleTransitionEnd, { once: true })
      }
    }

    // Update ARIA attributes
    if (trigger) {
      trigger.setAttribute("aria-expanded", String(isOpen))
    }
    panel.setAttribute("aria-hidden", String(!isOpen))
  }
}

