require 'spec_helper'

describe 'The Geoportal App' do

  def app
    Sinatra::Application
  end

  describe "GET '/'" do
    it "should be successful" do
      get '/'
      last_response.should be_ok
    end

  end

  describe "GET '/items'" do
    it "should be successful" do
      get '/items'
      last_response.should be_ok
    end
  end

  describe "Get '/items/show/:id'" do
    it "should be successful" do
      get '/items/show/1'
      last_response.should be_ok
    end
  end

 end

