# @plotdb/ffmpeg

ffmpeg, in browsers, for `webm` / `mp4` / `webp` output.

This projects isn't different from `ffmpeg.js` - it's just a custom build of ffmpeg supporting `web` / `mp4` / `webp`, with wrapper api for convenience.

Relative projects:

 - https://git.ffmpeg.org/ffmpeg.git
 - https://github.com/Kagami/ffmpeg.js


## Setup

Basically, we need to rebuild ffmpeg into wasm. A sample makefile for this purpose ( from ffmpeg.js ):

 - https://github.com/Kagami/ffmpeg.js/blob/master/Makefile

Check `build instructions` in `ffmpeg.js` for more details.



## Other Resources

### ffmpeg usage

 - mp4 to webp: https://gist.github.com/witmin/1edf926c2886d5c8d9b264d70baf7379


### Links

 - libwebp: https://github.com/webmproject/libwebp
 - hffmpeg codecs: ttps://www.ffmpeg.org/ffmpeg-codecs.html#libwebp
