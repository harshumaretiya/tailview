import { Controller } from "@hotwired/stimulus"

// Copies the provided URL to the clipboard and briefly shows a tooltip
export default class extends Controller {
  static targets = ["tooltip"]
  static values = {
    url: String,
    timeout: { type: Number, default: 2000 }
  }

  copy(event) {
    event.preventDefault()

    if (!this.hasUrlValue) return

    const textToCopy = this.urlValue

    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(textToCopy)
        .then(() => this.showTooltip())
        .catch(() => this.fallbackCopy(textToCopy))
    } else {
      this.fallbackCopy(textToCopy)
    }
  }

  fallbackCopy(text) {
    const textarea = document.createElement("textarea")
    textarea.value = text
    textarea.setAttribute("readonly", "")
    textarea.style.position = "absolute"
    textarea.style.left = "-9999px"
    document.body.appendChild(textarea)
    textarea.select()

    try {
      document.execCommand("copy")
      this.showTooltip()
    } catch (error) {
      console.error("Failed to copy text", error)
    }

    document.body.removeChild(textarea)
  }

  showTooltip() {
    if (!this.hasTooltipTarget) return

    this.tooltipTarget.classList.remove("opacity-0")
    this.tooltipTarget.classList.add("opacity-100")

    clearTimeout(this.hideTimeout)
    this.hideTimeout = setTimeout(() => this.hideTooltip(), this.timeoutValue)
  }

  hideTooltip() {
    if (!this.hasTooltipTarget) return

    this.tooltipTarget.classList.add("opacity-0")
    this.tooltipTarget.classList.remove("opacity-100")
  }
}
