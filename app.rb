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

get '/search?' do
  erb :results
end
