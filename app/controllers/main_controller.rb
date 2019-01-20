
class MainController < ApplicationController
  def index
  	if request.xhr?
  		params.permit(:fld, :dir, :pg)
  		fld = params[:fld]
  		dir = params[:dir]
  		page = params[:pg]
  	   res = Player.get_rows(fld,dir).page(page)
  	   rec_count = Player.count
  	   data = {rec_count: rec_count, data: res}
      render json: data.to_json
  	else
  		render 'index'
  	end
  end

  def upload_xml
	xml_file = params[:xml_file]
	tmp_file = xml_file.tempfile
	pub_path = Rails.root.join('public', 'uploads', xml_file.original_filename)
	File.delete(pub_path) if File.exist?(pub_path)	

	File.open(pub_path, 'wb') do |file|
		file.write(tmp_file.read)
	end
	Player.load_xml(pub_path)

   result = {}

	render json: result  # .data.to_json

  end



end
