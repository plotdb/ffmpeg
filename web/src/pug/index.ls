<-(->it.apply {}) _

sample-items = [
  {name: "bars",    frame:  30}
  {name: "clouds",  frame: 150}
  {name: "ripple",  frame:  30}
  {name: "spinner", frame: 250}
  {name: "wedges",  frame:  92}
]

@ <<< format: \webm, sample: sample-items.0, method: 'url', output: null
@ldcv = new ldcover root: '.ldcv', lock: true

@ffmpeg = new ffmpeg!
@ffmpeg.init!

@render = ~>
  files = [1 to @sample.frame].map (idx) ~> "/assets/img/#{@sample.name}/frame-#{idx}.png"
  if @method == \img =>
    files = files.map (url) ->
      img = new Image!
      img.src = url
      return img
  @ffmpeg.init!
    .then ~>
      @progress = 0
      @view.render \progress
      @ldcv.toggle true
    .then ~>
      @ffmpeg.convert {
        files, format: @format,
        progress: ~>
          @progress = it * 100
          @view.render \progress
      }
    .then (ret) -> debounce 500 .then -> ret
    .then (blob) ~>
      console.log blob
      @output = {blob, url: URL.createObjectURL(blob)}
      @view.render!
    .then ~> @ldcv.toggle false

@view = new ldview do
  root: document.body
  action:
    click: convert: ~> @render!
    input:
      method: ({node}) ~> @method = node.value or 'url'
      format: ({node}) ~> @format = node.value or 'webm'
  init:
    format: ({node}) -> node.value = @format or 'webm'
    dropdown: ({node}) -> new BSN.Dropdown node
  handler:
    progress: ({node}) ~> node.style.width = "#{@progress}%"
    "sample-item":
      list: -> sample-items
      action: click: ({data}) ~>
        @sample = data
        @view.render \sample-name
      text: ({data}) -> return data.name
    "sample-name": ({node}) ~> node.textContent = @sample.name
    download: ({node}) ~>
      node.classList.toggle \d-block, !!@output
      node.classList.toggle \d-none, !@output
      if !@output => return
      node.setAttribute \href, @output.url
      node.setAttribute \download, "output.#{@format}"
    video: ({node}) ~>
      if !@output => return
      node.classList.toggle \d-none, (@format == \webp)
      if @format == \webp => return
      node.textContent = ''
      video = document.createElement("video")
      src = document.createElement("source")
      video.setAttribute \width, 200
      video.setAttribute \height, 200
      video.setAttribute \controls, ''
      video.setAttribute \loop, ''
      src.setAttribute \src, @output.url
      video.appendChild src
      node.appendChild video
    image: ({node}) ~>
      if !@output => return
      node.classList.toggle \d-none, (@format != \webp)
      if @format != \webp => return
      node.setAttribute \src, @output.url
