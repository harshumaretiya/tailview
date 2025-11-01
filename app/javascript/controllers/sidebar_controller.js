import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="sidebar"
// Used for mobile sidebar navigation
export default class extends Controller {
  static targets = ["dialog", "panel", "backdrop", "closeButton"]
  static values = {
    open: { type: Boolean, default: false }
  }

  connect() {
    this._open = this.openValue
    this._applyState()
  }

  open(event) {
    if (event) event.preventDefault()
    this._open = true
    this.openValue = true
    this._applyState()
    // Prevent body scroll when sidebar is open
    document.body.style.overflow = 'hidden'
  }

  close(event) {
    if (event) event.preventDefault()
    this._open = false
    this.openValue = false
    this._applyState()
    // Restore body scroll
    document.body.style.overflow = ''
  }

  toggle(event) {
    if (event) event.preventDefault()
    this._open ? this.close() : this.open()
  }

  backdrop(event) {
    if (event && event.target === this.backdropTarget) {
      this.close()
    }
  }

  onKeydown(event) {
    if (!this._open) return
    if (event.key === "Escape") {
      event.preventDefault()
      this.close()
    }
  }

  _applyState() {
    const dialog = this.hasDialogTarget ? this.dialogTarget : null
    const panel = this.hasPanelTarget ? this.panelTarget : null
    const backdrop = this.hasBackdropTarget ? this.backdropTarget : null
    const closeButton = this.hasCloseButtonTarget ? this.closeButtonTarget : null

    if (dialog) {
      if (this._open) {
        dialog.classList.remove("hidden")
        if (typeof dialog.showModal === 'function') {
          dialog.showModal()
        }
      } else {
        if (typeof dialog.close === 'function') {
          dialog.close()
        }
        // Wait for transition before hiding
        setTimeout(() => {
          if (!this._open) {
            dialog.classList.add("hidden")
          }
        }, 300)
      }
    }

    if (panel) {
      if (this._open) {
        panel.classList.remove("-translate-x-full", "opacity-0")
        panel.classList.add("translate-x-0", "opacity-100")
      } else {
        panel.classList.remove("translate-x-0", "opacity-100")
        panel.classList.add("-translate-x-full", "opacity-0")
      }
    }

    if (backdrop) {
      if (this._open) {
        backdrop.classList.remove("opacity-0")
        backdrop.classList.add("opacity-100")
      } else {
        backdrop.classList.remove("opacity-100")
        backdrop.classList.add("opacity-0")
      }
    }

    if (closeButton) {
      if (this._open) {
        closeButton.classList.remove("opacity-0")
        closeButton.classList.add("opacity-100")
      } else {
        closeButton.classList.remove("opacity-100")
        closeButton.classList.add("opacity-0")
      }
    }
  }
}

