import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="toast"
export default class extends Controller {
  static values = {
    variant: { type: String, default: "info" },
    message: { type: String, default: "Toast message" },
    title: { type: String, default: null },
    position: { type: String, default: "top-right" },
    autoDismiss: { type: Boolean, default: true },
    dismissAfter: { type: Number, default: 5000 }
  }

  connect() {
    // Ensure toast container exists
    this.ensureContainer()
  }

  ensureContainer() {
    let container = document.getElementById(`toast-container-${this.positionValue}`)
    if (!container) {
      container = document.createElement("div")
      container.id = `toast-container-${this.positionValue}`
      container.className = this.getContainerClasses()
      document.body.appendChild(container)
    }
    return container
  }

  getContainerClasses() {
    const positions = {
      "top-right": "fixed top-4 right-4 z-50 space-y-2",
      "top-left": "fixed top-4 left-4 z-50 space-y-2",
      "bottom-right": "fixed bottom-4 right-4 z-50 space-y-2",
      "bottom-left": "fixed bottom-4 left-4 z-50 space-y-2",
      "top-center": "fixed top-4 left-1/2 -translate-x-1/2 z-50 space-y-2"
    }
    return positions[this.positionValue] || positions["top-right"]
  }

  show(event) {
    if (event) {
      event.preventDefault()
    }

    const container = this.ensureContainer()
    const toast = this.createToast()
    container.appendChild(toast)

    // Trigger animation
    requestAnimationFrame(() => {
      toast.classList.remove("opacity-0", "translate-y-2", "-translate-y-2")
    })

    // Auto dismiss
    if (this.autoDismissValue) {
      setTimeout(() => {
        this.dismissToast(toast)
      }, this.dismissAfterValue)
    }
  }

  createToast() {
    const toast = document.createElement("div")
    toast.className = `bg-white rounded-lg shadow-lg border-l-4 p-4 min-w-[300px] max-w-md transition-all duration-300 ease-out opacity-0 ${this.getToastBorderClass()} ${this.getToastAnimationClass()}`
    toast.setAttribute("data-controller", "alert")
    toast.setAttribute("data-alert-auto-dismiss-value", this.autoDismissValue)
    toast.setAttribute("data-alert-dismiss-after-value", this.dismissAfterValue)

    const icon = this.getIcon()
    const content = this.getContent()

    toast.innerHTML = `
      <div class="flex items-start">
        <div class="flex-shrink-0">
          ${icon}
        </div>
        <div class="ml-3 flex-1">
          ${content}
        </div>
        <div class="ml-4 flex-shrink-0">
          <button data-action="click->alert#dismiss" class="inline-flex text-gray-400 hover:text-gray-500">
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
            </svg>
          </button>
        </div>
      </div>
    `

    return toast
  }

  getToastBorderClass() {
    const variants = {
      success: "border-green-500",
      error: "border-red-500",
      warning: "border-yellow-500",
      info: "border-blue-500"
    }
    return variants[this.variantValue] || variants.info
  }

  getToastAnimationClass() {
    const positions = {
      "top-right": "translate-y-2",
      "top-left": "translate-y-2",
      "bottom-right": "-translate-y-2",
      "bottom-left": "-translate-y-2",
      "top-center": "translate-y-2"
    }
    return positions[this.positionValue] || "translate-y-2"
  }

  getIcon() {
    const icons = {
      success: `<svg class="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
      </svg>`,
      error: `<svg class="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
      </svg>`,
      warning: `<svg class="h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
      </svg>`,
      info: `<svg class="h-5 w-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
      </svg>`
    }
    return icons[this.variantValue] || icons.info
  }

  getContent() {
    let content = ""
    if (this.titleValue) {
      content += `<p class="text-sm font-medium text-gray-900">${this.titleValue}</p>`
    }
    content += `<p class="${this.titleValue ? 'mt-1 ' : ''}text-sm ${this.titleValue ? 'text-gray-500' : 'font-medium text-gray-900'}">${this.messageValue}</p>`
    return content
  }

  dismissToast(toast) {
    toast.classList.add('opacity-0', 'translate-y-2', '-translate-y-2')
    setTimeout(() => {
      toast.remove()
    }, 300)
  }
}

