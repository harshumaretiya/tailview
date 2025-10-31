class TeamsController < ApplicationController
  DEPARTMENTS = ["Engineering", "Design", "Marketing", "Operations"].freeze

  def index
    @q = params[:q].to_s
    @department = params[:department].presence

    @members = generate_members(30)
    @members.select! { |m| m[:name].downcase.include?(@q.downcase) || m[:role].downcase.include?(@q.downcase) } if @q.present?
    @members.select! { |m| m[:department] == @department } if @department.present?

    if turbo_frame_request?
      render partial: "team_frame", locals: { members: @members }
    end
  end

  private

  def generate_members(count)
    require "faker"
    Array.new(count) do
      first = Faker::Name.first_name
      last = Faker::Name.last_name
      {
        id: SecureRandom.uuid,
        name: "#{first} #{last}",
        initials: "#{first[0]}#{last[0]}",
        role: ["Product Manager", "Senior Developer", "DevOps Engineer", "UX Researcher", "Lead Designer"].sample,
        department: DEPARTMENTS.sample
      }
    end
  end
end

