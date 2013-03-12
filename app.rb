require 'sinatra'
require 'erb'
require "sinatra/content_for"

require File.join(File.dirname(__FILE__), 'environment')

error do
  error = request.env['sinatra.error']
  Kernel.puts e.backtrace.join("\n")
  'Application error'
end

helpers do

  helpers Sinatra::ContentFor

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

  def get_item(uri)
    Nokogiri::XML(open(uri))
  end

  def meta_url
    gn_url + '/xml.metadata.get?id='
  end

  def map_url(wms)
    #SiteConfig.geonetwork_url + "/geoview?wms=" + wms
  end

  def kml_url(layers)
    # kml has a special reflector
    SiteConfig.geoserver_url + "/wms/kml?layers=#{layers}"
  end

  def kml_url2(workspace, layers)
    "#{SiteConfig.geoserver_url}/#{workspace}/wms/kml?layers=#{layers}"
  end

  def pdf_url(layers)
    content_url(layers, 'application/pdf')
  end

  def jpeg_url(layers)
    content_url(layers, 'image/jpeg')
  end

  def ol_url(layers)
    content_url(layers, 'openlayers')
  end

  def content_url(layers, format, styles = '')
    SiteConfig.geoserver_url + "/wms/reflect?layers=" + layers + "&format=" + format + "&styles=" + styles + "&width=680&height=480"
  end

  def cat_url(item)
    SiteConfig.library_catalog + item
  end

  def layer2variable(layer)
    "_" + layer
  end

  def clean_layer(layer)
     /\:(.*)/.match(layer.text)[1].to_s
  end

  # rails-style link_to
  def link_to(url, text=url, opts={})
    attributes = ""
    opts.each {|key, value| attributes << key.to_s << "=\"" << value << "\" "}
    "<a href=\"#{url}\" #{attributes}>#{text}</a>"
  end

  def nl2br(text)
    text.gsub(/\n/, '<br/>')
  end

end

get '/' do
  erb :index
end

get '/about/?' do
  @page_title = "About"
  erb :about
end

get '/help/?' do
  @page_title = "Help"
  erb :help
end

get '/items/?' do
  @page_title = "Search Results"
  @search = Geoportal::Search.new(params, gn_url)
  @doc = @search.find()

  @search.hits = @doc.xpath('.//metadata').length

  if(@search.hits < @search.end)
    @search.end = @search.hits
  end

  if(@search.end == 0)
    @search.start = 0
  end

  @meta_url = meta_url

  erb :results
end

get '/items/:id/?' do
  @id = params[:id].to_i
  @page_title = "Item #{@id}"

  # Geonetwork stuff
  @metadata = gn_url + "/xml.metadata.get?id=#{@id}"
  @doc = get_item(@metadata)
  @doc.extend Geoportal::Item

  # TODO: refactor to Item object
  @workspace =  /(.*)\:/.match(@doc.layers.first)[1]
  @service_base = SiteConfig.geoserver_url + "/" + @workspace 

  # Yeah...the view
  erb :item
end
