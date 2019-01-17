class Player < ApplicationRecord

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
