import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="alert"
export default class extends Controller {
  static values = {
    autoDismiss: { type: Boolean, default: false },
    dismissAfter: { type: Number, default: 5000 }
  }

  connect() {
    if (this.autoDismissValue) {
      this.startAutoDismiss()
    }
  }

  disconnect() {
    this.clearAutoDismiss()
  }

  dismiss(event) {
    if (event) {
      event.preventDefault()
    }

    this.clearAutoDismiss()
    
    this.element.classList.add('transition-all', 'duration-300', 'ease-out', 'opacity-0', '-translate-y-2')

    setTimeout(() => {
      this.element.remove()
    }, 300)
  }

  startAutoDismiss() {
    this.timeout = setTimeout(() => {
      this.dismiss()
    }, this.dismissAfterValue)
  }

  clearAutoDismiss() {
    if (this.timeout) {
      clearTimeout(this.timeout)
      this.timeout = null
    }
  }
}

