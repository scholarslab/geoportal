require 'sinatra'
require 'erb'
require File.join(File.dirname(__FILE__), 'environment')

error do
  error = request.env['sinatra.error']
  Kernel.puts e.backtrace.join("\n")
  'Application error'
end

helpers do

end

get '/' do
  erb :index
end

get '/items/?' do
  erb :results
end

get '/items/show/:id' do
  erb :item
end
