import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["input", "menu", "button", "label", "icon", "option", "indicator"]
  static values = {
    name: String,
    actionController: String
  }

  connect() {
    this.handleOutsideClick = this.handleOutsideClick.bind(this)
    this.positionMenu = this.positionMenu.bind(this)

    this.menuMount = this.menuTarget.parentElement
    this.portalized = false

    this.updateIndicators(this.inputTarget.value)
  }

  disconnect() {
    this.removeOutsideListener()
    this.teardownPortal()
  }

  toggle(event) {
    event.preventDefault()
    if (this.isOpen()) {
      this.hide()
    } else {
      this.show()
    }
  }

  select(event) {
    event.preventDefault()
    const value = event.currentTarget.dataset.communityTopicSelectorValue
    const label = event.currentTarget.querySelector("span span")?.textContent?.trim()

    this.inputTarget.value = value
    if (label) {
      this.labelTarget.textContent = label
    }

    this.updateIndicators(value)
    this.dispatchChange()
    this.hide()
  }

  show() {
    if (!this.portalized) {
      document.body.appendChild(this.menuTarget)
      this.portalized = true
    }

    this.menuTarget.classList.remove("hidden")
    this.menuTarget.classList.add("scale-y-100")
    this.buttonTarget.setAttribute("aria-expanded", "true")
    this.iconTarget.classList.add("rotate-180")

    this.positionMenu()
    this.addOutsideListener()
    window.addEventListener("resize", this.positionMenu)
    window.addEventListener("scroll", this.positionMenu, true)
  }

  hide() {
    if (!this.isOpen()) return

    this.menuTarget.classList.add("hidden")
    this.menuTarget.classList.remove("scale-y-100")
    this.buttonTarget.setAttribute("aria-expanded", "false")
    this.iconTarget.classList.remove("rotate-180")

    this.removeOutsideListener()
    window.removeEventListener("resize", this.positionMenu)
    window.removeEventListener("scroll", this.positionMenu, true)

    this.resetMenuStyles()
    this.teardownPortal()
  }

  isOpen() {
    return !this.menuTarget.classList.contains("hidden")
  }

  addOutsideListener() {
    document.addEventListener("click", this.handleOutsideClick)
  }

  removeOutsideListener() {
    document.removeEventListener("click", this.handleOutsideClick)
  }

  handleOutsideClick(event) {
    if (this.buttonTarget.contains(event.target)) return
    if (this.portalized && this.menuTarget.contains(event.target)) return

    if (!this.element.contains(event.target)) {
      this.hide()
    }
  }

  positionMenu() {
    if (!this.portalized) return

    const rect = this.buttonTarget.getBoundingClientRect()
    const spacing = 8
    const viewportWidth = document.documentElement.clientWidth
    const viewportHeight = document.documentElement.clientHeight
    const horizontalPadding = 16
    const preferredHeight = 320
    const minHeight = 200

    let left = rect.left
    const width = rect.width

    if (left + width > viewportWidth - horizontalPadding) {
      left = Math.max(horizontalPadding, viewportWidth - width - horizontalPadding)
    }

    const availableBelow = viewportHeight - rect.bottom - spacing
    const availableAbove = rect.top - spacing

    let height = Math.min(Math.max(availableBelow, minHeight), preferredHeight)
    let top = rect.bottom + spacing

    if (availableBelow < minHeight && availableAbove > availableBelow) {
      height = Math.min(Math.max(availableAbove, minHeight), preferredHeight)
      top = Math.max(spacing, rect.top - height - spacing)
    }

    this.menuTarget.style.position = "fixed"
    this.menuTarget.style.top = `${Math.round(top)}px`
    this.menuTarget.style.left = `${Math.round(left)}px`
    this.menuTarget.style.width = `${Math.round(width)}px`
    this.menuTarget.style.maxHeight = `${Math.round(height)}px`
    this.menuTarget.style.zIndex = "9999"
  }

  resetMenuStyles() {
    this.menuTarget.style.position = ""
    this.menuTarget.style.top = ""
    this.menuTarget.style.left = ""
    this.menuTarget.style.width = ""
    this.menuTarget.style.zIndex = ""
    this.menuTarget.style.maxHeight = ""
  }

  teardownPortal() {
    if (this.portalized) {
      this.menuMount.appendChild(this.menuTarget)
      this.portalized = false
    }
  }

  dispatchChange() {
    const changeEvent = new Event("change", { bubbles: true })
    this.inputTarget.dispatchEvent(changeEvent)

    if (this.actionControllerValue) {
      const [identifier, method] = this.actionControllerValue.split("#")
      if (identifier && method) {
        const composerElement = this.element.closest(`[data-controller~="${identifier}"]`)
        const controller = composerElement ? this.application.getControllerForElementAndIdentifier(composerElement, identifier) : null
        if (controller && typeof controller[method] === "function") {
          controller[method]({ preventDefault() {} })
        }
      }
    }
  }

  updateIndicators(value) {
    this.optionTargets.forEach((option, index) => {
      const indicator = this.indicatorTargets[index]
      if (!indicator) return

      const isSelected = option.dataset.communityTopicSelectorValue === value && value !== ""
      indicator.dataset.selected = String(isSelected)
      indicator.classList.toggle("hidden", !isSelected)
      indicator.classList.toggle("flex", isSelected)
    })
  }
}

