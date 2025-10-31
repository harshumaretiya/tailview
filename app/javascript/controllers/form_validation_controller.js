import { Controller } from "@hotwired/stimulus"

// Form validation controller for real-time validation and UX enhancements
export default class extends Controller {
  static targets = ["field", "error", "submit", "charCount"]
  static values = {
    validateOnBlur: { type: Boolean, default: true },
    showCharCount: { type: Boolean, default: false }
  }

  connect() {
    this.fieldTargets.forEach(field => {
      if (this.validateOnBlurValue) {
        field.addEventListener("blur", this._validateField.bind(this))
      }
      field.addEventListener("input", this._handleInput.bind(this))
      
      // Initialize character count if field has maxlength
      if (field.hasAttribute("maxlength")) {
        this._updateCharCount(field)
      }
    })
  }

  validate(event) {
    event.preventDefault()
    let isValid = true

    this.fieldTargets.forEach(field => {
      if (!this._validateField({ target: field })) {
        isValid = false
      }
    })

    if (isValid) {
      this._showLoading()
      event.target.submit()
    } else {
      this._showErrors()
    }
  }

  _validateField(event) {
    const field = event.target || event
    const fieldName = field.name || field.id
    const value = field.value.trim()
    let isValid = true
    let errorMessage = ""

    // Name validation
    if (fieldName.includes("name")) {
      if (!value) {
        isValid = false
        errorMessage = "Name is required"
      } else if (value.length < 2) {
        isValid = false
        errorMessage = "Name must be at least 2 characters"
      }
    }

    // Email validation
    if (fieldName.includes("email")) {
      if (!value) {
        isValid = false
        errorMessage = "Email is required"
      } else if (!this._isValidEmail(value)) {
        isValid = false
        errorMessage = "Please enter a valid email address"
      }
    }

    // Update field styling
    this._updateFieldState(field, isValid, errorMessage)
    return isValid
  }

  _isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  _updateFieldState(field, isValid, errorMessage) {
    const errorElement = field.parentElement.querySelector(`[data-form-validation-target="error"][data-field="${field.name || field.id}"]`)
    
    if (isValid) {
      field.classList.remove("border-red-300", "focus:border-red-500", "focus:ring-red-500")
      field.classList.add("border-gray-300", "focus:border-blue-500", "focus:ring-blue-500")
      if (errorElement) errorElement.classList.add("hidden")
    } else {
      field.classList.remove("border-gray-300", "focus:border-blue-500", "focus:ring-blue-500")
      field.classList.add("border-red-300", "focus:border-red-500", "focus:ring-red-500")
      if (errorElement) {
        errorElement.textContent = errorMessage
        errorElement.classList.remove("hidden")
      }
    }
  }

  _handleInput(event) {
    const field = event.target
    // Update char count if field has maxlength
    if (field.hasAttribute("maxlength")) {
      this._updateCharCount(field)
    }
    // Clear error on input
    if (field.classList.contains("border-red-300")) {
      this._validateField({ target: field })
    }
  }

  _updateCharCount(field) {
    const fieldName = field.name || field.id
    const countTarget = this.element.querySelector(`[data-form-validation-target="charCount"][data-field="${fieldName}"]`)
    if (countTarget) {
      const maxLength = field.getAttribute("maxlength") || 100
      const currentLength = field.value.length
      countTarget.textContent = `${currentLength}/${maxLength}`
      countTarget.classList.toggle("text-red-500", currentLength > maxLength * 0.9)
    }
  }

  _showLoading() {
    if (this.hasSubmitTarget) {
      this.submitTarget.disabled = true
      const originalText = this.submitTarget.innerHTML
      this.submitTarget.innerHTML = `
        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Saving...
      `
      this.submitTarget.dataset.originalText = originalText
    }
  }

  _showErrors() {
    // Scroll to first error
    const firstError = this.errorTargets.find(el => !el.classList.contains("hidden"))
    if (firstError) {
      firstError.scrollIntoView({ behavior: "smooth", block: "nearest" })
    }
  }

  reset() {
    if (this.hasSubmitTarget && this.submitTarget.dataset.originalText) {
      this.submitTarget.innerHTML = this.submitTarget.dataset.originalText
      this.submitTarget.disabled = false
      delete this.submitTarget.dataset.originalText
    }
  }
}

