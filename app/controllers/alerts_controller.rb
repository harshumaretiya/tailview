class AlertsController < ApplicationController
  def index
    # Main alerts page - shows all variants
  end

  # Turbo Stream action to add an alert
  def add_alert
    respond_to do |format|
      format.turbo_stream
      format.html { redirect_to alerts_path, notice: "Alert added" }
    end
  end

  # Turbo Stream action to clear all alerts
  def clear_alerts
    respond_to do |format|
      format.turbo_stream
      format.html { redirect_to alerts_path, notice: "Alerts cleared" }
    end
  end
end

