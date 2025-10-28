// Import and register all your controllers from the importmap via controllers/**/*_controller
import { application } from "controllers/application"
import { eagerLoadControllersFrom } from "@hotwired/stimulus-loading"
eagerLoadControllersFrom("controllers", application)

// Note: All controllers in app/javascript/controllers/ are automatically loaded!
// No need to manually import/register them.
// The alert_controller.js is auto-discovered and registered as "alert"