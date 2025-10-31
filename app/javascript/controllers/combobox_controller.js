import { Controller } from "@hotwired/stimulus"

// A simple, accessible combobox with search + keyboard navigation
// Usage:
// <div data-controller="combobox" data-combobox-open-value="false">
//   <input data-combobox-target="input" data-action="input->combobox#filter keydown->combobox#onKeydown focus->combobox#open" />
//   <input type="hidden" data-combobox-target="hidden" />
//   <div data-combobox-target="list" hidden>
//     <button data-combobox-target="option" data-value="user">User</button>
//     ...
//   </div>
// </div>

export default class extends Controller {
  static targets = ["input", "list", "option", "hidden"]
  static values = { open: Boolean }

  connect() {
    this.highlightIndex = -1
    this._syncListVisibility()
  }

  open() {
    this.openValue = true
    this._syncListVisibility()
  }

  close() {
    this.openValue = false
    this.highlightIndex = -1
    this._syncListVisibility()
  }

  toggle() {
    this.openValue = !this.openValue
    this._syncListVisibility()
  }

  filter() {
    const q = (this.inputTarget.value || "").toLowerCase().trim()
    this.optionTargets.forEach((opt) => {
      const label = (opt.textContent || "").toLowerCase()
      const match = label.includes(q)
      opt.classList.toggle("hidden", !match)
    })
    this.open()
  }

  onKeydown(event) {
    if (!this.openValue && ["ArrowDown", "ArrowUp", "Enter"].includes(event.key)) {
      this.open()
    }
    const visibleOptions = this._visibleOptions()
    if (event.key === "ArrowDown") {
      event.preventDefault()
      if (visibleOptions.length === 0) return
      this.highlightIndex = (this.highlightIndex + 1) % visibleOptions.length
      this._applyHighlight(visibleOptions)
    } else if (event.key === "ArrowUp") {
      event.preventDefault()
      if (visibleOptions.length === 0) return
      this.highlightIndex = (this.highlightIndex - 1 + visibleOptions.length) % visibleOptions.length
      this._applyHighlight(visibleOptions)
    } else if (event.key === "Enter") {
      if (this.highlightIndex >= 0 && this.highlightIndex < visibleOptions.length) {
        event.preventDefault()
        this._select(visibleOptions[this.highlightIndex])
      }
    } else if (event.key === "Escape") {
      this.close()
    }
  }

  clickOption(event) {
    const btn = event.currentTarget
    this._select(btn)
  }

  _select(optionEl) {
    const value = optionEl.dataset.value || optionEl.textContent.trim()
    const label = optionEl.textContent.trim()
    this.hiddenTarget.value = value
    this.inputTarget.value = label
    this.optionTargets.forEach((o) => o.setAttribute("aria-selected", (o === optionEl).toString()))
    this.close()
    this.inputTarget.dispatchEvent(new Event("change"))
  }

  _visibleOptions() {
    return this.optionTargets.filter((o) => !o.classList.contains("hidden"))
  }

  _applyHighlight(visibleOptions) {
    visibleOptions.forEach((o, idx) => {
      o.classList.toggle("bg-gray-100", idx === this.highlightIndex)
    })
    const current = visibleOptions[this.highlightIndex]
    if (current) current.scrollIntoView({ block: "nearest" })
  }

  _syncListVisibility() {
    if (!this.hasListTarget) return
    this.listTarget.hidden = !this.openValue
  }
}


