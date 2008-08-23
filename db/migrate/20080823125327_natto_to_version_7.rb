class NattoToVersion7 < ActiveRecord::Migration
  def self.up
    Engines.plugins["natto"].migrate(7)
  end

  def self.down
    Engines.plugins["natto"].migrate(0)
  end
end
