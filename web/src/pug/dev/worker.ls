<-(->it.apply {}) _

console.log "prepare web worker .."
worker = new Worker('/assets/ffmpeg/ffmpeg-worker-mp4.js')
worker.onmessage = (e) ->
  msg = e.data
  console.log "web worker message #{msg.type}"
  switch msg.type
  | \ready

    promises = [0 to 45].map (idx) ->
      ld$.fetch "/assets/img/frames/frame-#{idx}.png", {method: "GET"}
        .then (blob) -> blob.arrayBuffer!
        .then (buf) -> new Uint8Array buf
        .then -> {name: "frame-#{('' + idx).padStart(2, '0')}.png", data: it}
    Promise.all promises
      .then (files) ->
        worker.postMessage({
          type: "run"
          arguments: [
            "-i", "frame-%02d.png"
            "-c:v", "libx264"
            "-pix_fmt", "yuv420p"
            "out.mp4"
          ]
          MEMFS: files
          TOTAL_MEMORY: 1024 * 1024 * 1024
        })
  | \stderr
  | \done
    blob = new Blob [msg.data.MEMFS.0.data], {type: 'video/mp4'}
    url = URL.createObjectURL blob

    view = new ldview do
      root: document.body
      handler:
        download: ({node}) ->
          node.setAttribute \href, url
        video: ({node}) ->
          src = document.createElement("source")
          src.setAttribute \src, url
          node.appendChild src
