import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["input", "calendar", "monthYear", "grid", "selectedDate"]
  static values = {
    selectedDate: String,
    minDate: String,
    maxDate: String
  }

  connect() {
    this.currentDate = new Date()
    this.selectedDate = this.selectedDateValue ? new Date(this.selectedDateValue) : null
    this.renderCalendar()
  }

  toggle() {
    this.calendarTarget.classList.toggle('hidden')
  }

  close() {
    this.calendarTarget.classList.add('hidden')
  }

  closeIfOutside(event) {
    if (!this.element.contains(event.target)) {
      this.close()
    }
  }

  previousMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1)
    this.renderCalendar()
  }

  nextMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1)
    this.renderCalendar()
  }

  selectDate(event) {
    const dateStr = event.currentTarget.dataset.date
    this.selectedDate = new Date(dateStr)
    this.selectedDateValue = dateStr
    
    // Update input field
    if (this.hasInputTarget) {
      this.inputTarget.value = this.formatDate(this.selectedDate)
    }
    
    // Update selected date display
    if (this.hasSelectedDateTarget) {
      this.selectedDateTarget.textContent = this.formatDate(this.selectedDate)
    }
    
    this.renderCalendar()
    this.close()
    
    // Dispatch custom event
    this.element.dispatchEvent(new CustomEvent('datepicker:selected', {
      detail: { date: this.selectedDate },
      bubbles: true
    }))
  }

  today() {
    this.currentDate = new Date()
    this.selectedDate = new Date()
    this.selectedDateValue = this.selectedDate.toISOString().split('T')[0]
    
    if (this.hasInputTarget) {
      this.inputTarget.value = this.formatDate(this.selectedDate)
    }
    
    if (this.hasSelectedDateTarget) {
      this.selectedDateTarget.textContent = this.formatDate(this.selectedDate)
    }
    
    this.renderCalendar()
    this.close()
  }

  clear() {
    this.selectedDate = null
    this.selectedDateValue = ''
    
    if (this.hasInputTarget) {
      this.inputTarget.value = ''
    }
    
    if (this.hasSelectedDateTarget) {
      this.selectedDateTarget.textContent = 'Select a date'
    }
    
    this.renderCalendar()
  }

  renderCalendar() {
    const year = this.currentDate.getFullYear()
    const month = this.currentDate.getMonth()
    
    // Update month/year display
    this.monthYearTarget.textContent = this.currentDate.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
    })
    
    // Clear grid
    this.gridTarget.innerHTML = ''
    
    // Get first day of month and number of days
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const today = new Date()
    
    // Add day headers
    const dayHeaders = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
    dayHeaders.forEach(day => {
      const header = document.createElement('div')
      header.className = 'text-center text-xs font-semibold text-gray-600 dark:text-gray-400 py-2'
      header.textContent = day
      this.gridTarget.appendChild(header)
    })
    
    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      const empty = document.createElement('div')
      this.gridTarget.appendChild(empty)
    }
    
    // Add day cells
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      const dateStr = date.toISOString().split('T')[0]
      
      const button = document.createElement('button')
      button.type = 'button'
      button.dataset.date = dateStr
      button.dataset.action = 'click->datepicker#selectDate'
      button.textContent = day
      
      // Base styles
      let classes = 'h-9 w-9 rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors'
      
      // Check if today
      const isToday = date.toDateString() === today.toDateString()
      if (isToday) {
        classes += ' font-bold text-blue-600 dark:text-blue-400'
      }
      
      // Check if selected
      const isSelected = this.selectedDate && date.toDateString() === this.selectedDate.toDateString()
      if (isSelected) {
        classes += ' bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
      } else {
        classes += ' text-gray-900 dark:text-gray-100'
      }
      
      // Check if disabled (min/max date)
      const isDisabled = this.isDateDisabled(date)
      if (isDisabled) {
        classes += ' opacity-50 cursor-not-allowed'
        button.disabled = true
      }
      
      button.className = classes
      this.gridTarget.appendChild(button)
    }
  }

  isDateDisabled(date) {
    if (this.minDateValue) {
      const minDate = new Date(this.minDateValue)
      if (date < minDate) return true
    }
    
    if (this.maxDateValue) {
      const maxDate = new Date(this.maxDateValue)
      if (date > maxDate) return true
    }
    
    return false
  }

  formatDate(date) {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }
}

