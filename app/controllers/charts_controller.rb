class ChartsController < ApplicationController
  # Main charts page - showcases all area chart variations
  def index; end

  # Basic area chart - shows single dataset (visitors)
  def basic_area_chart
    @period = params[:period] || 'week'
    @data = generate_visitor_data(@period)
    @total = @data.sum { |d| d[:value] }
    @previous_total = calculate_previous_total(@total)
    @change_percentage = calculate_change(@total, @previous_total)
    render :basic_area_chart
  end


  # Stacked area chart - shows multiple datasets (desktop, mobile, tablet)
  def stacked_area_chart
    @period = params[:period] || 'month'
    @data = generate_device_data(@period)
    @totals = calculate_device_totals(@data)
    @change = calculate_change(@totals[:total], @totals[:previous])
    render :stacked_area_chart
  end

  # Gradient area chart - shows revenue over time with gradient fill
  def gradient_area_chart
    @period = params[:period] || 'month'
    @data = generate_revenue_data(@period)
    @total_revenue = @data.sum { |d| d[:value] }
    @avg_revenue = (@total_revenue / @data.length.to_f).round(2)
    @change = calculate_change(@total_revenue, @total_revenue * PREVIOUS_PERIOD_MULTIPLIER)
    render :gradient_area_chart
  end

  # Multi-metric chart - shows multiple separate metrics
  def multi_metric_chart
    @period = params[:period] || 'month'
    @visitors_data = generate_visitor_data(@period)
    @revenue_data = generate_revenue_data(@period)
    @conversion_data = generate_conversion_data(@period)
    @metrics = {
      visitors: { data: @visitors_data, total: @visitors_data.sum { |d| d[:value] } },
      revenue: { data: @revenue_data, total: @revenue_data.sum { |d| d[:value] } },
      conversions: { data: @conversion_data, total: @conversion_data.sum { |d| d[:value] } }
    }
    render :multi_metric_chart
  end

  # Comparison chart - compares current vs previous period
  def comparison_chart
    @period = params[:period] || 'month'
    @current_data = generate_visitor_data(@period)
    @previous_data = generate_previous_period_data(@period)
    @current_total = @current_data.sum { |d| d[:value] }
    @previous_total = @previous_data.sum { |d| d[:value] }
    @change = calculate_change(@current_total, @previous_total)
    render :comparison_chart
  end

  private

  # Generate visitor data based on period
  def generate_visitor_data(period)
    case period
    when 'week'
      generate_weekly_visitors
    when 'month'
      generate_monthly_visitors
    when 'year'
      generate_yearly_visitors
    else
      generate_monthly_visitors
    end
  end


  # Generate revenue data
  def generate_revenue_data(period)
    multiplier = case period
    when 'week' then 100
    when 'month' then 500
    when 'year' then 5000
    else 500
    end

    labels = get_labels(period)
    labels.map.with_index do |label, i|
      base = rand(20..80) * multiplier
      # Add trend - increasing over time
      trend_value = base + (i * multiplier * 0.1)
      { label: label, value: trend_value.to_i }
    end
  end

  # Generate conversion data (percentages)
  def generate_conversion_data(period)
    labels = get_labels(period)
    labels.map do |label|
      { label: label, value: rand(2.0..5.5).round(2) }
    end
  end

  # Generate device-specific data for stacked charts
  def generate_device_data(period)
    labels = get_labels(period)
    labels.map do |label|
      {
        label: label,
        desktop: rand(800..1500),
        mobile: rand(1200..2000),
        tablet: rand(300..600)
      }
    end
  end

  # Generate previous period data for comparison
  def generate_previous_period_data(period)
    labels = get_labels(period)
    labels.map do |label|
      { label: label, value: rand(1500..2800) }
    end
  end

  # Get labels based on period
  def get_labels(period)
    case period
    when 'week'
      %w[Mon Tue Wed Thu Fri Sat Sun]
    when 'month'
      (1..30).map { |d| "#{d}" }
    when 'year'
      %w[Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec]
    else
      (1..30).map { |d| "#{d}" }
    end
  end

  # Generate weekly visitor data
  def generate_weekly_visitors
    %w[Mon Tue Wed Thu Fri Sat Sun].map do |label|
      { label: label, value: rand(1800..3200) }
    end
  end

  # Generate monthly visitor data (30 days)
  def generate_monthly_visitors
    (1..30).map do |day|
      # Simulate weekend dips and weekday peaks
      day_of_week = day % 7
      base_value = [0, 6].include?(day_of_week) ? rand(1500..2200) : rand(2200..3500)
      { label: "#{day}", value: base_value }
    end
  end

  # Generate yearly visitor data
  def generate_yearly_visitors
    %w[Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec].map.with_index do |label, i|
      # Simulate growth trend
      base = 15000
      growth = i * 1000
      variation = rand(-2000..3000)
      { label: label, value: base + growth + variation }
    end
  end


  # Calculate device totals for stacked charts
  def calculate_device_totals(data)
    desktop_total = data.sum { |d| d[:desktop] }
    mobile_total = data.sum { |d| d[:mobile] }
    tablet_total = data.sum { |d| d[:tablet] }
    total = desktop_total + mobile_total + tablet_total
    
    {
      desktop: desktop_total,
      mobile: mobile_total,
      tablet: tablet_total,
      total: total,
      previous: (total * PREVIOUS_PERIOD_MULTIPLIER).to_i
    }
  end

  # Calculate percentage change
  def calculate_change(current, previous)
    return 0 if previous.zero?
    ((current - previous) / previous.to_f * 100).round(1)
  end

  # Calculate previous total (simulated percentage change)
  # Using a constant multiplier for consistency
  PREVIOUS_PERIOD_MULTIPLIER = 0.95
  
  def calculate_previous_total(current)
    (current * PREVIOUS_PERIOD_MULTIPLIER).to_i
  end

  # Format percentage with + or - sign
  def format_change(value)
    value >= 0 ? "+#{value}%" : "#{value}%"
  end
end

