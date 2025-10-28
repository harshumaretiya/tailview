import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["row", "checkbox", "selectAll", "bulkActions", "searchInput", "sortIcon"]
  static values = {
    sortColumn: String,
    sortDirection: String
  }

  connect() {
    this.selectedRows = new Set()
  }

  // Row selection
  toggleRow(event) {
    const checkbox = event.currentTarget
    const row = checkbox.closest("tr")
    
    if (checkbox.checked) {
      this.selectedRows.add(row.dataset.id)
      row.classList.add("bg-blue-50")
    } else {
      this.selectedRows.delete(row.dataset.id)
      row.classList.remove("bg-blue-50")
    }
    
    this.updateBulkActionsVisibility()
    this.updateSelectAllState()
  }

  // Select all rows
  toggleAll(event) {
    const checked = event.currentTarget.checked
    
    this.checkboxTargets.forEach(checkbox => {
      if (checkbox !== event.currentTarget) {
        checkbox.checked = checked
        const row = checkbox.closest("tr")
        
        if (checked) {
          this.selectedRows.add(row.dataset.id)
          row.classList.add("bg-blue-50")
        } else {
          this.selectedRows.delete(row.dataset.id)
          row.classList.remove("bg-blue-50")
        }
      }
    })
    
    this.updateBulkActionsVisibility()
  }

  updateSelectAllState() {
    if (!this.hasSelectAllTarget) return
    
    const regularCheckboxes = this.checkboxTargets.filter(cb => cb !== this.selectAllTarget)
    const checkedCount = regularCheckboxes.filter(cb => cb.checked).length
    
    if (checkedCount === 0) {
      this.selectAllTarget.checked = false
      this.selectAllTarget.indeterminate = false
    } else if (checkedCount === regularCheckboxes.length) {
      this.selectAllTarget.checked = true
      this.selectAllTarget.indeterminate = false
    } else {
      this.selectAllTarget.checked = false
      this.selectAllTarget.indeterminate = true
    }
  }

  updateBulkActionsVisibility() {
    if (!this.hasBulkActionsTarget) return
    
    if (this.selectedRows.size > 0) {
      this.bulkActionsTarget.classList.remove("hidden")
      this.bulkActionsTarget.querySelector("[data-count]").textContent = this.selectedRows.size
    } else {
      this.bulkActionsTarget.classList.add("hidden")
    }
  }

  // Sorting
  sort(event) {
    const column = event.currentTarget.dataset.column
    const currentDirection = this.sortDirectionValue
    const currentColumn = this.sortColumnValue
    
    let newDirection = "asc"
    if (column === currentColumn) {
      newDirection = currentDirection === "asc" ? "desc" : "asc"
    }
    
    this.sortColumnValue = column
    this.sortDirectionValue = newDirection
    
    // Update sort icons
    this.sortIconTargets.forEach(icon => {
      icon.classList.remove("text-blue-600")
      icon.classList.add("text-gray-400")
    })
    
    const activeIcon = event.currentTarget.querySelector("[data-table-target='sortIcon']")
    if (activeIcon) {
      activeIcon.classList.remove("text-gray-400")
      activeIcon.classList.add("text-blue-600")
    }
    
    // Sort rows
    this.sortRows(column, newDirection)
  }

  sortRows(column, direction) {
    const tbody = this.element.querySelector("tbody")
    const rows = Array.from(this.rowTargets)
    
    rows.sort((a, b) => {
      const aValue = a.querySelector(`[data-sort-value="${column}"]`)?.dataset.sortValue || 
                     a.querySelector(`td:nth-child(${this.getColumnIndex(column)})`)?.textContent.trim()
      const bValue = b.querySelector(`[data-sort-value="${column}"]`)?.dataset.sortValue || 
                     b.querySelector(`td:nth-child(${this.getColumnIndex(column)})`)?.textContent.trim()
      
      if (!aValue || !bValue) return 0
      
      // Try to parse as numbers
      const aNum = parseFloat(aValue.replace(/[^0-9.-]/g, ''))
      const bNum = parseFloat(bValue.replace(/[^0-9.-]/g, ''))
      
      if (!isNaN(aNum) && !isNaN(bNum)) {
        return direction === "asc" ? aNum - bNum : bNum - aNum
      }
      
      // String comparison
      return direction === "asc" 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue)
    })
    
    rows.forEach(row => tbody.appendChild(row))
  }

  getColumnIndex(column) {
    const headers = Array.from(this.element.querySelectorAll("th"))
    return headers.findIndex(th => th.dataset.column === column) + 1
  }

  // Search/Filter
  search(event) {
    const query = event.target.value.toLowerCase()
    
    this.rowTargets.forEach(row => {
      const text = row.textContent.toLowerCase()
      if (text.includes(query)) {
        row.classList.remove("hidden")
      } else {
        row.classList.add("hidden")
      }
    })
    
    this.updateEmptyState()
  }

  updateEmptyState() {
    const visibleRows = this.rowTargets.filter(row => !row.classList.contains("hidden"))
    const emptyState = this.element.querySelector("[data-empty-state]")
    
    if (emptyState) {
      if (visibleRows.length === 0) {
        emptyState.classList.remove("hidden")
      } else {
        emptyState.classList.add("hidden")
      }
    }
  }

  // Expandable rows
  toggleExpand(event) {
    const button = event.currentTarget
    const row = button.closest("tr")
    const expandedRow = row.nextElementSibling
    
    if (expandedRow && expandedRow.classList.contains("expandable-content")) {
      expandedRow.classList.toggle("hidden")
      
      const icon = button.querySelector("svg")
      if (icon) {
        icon.classList.toggle("rotate-90")
      }
    }
  }

  // Bulk actions
  bulkDelete() {
    if (this.selectedRows.size === 0) return
    
    if (confirm(`Delete ${this.selectedRows.size} selected items?`)) {
      console.log("Deleting items:", Array.from(this.selectedRows))
      // Implement actual deletion logic here
      
      this.selectedRows.forEach(id => {
        const row = this.element.querySelector(`tr[data-id="${id}"]`)
        if (row) row.remove()
      })
      
      this.selectedRows.clear()
      this.updateBulkActionsVisibility()
    }
  }

  bulkExport() {
    console.log("Exporting items:", Array.from(this.selectedRows))
    // Implement export logic here
  }

  // Inline editing
  enableEdit(event) {
    const cell = event.currentTarget.closest("td")
    const currentValue = cell.querySelector("[data-value]")?.textContent || cell.textContent.trim()
    const field = cell.dataset.field
    
    cell.dataset.originalValue = currentValue
    
    cell.innerHTML = `
      <input 
        type="text" 
        value="${currentValue}"
        class="px-2 py-1 border border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        data-action="blur->table#saveEdit keydown->table#handleEditKeydown"
        data-field="${field}"
      >
    `
    
    const input = cell.querySelector("input")
    input.focus()
    input.select()
  }

  saveEdit(event) {
    const input = event.target
    const cell = input.closest("td")
    const newValue = input.value
    const field = input.dataset.field
    const row = cell.closest("tr")
    const id = row.dataset.id
    
    // Here you would typically make an API call to save the data
    console.log("Saving:", { id, field, value: newValue })
    
    // Update the cell
    cell.innerHTML = `
      <span data-value>${newValue}</span>
      <button 
        data-action="click->table#enableEdit"
        class="ml-2 text-blue-600 hover:text-blue-800 text-xs"
      >
        Edit
      </button>
    `
  }

  handleEditKeydown(event) {
    if (event.key === "Enter") {
      event.target.blur()
    } else if (event.key === "Escape") {
      const cell = event.target.closest("td")
      const originalValue = cell.dataset.originalValue
      
      cell.innerHTML = `
        <span data-value>${originalValue}</span>
        <button 
          data-action="click->table#enableEdit"
          class="ml-2 text-blue-600 hover:text-blue-800 text-xs"
        >
          Edit
        </button>
      `
    }
  }

  // Delete row with animation
  deleteRow(event) {
    event.preventDefault()
    const row = event.currentTarget.closest("tr")
    
    if (confirm("Are you sure you want to delete this item?")) {
      row.classList.add("opacity-0", "transition-opacity", "duration-300")
      setTimeout(() => {
        row.remove()
        this.updateEmptyState()
      }, 300)
    }
  }
}

