import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = {
    duration: { type: Number, default: 2400 }
  }

  connect() {
    this.highlightClasses = ["ring-4", "ring-rose-300", "ring-opacity-60", "ring-offset-2", "shadow-lg"]
    this.element.classList.add(...this.highlightClasses)

    if (this.shouldScrollIntoView()) {
      this.element.scrollIntoView({ behavior: "smooth", block: "start" })
    }

    this.timeout = setTimeout(() => {
      this.element.classList.remove(...this.highlightClasses)
    }, this.durationValue)
  }

  disconnect() {
    clearTimeout(this.timeout)
  }

  shouldScrollIntoView() {
    const rect = this.element.getBoundingClientRect()
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight
    return rect.top < 0 || rect.bottom > viewportHeight
  }
}

