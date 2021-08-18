convert = (opt = {}) ->
  files = opt.files
  type = opt.type or 'webm'
  use-worker = (!(opt.worker?) or opt.worker)
  worker = if use-worker => new Worker("/assets/ffmpeg/ffmpeg-worker-#{type}.js") else null
  lock =
    finish: proxise(->)
    init: proxise ->
      if !use-worker => return Promise.resolve!
      worker.onmessage = (e) ->
        msg = e.data
        switch msg.type
        | \ready => lock.init.resolve!
        | \stderr => console.log msg.data
        | \done => lock.finish.resolve msg.data

  promises = files.map (file) -> 
    if typeof(file) == \string =>
      ld$.fetch file, {method: "GET"}
        .then (blob) -> blob.arrayBuffer!
        .then (buf) -> new Uint8Array buf
    else Promise.resolve(file)

  lock.init!
    .then -> Promise.all promises
    .then (files) ->
      files = files.map (data, idx) -> {name: "#{('' + idx).padStart(5, '0')}.png", data: data}
      opt = {} <<< {
        arguments: convert.args[type]
        MEMFS: files
        TOTAL_MEMORY: 1024 * 1024 * 1024
      } <<< (if use-worker => {} else {print: (->), printErr: (->console.log it), onExit: (->)})
      if use-worker =>
        worker.postMessage({type: \run} <<< opt)
        lock.finish!
      else return ffmpeg opt
    .then (ret) ->
      blob = new Blob [ret.MEMFS.0.data], {type: "video/#type"}
      url = URL.createObjectURL blob
      return {blob, url}

convert.args = do
  mp4: ["-i", "%05d.png" "-c:v", "libx264" "-pix_fmt", "yuv420p" "out.mp4"]
  webm: ["-i", "%05d.png", "-auto-alt-ref", "0", "-c:v", "libvpx", "-b:v", "2M", "-crf", "-1", "out.webm"]
