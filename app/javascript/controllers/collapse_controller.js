import { Controller } from "@hotwired/stimulus"

/**
 * Collapse Controller
 * Toggles visibility of content and rotates icon
 * Usage: data-controller="collapse"
 *        data-collapse-target="body" on content to show/hide
 *        data-collapse-target="icon" on icon to rotate
 *        data-action="click->collapse#toggle" on toggle button
 */
export default class extends Controller {
  static targets = ["body", "icon"]

  toggle() {
    if (this.hasBodyTarget) {
      this.bodyTarget.classList.toggle("hidden")
    }
    if (this.hasIconTarget) {
      this.iconTarget.classList.toggle("rotate-180")
    }
  }
}

