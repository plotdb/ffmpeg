# Change Log

## v0.0.3

 - fix bug: `buf` should be `file` when converting ArrayBuffer
 - instead return both url and blob, we now return `blob` only after converting
   - objectURL should be created / managed directly by user in case of resource leaking.


## v0.0.2

 - minimize wasm file in advance by removing lame and opus
