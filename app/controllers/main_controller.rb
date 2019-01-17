class MainController < ApplicationController
  def index
  end

  def upload_xml
  	puts 'IN UPLOAD_XML'
	xml_file = params[:xml_file]
	tmp_file = xml_file.tempfile
	pub_path = Rails.root.join('public', 'uploads', xml_file.original_filename)
	File.delete(pub_path) if File.exist?(pub_path)	

	File.open(pub_path, 'wb') do |file|
		file.write(tmp_file.read)
	end

    result = {}

	render json: result  # .data.to_json

  end


end
