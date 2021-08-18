/*
urls-to-imgs = (urls) ->
  Promise.all(
    urls.map -> ld$.fetch it, {method: \GET}
      .then (blob) -> blob.arrayBuffer!
      .then (buf) -> new Uint8Array buf
  )
    .then -> imgs-to-webm it
imgs-to-webm = (imgs = []) ->
  imgs.map (d,i) -> {name: "#idx".padStart(5,'0') + ".png", data: d}
  res = ffmpeg do
    arguments: [
      "-i", "frame-%02d.png",
      "-auto-alt-ref", "0",
      "-c:v",
      "libvpx",
      "-b:v", "2M",
      "-crf", "-1",
      "out.webm"
    ]
    MEMFS: files
    TOTAL_MEMORY: 1024 * 1024 * 1024
    print: ->
    printErr: ->
    onExit: ->
  blob = new Blob [res.MEMFS.0.data], {type: 'video/webm'}
  console.log(url = URL.createObjectURL blob)
*/

