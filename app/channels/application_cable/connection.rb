require "securerandom"

module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :visitor_uid, :visitor_name

    def connect
      self.visitor_uid = find_visitor_uid
      self.visitor_name = find_visitor_name
    end

    private

    def find_visitor_uid
      cookies.encrypted[:community_visitor_uid] ||= SecureRandom.uuid
    end

    def find_visitor_name
      cookies.encrypted[:community_visitor_name] ||= generate_guest_name
    end

    def generate_guest_name
      adjectives = %w[Curious Bright Swift Bold Lively Focused Keen Quiet Warm]
      nouns = %w[Sparrow Falcon Lantern Pixel Beacon Willow Summit Meadow Harbor]

      adjective = adjectives.sample
      noun = nouns.sample
      suffix = SecureRandom.hex(1).upcase

      "#{adjective} #{noun}-#{suffix}"
    end
  end
end

