ffmpeg = (opt = {}) ->
  @ <<<
    inited: false, _init: []
    worker: null, queue: {main: null, list: []}
    evt-handler: {}
  @worker-url = opt.worker or "/assets/lib/@plotdb/ffmpeg/main/worker.js"
  @canvas = document.createElement \canvas
  @

ffmpeg.args = do
  mp4: ["-i" "%05d.png" "-c:v" "libx264" "-pix_fmt" "yuv420p" "out.mp4"]
  webm: ["-i" "%05d.png" "-auto-alt-ref" "0" "-c:v" "libvpx" "-b:v" "2M" "-crf" "-1" "out.webm"]
  webp: ["-i" "%05d.png" "-vcodec" "libwebp_anim" "-lossless" "1" "-loop" "0" "out.webp"]

ffmpeg.prototype = Object.create(Object.prototype) <<< do
  on: (n, cb) -> (if Array.isArray(n) => n else [n]).map (n) ~> @evt-handler.[][n].push cb
  fire: (n, ...v) -> for cb in (@evt-handler[n] or []) => cb.apply @, v
  init: -> new Promise (res, rej) ~>
    if @inited => return res!
    if @worker => @_init.push {res, rej}
    @worker = new Worker(@worker-url)
    @worker.onmessage = (e) ~>
      msg = e.data
      switch msg.type
      | \ready =>
        @inited = true
        res!
        @_init.splice(0).map -> it.res!
      | \stderr =>
        console.log msg.data
        if !(ret = /frame=\s*(\d+)/.exec(msg.data or '')) => return
        if @_progress => @_progress +(ret.1)
      | \done =>
        if !@queue.main => return
        @queue.main.res msg.data
        @queue.main = null
        if !(ret = @queue.list.splice 0, 1 .0) => return
        ret.res!
  _convert: (opt) ->
    p = if !@queue.main => Promise.resolve!
    else new Promise (res, rej) ~> @queue.list.push {res, rej}
    p.then ~> new Promise (res, rej) ~>
      @queue.main = {res, rej}
      @worker.postMessage({type: \run} <<< opt)

  # files: either list of url / Image object, uint8array or arraybuffer.
  convert: ({files, format, progress}) ->
    [files, format, canvas] = [(files or []), (format or 'webm'), @canvas]
    # url: fetch doesn't work with local environment
    # buffer: somehow complicated to do. redundant for every user.
    # Image + Canvas + FileReader: don't have to worry about URL.
    #   Image(any url, remote or local) -> Canvas -> blob -> read by FileReader -> Buffer

    promises = files.map (file) -> 
      if typeof(file) == \string =>
        img = new Image!
        img.src = file
        file = img
        /* ... or fetch. this doesn't work without a server */
        #ld$.fetch file, {method: "GET"}
        #  .then (blob) -> blob.arrayBuffer!
        #  .then (buf) -> new Uint8Array buf

      if file instanceof Image =>
        p = if file.complete => Promise.resolve!
        else new Promise (res, rej) -> file.onload = -> res!
        p.then ->
          {width, height} = file
          canvas <<< {width, height}
          ctx = canvas.getContext \2d
          ctx.drawImage file, 0, 0, width, height
          (res, rej) <- new Promise _
          (blob) <- canvas.toBlob _, \image/png
          fr = new FileReader!
          fr.onload = -> res new Uint8Array fr.result
          fr.readAsArrayBuffer(blob)
      else if file instanceof ArrayBuffer => Promise.resolve new Uint8Array file
      else Promise.resolve(file)

    Promise.all promises
      .then (files) ~>
        files = files.map (data, idx) -> {name: "#{('' + idx).padStart(5, '0')}.png", data: data}
        opt = {} <<< {
          arguments: ffmpeg.args[format]
          MEMFS: files
          TOTAL_MEMORY: 4 * 1024 * 1024 * 1024
        }
        if progress =>
          @_progress = -> progress((it or 0) / files.length)
          @_progress 0
        @_convert opt
      .then (ret) ->
        if progress =>
          @_progress = null
          progress 1
        blob = new Blob [ret.MEMFS.0.data], {type: if format == \webp => "image/webp" else "video/#format"}
        return blob

if module? => module.exports = ffmpeg
else if window? => window.ffmpeg = ffmpeg
