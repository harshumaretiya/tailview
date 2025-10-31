import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["container", "gridButton", "listButton"]

  connect() {
    this.currentView = localStorage.getItem("productsView") || "grid"
    this.initialize()
    
    // Watch for Turbo Frame updates
    const frame = document.getElementById("products")
    if (frame) {
      frame.addEventListener("turbo:frame-load", () => {
        // Re-read view from localStorage in case it changed
        this.currentView = localStorage.getItem("productsView") || "grid"
        this.initialize()
      })
    }
  }

  initialize() {
    // Apply view state immediately to prevent flash
    if (this.currentView === "grid") {
      const styleTag = document.getElementById("products-view-inline")
      if (styleTag) styleTag.remove()
    }
    this.updateContainer()
    this.updateView()
    // Apply container again to ensure it's correct
    this.updateContainer()
  }

  grid() {
    this.currentView = "grid"
    localStorage.setItem("productsView", "grid")
    // Force remove any inline style tag immediately
    const styleTag = document.getElementById("products-view-inline")
    if (styleTag) {
      styleTag.remove()
    }
    this.updateView()
    this.updateContainer()
  }

  list() {
    this.currentView = "list"
    localStorage.setItem("productsView", "list")
    this.updateView()
    this.updateContainer()
    // Ensure style tag is present for list view
    let styleTag = document.getElementById("products-view-inline")
    if (!styleTag) {
      styleTag = document.createElement("style")
      styleTag.id = "products-view-inline"
      styleTag.textContent = '#products [data-view-toggle-target="container"] { display: flex !important; flex-direction: column !important; gap: 1rem !important; } #products [data-view-toggle-target="container"] [data-view="grid"] { display: none !important; } #products [data-view-toggle-target="container"] [data-view="list"] { display: flex !important; }'
      document.head.appendChild(styleTag)
    }
  }

  updateView() {
    // Re-query targets each time in case they were replaced by Turbo Frame
    const gridButton = this.element.querySelector('[data-view-toggle-target="gridButton"]')
    const listButton = this.element.querySelector('[data-view-toggle-target="listButton"]')
    
    if (!gridButton || !listButton) return

    // Helper to set active button state
    const setActive = (button) => {
      button.classList.remove("border-gray-300", "bg-white", "text-gray-700")
      button.classList.add("bg-gray-900", "text-white", "border-gray-900")
      button.setAttribute("data-active", "true")
    }
    
    // Helper to set inactive button state
    const setInactive = (button) => {
      button.classList.remove("bg-gray-900", "text-white", "border-gray-900")
      button.classList.add("border-gray-300", "bg-white", "text-gray-700")
      button.removeAttribute("data-active")
    }

    if (this.currentView === "grid") {
      setActive(gridButton)
      setInactive(listButton)
    } else {
      setActive(listButton)
      setInactive(gridButton)
    }
  }

  updateContainer() {
    // Re-query container in case it was replaced by Turbo Frame
    const container = this.element.querySelector('[data-view-toggle-target="container"]')
    if (!container) return

    // Manage the inline style tag for immediate CSS application
    let styleTag = document.getElementById("products-view-inline")

    if (this.currentView === "list") {
      // Add or keep style tag for list view
      if (!styleTag) {
        styleTag = document.createElement("style")
        styleTag.id = "products-view-inline"
        styleTag.textContent = '#products [data-view-toggle-target="container"] { display: flex !important; flex-direction: column !important; gap: 1rem !important; } #products [data-view-toggle-target="container"] [data-view="grid"] { display: none !important; } #products [data-view-toggle-target="container"] [data-view="list"] { display: flex !important; }'
        document.head.appendChild(styleTag)
      }
      
      container.dataset.view = "list"
      container.classList.remove("grid", "grid-cols-1", "sm:grid-cols-2", "lg:grid-cols-3", "xl:grid-cols-4", "gap-6")
      container.classList.add("space-y-4")
      
      // Ensure list items are visible and grid items are hidden
      const gridItems = container.querySelectorAll('[data-view="grid"]')
      const listItems = container.querySelectorAll('[data-view="list"]')
      gridItems.forEach(item => {
        item.classList.add("hidden")
        item.style.display = "none"
      })
      listItems.forEach(item => {
        item.classList.remove("hidden")
        item.style.display = ""
      })
    } else {
      // Remove style tag for grid view
      if (styleTag) {
        styleTag.remove()
      }
      
      container.dataset.view = "grid"
      container.classList.remove("space-y-4")
      container.classList.add("grid", "grid-cols-1", "sm:grid-cols-2", "lg:grid-cols-3", "xl:grid-cols-4", "gap-6")
      
      // Get all product items and ensure proper visibility
      const gridItems = container.querySelectorAll('[data-view="grid"]')
      const listItems = container.querySelectorAll('[data-view="list"]')
      
      // Force show grid items and hide list items
      gridItems.forEach(item => {
        item.classList.remove("hidden")
        item.style.display = ""
      })
      listItems.forEach(item => {
        item.classList.add("hidden")
        item.style.display = "none"
      })
    }
  }
}


