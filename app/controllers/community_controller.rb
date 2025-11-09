class CommunityController < ApplicationController
  def index
    @filter = permitted_filter
    @scope = permitted_scope
    @search_query = params[:q].to_s.strip
    @tabs = community_tabs
    @communities = community_topics
    @topic = permitted_topic
    @following_topics = following_topics
    @presence = Community::PresenceTracker.active
    @discussions = filtered_discussions(@filter, @scope, @search_query, @topic)
    @suggestions = community_suggestions
    @trending_questions = trending_questions

    if turbo_frame_request?
      render partial: "community/feed_frame",
             locals: {
               discussions: @discussions,
               filter: @filter,
               scope: @scope,
               search_query: @search_query,
               tabs: @tabs,
               communities: @communities,
               topic: @topic,
               presence: @presence,
               following_topics: @following_topics
             },
             formats: [:html]
    end
  end

  def sidebar
    @communities = community_topics
    @suggestions = community_suggestions
    @trending_questions = trending_questions

    render partial: "community/community_sidebar", formats: [:html]
  end

  private

  def permitted_filter
    %w[recent most_liked most_answers relevance].find do |option|
      option == params[:filter]
    end || "recent"
  end

  def permitted_topic
    return if params[:topic].blank?

    community_topics.map { |topic| topic[:key] }.find do |topic_key|
      topic_key == params[:topic]
    end
  end

  def filtered_discussions(filter, scope, search_query, topic)
    scoped = community_discussions

    scoped = apply_scope(scoped, scope)

    scoped = case filter
             when "most_liked"
               scoped.sort_by { |discussion| -discussion[:likes].to_i }
             when "most_answers"
               scoped.sort_by { |discussion| -discussion[:replies].to_i }
             when "relevance"
               sort_by_relevance(scoped, search_query)
             else
               scoped.sort_by { |discussion| -discussion[:posted_at].to_i }
             end

    if search_query.present?
      query = search_query.downcase

      scoped = scoped.select do |discussion|
        [
          discussion[:title],
          discussion[:summary],
          discussion[:category],
          discussion[:author_name]
        ].compact.any? { |value| value.downcase.include?(query) }
      end
    end

    return scoped if topic.blank?

    scoped.select { |discussion| Array(discussion[:topics]).include?(topic) }
  end

  def community_tabs
    [
      { key: "recent", label: "Latest Activity" },
      { key: "most_liked", label: "Most Appreciated" },
      { key: "most_answers", label: "Most Discussed" },
      { key: "relevance", label: "Relevant" }
    ]
  end

  def community_topics
    base_topics = [
      { key: "component-architecture", name: "Component Architecture" },
      { key: "design-systems", name: "Design Systems" },
      { key: "hotwire-patterns", name: "Hotwire Patterns" },
      { key: "turbo-streams", name: "Turbo Streams" },
      { key: "product-strategy", name: "Product Strategy" },
      { key: "accessibility", name: "Accessibility" },
      { key: "performance", name: "Performance" },
      { key: "hiring-career", name: "Hiring & Career" }
    ]

    highlights = topic_highlights

    base_topics.map do |topic|
      topic.merge(highlights: highlights[topic[:key]] || [])
    end
  end

  def community_suggestions
    [
      {
        name: "Priya Desai",
        handle: "@priya_builds",
        avatar_url: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
      },
      {
        name: "Nathan Cole",
        handle: "@shipfastnate",
        avatar_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
      },
      {
        name: "Zara Beltran",
        handle: "@zarabel",
        avatar_url: "https://images.unsplash.com/photo-1520785643438-5bf77931f493?auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
      }
    ]
  end

  def trending_questions
    [
      {
        author_name: "Nathan Cole",
        author_avatar_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=3&w=256&h=256&q=80",
        title: "What KPIs matter most before opening our private beta?",
        engagement: 312
      },
      {
        author_name: "Zara Beltran",
        author_avatar_url: "https://images.unsplash.com/photo-1520785643438-5bf77931f493?auto=format&fit=facearea&facepad=3&w=256&h=256&q=80",
        title: "How do you price component consulting engagements?",
        engagement: 205
      },
      {
        author_name: "Priya Desai",
        author_avatar_url: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=facearea&facepad=3&w=256&h=256&q=80",
        title: "Show-and-tell: The most useful Stimulus controller you wrote lately?",
        engagement: 178
      }
    ]
  end

  def community_discussions
    now = Time.zone.now

    base_discussions = [
      {
        id: "component-versioning",
        title: "How do we version components without breaking downstream apps?",
        category: "Architecture",
        summary: "We have close to 70 reusable TailView components. Curious how others roll out breaking changes while keeping product teams shipping?",
        author_name: "Jordan Blake",
        author_role: "Design Systems Lead",
        author_avatar_url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=facearea&facepad=3&w=256&h=256&q=80",
        posted_at: now - 1.hour,
        likes: 58,
        replies: 21,
        views: 2150,
        topics: %w[component-architecture design-systems performance]
      },
      {
        id: "turbo-onboarding",
        title: "Turbo onboarding flows that feel native — what patterns worked for you?",
        category: "Hotwire",
        summary: "We're rethinking our onboarding wizard to feel app-like with Turbo Frames and Streams. Looking for patterns that avoid modal fatigue.",
        author_name: "Anika Soto",
        author_role: "Product Engineer",
        author_avatar_url: "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?auto=format&fit=facearea&facepad=3&w=256&h=256&q=80",
        posted_at: now - 3.hours,
        likes: 144,
        replies: 52,
        views: 5740,
        topics: %w[hotwire-patterns turbo-streams product-strategy]
      },
      {
        id: "stimulus-analytics",
        title: "Share your Stimulus patterns for product analytics opt-ins",
        category: "Growth",
        summary: "Looking for ethical ways to nudge analytics opt-ins using Stimulus controllers without relying on third-party widgets.",
        author_name: "Miguel Chen",
        author_role: "Growth PM",
        author_avatar_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=3&w=256&h=256&q=80",
        posted_at: now - 6.hours,
        likes: 318,
        replies: 36,
        views: 18210,
        topics: %w[accessibility hotwire-patterns product-strategy]
      },
      {
        id: "async-design-crits",
        title: "Async design crits with Turbo Streams — worth the effort?",
        category: "Collaboration",
        summary: "We prototyped critique sessions using Turbo Streams to collect feedback in real-time. Results are mixed — would love alternative ideas.",
        author_name: "Leah Martin",
        author_role: "Principal Designer",
        author_avatar_url: "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?auto=format&fit=facearea&facepad=3&w=256&h=256&q=80",
        posted_at: now - 9.hours,
        likes: 92,
        replies: 88,
        views: 6110,
        topics: %w[design-systems turbo-streams]
      },
      {
        id: "developer-advocate-role",
        title: "Hiring our first developer advocate — what should the first 90 days look like?",
        category: "Team",
        summary: "We're expanding TailView beyond internal teams. Looking for a 90-day plan template for a dev advocate joining a product-led team.",
        author_name: "Rahul Patel",
        author_role: "Head of Platform",
        author_avatar_url: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=facearea&facepad=3&w=256&h=256&q=80",
        posted_at: now - 14.hours,
        likes: 109,
        replies: 147,
        views: 9310,
        topics: %w[hiring-career product-strategy]
      },
      {
        id: "release-notes-cadence",
        title: "What cadence keeps release notes useful?",
        category: "Operations",
        summary: "We send weekly product digests internally but engagement has slipped. Curious how you balance cadence, detail, and effort.",
        author_name: "Sasha Green",
        author_role: "Product Operations",
        author_avatar_url: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=facearea&facepad=3&w=256&h=256&q=80",
        posted_at: now - 18.hours,
        likes: 187,
        replies: 29,
        views: 4280,
        topics: %w[component-architecture product-strategy]
      },
      {
        id: "playbook-retro",
        title: "Retro: Launching TailView 3.0 after 4 months in public preview",
        category: "Product",
        summary: "We wrapped our preview program with 420 feedback notes. Sharing takeaways and curious how others handle large-scale preview programs.",
        author_name: "Mia Thompson",
        author_role: "Product Lead",
        author_avatar_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=3&w=256&h=256&q=80",
        posted_at: now - 2.days,
        likes: 271,
        replies: 64,
        views: 26890,
        topics: %w[design-systems product-strategy component-architecture]
      }
    ]

    base_discussions + Community::DynamicDiscussions.all
  end
  def permitted_scope
    %w[all following].find { |option| option == params[:scope] } || "all"
  end

  def apply_scope(discussions, scope)
    return discussions if scope == "all"

    discussions.select do |discussion|
      (Array(discussion[:topics]) & following_topics).any?
    end
  end

  def sort_by_relevance(discussions, query)
    return discussions.sort_by { |discussion| -discussion[:posted_at].to_i } if query.blank?

    discussions.sort_by { |discussion| -relevance_score(discussion, query) }
  end

  def relevance_score(discussion, query)
    return 0 if query.blank?

    tokens = query.downcase.split(/\s+/)
    haystacks = [
      discussion[:title],
      discussion[:summary],
      discussion[:category],
      discussion[:author_name]
    ].compact.map(&:downcase)

    tokens.sum do |token|
      haystacks.sum do |text|
        score = 0
        score += 3 if text.start_with?(token)
        score += 2 if text.include?(token)
        score
      end
    end + discussion[:likes].to_i / 10 + discussion[:replies].to_i
  end

  def following_topics
    %w[design-systems product-strategy turbo-streams hotwire-patterns]
  end

  def topic_highlights
    community_discussions.each_with_object(Hash.new { |hash, key| hash[key] = [] }) do |discussion, memo|
      Array(discussion[:topics]).each do |topic|
        memo[topic] << discussion[:title]
      end
    end.transform_values { |titles| titles.first(3) }
  end
end

