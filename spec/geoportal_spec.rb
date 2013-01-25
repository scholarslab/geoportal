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

 end

describe Geoportal::Request do
  before :each do
    @params = {
      's' => 1,
    }
  end
end
