class OrdersController < ApplicationController
  def index
    # Sample order data - in a real app, this would come from a database
    @orders = [
      {
        id: "WU88191111",
        date: Date.new(2021, 1, 22),
        total: 302.00,
        items: [
          {
            name: "Nomad Tumbler",
            description: "This durable double-walled insulated tumbler keeps your beverages at the perfect temperature all day long. Hot, cold, or even lukewarm if you're weird like that, this bottle is ready for your next adventure.",
            price: 35.00,
            image: "https://tailwindcss.com/plus-assets/img/ecommerce-images/order-history-page-06-product-01.jpg",
            status: "Out for delivery"
          },
          {
            name: "Leather Long Wallet",
            description: "We're not sure who carries cash anymore, but this leather long wallet will keep those bills nice and fold-free. The cashier hasn't seen print money in years, but you'll make a damn fine impression with your pristine cash monies.",
            price: 118.00,
            image: "https://tailwindcss.com/plus-assets/img/ecommerce-images/order-history-page-06-product-02.jpg",
            status: "Delivered",
            delivered_date: Date.new(2021, 1, 25)
          },
          {
            name: "Minimalist Wristwatch",
            description: "This contemporary wristwatch has a clean, minimalist look and high quality components. Everyone knows you'll never use it to check the time, but wow, does that wrist look good with this timepiece on it.",
            price: 149.00,
            image: "https://tailwindcss.com/plus-assets/img/ecommerce-images/order-history-page-06-product-03.jpg",
            status: "Delivered",
            delivered_date: Date.new(2021, 1, 25)
          }
        ]
      },
      {
        id: "WU88191009",
        date: Date.new(2021, 1, 5),
        total: 27.00,
        items: [
          {
            name: "Mini Sketchbook Set",
            description: "These pocket-sized sketchbooks feature recycled paper covers and screen printed designs from our top-selling poster collection. You have ideas, doodles, and notes, but nowhere to write them down. We have paper, wrapped in sturdier paper.",
            price: 27.00,
            image: "https://tailwindcss.com/plus-assets/img/ecommerce-images/order-history-page-06-product-04.jpg",
            status: "Cancelled"
          }
        ]
      }
    ]
  end
end

