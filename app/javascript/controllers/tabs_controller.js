import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="tabs"
export default class extends Controller {
  static targets = ["tab", "panel"]

  connect() {
    // Show the first tab by default
    if (this.tabTargets.length > 0 && this.panelTargets.length > 0) {
      this.showTab(0)
    }
  }

  // Handles clicks on tab links
  switch(event) {
    if (event) {
      event.preventDefault()
    }

    // Get the tab that was clicked
    const clickedTab = event ? event.currentTarget : this.tabTargets[0]
    const index = this.tabTargets.indexOf(clickedTab)

    if (index !== -1) {
      this.showTab(index)
    }
  }

  // Shows the tab at the given index
  showTab(index) {
    // Check if this is a boxed tab group by checking the nav container
    // This needs to be done once for all tabs, not per tab
    const firstTab = this.tabTargets[0]
    const nav = firstTab ? firstTab.closest("nav") : null
    const isBoxedTabGroup = nav && nav.classList.contains("bg-gray-100") && nav.classList.contains("p-1")
    
    // Update tab styles
    this.tabTargets.forEach((tab, i) => {
      const isActive = i === index
      
      // Remove all active/inactive classes
      tab.classList.remove(
        "border-blue-500", "border-transparent",
        "text-blue-600", "text-gray-500", "text-gray-700", "text-gray-900",
        "bg-blue-600", "bg-white", "bg-blue-50",
        "text-white", "shadow"
      )
      
      // Add appropriate classes based on active state
      if (isActive) {
        // Active state
        if (isBoxedTabGroup) {
          // Boxed tabs: white background with shadow
          tab.classList.add("bg-white", "shadow", "text-gray-900")
        } else if (tab.classList.contains("border-b-2")) {
          tab.classList.add("border-blue-500", "text-blue-600")
        } else if (tab.classList.contains("rounded-full")) {
          tab.classList.add("text-white", "bg-blue-600")
        } else if (tab.classList.contains("rounded-md")) {
          // Vertical tabs with rounded corners
          tab.classList.add("bg-blue-50", "text-blue-600")
        } else {
          // Default: underline
          tab.classList.add("border-b-2", "border-blue-500", "text-blue-600")
        }
      } else {
        // Inactive state
        if (isBoxedTabGroup) {
          // Boxed tabs inactive: no background, no shadow
          tab.classList.add("text-gray-600")
        } else if (tab.classList.contains("border-b-2") || tab.classList.contains("rounded-full")) {
          tab.classList.add("border-transparent", "text-gray-500")
        } else if (tab.classList.contains("rounded-md")) {
          // Vertical tabs inactive
          tab.classList.add("text-gray-600")
        } else {
          tab.classList.add("text-gray-500")
        }
      }
    })

    // Show/hide panels - use display style for reliability
    this.panelTargets.forEach((panel, i) => {
      if (i === index) {
        panel.style.display = ""
      } else {
        panel.style.display = "none"
      }
    })
  }

  // Can be called directly with an index
  goToTab(event) {
    const index = parseInt(event.currentTarget.dataset.index)
    this.showTab(index)
  }
}
