import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["star", "value", "display"]
  static values = { rating: Number }

  connect() {
    if (this.hasRatingValue) {
      this.setRating(this.ratingValue)
    }
  }

  hover(event) {
    const rating = parseInt(event.currentTarget.dataset.value)
    this.highlightStars(rating)
  }

  leave() {
    this.highlightStars(this.ratingValue || 0)
  }

  select(event) {
    const rating = parseInt(event.currentTarget.dataset.value)
    this.ratingValue = rating
    this.setRating(rating)
    
    // Dispatch custom event
    this.element.dispatchEvent(new CustomEvent('rating:changed', {
      detail: { rating },
      bubbles: true
    }))
  }

  setRating(rating) {
    this.highlightStars(rating)
    
    if (this.hasValueTarget) {
      this.valueTarget.value = rating
    }
    
    if (this.hasDisplayTarget) {
      this.displayTarget.textContent = rating > 0 ? `${rating} star${rating !== 1 ? 's' : ''}` : 'Not rated'
    }
  }

  highlightStars(rating) {
    this.starTargets.forEach((star, index) => {
      const starRating = index + 1
      const svg = star.querySelector('svg')
      
      if (starRating <= rating) {
        svg.classList.add('text-yellow-400', 'fill-yellow-400')
        svg.classList.remove('text-gray-300', 'dark:text-gray-600')
      } else {
        svg.classList.remove('text-yellow-400', 'fill-yellow-400')
        svg.classList.add('text-gray-300', 'dark:text-gray-600')
      }
    })
  }
}

