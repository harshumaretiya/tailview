import { Controller } from "@hotwired/stimulus"

// Simplified accordion using native <details> - only manages "close others when one opens"
export default class extends Controller {
  toggle(event) {
    const details = event.target.closest("details")
    
    if (details?.open) {
      // Close all other details elements
      this.element.querySelectorAll("details[open]").forEach(el => {
        if (el !== details) el.open = false
      })
    }
  }
}

