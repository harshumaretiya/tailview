class ProductsController < ApplicationController
  CATEGORIES = ["All", "Electronics", "Clothing", "Home & Living", "Gaming"].freeze

  def index
    @categories = CATEGORIES
    @category = params[:category].presence || "All"
    @view = params[:view].in?(["grid", "list"]) ? params[:view] : "grid"
    @page = params[:page].to_i
    @page = 1 if @page < 1
    per_page = 8

    all_products = generate_products(40)
    filtered = @category == "All" ? all_products : all_products.select { |p| p[:category] == @category }

    @total_pages = (filtered.size.to_f / per_page).ceil
    @products = filtered.slice((@page - 1) * per_page, per_page) || []

    if turbo_frame_request?
      render partial: "products_frame", locals: { products: @products, page: @page, total_pages: @total_pages, category: @category, categories: @categories, view: @view }
    end
  end

  private

  def generate_products(count)
    require "faker"
    categories = CATEGORIES.drop(1)
    emojis = {
      "Electronics" => ["📱", "⌚", "🎧", "💻", "🔋"],
      "Clothing" => ["👕", "🧥", "👟", "🧢"],
      "Home & Living" => ["🛋️", "🪑", "🪞", "🧺"],
      "Gaming" => ["🎮", "🕹️", "🎧"],
    }
    Array.new(count) do
      category = categories.sample
      {
        id: SecureRandom.uuid,
        name: Faker::Commerce.product_name,
        price: Faker::Commerce.price(range: 20..500),
        category: category,
        emoji: emojis[category].sample
      }
    end
  end
end

