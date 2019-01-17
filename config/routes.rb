Rails.application.routes.draw do
  get 'hello_world', to: 'hello_world#index'
  post '/main/upload_xml', to: 'main#upload_xml'
  get 'main/index'
  root 'main#index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
