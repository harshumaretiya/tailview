class DrawersController < ApplicationController
  def index
  end

  # Shopping Cart Drawer
  def cart
    @cart_items = session[:cart_items] || []
  end

  def cart_items
    @cart_items = session[:cart_items] || []
    render partial: 'cart_items', locals: { cart_items: @cart_items }
  end

  def add_to_cart
    session[:cart_items] ||= []
    product = {
      'id' => SecureRandom.hex(4),
      'name' => params[:name] || "Product #{session[:cart_items].length + 1}",
      'price' => (params[:price] || rand(10..100)).to_f,
      'quantity' => 1
    }
    session[:cart_items].unshift(product) # Add to beginning
    session[:cart_items].compact!

    respond_to do |format|
      format.turbo_stream
    end
  end

  def remove_from_cart
    session[:cart_items] ||= []
    session[:cart_items].reject! { |item| item['id'] == params[:id] }
    
    respond_to do |format|
      format.turbo_stream
    end
  end

  # Notifications Drawer
  def notifications
    @notifications = session[:notifications] || []
  end

  def notifications_list
    @notifications = session[:notifications] || []
    render partial: 'notifications_list', locals: { notifications: @notifications }
  end

  def mark_read
    session[:notifications] ||= []
    notification = session[:notifications].find { |n| n['id'] == params[:id] }
    notification['read'] = true if notification
    session[:notifications] = session[:notifications].map { |n| n }
    
    respond_to do |format|
      format.turbo_stream
    end
  end

  def add_notification
    session[:notifications] ||= []
    notification = {
      'id' => SecureRandom.hex(4),
      'title' => params[:title] || "New Notification",
      'message' => params[:message] || "You have a new notification",
      'read' => false,
      'created_at' => Time.current
    }
    session[:notifications].unshift(notification) # Add to beginning
    session[:notifications] = session[:notifications].first(10) # Keep only last 10
    
    respond_to do |format|
      format.turbo_stream
    end
  end

  # User Form Drawer
  def user_form
    @user = session[:user] || { 'name' => '', 'email' => '', 'role' => 'user' }
  end

  def submit_form
    session[:user] = {
      'name' => params[:name],
      'email' => params[:email],
      'role' => params[:role] || 'user'
    }
    
    respond_to do |format|
      format.turbo_stream
    end
  end
end


