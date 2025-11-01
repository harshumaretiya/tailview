class DeploymentsController < ApplicationController
  def index
    @project = {
      name: "Planetaria",
      repo: "mobile-api",
      status: "Production",
      status_color: "indigo",
      deploy_source: "Deploys from GitHub via main branch",
      online: true
    }

    @stats = {
      deploy_count: 405,
      avg_deploy_time: 3.65,
      server_count: 3,
      success_rate: 98.5
    }

    @activities = default_activities

    @teams = [
      { name: "Planetaria", initial: "P" },
      { name: "Protocol", initial: "P" },
      { name: "Tailwind Labs", initial: "T" }
    ]

    @navigation_items = [
      { name: "Projects", icon: "projects", href: "#", active: false },
      { name: "Deployments", icon: "deployments", href: "#", active: true },
      { name: "Activity", icon: "activity", href: "#", active: false },
      { name: "Domains", icon: "domains", href: "#", active: false },
      { name: "Usage", icon: "usage", href: "#", active: false },
      { name: "Settings", icon: "settings", href: "#", active: false }
    ]

    @secondary_nav_items = [
      { name: "Overview", href: "#", active: true },
      { name: "Activity", href: "#", active: false },
      { name: "Settings", href: "#", active: false },
      { name: "Collaborators", href: "#", active: false },
      { name: "Notifications", href: "#", active: false }
    ]

  end

  def refresh_activities
    # Simulate refreshing activities - add new activity at the top
    @activities = [
      {
        id: 999,
        user_name: "System",
        user_avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        commit_hash: SecureRandom.hex(4),
        branch: "main",
        status: "completed",
        duration: "#{rand(20..60)}s",
        deployed_at: Time.current
      }
    ] + default_activities

    respond_to do |format|
      format.turbo_stream { render partial: 'activities_table', locals: { activities: @activities } }
      format.html { render partial: 'activities_table', locals: { activities: @activities } }
    end
  end

  private

  def default_activities
    [
      {
        id: 1,
        user_name: "Michael Foster",
        user_avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        commit_hash: "2d89f0c8",
        branch: "main",
        status: "completed",
        duration: "25s",
        deployed_at: 45.minutes.ago
      },
      {
        id: 2,
        user_name: "Lindsay Walton",
        user_avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        commit_hash: "249df660",
        branch: "main",
        status: "completed",
        duration: "1m 32s",
        deployed_at: 3.hours.ago
      },
      {
        id: 3,
        user_name: "Courtney Henry",
        user_avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        commit_hash: "11464223",
        branch: "main",
        status: "error",
        duration: "1m 4s",
        deployed_at: 12.hours.ago
      },
      {
        id: 4,
        user_name: "Courtney Henry",
        user_avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        commit_hash: "dad28e95",
        branch: "main",
        status: "completed",
        duration: "2m 15s",
        deployed_at: 2.days.ago
      },
      {
        id: 5,
        user_name: "Michael Foster",
        user_avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        commit_hash: "624bc94c",
        branch: "main",
        status: "completed",
        duration: "1m 12s",
        deployed_at: 5.days.ago
      },
      {
        id: 6,
        user_name: "Courtney Henry",
        user_avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        commit_hash: "e111f80e",
        branch: "main",
        status: "completed",
        duration: "1m 56s",
        deployed_at: 1.week.ago
      },
      {
        id: 7,
        user_name: "Michael Foster",
        user_avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        commit_hash: "5e136005",
        branch: "main",
        status: "completed",
        duration: "3m 45s",
        deployed_at: 1.week.ago
      },
      {
        id: 8,
        user_name: "Whitney Francis",
        user_avatar: "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        commit_hash: "5c1fd07f",
        branch: "main",
        status: "completed",
        duration: "37s",
        deployed_at: 2.weeks.ago
      }
    ]
  end
end
