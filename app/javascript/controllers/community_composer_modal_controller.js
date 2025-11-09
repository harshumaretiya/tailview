import { Controller } from "@hotwired/stimulus"

// Simplified modal using native <dialog> element
export default class extends Controller {
  static targets = ["dialog"]

  connect() {
    this.handleComposerSubmitted = this.handleComposerSubmitted.bind(this)
    window.addEventListener("community-composer:submitted", this.handleComposerSubmitted)
  }

  disconnect() {
    window.removeEventListener("community-composer:submitted", this.handleComposerSubmitted)
  }

  open(event) {
    event?.preventDefault()
    if (!this.hasDialogTarget) return

    this.dialogTarget.showModal()
    this.focusComposer()
  }

  close(event) {
    event?.preventDefault()
    if (!this.hasDialogTarget) return
    
    this.dialogTarget.close()
  }

  closeOnBackdrop(event) {
    // Close when clicking on backdrop (outside the dialog content)
    if (event.target === this.dialogTarget) {
      this.dialogTarget.close()
    }
  }

  handleComposerSubmitted() {
    if (this.hasDialogTarget) {
      this.dialogTarget.close()
    }
  }

  focusComposer() {
    requestAnimationFrame(() => {
      const field = this.dialogTarget.querySelector("[data-community-composer-target='title']")
      field?.focus()
    })
  }
}

