class Player < ApplicationRecord

  def tb
  	self.hits + 
  	(self.doubles * 2) + 
  	(self.triples * 3) +
  	(self.home_runs * 4)
  end

=begin
  def ops
  	puts 'this' + self.inspect
  	 (at_bats * (walks + hits + hit_by_pitch) + 
  	 (hits + doubles + triples + home_runs) * 
    (at_bats + walks + sacrifice_flies + hit_by_pitch)) / 
  	 (at_bats * (at_bats + walks + sacrifice_flies + hit_by_pitch))
  	end
=end


  # Player.select(:id, :hits, :runs, :home_runs, :rbi, :steals).order(hits: :desc).limit(25)


  def self.load_xml(path)
     # doc = Nokogiri.XML(open(path))
     # doc = File.open(path) { |f| Nokogiri::XML(f) }
     missing = {}
     doc = Nokogiri::XML(File.open(path))
     doc.xpath('//PLAYER').each do |rec| 
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
     	# binding.pry
     	# break
     end
     puts 'missing:' + missing.inspect
  end

end
