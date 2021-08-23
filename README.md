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
        ffmpeg.conver({ ... });
      });


## Constructor Options

 - `worker`: url for worker file ( available as `dist/worker.js` in this repo. )


## API

 - `init()`: initialize. return Promsie, resolved when initialized.
   - guaranteed to init only once against multiple calls
 - `convert({files, format, progress})`: convert given `files` to `format`, watching progress by `progress`.
   - `files`: array of either url, Image object, ArrayBuffer or Uint8Array for the images to encode. default `[]`.
   - `format`: either `webm`, `webp` or `mp4`. default `webm`.
   - `progress(perecnt)`: optional. if provided, called when convering makes progress.
     - `percent`: number between `0` ~ `1`. for `0%` ~ `100%` progress correspondingly.
   - multiple `convert` calls will be queued.


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
 - run `make plotdb`

A sample worker js file is available in `ffmpeg.js/plotdb-ffmpeg-worker.js`, 6.6MB in size.


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
