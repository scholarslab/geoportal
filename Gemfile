# A sample Gemfile
source "https://rubygems.org"
ruby "1.9.3"

gem "sinatra"
gem "foreman"

group :rackup do
  gem "rack"
  gem "thin"
end

group :development do
  gem "shotgun"
  gem "awesome_print"
  gem "susy"
  # guard stuff
  gem 'guard'
  gem 'guard-bundler'
  gem 'guard-rspec'
  gem 'guard-livereload'
  gem 'rb-fsevent', :require => false
  gem 'growl', :require => false
  gem 'terminal-notifier', :require => false
end

group :development, :test do
  gem "rake"
end

group :test do
  gem 'rspec'
  gem 'capybara'
  gem 'rack-test', :require => "rack/test"
end
