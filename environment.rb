require 'ostruct'
require 'sinatra' unless defined?(Sinatra)

configure do
  SiteConfig = OpenStruct.new(
    :title => 'UVA Library Geoportal',
    :geonetwork_url => 'http://libsvr35.lib.virginia.edu',
    :geonetwork_port => '8080',
    :library_catalog => 'http://search.lib.virginia.edu/catalog/'
  )

  # Load modules
  $LOAD_PATH.unshift("#{File.dirname(__FILE__)}/lib/")
  Dir.glob("#{File.dirname(__FILE__)}/lib/*.rb") {|lib| require File.basename(lib, '.*') }

  configure :development do

  end

  configure :production do

  end

end
