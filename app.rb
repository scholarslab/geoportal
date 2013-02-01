require 'sinatra'
require 'erb'
require File.join(File.dirname(__FILE__), 'environment')


error do
  error = request.env['sinatra.error']
  Kernel.puts e.backtrace.join("\n")
  'Application error'
end

helpers do


  def search_feed(query_string = '')
    rss = "#{gn_url}/rss.search?any=#{query_string}"
    "<a href='#{rss}'>RSS Feed</a>"
  end

  def gn_base
    SiteConfig.geonetwork_url + SiteConfig.geonetwork_port + '/' + SiteConfig.geonetwork_mount
  end

  def gn_url(lang = 'en')
    gn_base + "/srv/" + lang
  end

  def map_url(wms)
    #SiteConfig.geonetwork_url + "/geoview?wms=" + wms
  end

  def kml_url(layers)
    gn_base + "/geoserver/wms/kml?layers=#{layers}"
  end

  def content_url(layers, format, styles)
    gn_base + "/geoserver/wms/reflect?layers=" + layers + "&format=" + format + "&styles=" + styles + "&width=680&height=480"
  end

  def cat_url(item)
    #options.catalog + item
  end
end

get '/' do
  erb :index
end

get '/items/?' do
  @page_title = "Search Results"
  @search = Geoportal::Search.new(params, gn_url)
  @doc = @search.find()
  @hits = @doc.xpath('.//metadata').length

  erb :results
end

# TODO: Needs a rescue
get '/items/show/:id' do
  @id = params[:id].to_i
  @page_title = "Item #{@id}"

  @metadata = gn_url + "/xml.metadata.get?id=#{@id}"
  erb :item
end
