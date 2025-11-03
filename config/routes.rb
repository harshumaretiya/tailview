Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker
  get '/', to: 'pages#home'
  get '/guidelines', to: 'pages#guidelines'
  
  # Component Examples Routes
  get '/buttons', to: 'buttons#index'
  get '/alerts', to: 'alerts#index'
  post '/alerts/add_alert', to: 'alerts#add_alert', as: :alerts_add_alert
  delete '/alerts/clear_alerts', to: 'alerts#clear_alerts', as: :alerts_clear_alerts
  get '/cards', to: 'cards#index'
  get '/badges', to: 'badges#index'
  get '/spinners', to: 'spinners#index'
  post '/spinners/trigger_spinner', to: 'spinners#trigger_spinner', as: :spinners_trigger_spinner
  post '/spinners/simulate_operation', to: 'spinners#simulate_operation', as: :spinners_simulate_operation
  get '/avatars', to: 'avatars#index'
  get '/toasts', to: 'toasts#index'
  get '/tabs', to: 'tabs#index'
  get '/accordions', to: 'accordions#index'
  get '/accordions/faq_details/:id', to: 'accordions#load_faq_details', as: :accordions_faq_details
  patch '/accordions/update_setting', to: 'accordions#update_setting', as: :accordions_update_setting
  get '/tables', to: 'tables#index'
  post '/tables/inline_edit', to: 'tables#inline_edit', as: :tables_inline_edit
  delete '/tables/delete_row/:id', to: 'tables#delete_row', as: :tables_delete_row
  get '/tables/load_details/:id', to: 'tables#load_details', as: :tables_load_details
  get '/tables/paginate', to: 'tables#paginate', as: :tables_paginate
  get '/tables/filter', to: 'tables#filter', as: :tables_filter
  get '/popovers', to: 'popovers#index'
  get '/breadcrumbs', to: 'breadcrumbs#index'
  get '/modals', to: 'modals#index'
  get '/drawers', to: 'drawers#index'
  get '/datepickers', to: 'datepickers#index'
  get '/interactive', to: 'interactive#index'
  # Interactive Drawer Examples
  get '/drawers/cart', to: 'drawers#cart', as: :drawers_cart
  get '/drawers/cart_items', to: 'drawers#cart_items', as: :drawers_cart_items
  post '/drawers/add_to_cart', to: 'drawers#add_to_cart', as: :drawers_add_to_cart
  delete '/drawers/remove_from_cart/:id', to: 'drawers#remove_from_cart', as: :drawers_remove_from_cart
  get '/drawers/notifications', to: 'drawers#notifications', as: :drawers_notifications
  get '/drawers/notifications_list', to: 'drawers#notifications_list', as: :drawers_notifications_list
  post '/drawers/mark_read/:id', to: 'drawers#mark_read', as: :drawers_mark_read
  post '/drawers/add_notification', to: 'drawers#add_notification', as: :drawers_add_notification
  get '/drawers/user_form', to: 'drawers#user_form', as: :drawers_user_form
  post '/drawers/submit_form', to: 'drawers#submit_form', as: :drawers_submit_form
  get '/forms', to: 'forms#index'
  get '/workspace', to: 'workspaces#index'
  get '/dashboard', to: 'dashboards#index'
  get '/dashboard/stats', to: 'dashboards#stats'
  get '/dashboard/activity', to: 'dashboards#activity'
  get '/dashboard/revenue_chart', to: 'dashboards#revenue_chart', as: :dashboard_revenue_chart
  get '/dashboard/user_growth', to: 'dashboards#user_growth', as: :dashboard_user_growth
  get '/products', to: 'products#index'
  get '/team', to: 'teams#index'
  get '/deployments', to: 'deployments#index'
  get '/deployments/refresh_activities', to: 'deployments#refresh_activities', as: :deployments_refresh_activities
  get '/tasks', to: 'tasks#index'
  get '/orders', to: 'orders#index'
  
  # Charts - Area Charts with Interactive Features
  get '/charts', to: 'charts#index'
  get '/charts/basic_area_chart', to: 'charts#basic_area_chart', as: :charts_basic_area
  get '/charts/stacked_area_chart', to: 'charts#stacked_area_chart', as: :charts_stacked_area
  get '/charts/gradient_area_chart', to: 'charts#gradient_area_chart', as: :charts_gradient_area
  get '/charts/multi_metric_chart', to: 'charts#multi_metric_chart', as: :charts_multi_metric
  get '/charts/comparison_chart', to: 'charts#comparison_chart', as: :charts_comparison
  
  # Test route for debugging
  get '/test-turbo-frame', to: 'turbo_frame_examples#settings'

  # Turbo Frame Examples
  scope '/turbo-frame-examples', as: 'turbo_frame_examples' do
    get 'user-profile', to: 'turbo_frame_examples#user_profile'
    get 'settings', to: 'turbo_frame_examples#settings'
    get 'create', to: 'turbo_frame_examples#create'
    get 'edit', to: 'turbo_frame_examples#edit'
    get 'delete', to: 'turbo_frame_examples#delete'
    post 'submit', to: 'turbo_frame_examples#submit'
    get 'edit-profile', to: 'turbo_frame_examples#edit_profile'
    get 'user-details', to: 'turbo_frame_examples#user_details'
    get 'user-data', to: 'turbo_frame_examples#user_data'
    get 'child-content', to: 'turbo_frame_examples#child_content'
    get 'lazy-data', to: 'turbo_frame_examples#lazy_data'
  end

  # Defines the root path route ("/")
  # root "posts#index"
end

