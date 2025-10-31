import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["input", "form"]

  connect() {
    this.timeoutId = null
  }

  inputChanged() {
    clearTimeout(this.timeoutId)
    this.timeoutId = setTimeout(() => {
      this.formTarget.requestSubmit()
    }, 250)
  }
}


