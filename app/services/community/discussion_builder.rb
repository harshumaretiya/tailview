require "securerandom"

module Community
  class DiscussionBuilder
    CATEGORY_BY_TOPIC = {
      "component-architecture" => "Architecture",
      "design-systems" => "Design Systems",
      "hotwire-patterns" => "Hotwire",
      "turbo-streams" => "Hotwire",
      "product-strategy" => "Product",
      "accessibility" => "Accessibility",
      "performance" => "Performance",
      "hiring-career" => "Team"
    }.freeze

    DEFAULT_AVATAR_URL = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=3&w=256&h=256&q=80".freeze

    class << self
      def build(attributes, author_name:)
        topic_key = Array(attributes[:topics]).first || "design-systems"
        now = Time.zone.now

        {
          id: generated_id(now),
          title: attributes[:title],
          category: CATEGORY_BY_TOPIC.fetch(topic_key, "Community"),
          summary: attributes[:summary],
          author_name: author_name,
          author_role: attributes[:author_role].presence || "Community Member",
          author_avatar_url: attributes[:author_avatar_url].presence || DEFAULT_AVATAR_URL,
          posted_at: now,
          likes: attributes[:likes].presence&.to_i || 0,
          replies: attributes[:replies].presence&.to_i || 0,
          views: attributes[:views].presence&.to_i || rand(200..800),
          topics: Array(attributes[:topics]).presence || [topic_key]
        }
      end

      private

      def generated_id(timestamp)
        base = timestamp.to_i.to_s(36)
        suffix = SecureRandom.hex(2)
        "live-#{base}-#{suffix}"
      end
    end
  end
end

