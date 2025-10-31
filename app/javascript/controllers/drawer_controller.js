import { Controller } from "@hotwired/stimulus"

// data-controller="drawer"
// data-drawer-target="panel overlay"
// data-action="click->drawer#backdrop keydown@window->drawer#onKeydown"
// Use data attributes: data-drawer-open-class (optional), data-drawer-closed-class (optional)

export default class extends Controller {
  static targets = ["panel", "overlay", "dialogContainer", "closeButtonContainer"]
  static values = {
    open: { type: Boolean, default: false },
    trapFocus: { type: Boolean, default: true }
  }

  connect() {
    this._openClass = this.data.get("openClass") || "translate-x-0"
    this._closedClass = this.data.get("closedClass") || "translate-x-full"
    this._active = this.openValue
    this._previousActiveElement = null
    this._applyState(false)
  }

  open(event) {
    if (event) event.preventDefault()
    if (this._active) return
    this._previousActiveElement = document.activeElement
    this._active = true
    this.openValue = true
    this._applyState(true)
    this._focusFirstElement()
  }

  close(event) {
    if (event) event.preventDefault()
    if (!this._active) return
    this._active = false
    this.openValue = false
    this._applyState(true)
    if (this._previousActiveElement) this._previousActiveElement.focus?.()
  }

  toggle(event) {
    if (event) event.preventDefault()
    this._active ? this.close() : this.open()
  }

  backdrop(event) {
    if (event && event.target === this.overlayTarget) {
      this.close()
    }
  }

  onKeydown(event) {
    if (!this._active) return
    if (event.key === "Escape") {
      event.preventDefault()
      this.close()
    } else if (this.trapFocusValue && event.key === "Tab") {
      this._handleFocusTrap(event)
    }
  }

  _applyState(animate) {
    const panel = this.panelTarget
    const overlay = this.hasOverlayTarget ? this.overlayTarget : null
    const dialogContainer = this.hasDialogContainerTarget ? this.dialogContainerTarget : null
    const closeButtonContainer = this.hasCloseButtonContainerTarget ? this.closeButtonContainerTarget : null
    const isOpen = this._active

    // Handle dialog container visibility (if present)
    if (dialogContainer) {
      if (isOpen) {
        dialogContainer.classList.remove("hidden")
      } else {
        if (!animate) {
          dialogContainer.classList.add("hidden")
        } else {
          const handleTransitionEnd = () => {
            if (!this._active) {
              dialogContainer.classList.add("hidden")
              dialogContainer.removeEventListener("transitionend", handleTransitionEnd)
            }
          }
          dialogContainer.addEventListener("transitionend", handleTransitionEnd, { once: true })
        }
      }
    }

    // Handle panel visibility
    if (isOpen) {
      panel.classList.remove("hidden")
      panel.classList.add(this._openClass)
      panel.classList.remove(this._closedClass)
    } else {
      panel.classList.add(this._closedClass)
      panel.classList.remove(this._openClass)
      // Only hide after transition completes if we're animating
      if (!animate) {
        panel.classList.add("hidden")
      } else {
        // Wait for transition to complete before hiding
        const handleTransitionEnd = () => {
          if (!this._active) {
            panel.classList.add("hidden")
            panel.removeEventListener("transitionend", handleTransitionEnd)
          }
        }
        panel.addEventListener("transitionend", handleTransitionEnd, { once: true })
      }
    }

    // Handle close button container visibility (if present)
    if (closeButtonContainer) {
      if (isOpen) {
        closeButtonContainer.classList.remove("opacity-0")
        closeButtonContainer.classList.add("opacity-100")
      } else {
        closeButtonContainer.classList.remove("opacity-100")
        closeButtonContainer.classList.add("opacity-0")
      }
    }

    // Handle overlay/backdrop
    if (overlay) {
      if (isOpen) {
        overlay.classList.remove("hidden", "opacity-0", "pointer-events-none")
        overlay.classList.add("opacity-100", "pointer-events-auto")
      } else {
        overlay.classList.remove("opacity-100", "pointer-events-auto")
        overlay.classList.add("opacity-0", "pointer-events-none")
        // Hide after transition
        if (!animate) {
          overlay.classList.add("hidden")
        } else {
          const handleTransitionEnd = () => {
            if (!this._active) {
              overlay.classList.add("hidden")
              overlay.removeEventListener("transitionend", handleTransitionEnd)
            }
          }
          overlay.addEventListener("transitionend", handleTransitionEnd, { once: true })
        }
      }
    }

    panel.setAttribute("aria-hidden", (!isOpen).toString())
  }

  _focusFirstElement() {
    if (!this.trapFocusValue) return
    const focusable = this._focusableElements()
    focusable[0]?.focus?.()
  }

  _handleFocusTrap(event) {
    const focusable = this._focusableElements()
    if (focusable.length === 0) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  _focusableElements() {
    return Array.from(this.panelTarget.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    )).filter(el => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden"))
  }
}


