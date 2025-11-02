import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["search", "perPage"]
  static values = { url: String }

  connect() {
    this.timeout = null
    const urlParams = new URLSearchParams(window.location.search)
    this.currentStatus = urlParams.get('status') || ''
    this.currentPriority = urlParams.get('priority') || ''
  }

  search(event) {
    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      this.applyFilters({ search: event.target.value })
    }, 300)
  }

  filterStatus(event) {
    event.preventDefault()
    const status = event.currentTarget.dataset.value
    this.currentStatus = status === 'all' ? '' : status
    this.applyFilters({ status: this.currentStatus })
  }

  filterPriority(event) {
    event.preventDefault()
    const priority = event.currentTarget.dataset.value
    this.currentPriority = priority === 'all' ? '' : priority
    this.applyFilters({ priority: this.currentPriority })
  }

  changePerPage(event) {
    const perPage = event.target.value
    this.applyFilters({ per_page: perPage, page: 1 })
  }

  applyFilters(newParams = {}) {
    const currentUrlParams = new URLSearchParams(window.location.search)
    const params = new URLSearchParams()
    
    const allParams = {
      status: newParams.hasOwnProperty('status') ? newParams.status : this.currentStatus,
      priority: newParams.hasOwnProperty('priority') ? newParams.priority : this.currentPriority,
      search: newParams.hasOwnProperty('search') ? newParams.search : (this.hasSearchTarget ? this.searchTarget.value : ''),
      per_page: newParams.per_page || currentUrlParams.get('per_page') || '',
      page: newParams.page || currentUrlParams.get('page') || ''
    }
    
    Object.entries(allParams).forEach(([key, value]) => {
      if (value && value !== '') params.set(key, value)
    })
    
    const baseUrl = this.urlValue || window.location.pathname
    const queryString = params.toString()
    window.location.href = queryString ? `${baseUrl}?${queryString}` : baseUrl
  }
}

