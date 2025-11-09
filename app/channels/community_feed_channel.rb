class CommunityFeedChannel < ApplicationCable::Channel
  def subscribed
    stream_from "community_feed"
    track_presence!
  end

  def unsubscribed
    Community::PresenceTracker.remove(visitor_uid)
    Community::PresenceTracker.broadcast!
  end

  def heartbeat
    # Keep presence alive by updating last_seen_at timestamp
    track_presence!
  end

  private

  def track_presence!
    Community::PresenceTracker.touch(
      visitor_uid,
      name: visitor_name
    )
    Community::PresenceTracker.broadcast!
  end
end

