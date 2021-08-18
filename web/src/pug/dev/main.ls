<-(->it.apply {}) _

ffmpeg = require \ffmpeg.js


Promise.resolve!
  .then ->
    promises = [0 to 45].map (idx) ->
      ld$.fetch "/assets/img/frames/frame-#{idx}.png", {method: "GET"}
        .then (blob) -> blob.arrayBuffer!
        .then (buf) -> new Uint8Array buf
        .then -> {name: "frame-#{('' + idx).padStart(2, '0')}.png", data: it}
    Promise.all promises
  .then (files) ->
    res = ffmpeg do
      arguments: [
        "-i", "frame-%02d.png"
        "-c:v", "libx264"
        "-pix_fmt", "yuv420p"
        "out.mp4"
      ]
      /* works with ffmpeg.bundle.js
      arguments: [
        "-i", "frame-%02d.png",
        "-auto-alt-ref", "0",
        "-c:v",
        "libvpx",
        "-b:v", "2M",
        "-crf", "-1",
        "out.webm"
      ]
      */

      /*
      arguments: [
        "-i", "frame-$02d.png"
        "-vcodec", "libwebp"
        "-filter:v", "fps=fps=20"
        "-lossless", "1"
        "-loop", "0" # loop play
        "-preset", "none"
        "-s", "200:200"
        "out.webp"
      ]
      */

      MEMFS: files
      TOTAL_MEMORY: 1024 * 1024 * 1024
      print: -> console.log "print: ", it
      printErr: -> console.log "printErr: ", it
      onExit: -> console.log "onExit: ok" 

    console.log res.MEMFS
    blob = new Blob [res.MEMFS.0.data], {type: 'video/webm'}
    console.log(url = URL.createObjectURL blob)
    view = new ldview do
      root: document.body
      handler:
        download: ({node}) ->
          node.setAttribute \href, url
        video: ({node}) ->
          src = document.createElement("source")
          src.setAttribute \src, url
          node.appendChild src




