module Community
  class PresenceTracker
    CACHE_KEY = "community:presence:v1".freeze
    TTL = 45.seconds

    class << self
      def touch(id, attrs = {})
        update_presence(id) do |entry|
          entry.merge(attrs).merge(last_seen_at: Time.current)
        end
      end

      def remove(id)
        presence = load_presence
        presence.delete(id)
        persist(presence)
      end

      def active
        purge_stale!
        load_presence.values.sort_by { |entry| entry[:last_seen_at] }.reverse
      end

      def broadcast!
        Turbo::StreamsChannel.broadcast_replace_to(
          "community_presence",
          target: "community_presence_panel",
          partial: "community/presence_panel",
          locals: { presence: active }
        )
      end

      private

      def update_presence(id)
        presence = load_presence
        entry = presence[id] || default_entry(id)
        presence[id] = yield(entry)
        persist(presence)
      end

      def default_entry(id)
        {
          id: id,
          name: "Guest",
          last_seen_at: Time.current
        }
      end

      def load_presence
        Rails.cache.read(CACHE_KEY) || {}
      end

      def persist(presence)
        Rails.cache.write(CACHE_KEY, presence, expires_in: TTL)
      end

      def purge_stale!
        presence = load_presence
        cutoff = TTL.ago
        changed = presence.reject! { |_id, entry| entry[:last_seen_at] < cutoff }
        persist(presence) if changed
      end
    end
  end
end

