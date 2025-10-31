import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["panel", "count", "icon"]

  connect() {
    this.recount()
  }

  toggle(event) {
    const isHidden = this.panelTarget.classList.toggle("hidden")
    event.currentTarget.setAttribute("aria-expanded", String(!isHidden))
    this.iconTarget?.classList.toggle("rotate-180", !isHidden)
  }

  clear() {
    this.panelTarget.querySelectorAll('input[type="checkbox"]').forEach((cb) => {
      cb.checked = false
    })
    this.recount()
  }

  recount() {
    const count = this.panelTarget.querySelectorAll('input[type="checkbox"]:checked').length
    this.countTarget.textContent = `${count} ${count === 1 ? "Filter" : "Filters"}`
  }
}
