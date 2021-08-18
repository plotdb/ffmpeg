<-(->it.apply {}) _

type = \webm
files = [0 to 45].map (idx) -> "/assets/img/frames/frame-#{idx}.png"
convert {files, type: type, worker: true}
  .then ({blob, url}) ->
    view = new ldview do
      root: document.body
      handler:
        download: ({node}) ->
          node.setAttribute \href, url
          node.setAttribute \download, "output.#type"
        video: ({node}) ->
          src = document.createElement("source")
          src.setAttribute \src, url
          node.appendChild src
