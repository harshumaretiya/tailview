import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["menu", "button", "option", "label"]

  toggle() {
    const nowHidden = this.menuTarget.classList.toggle("hidden")
    this.buttonTarget.setAttribute("aria-expanded", String(!nowHidden))
  }

  close() {
    this.menuTarget.classList.add("hidden")
    this.buttonTarget.setAttribute("aria-expanded", "false")
  }

  closeIfOutside(event) {
    if (this.menuTarget.classList.contains("hidden")) return
    if (this.element.contains(event.target)) return
    this.close()
  }

  handleKeydown(event) {
    if (event.key === "Escape" && !this.menuTarget.classList.contains("hidden")) {
      this.close()
    }
  }

  select(event) {
    event.preventDefault()
    const selectedOption = event.currentTarget
    const label = selectedOption.textContent.trim()

    // Update all option styles
    this.optionTargets.forEach((option) => {
      option.classList.toggle("font-medium", option === selectedOption)
      option.classList.toggle("text-gray-900", option === selectedOption)
      option.classList.toggle("text-gray-500", option !== selectedOption)
    })

    // Update button label
    this.labelTarget.textContent = label
    this.close()
  }
}
