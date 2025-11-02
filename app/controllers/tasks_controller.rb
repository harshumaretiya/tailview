class TasksController < ApplicationController
  PER_PAGE_OPTIONS = [10, 20, 50, 100].freeze
  DEFAULT_PER_PAGE = 10

  def index
    @tasks = filtered_tasks
    @per_page = per_page_param
    @page = page_param
    @total_pages = (@tasks.length.to_f / @per_page).ceil
    @tasks = paginated_tasks
  end

  private

  def filtered_tasks
    tasks = all_tasks
    tasks = tasks.select { |t| t[:status] == params[:status] } if params[:status].present?
    tasks = tasks.select { |t| t[:priority] == params[:priority] } if params[:priority].present?
    tasks = search_in_tasks(tasks) if params[:search].present?
    tasks
  end

  def search_in_tasks(tasks)
    query = params[:search].downcase
    tasks.select { |t| t[:title].downcase.include?(query) || t[:id].downcase.include?(query) }
  end

  def paginated_tasks
    start_index = (@page - 1) * @per_page
    @tasks[start_index, @per_page] || []
  end

  def per_page_param
    param = params[:per_page].to_i
    PER_PAGE_OPTIONS.include?(param) ? param : DEFAULT_PER_PAGE
  end

  def page_param
    [params[:page].to_i, 1].max
  end

  def all_tasks
    [
      { id: "TASK-8782", title: "You can't compress the program without quantifying the open-source SSD pixel!", status: "in_progress", priority: "medium", label: "documentation" },
      { id: "TASK-7878", title: "Try to calculate the EXE feed, maybe it will index the multi-byte pixel!", status: "backlog", priority: "medium", label: "documentation" },
      { id: "TASK-7839", title: "We need to bypass the neural TCP card!", status: "todo", priority: "high", label: "bug" },
      { id: "TASK-5562", title: "The SAS interface is down, bypass the open-source pixel so we can back up the PNG bandwidth!", status: "backlog", priority: "medium", label: "feature" },
      { id: "TASK-8686", title: "I'll parse the wireless SSL protocol, that should driver the API panel!", status: "canceled", priority: "medium", label: "feature" },
      { id: "TASK-1280", title: "Use the digital TLS panel, then you can transmit the haptic system!", status: "done", priority: "high", label: "bug" },
      { id: "TASK-7262", title: "The UTF8 application is down, parse the neural bandwidth so we can back up the PNG firewall!", status: "done", priority: "high", label: "feature" },
      { id: "TASK-1138", title: "Generating the driver won't do anything, we need to quantify the 1080p SMTP bandwidth!", status: "in_progress", priority: "medium", label: "feature" },
      { id: "TASK-7184", title: "We need to program the back-end THX pixel!", status: "todo", priority: "low", label: "feature" },
      { id: "TASK-5160", title: "Calculating the bus won't do anything, we need to navigate the back-end JSON protocol!", status: "in_progress", priority: "high", label: "documentation" },
      { id: "TASK-5618", title: "Generating the driver won't do anything, we need to index the online SSL application!", status: "done", priority: "medium", label: "documentation" },
      { id: "TASK-6699", title: "I'll transmit the wireless JBOD capacitor, that should hard drive the SSD feed!", status: "backlog", priority: "medium", label: "documentation" },
      { id: "TASK-2858", title: "We need to override the online UDP bus!", status: "backlog", priority: "medium", label: "bug" },
      { id: "TASK-9864", title: "I'll reboot the 1080p FTP panel, that should matrix the HEX hard drive!", status: "done", priority: "high", label: "bug" },
      { id: "TASK-8404", title: "We need to generate the virtual HEX alarm!", status: "in_progress", priority: "low", label: "bug" },
      { id: "TASK-5365", title: "Backing up the pixel won't do anything, we need to transmit the primary IB array!", status: "in_progress", priority: "low", label: "documentation" },
      { id: "TASK-1780", title: "The CSS feed is down, index the bluetooth transmitter so we can compress the CLI protocol!", status: "todo", priority: "high", label: "documentation" },
      { id: "TASK-6938", title: "Use the redundant SCSI application, then you can hack the optical alarm!", status: "todo", priority: "high", label: "documentation" },
      { id: "TASK-9885", title: "We need to compress the auxiliary VGA driver!", status: "backlog", priority: "high", label: "bug" },
      { id: "TASK-3216", title: "Transmitting the transmitter won't do anything, we need to compress the virtual HDD sensor!", status: "backlog", priority: "medium", label: "documentation" },
      { id: "TASK-9285", title: "The IP monitor is down, copy the haptic alarm so we can generate the HTTP transmitter!", status: "todo", priority: "high", label: "bug" },
      { id: "TASK-1024", title: "Overriding the microchip won't do anything, we need to transmit the digital OCR transmitter!", status: "in_progress", priority: "low", label: "documentation" },
      { id: "TASK-7068", title: "You can't generate the capacitor without indexing the wireless HEX pixel!", status: "canceled", priority: "low", label: "bug" },
      { id: "TASK-6502", title: "Navigating the microchip won't do anything, we need to bypass the back-end SQL bus!", status: "todo", priority: "high", label: "bug" },
      { id: "TASK-5326", title: "We need to hack the redundant UTF8 transmitter!", status: "todo", priority: "low", label: "bug" }
    ]
  end
end

