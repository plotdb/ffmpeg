# @plotdb/ffmpeg

ffmpeg, in browsers, for `webm` / `mp4` / `webp` output.

The core of this projects ( ffmpeg ) is based on a custom build of `ffmpeg.js` that supports `webm`, `webp` and `mp4`. Based on that `@plotdb/ffmpeg` provides a wrapper for abstracting ffmpeg conversion.

Relative projects:

 - https://git.ffmpeg.org/ffmpeg.git
 - https://github.com/Kagami/ffmpeg.js


## Custom build

Basically, we need to rebuild ffmpeg into wasm. A sample makefile for this purpose ( from ffmpeg.js ):

 - https://github.com/Kagami/ffmpeg.js/blob/master/Makefile

Check `build instructions` in `ffmpeg.js` for more details.

use `ffmpeg.js` for a custom ffmpeg wasm build. You need:

 - follow `ffmpeg.js` build instruction until before `make` in `ffmpeg.js`
 - apply pull request ( https://github.com/Kagami/ffmpeg.js/pull/149 )
 - add submodule for
   - `build/ffmpeg-plotdb`: to ffmpeg ( https://git.ffmpeg.org/ffmpeg.git )
   - `build/libwebp`: to libwebp ( https://github.com/webmproject/libwebp ) 
   - commands:

         git submodule add https://git.ffmpeg.org/ffmpeg.git build/ffmpeg-plotdb
         git submodule add https://github.com/webmproject/libwebp build/libwebp

 - apply `Makefile` patch from this project. ( see `ffmpeg.js/MEMO.md` in this repo )
 - run `make plotdb`

A sample worker js file is available in `ffmpeg.js/plotdb-ffmpeg-worker.js`, 6.6MB in size.


## Other Resources

 - ffmpeg usage
   - mp4 to webp: https://gist.github.com/witmin/1edf926c2886d5c8d9b264d70baf7379
 - libwebp: https://github.com/webmproject/libwebp
 - ffmpeg codecs: https://www.ffmpeg.org/ffmpeg-codecs.html#libwebp
   - this seems undocumented but to enable animated webp, `--enable-encoder=libwebp_anim` is required.
     without this webp will still generated and is animated but there will be issues regarding `dispose method`.
