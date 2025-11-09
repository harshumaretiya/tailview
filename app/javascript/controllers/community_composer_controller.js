import { Controller } from "@hotwired/stimulus"

// Simplified composer - just handles form submission and reset
export default class extends Controller {
  handleSubmitEnd(event) {
    if (!event.detail.success) return

    this.element.reset()
    window.dispatchEvent(new CustomEvent("community-composer:submitted"))
  }

  resetDraft(event) {
    event.preventDefault()
    this.element.reset()
  }
}

