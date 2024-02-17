ffmpeg = (opt = {}) ->
  @ <<<
    inited: false, _init: []
    worker: null, queue: {main: null, list: []}
    evt-handler: {}
  @worker-url = opt.worker or "/assets/lib/@plotdb/ffmpeg/main/worker.js"
  @canvas = document.createElement \canvas
  @

# `-framerate`: input fps
# `-r`: output fps
# `-c:v`: used codec
# `-preset`: from `ultrafast` to `veryslow`
# `-crf`: quality. from 0 to 51, lower better
# `-b:v`: bitrate. explicitly set to 0 to consider `-crf` only.
# `-auto-alt-ref`: some additional frames for editing. `0` to disable it.
# `-compression_level`: 0 to 6. default 4. only for webp
# `-quality`: 0 to 100. hight better. mainly for webp.
# `-loop`: loop count.
# `-vf split ...`: split src to s0 & s1, s0 to gen palette, s1 to apply that pal.
ffmpeg.args = do
  mp4: [
    "-framerate" "<fps>" "-i" "%05d.png" "-c:v" "libx264"
    "-r" "<fps>" "-preset" "<preset>" "-crf" "<crf>"
    "-pix_fmt" "yuv420p" "-b:v" "0" "out.mp4"
  ]
  webm: [
    "-framerate" "<fps>" "-i" "%05d.png" "-c:v" "libvpx"
    "-r" "<fps>" "-preset" "<preset>" "-crf" "<crf>"
    "-auto-alt-ref" "0" "-b:v" "0" "out.webm"
  ]
  webp: [
    "-framerate" "<fps>" "-i" "%05d.png" "-c:v" "libwebp"
    "-r" "<fps>" "-loop" "<loopValue>" "-quality" "<quality>"
    "-compression_level" "4" "out.webp"
  ]
  # gif can be supported (yet not built yet)
  # for options explanation: https://superuser.com/questions/556029/
  gif: [
    "-framerate" "<fps>" "-i" "%05d.png" "-c:v" "gif"
    "-r" "<fps>" "-loop" "<loopValue>"
    "-vf" "split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" "out.gif"
  ]


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

  cancel: ->
    if !@queue.main => return
    @queue.main.rej(new Error! <<< {name: \lderror, id: 999, msg: \canceled})
    @queue.main = null
    @worker.terminate!
    @ <<< worker: null, inited: false
    if (ret = @queue.list.splice 0, 1 .0) => ret.res!
    return

  _convert: (opt) ->
    p = if !@queue.main => Promise.resolve!
    else new Promise (res, rej) ~> @queue.list.push {res, rej}
    p.then ~> new Promise (res, rej) ~>
      @queue.main = {res, rej}
      @init!then ~> @worker.postMessage({type: \run} <<< opt)

  # files: either list of url / Image object, uint8array or arraybuffer.
  convert: ({files, format, progress, fps, repeatCount}) ->
    [files, format, canvas] = [(files or []), (format or 'webm'), @canvas]
    # repeatCount: 0 = infinite. 1, 2, ... times of playing.
    # gif: -1 = only once. 0: infinite. 1 (play twice). 2(3 times), ...
    # webp: same as repeatCount
    loop-value = if format == \gif =>
      if !repeatCount? or !repeatCount => 0 else if repeatCount == 1 => -1 else repeatCount - 1
    else
      if !repeatCount? => 0 else repeatCount
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
        args = [] ++ ffmpeg.args[format]
        args = args.map ->
          if it == "<loopValue>" => "#loop-value"
          else if it == "<preset>" => "ultrafast"
          else if it == "<fps>" => "#fps"
          else if it == "<quality>" => "80"
          else if it == "<crf>" => "18"
          else it
        opt = {} <<< {
          arguments: args
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
