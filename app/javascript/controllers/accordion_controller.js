import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["item", "content", "icon"]
  static values = { allowMultiple: { type: Boolean, default: false } }

  connect() {
    this.setupInitialState()
    
    // Listen for Turbo Frame loads to recalculate height
    this.element.addEventListener('turbo:frame-load', this.handleTurboFrameLoad.bind(this))
  }

  disconnect() {
    this.element.removeEventListener('turbo:frame-load', this.handleTurboFrameLoad.bind(this))
  }

  handleTurboFrameLoad(event) {
    // Recalculate height for open items when Turbo Frame content loads
    this.itemTargets.forEach(item => {
      const content = item.querySelector('[data-accordion-target="content"]')
      if (content && content.style.maxHeight !== "0px" && content.style.maxHeight !== "") {
        // Recalculate height for open items
        content.style.maxHeight = "none"
        const newHeight = content.scrollHeight
        content.style.maxHeight = newHeight + "px"
        
        // Clean up after a brief moment
        setTimeout(() => {
          content.style.maxHeight = "none"
        }, 50)
      }
    })
  }

  setupInitialState() {
    this.itemTargets.forEach(item => {
      const isOpen = item.dataset.open === "true"
      const content = item.querySelector('[data-accordion-target="content"]')
      const icon = item.querySelector('[data-accordion-target="icon"]')
      
      if (content) {
        // Set initial state with smooth transitions
        content.style.transition = "max-height 0.3s ease-in-out, opacity 0.3s ease-in-out"
        content.style.overflow = "hidden"
        
        if (isOpen) {
          // For open items, set a reasonable initial height and let Turbo Frame load adjust it
          content.style.maxHeight = "200px" // Temporary height
          content.style.opacity = "1"
          
          // Recalculate after a short delay to allow content to load
          setTimeout(() => {
            const actualHeight = content.scrollHeight
            content.style.maxHeight = actualHeight + "px"
            
            // Clean up after animation
            setTimeout(() => {
              content.style.maxHeight = "none"
            }, 300)
          }, 100)
        } else {
          content.style.maxHeight = "0"
          content.style.opacity = "0"
        }
        
        if (icon) {
          icon.style.transition = "transform 0.3s ease-in-out"
          icon.classList.toggle("rotate-180", isOpen)
        }
      }
    })
  }

  toggle(event) {
    const button = event.currentTarget
    const item = button.closest('[data-accordion-target="item"]')
    const content = item.querySelector('[data-accordion-target="content"]')
    const icon = item.querySelector('[data-accordion-target="icon"]')
    
    const isOpen = content.style.maxHeight !== "0px" && content.style.maxHeight !== ""
    
    if (isOpen) {
      this.closeItem(item, content, icon)
    } else {
      // Close other items if not allowing multiple
      if (!this.allowMultipleValue) {
        this.closeAllItems()
      }
      
      this.openItem(item, content, icon)
    }
  }

  openItem(item, content, icon) {
    // Set max-height to scroll height for smooth opening
    content.style.maxHeight = content.scrollHeight + "px"
    content.style.opacity = "1"
    icon?.classList.add("rotate-180")
    item.dataset.open = "true"
    
    // Clean up after animation
    setTimeout(() => {
      content.style.maxHeight = "none"
    }, 300)
  }

  closeItem(item, content, icon) {
    // Set max-height to current height first
    content.style.maxHeight = content.scrollHeight + "px"
    
    // Force reflow
    content.offsetHeight
    
    // Then animate to 0
    content.style.maxHeight = "0"
    content.style.opacity = "0"
    icon?.classList.remove("rotate-180")
    item.dataset.open = "false"
  }

  closeAllItems() {
    this.itemTargets.forEach(item => {
      const content = item.querySelector('[data-accordion-target="content"]')
      const icon = item.querySelector('[data-accordion-target="icon"]')
      
      if (content && content.style.maxHeight !== "0px") {
        this.closeItem(item, content, icon)
      }
    })
  }

  openAll() {
    this.itemTargets.forEach(item => {
      const content = item.querySelector('[data-accordion-target="content"]')
      const icon = item.querySelector('[data-accordion-target="icon"]')
      
      if (content && content.style.maxHeight === "0px") {
        this.openItem(item, content, icon)
      }
    })
  }

  closeAll() {
    this.closeAllItems()
  }
}