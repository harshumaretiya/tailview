import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["source", "button"]
  
  copy(event) {
    event.preventDefault()
    
    const button = event.currentTarget
    const codeBlock = button.closest('[data-clipboard-target="container"]').querySelector('[data-clipboard-target="source"]')
    const code = codeBlock.textContent
    
    // Check if Clipboard API is available
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(code).then(() => {
        this.showCopySuccess(button)
      }).catch(() => {
        this.fallbackCopy(code, button)
      })
    } else {
      this.fallbackCopy(code, button)
    }
  }
  
  fallbackCopy(text, button) {
    // Fallback for older browsers or non-secure contexts
    const textArea = document.createElement('textarea')
    textArea.value = text
    textArea.style.position = 'fixed'
    textArea.style.left = '-999999px'
    textArea.style.top = '-999999px'
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    
    try {
      document.execCommand('copy')
      this.showCopySuccess(button)
    } catch (err) {
      console.error('Failed to copy text: ', err)
      button.textContent = "Failed"
      button.classList.add("bg-red-500", "text-white")
      button.classList.remove("bg-gray-700", "hover:bg-gray-600")
      
      setTimeout(() => {
        button.textContent = "Copy"
        button.classList.remove("bg-red-500", "text-white")
        button.classList.add("bg-gray-700", "hover:bg-gray-600")
      }, 2000)
    }
    
    document.body.removeChild(textArea)
  }
  
  showCopySuccess(button) {
    const originalText = button.textContent
    button.textContent = "Copied!"
    button.classList.add("bg-green-500", "text-white")
    button.classList.remove("bg-gray-700", "hover:bg-gray-600")
    
    setTimeout(() => {
      button.textContent = originalText
      button.classList.remove("bg-green-500", "text-white")
      button.classList.add("bg-gray-700", "hover:bg-gray-600")
    }, 2000)
  }
}

