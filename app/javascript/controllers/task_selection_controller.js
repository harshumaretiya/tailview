import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["checkbox", "selectAll", "count", "tbody"]

  connect() {
    this.updateCount()
  }

  toggleAll(event) {
    const isChecked = event.target.checked
    this.checkboxTargets.forEach(checkbox => {
      checkbox.checked = isChecked
    })
    this.updateCount()
  }

  updateCount() {
    const selectedCount = this.checkboxTargets.filter(cb => cb.checked).length
    this.countTarget.textContent = selectedCount

    // Update the "select all" checkbox state
    if (this.hasSelectAllTarget) {
      const allChecked = this.checkboxTargets.length > 0 && 
                        this.checkboxTargets.every(cb => cb.checked)
      const someChecked = this.checkboxTargets.some(cb => cb.checked)
      
      this.selectAllTarget.checked = allChecked
      this.selectAllTarget.indeterminate = someChecked && !allChecked
    }
  }
}

