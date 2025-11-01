import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="refresh-activities"
// Handles refreshing the activities table via Turbo Frame
export default class extends Controller {
  refresh(event) {
    // The link will handle the Turbo Frame navigation
    // This is just for any additional behavior if needed
    event?.preventDefault()
  }
}

