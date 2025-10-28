# frozen_string_literal: true

class TurboFrameExamplesController < ApplicationController
  # Button Turbo Frame Examples
  def user_profile
    respond_to do |format|
      format.turbo_stream
      format.html { render partial: "user_profile" }
    end
  end

  def settings
    respond_to do |format|
      format.turbo_stream
      format.html { render partial: "settings" }
    end
  end

  # Dropdown Turbo Frame Examples
  def create
    respond_to do |format|
      format.turbo_stream
      format.html { render partial: "create_action" }
    end
  end

  def edit
    respond_to do |format|
      format.turbo_stream
      format.html { render partial: "edit_action" }
    end
  end

  def delete
    respond_to do |format|
      format.turbo_stream
      format.html { render partial: "delete_action" }
    end
  end

  # Form Turbo Frame Examples
  def submit
    @form_data = params.permit(:name, :email, :message)
    
    respond_to do |format|
      format.turbo_stream
      format.html { render partial: "form_result" }
    end
  end

  # Card Turbo Frame Examples
  def edit_profile
    respond_to do |format|
      format.turbo_stream
      format.html { render partial: "edit_profile" }
    end
  end

  def user_details
    respond_to do |format|
      format.turbo_stream
      format.html { render partial: "user_details" }
    end
  end

  def user_data
    @user = {
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Admin",
      last_login: "2 hours ago"
    }
    
    respond_to do |format|
      format.turbo_stream
      format.html { render partial: "user_data" }
    end
  end

  # Advanced Examples
  def child_content
    respond_to do |format|
      format.turbo_stream
      format.html { render partial: "child_content" }
    end
  end

  def lazy_data
    # Simulate loading delay
    sleep(2)
    
    @items = [
      { name: "Item 1", status: "Active" },
      { name: "Item 2", status: "Pending" },
      { name: "Item 3", status: "Completed" }
    ]
    
    respond_to do |format|
      format.turbo_stream
      format.html { render partial: "lazy_data" }
    end
  end
end
