
class MainController < ApplicationController
  def index
  	if request.xhr?
  		params.permit(:field)
  		fld = params[:field]
  	   res = Player.get_rows(fld)
      render json: res.to_json
  	else
  		puts 'plain render'
  		render 'index'
  	end
  end

  def upload_xml
  	puts 'UPLOAD'
	xml_file = params[:xml_file]
	tmp_file = xml_file.tempfile
	pub_path = Rails.root.join('public', 'uploads', xml_file.original_filename)
	File.delete(pub_path) if File.exist?(pub_path)	

	File.open(pub_path, 'wb') do |file|
		file.write(tmp_file.read)
	end
   puts 'cal load'
	Player.load_xml(pub_path)

   result = {}

	render json: result  # .data.to_json

  end



end
