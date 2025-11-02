class InteractiveController < ApplicationController
  def index
    @notifications = [
      { id: 1, title: "New message", message: "You have a new message from John", time: "2 min ago", read: false, type: "message" },
      { id: 2, title: "System update", message: "System will be updated tonight", time: "1 hour ago", read: false, type: "info" },
      { id: 3, title: "Payment received", message: "Payment of $150 received", time: "3 hours ago", read: true, type: "success" },
      { id: 4, title: "Warning", message: "Disk space running low", time: "5 hours ago", read: false, type: "warning" }
    ]
    
    @recent_activities = [
      { user: "Alice Johnson", action: "uploaded a file", target: "project-proposal.pdf", time: "2 minutes ago" },
      { user: "Bob Smith", action: "commented on", target: "Design Review", time: "15 minutes ago" },
      { user: "Carol White", action: "completed", target: "Sprint 23", time: "1 hour ago" },
      { user: "David Brown", action: "created", target: "New Task", time: "2 hours ago" }
    ]
  end
end

