import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = {
    delay: { type: Number, default: 300 }
  }

  initialize() {
    this.timeout = null
  }

  search(event) {
    clearTimeout(this.timeout)
    
    this.timeout = setTimeout(() => {
      // Submit the form
      const form = event.target.closest("form")
      if (form) {
        form.requestSubmit()
      }
    }, this.delayValue)
  }

  disconnect() {
    clearTimeout(this.timeout)
  }
}

