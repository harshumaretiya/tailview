import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="smooth-scroll"
// Can be attached to body or html element for global smooth scrolling
export default class extends Controller {
  connect() {
    // Add smooth scroll behavior to all internal links
    this.setupSmoothScroll()
  }

  setupSmoothScroll() {
    // Find all anchor links
    const anchorLinks = this.element.querySelectorAll('a[href^="#"]')
    
    anchorLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href')
        
        // Skip if href is just "#" or empty
        if (href === '#' || href === '') {
          return
        }
        
        // Find the target element
        try {
          const target = document.querySelector(href)
          
          if (target && target !== this.element) {
            e.preventDefault()
            
            // Get element position
            const elementPosition = target.getBoundingClientRect().top + window.pageYOffset
            const offsetPosition = elementPosition - 80 // Account for fixed headers
            
            // Smooth scroll to element
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            })
            
            // Update URL without jumping
            history.pushState(null, '', href)
          }
        } catch (error) {
          // If target doesn't exist, allow default behavior
          console.warn('Target element not found:', href)
        }
      })
    })
  }
}
