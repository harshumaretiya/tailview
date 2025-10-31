import { Controller } from "@hotwired/stimulus"

/**
 * Auto Refresh Controller
 * Automatically refreshes Turbo Frame content at specified intervals
 * Usage: data-controller="auto-refresh" data-auto-refresh-interval-value="10000"
 *        Interval is in milliseconds (default: 10000 = 10 seconds)
 */
export default class extends Controller {
  static values = { interval: { type: Number, default: 10000 } }

  connect() {
    this.start()
  }

  disconnect() {
    this.stop()
  }

  // Start auto-refresh timer
  start() {
    this.stop() // Clear any existing timer
    this.timer = setInterval(() => this.refresh(), this.intervalValue)
  }

  // Stop auto-refresh timer
  stop() {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
  }

  // Refresh the Turbo Frame by resetting its src attribute
  refresh() {
    const frame = this.element.closest("turbo-frame")
    if (frame) {
      const src = frame.getAttribute("src")
      if (src) frame.setAttribute("src", src)
    }
  }
}

