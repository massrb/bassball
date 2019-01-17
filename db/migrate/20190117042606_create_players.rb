class CreatePlayers < ActiveRecord::Migration[5.2]
  def change
    create_table :players do |t|
      t.string :surname
      t.string :given_name
      t.string :position
      t.integer :games
      t.integer :games_started
      t.decimal :at_bats, :precision => 15, :scale => 10
      t.integer :runs
      t.integer :hits
      t.integer :doubles
      t.integer :triples
      t.integer :home_runs
      t.integer :rbi
      t.integer :steals
      t.integer :caught_stealing
      t.integer :sacrifice_hits
      t.integer :sacrifice_flies
      t.integer :errs
      t.integer :pb
      t.integer :walks
      t.integer :struck_out
      t.integer :hit_by_pitch
      t.integer :throws
      t.integer :wins
      t.integer :losses
      t.integer :saves
      t.integer :complete_games
      t.integer :shut_outs
      t.integer :hit_batter
      t.integer :walked_batter
      t.integer :struck_out_batter
      t.integer :innings
      t.integer :earned_runs
      t.integer :wild_pitches
      t.integer :balk
      t.decimal :era, :precision => 15, :scale => 10
      t.timestamps
    end
  end
end
