class Player < ApplicationRecord


	def self.get_rows(fld, dir='desc', lim=25)
		puts 'GET ROWS for ' + fld.to_s
		puts 'count:' + Player.count.to_s
		avg = 'hits / at_bats'
		divisor = "(at_bats * " +
			"(at_bats + walks + sacrifice_flies + hit_by_pitch))"
		ops = "((at_bats * (walks + hits + hit_by_pitch) + " +
			"(hits + doubles + triples + home_runs) * " +
			"(at_bats + walks + sacrifice_flies + hit_by_pitch)) / " +
			divisor + ")"
		# https://en.wikipedia.org/wiki/On-base_plus_slugging
		res = Player.select("id, given_name, surname, position, " + 
					"hits, runs, home_runs, rbi, at_bats, steals, " +
					"case #{divisor} when 0 then null " +
					"else round(cast(float8 #{ops} as numeric),2) " +
					"end as ops," +
					"case at_bats when 0 then null " +
					"else round(cast(float8 (#{avg}) as numeric), 2) end as avg", 
			).order("#{fld} #{dir.to_s} nulls last").limit(lim)
	end
 



  def self.load_xml(path)
	  Player.delete_all
	  missing = {}
	  doc = Nokogiri::XML(File.open(path))
	  cnt = 0
	  doc.xpath('//PLAYER').each do |rec| 
		cnt += 1
		player = Player.new
		rec.children.each do |field|
		  fld = field.name.downcase
		  fld = 'errs' if fld == 'errors'
		  val = field.text
		  typ = player.type_for_attribute(fld).type
		  if typ == :integer
			val = val.to_i 
		  elsif typ == :decimal
			val = val.to_f
		  end
		  player[fld] = val 
		end
		player.save!
	  end
	  # puts 'missing:' + missing.inspect
  end

end
