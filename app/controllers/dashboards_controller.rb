class DashboardsController < ApplicationController
  # Main dashboard page - uses Turbo Frames for lazy loading
  def index; end

  # Stats metrics displayed in cards (auto-refreshes every 10 seconds)
  def stats
    @metrics = generate_metrics
    render :stats
  end

  # Recent activity feed (auto-refreshes every 12 seconds)
  def activity
    @activities = generate_activities.shuffle
    render :activity
  end

  # Revenue chart with period filtering (week/month/year)
  def revenue_chart
    @period = params[:period] || 'week'
    @data = generate_revenue_data(@period)
    @total = @data.sum { |d| d[:value] }
    render :revenue_chart
  end

  # User growth metrics with interactive filtering
  def user_growth
    @user_data = generate_user_data
    @total = @user_data.values.sum
    render :user_growth
  end

  private

  # Generate demo metrics for stats cards
  def generate_metrics
    {
      revenue: helpers.number_to_currency(rand(40000..90000)),
      revenue_change: format_change(rand(5.0..15.0)),
      users: rand(900..2500),
      users_change: format_change(rand(2.0..10.0)),
      orders: rand(200..600),
      pending_orders: rand(5..25),
      conversion: format_percentage(rand(2.5..4.5)),
      conversion_change: format_change(rand(0.1..0.8))
    }
  end

  # Generate demo activity feed items
  def generate_activities
    [
      { initials: 'JD', color: 'blue', message: 'John Doe placed a new order', time: '2 minutes ago', amount: format_currency(rand(80..160)) },
      { initials: 'SM', color: 'purple', message: 'Sarah Miller updated profile', time: '15 minutes ago', amount: nil },
      { initials: 'MJ', color: 'green', message: 'Mike Johnson completed payment', time: '1 hour ago', amount: format_currency(rand(60..120)) },
      { initials: 'EW', color: 'orange', message: 'Emma Wilson signed up', time: '3 hours ago', amount: nil }
    ]
  end

  # Generate revenue chart data based on selected period
  def generate_revenue_data(period)
    case period
    when 'week'
      generate_weekly_data
    when 'month'
      generate_monthly_data
    when 'year'
      generate_yearly_data
    else
      generate_weekly_data
    end
  end

  def generate_weekly_data
    %w[Mon Tue Wed Thu Fri Sat Sun].map do |label|
      { label: label, value: rand(800..1600), height: rand(40..90) }
    end
  end

  def generate_monthly_data
    (1..4).map { |w| { label: "Week #{w}", value: rand(5000..8000), height: rand(50..85) } }
  end

  def generate_yearly_data
    %w[Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec].map do |month|
      { label: month, value: rand(15000..25000), height: rand(40..85) }
    end
  end

  # Generate user growth data
  def generate_user_data
    {
      new: rand(800..1500),
      returning: rand(600..1200),
      churned: rand(30..80)
    }
  end

  # Format percentage change with + sign
  def format_change(value)
    "+#{sprintf('%.1f', value)}%"
  end

  # Format percentage value
  def format_percentage(value)
    "#{sprintf('%.2f', value)}%"
  end

  # Format currency amount for activity items
  def format_currency(amount)
    "+$#{sprintf('%.2f', amount)}"
  end
end

