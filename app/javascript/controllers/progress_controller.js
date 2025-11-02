import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["bar", "percentage", "step"]
  static values = { progress: Number, steps: Number }

  connect() {
    if (this.hasProgressValue) {
      this.updateProgress(this.progressValue)
    }
  }

  increase() {
    const newProgress = Math.min(this.progressValue + 10, 100)
    this.updateProgress(newProgress)
  }

  decrease() {
    const newProgress = Math.max(this.progressValue - 10, 0)
    this.updateProgress(newProgress)
  }

  reset() {
    this.updateProgress(0)
  }

  complete() {
    this.updateProgress(100)
  }

  setStep(event) {
    const step = parseInt(event.currentTarget.dataset.step)
    const totalSteps = this.stepsValue || this.stepTargets.length
    const progress = Math.round((step / totalSteps) * 100)
    this.updateProgress(progress)
    
    // Update step visuals
    this.stepTargets.forEach((stepEl, index) => {
      if (index < step) {
        stepEl.classList.add('completed')
        stepEl.classList.remove('active', 'pending')
      } else if (index === step - 1) {
        stepEl.classList.add('active')
        stepEl.classList.remove('completed', 'pending')
      } else {
        stepEl.classList.add('pending')
        stepEl.classList.remove('active', 'completed')
      }
    })
  }

  updateProgress(value) {
    this.progressValue = value
    
    if (this.hasBarTarget) {
      this.barTarget.style.width = `${value}%`
      
      // Change color based on progress
      this.barTarget.classList.remove('bg-blue-600', 'bg-yellow-500', 'bg-green-600')
      if (value < 50) {
        this.barTarget.classList.add('bg-blue-600')
      } else if (value < 100) {
        this.barTarget.classList.add('bg-yellow-500')
      } else {
        this.barTarget.classList.add('bg-green-600')
      }
    }
    
    if (this.hasPercentageTarget) {
      this.percentageTarget.textContent = `${value}%`
    }
    
    // Dispatch event
    this.element.dispatchEvent(new CustomEvent('progress:changed', {
      detail: { progress: value },
      bubbles: true
    }))
  }
}

