# @plotdb/ffmpeg

ffmpeg in browsers with

 - `webm` / `mp4` / `webp` output without audio
 - Promise-based JS API from PNG sequence to above formats with progress information.

The core of this projects ( ffmpeg ) is based on a custom build of `ffmpeg.js` that supports `webm`, `webp` and `mp4`. Based on that `@plotdb/ffmpeg` provides a wrapper for abstracting ffmpeg conversion.

Relative projects:

 - https://git.ffmpeg.org/ffmpeg.git
 - https://github.com/Kagami/ffmpeg.js


## Usage

install:

    npm install @plotdb/ffmpeg


include:

    <script src="path-to-index.js"></script>


prepare `@plotdb/ffmpeg` object:

    ffmpeg = new ffmpeg({ ... });
    ffmpeg.init();
      .then(function() {
        ffmpeg.convert({ ... });
      });


## Constructor Options

 - `worker`: url for worker file ( available as `dist/worker.js` in this repo. )


## API

 - `init()`: initialize. return Promsie, resolved when initialized.
   - guaranteed to init only once against multiple calls
   - `convert()` by default calls `init()` to ensure a inited web worker to use.
 - `convert({files, format, progress, fps})`: convert given `files` to `format`, watching progress by `progress`.
   - parameters:
     - `files`: array of either url, Image object, ArrayBuffer or Uint8Array for the images to encode. default `[]`.
     - `format`: either `webm`, `webp` or `mp4`. default `webm`.
     - `progress(perecnt)`: optional. if provided, called when convering makes progress.
       - `percent`: number between `0` ~ `1`. for `0%` ~ `100%` progress correspondingly.
     - `fps`: frame rate (frame per second). default `30` is omitted.
     - multiple `convert` calls will be queued.
   - return a Promise resolving blob for the generated file.
 - `cancel()`: stop current job, and reject with lderror `999`.
   - next job, if any, will still start automatically.


## Custom build

`@plotdb/ffmpeg` use a custom build wasm js from `ffmpeg.js` project. For how to build and use `ffmpeg.js`, check `build instructions` in `ffmpeg.js` for more details.

To rebuild the custom build version worker in `@plotdb/ffmpeg`, you need:

 - follow `ffmpeg.js` build instruction until before `make` in `ffmpeg.js`
 - add submodule for
   - `build/ffmpeg-plotdb`: to ffmpeg ( https://git.ffmpeg.org/ffmpeg.git )
   - `build/libwebp`: to libwebp ( https://github.com/webmproject/libwebp ) 
   - commands:

         git submodule add https://git.ffmpeg.org/ffmpeg.git build/ffmpeg-plotdb
         git submodule add https://github.com/webmproject/libwebp build/libwebp

 - apply `Makefile` patch from this project. ( see `ffmpeg.js/MEMO.md` in this repo )
   - this patch includes a pull request not yet merged, basically for newer `emscripten` to work:
     - https://github.com/Kagami/ffmpeg.js/pull/149
 - patch libavformat/webpenc.c bug if necessary (see below)
 - run `make plotdb`

A sample worker js file is available in `ffmpeg.js/plotdb-ffmpeg-worker.js`, 5.38MB in size.


## webpenc patch

in webp encoder in `libavformat`, default animation disposal method (how to handle pixels covered by transparent pixels between frames) is set to 0, which means the previous canvas contents are retained. This issue can be observed by creating animation with opacity changes.

In `flush` function in `libavformat/webpenc.c`, change `avio_w8(s->pb, 0)` to `avio_w8(s->pb, 0x1)` fixes this issue:

    if (w->frame_count > trailer) {
        avio_write(s->pb, "ANMF", 4);
        avio_wl32(s->pb, 16 + w->last_pkt.size - skip);
        avio_wl24(s->pb, 0);
        avio_wl24(s->pb, 0);
        avio_wl24(s->pb, st->codecpar->width - 1);
        avio_wl24(s->pb, st->codecpar->height - 1);
        if (w->last_pkt.pts != AV_NOPTS_VALUE && pts != AV_NOPTS_VALUE) {
            avio_wl24(s->pb, pts - w->last_pkt.pts);
        } else
            avio_wl24(s->pb, w->last_pkt.duration);
        avio_w8(s->pb, 0x1);
    }



## Other Resources

 - ffmpeg usage
   - mp4 to webp: https://gist.github.com/witmin/1edf926c2886d5c8d9b264d70baf7379
 - libwebp: https://github.com/webmproject/libwebp
 - ffmpeg codecs: https://www.ffmpeg.org/ffmpeg-codecs.html#libwebp
   - this seems undocumented but to enable animated webp, `--enable-encoder=libwebp_anim` is required.
     without this webp will still generated and is animated but there will be issues regarding `dispose method`.


## License

 - `src`, `dist` and `web/src`: MIT
 - `Kagami/ffmpeg.js`: LGPL 2.1 or later
 - `ffmpeg`: LGPL / GPL / BSD ( including dependencies )
