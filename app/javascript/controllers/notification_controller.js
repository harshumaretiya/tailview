import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["badge", "item"]

  connect() {
    this.updateBadge()
  }

  markAsRead(event) {
    const item = event.currentTarget.closest('[data-notification-target="item"]')
    item.classList.remove('bg-blue-50', 'dark:bg-blue-900/20')
    item.classList.add('bg-white', 'dark:bg-gray-800')
    
    const dot = item.querySelector('.notification-dot')
    if (dot) {
      dot.remove()
    }
    
    this.updateBadge()
  }

  remove(event) {
    const item = event.currentTarget.closest('[data-notification-target="item"]')
    item.style.transition = 'all 0.3s ease-out'
    item.style.transform = 'translateX(100%)'
    item.style.opacity = '0'
    
    setTimeout(() => {
      item.remove()
      this.updateBadge()
    }, 300)
  }

  markAllRead() {
    this.itemTargets.forEach(item => {
      item.classList.remove('bg-blue-50', 'dark:bg-blue-900/20')
      item.classList.add('bg-white', 'dark:bg-gray-800')
      
      const dot = item.querySelector('.notification-dot')
      if (dot) {
        dot.remove()
      }
    })
    
    this.updateBadge()
  }

  clearAll() {
    this.itemTargets.forEach(item => {
      item.style.transition = 'all 0.3s ease-out'
      item.style.transform = 'translateX(100%)'
      item.style.opacity = '0'
    })
    
    setTimeout(() => {
      this.itemTargets.forEach(item => item.remove())
      this.updateBadge()
    }, 300)
  }

  updateBadge() {
    const unreadCount = this.element.querySelectorAll('.notification-dot').length
    if (this.hasBadgeTarget) {
      this.badgeTarget.textContent = unreadCount
      if (unreadCount === 0) {
        this.badgeTarget.classList.add('hidden')
      } else {
        this.badgeTarget.classList.remove('hidden')
      }
    }
  }
}

