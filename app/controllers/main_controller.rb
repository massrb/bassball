
class MainController < ApplicationController
  def index
  	if request.xhr?
  		params.permit(:field)

  		puts 'ajax request'
  		fld = params[:field]
  		calc = "(at_bats * (walks + hits + hit_by_pitch) + " +
  			"(hits + doubles + triples + home_runs) * " +
  			"(at_bats + walks + sacrifice_flies + hit_by_pitch)) / " +
  			"(at_bats * " +
  			"(at_bats + walks + sacrifice_flies + hit_by_pitch))"
  		# https://en.wikipedia.org/wiki/On-base_plus_slugging
  		res = Player.select("id, given_name, surname, position, " + 
  			                 "hits, runs, home_runs, rbi, " +
  		                    "steals, #{calc} as ops" 
  			).order("#{fld} desc").limit(25)
      render json: res.to_json
  	else
  		puts 'plain render'
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

    result = {}

	render json: result  # .data.to_json

  end



end
