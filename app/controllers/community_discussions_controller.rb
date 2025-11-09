require "securerandom"

class CommunityDiscussionsController < ApplicationController
  before_action :ensure_visitor_identity

  def create
    discussion = Community::DiscussionBuilder.build(
      discussion_params,
      author_name: visitor_name.presence || "Community Member"
    )

    Community::DynamicDiscussions.add(discussion)
    Community::FeedBroadcaster.broadcast_discussion!(discussion)

    respond_to do |format|
      format.turbo_stream { head :ok }
      format.html do
        redirect_to community_path,
                    notice: "Discussion shared with the community."
      end
    end
  end

  private

  def discussion_params
    params.require(:discussion).permit(:title, :summary, :author_role, :author_avatar_url, topics: [])
  end

  def visitor_uid
    cookies.encrypted[:community_visitor_uid]
  end

  def visitor_name
    cookies.encrypted[:community_visitor_name]
  end

  def ensure_visitor_identity
    cookies.encrypted[:community_visitor_uid] ||= SecureRandom.uuid
    cookies.encrypted[:community_visitor_name] ||= "Community Member #{SecureRandom.hex(1).upcase}"
  end
end

