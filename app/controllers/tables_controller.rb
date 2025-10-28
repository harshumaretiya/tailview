class TablesController < ApplicationController
  def index
    @users = generate_sample_users
    @products = generate_sample_products
    @transactions = generate_sample_transactions
  end

  def inline_edit
    sleep 0.3 # Simulate network delay
    
    render turbo_stream: turbo_stream.replace(
      "user_#{params[:id]}",
      partial: "tables/user_row",
      locals: { user: { id: params[:id], name: params[:name], email: params[:email], role: params[:role], status: params[:status] } }
    )
  end

  def delete_row
    sleep 0.2
    
    render turbo_stream: turbo_stream.remove("user_#{params[:id]}")
  end

  def load_details
    sleep 0.5 # Simulate loading
    
    @user = {
      id: params[:id],
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 (555) 123-4567",
      address: "123 Main St, San Francisco, CA 94102",
      created_at: "Jan 15, 2024",
      last_login: "2 hours ago"
    }
    
    render partial: "tables/user_details", locals: { user: @user }
  end

  def paginate
    page = params[:page]&.to_i || 1
    per_page = 5
    
    all_users = generate_sample_users(20)
    @users = all_users.slice((page - 1) * per_page, per_page) || []
    @current_page = page
    @total_pages = (all_users.length.to_f / per_page).ceil
    
    sleep 0.3
    
    render turbo_stream: [
      turbo_stream.replace("users_table", partial: "tables/users_table", locals: { users: @users }),
      turbo_stream.replace("pagination", partial: "tables/pagination", locals: { current_page: @current_page, total_pages: @total_pages })
    ]
  end

  def filter
    query = params[:query].to_s.downcase
    all_users = generate_sample_users
    
    @users = if query.present?
      all_users.select do |user|
        user[:name].downcase.include?(query) ||
        user[:email].downcase.include?(query) ||
        user[:role].downcase.include?(query)
      end
    else
      all_users
    end
    
    sleep 0.2
    
    render turbo_stream: turbo_stream.replace(
      "users_table",
      partial: "tables/users_table",
      locals: { users: @users }
    )
  end

  private

  def generate_sample_users(count = 8)
    names = ["John Doe", "Jane Smith", "Mike Johnson", "Sarah Williams", "David Brown", "Emily Davis", "Chris Wilson", "Lisa Anderson", "Tom Martinez", "Amy Taylor", "Kevin Moore", "Jessica White", "Brian Lee", "Michelle Harris", "Daniel Clark", "Laura Lewis", "James Walker", "Maria Hall", "Robert Allen", "Jennifer Young"]
    roles = ["Admin", "Editor", "Viewer", "Manager"]
    statuses = ["Active", "Inactive", "Pending"]
    
    names.first(count).map.with_index do |name, i|
      {
        id: i + 1,
        name: name,
        email: "#{name.downcase.gsub(' ', '.')}@example.com",
        role: roles[i % roles.length],
        status: statuses[i % statuses.length],
        avatar: name.split.map(&:first).join
      }
    end
  end

  def generate_sample_products
    [
      { name: "Wireless Headphones", price: 299.99, stock: 145, status: "In Stock" },
      { name: "Laptop Stand", price: 49.99, stock: 3, status: "Low Stock" },
      { name: "USB-C Cable", price: 19.99, stock: 0, status: "Out of Stock" },
      { name: "Mechanical Keyboard", price: 159.99, stock: 87, status: "In Stock" },
      { name: "Wireless Mouse", price: 79.99, stock: 234, status: "In Stock" }
    ]
  end

  def generate_sample_transactions
    [
      { id: "001", description: "Payment from Customer A", date: "Jan 15, 2025", amount: 1200.00, type: "credit" },
      { id: "002", description: "Subscription Renewal", date: "Jan 16, 2025", amount: 99.00, type: "credit" },
      { id: "003", description: "Refund to Customer B", date: "Jan 17, 2025", amount: -350.00, type: "debit" },
      { id: "004", description: "Payment from Customer C", date: "Jan 18, 2025", amount: 2500.00, type: "credit" },
      { id: "005", description: "Service Fee", date: "Jan 19, 2025", amount: -45.00, type: "debit" }
    ]
  end
end

