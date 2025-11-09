module Community
  class FeedBroadcaster
    DISCUSSION_TARGET = "community_discussions".freeze
    METRICS_TARGET_PREFIX = "discussion_metrics_".freeze

    class << self
      def broadcast_discussion!(discussion)
        Turbo::StreamsChannel.broadcast_prepend_to(
          "community_feed",
          target: DISCUSSION_TARGET,
          partial: "community/discussion",
          locals: { discussion: discussion, highlight: true }
        )
      end

      def broadcast_metrics!(discussion)
        Turbo::StreamsChannel.broadcast_replace_to(
          "community_feed",
          target: "#{METRICS_TARGET_PREFIX}#{discussion[:id]}",
          partial: "community/discussion_metrics",
          locals: { discussion: discussion }
        )
      end
    end
  end
end

