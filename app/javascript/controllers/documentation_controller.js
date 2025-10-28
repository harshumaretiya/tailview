import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["componentTab", "componentPanel", "sidebarTab"]

  connect() {
    console.log('Documentation controller connected!')
    
    // Initialize with first component tab active
    this.switchComponent("buttons")
    
    // Handle browser navigation
    this.hashChangeHandler = () => this.handleHashChange()
    window.addEventListener('hashchange', this.hashChangeHandler)
    
    // Check for initial hash
    this.handleHashChange()
  }

  disconnect() {
    if (this.hashChangeHandler) {
      window.removeEventListener('hashchange', this.hashChangeHandler)
    }
  }

  switchComponent(componentId) {
    // Update tab states
    this.componentTabTargets.forEach(tab => {
      const isActive = tab.dataset.componentId === componentId
      tab.classList.toggle("border-blue-600", isActive)
      tab.classList.toggle("text-blue-600", isActive)
      tab.classList.toggle("border-transparent", !isActive)
      tab.classList.toggle("text-gray-500", !isActive)
    })

    // Update sidebar tab states
    this.sidebarTabTargets.forEach(tab => {
      const isActive = tab.dataset.componentId === componentId
      tab.classList.toggle("bg-blue-50", isActive)
      tab.classList.toggle("border-blue-600", isActive)
      tab.classList.toggle("text-blue-700", isActive)
      tab.classList.toggle("bg-white", !isActive)
      tab.classList.toggle("border-transparent", !isActive)
      tab.classList.toggle("text-gray-700", !isActive)
    })

    // Update panel visibility
    this.componentPanelTargets.forEach(panel => {
      const isActive = panel.dataset.componentId === componentId
      panel.classList.toggle("hidden", !isActive)
    })

    // Update URL hash
    window.location.hash = componentId
  }


  handleTabClick(event) {
    event.preventDefault()
    const componentId = event.currentTarget.dataset.componentId
    this.switchComponent(componentId)
  }

  handleSidebarClick(event) {
    event.preventDefault()
    const componentId = event.currentTarget.dataset.componentId
    this.switchComponent(componentId)
  }


  // Handle browser back/forward navigation
  handleHashChange() {
    const hash = window.location.hash.slice(1)
    if (hash && this.componentTabTargets.some(tab => tab.dataset.componentId === hash)) {
      this.switchComponent(hash)
    }
  }
}
