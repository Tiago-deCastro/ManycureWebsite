Rails.application.routes.draw do
  root to: 'pages#home'
  get '/releases' => 'pages#releases'
  get '/dates' => 'pages#dates'
  get '/mixes' => 'pages#mixes'
  get '/contacts' => 'pages#contacts'

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
