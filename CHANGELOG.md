# Change Log

## v0.0.12

 - add webm config `-b:v` for better quality
 - add web config `-deadline`, `-cpu-used` for compression and quality control
 - add additional comment to explain arguments


## v0.0.11

 - tweak ffmpeg options


## v0.0.10

 - support `repeatCount` in `gif` and `webp` generation.


## v0.0.9

 - rebuild worker with `TOTAL_MEMORY=1073741824` and `ALLOW_MEMORY_GROWTH=1` to prevent from OOM
 - use libwebp directly for libwebp animation generation


## v0.0.8

 - add `cancel()` api for canceling a running task.
 - upgrade modules for vulnerabilities fixing


## v0.0.7

 - support `fps` option in `convert` api


## v0.0.6

 - add `-preset ultrafast` to prevent from OOM issue ( mp4 works, but webm still doesn't )
   - webm can only generate with images < 1024 x 704 with 15frames, and will be lower when more frames.


## v0.0.5

 - suppress `X is not a function` error message by giving it a dummy function.


## v0.0.4

 - further minimize generated js file with mangling and compression
 - remove livescript header from generated js
 - upgrade modules
 - patch test code to make it work with upgraded modules
 - add `main` and `browser` field in `package.json`.
 - release with compact directory structure


## v0.0.3

 - fix bug: `buf` should be `file` when converting ArrayBuffer
 - instead return both url and blob, we now return `blob` only after converting
   - objectURL should be created / managed directly by user in case of resource leaking.


## v0.0.2

 - minimize wasm file in advance by removing lame and opus
