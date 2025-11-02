class DatepickersController < ApplicationController
  def index
    @today = Date.today
    @min_date = @today - 30.days
    @max_date = @today + 30.days
  end
end

