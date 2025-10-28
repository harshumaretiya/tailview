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
  get '/forms', to: 'forms#index'
  
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

