import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="badge"
export default class extends Controller {
  remove(event) {
    event.preventDefault()
    
    // Add fade-out animation
    this.element.classList.add('transition-all', 'duration-200', 'ease-out', 'opacity-0', 'scale-75')
    
    // Remove element after animation
    setTimeout(() => {
      this.element.remove()
    }, 200)
  }
}

