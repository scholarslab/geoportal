# A sample Gemfile
source "https://rubygems.org"
#ruby "1.9.3"

gem "sinatra", "~>1.4.5"
gem "sinatra-contrib", "~>1.4.2"
gem "foreman", "~> 0.62"
#gem "rgeoserver"
#gem "dotenv"

group :rackup do
  gem "rack"
  gem "thin"
end

group :development do
  gem "shotgun"
  gem "awesome_print"
  gem "susy"

  # deployment
  gem "capistrano"
  #gem "capistrano-multistage"

  # guard stuff
  gem 'guard'
  gem 'guard-bundler'
  gem 'guard-rspec'
  gem 'guard-livereload'
  gem 'guard-jasmine'
  gem 'rb-fsevent', :require => false
  gem 'growl', :require => false
  gem 'terminal-notifier', :require => false
end

group :development, :test do
  gem "rake"
end

group :test do
  gem 'rspec'
  gem "jasmine"
  gem "jasmine-headless-webkit"
  gem 'capybara'
  gem 'capybara-webkit'
  gem 'rack-test', :require => "rack/test"
end
