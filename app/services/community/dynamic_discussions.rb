module Community
  class DynamicDiscussions
    CACHE_KEY = "community:dynamic_discussions:v1".freeze
    MAX_ITEMS = 25

    class << self
      def all
        Rails.cache.read(CACHE_KEY) || []
      end

      def add(discussion)
        updated = [discussion] + all
        Rails.cache.write(CACHE_KEY, updated.first(MAX_ITEMS), expires_in: 12.hours)
      end

      def clear!
        Rails.cache.delete(CACHE_KEY)
      end
    end
  end
end

