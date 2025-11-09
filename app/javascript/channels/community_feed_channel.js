import consumer from "channels/consumer"

// Subscribe to CommunityFeedChannel when the page loads
// This ensures presence tracking is activated
let subscription = null
let heartbeatInterval = null

document.addEventListener("turbo:load", () => {
  // Only subscribe if we're on the community page
  if (document.querySelector('[data-controller*="community-composer-modal"]')) {
    if (!subscription) {
      subscription = consumer.subscriptions.create("CommunityFeedChannel", {
        connected() {
          console.log("Connected to CommunityFeedChannel - presence tracking active")
          
          // Send heartbeat every 30 seconds to keep presence alive
          // (cache TTL is 45 seconds)
          heartbeatInterval = setInterval(() => {
            if (this.consumer.connection.isActive()) {
              this.perform("heartbeat")
            }
          }, 30000)
        },

        disconnected() {
          console.log("Disconnected from CommunityFeedChannel")
          
          if (heartbeatInterval) {
            clearInterval(heartbeatInterval)
            heartbeatInterval = null
          }
        },

        received(data) {
          // Handle any custom messages from the channel if needed
          console.log("Received:", data)
        }
      })
    }
  }
})

// Clean up subscription when leaving the page
document.addEventListener("turbo:before-cache", () => {
  if (subscription) {
    subscription.unsubscribe()
    subscription = null
  }
  
  if (heartbeatInterval) {
    clearInterval(heartbeatInterval)
    heartbeatInterval = null
  }
})

