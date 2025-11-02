import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["input", "preview", "placeholder", "filename", "size"]

  selectFile() {
    this.inputTarget.click()
  }

  handleFile(event) {
    const file = event.target.files[0]
    
    if (!file) return
    
    // Check if it's an image
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }
    
    // Show file info
    if (this.hasFilenameTarget) {
      this.filenameTarget.textContent = file.name
    }
    
    if (this.hasSizeTarget) {
      this.sizeTarget.textContent = this.formatFileSize(file.size)
    }
    
    // Show preview
    const reader = new FileReader()
    reader.onload = (e) => {
      if (this.hasPreviewTarget) {
        this.previewTarget.src = e.target.result
        this.previewTarget.classList.remove('hidden')
      }
      
      if (this.hasPlaceholderTarget) {
        this.placeholderTarget.classList.add('hidden')
      }
    }
    reader.readAsDataURL(file)
  }

  remove() {
    this.inputTarget.value = ''
    
    if (this.hasPreviewTarget) {
      this.previewTarget.src = ''
      this.previewTarget.classList.add('hidden')
    }
    
    if (this.hasPlaceholderTarget) {
      this.placeholderTarget.classList.remove('hidden')
    }
    
    if (this.hasFilenameTarget) {
      this.filenameTarget.textContent = 'No file selected'
    }
    
    if (this.hasSizeTarget) {
      this.sizeTarget.textContent = ''
    }
  }

  handleDrop(event) {
    event.preventDefault()
    event.stopPropagation()
    
    const file = event.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      this.inputTarget.files = event.dataTransfer.files
      this.handleFile({ target: this.inputTarget })
    }
    
    event.currentTarget.classList.remove('border-blue-500', 'bg-blue-50')
  }

  handleDragOver(event) {
    event.preventDefault()
    event.currentTarget.classList.add('border-blue-500', 'bg-blue-50')
  }

  handleDragLeave(event) {
    event.currentTarget.classList.remove('border-blue-500', 'bg-blue-50')
  }

  formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }
}

