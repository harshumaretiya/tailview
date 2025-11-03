class SpinnersController < ApplicationController
  def index
    # Main spinners page - shows all variants
  end

  # Turbo Stream action to trigger a spinner
  def trigger_spinner
    respond_to do |format|
      format.turbo_stream
      format.html { redirect_to spinners_path, notice: "Spinner triggered" }
    end
  end

  # Simulate a long-running operation
  def simulate_operation
    sleep(2) # Simulate delay
    
    respond_to do |format|
      format.turbo_stream
      format.html { redirect_to spinners_path, notice: "Operation completed" }
    end
  end
end

