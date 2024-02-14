(function(){
  var ffmpeg;
  ffmpeg = function(opt){
    opt == null && (opt = {});
    this.inited = false;
    this._init = [];
    this.worker = null;
    this.queue = {
      main: null,
      list: []
    };
    this.evtHandler = {};
    this.workerUrl = opt.worker || "/assets/lib/@plotdb/ffmpeg/main/worker.js";
    this.canvas = document.createElement('canvas');
    return this;
  };
  ffmpeg.args = {
    mp4: ["-i", "%05d.png", "-preset", "ultrafast", "-c:v", "libx264", "-pix_fmt", "yuv420p", "out.mp4"],
    webm: ["-i", "%05d.png", "-preset", "ultrafast", "-auto-alt-ref", "0", "-c:v", "libvpx", "-b:v", "2M", "-crf", "-1", "out.webm"],
    webp: ["-i", "%05d.png", "-vcodec", "libwebp", "-lossless", "1", "-loop", "<loopValue>", "out.webp"],
    gif: ["-i", "%05d.png", "-ss", "30", "-t", "3", "-vf", "fps=10,scale=320:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse", "-loop", "<loopValue>", "out.gif"]
  };
  ffmpeg.prototype = import$(Object.create(Object.prototype), {
    on: function(n, cb){
      var this$ = this;
      return (Array.isArray(n)
        ? n
        : [n]).map(function(n){
        var ref$;
        return ((ref$ = this$.evtHandler)[n] || (ref$[n] = [])).push(cb);
      });
    },
    fire: function(n){
      var v, res$, i$, to$, ref$, len$, cb, results$ = [];
      res$ = [];
      for (i$ = 1, to$ = arguments.length; i$ < to$; ++i$) {
        res$.push(arguments[i$]);
      }
      v = res$;
      for (i$ = 0, len$ = (ref$ = this.evtHandler[n] || []).length; i$ < len$; ++i$) {
        cb = ref$[i$];
        results$.push(cb.apply(this, v));
      }
      return results$;
    },
    init: function(){
      var this$ = this;
      return new Promise(function(res, rej){
        if (this$.inited) {
          return res();
        }
        if (this$.worker) {
          this$._init.push({
            res: res,
            rej: rej
          });
        }
        this$.worker = new Worker(this$.workerUrl);
        return this$.worker.onmessage = function(e){
          var msg, ret;
          msg = e.data;
          switch (msg.type) {
          case 'ready':
            this$.inited = true;
            res();
            return this$._init.splice(0).map(function(it){
              return it.res();
            });
          case 'stderr':
            console.log(msg.data);
            if (!(ret = /frame=\s*(\d+)/.exec(msg.data || ''))) {
              return;
            }
            if (this$._progress) {
              return this$._progress(+ret[1]);
            }
            break;
          case 'done':
            if (!this$.queue.main) {
              return;
            }
            this$.queue.main.res(msg.data);
            this$.queue.main = null;
            if (!(ret = this$.queue.list.splice(0, 1)[0])) {
              return;
            }
            return ret.res();
          }
        };
      });
    },
    cancel: function(){
      var ref$, ret;
      if (!this.queue.main) {
        return;
      }
      this.queue.main.rej((ref$ = new Error(), ref$.name = 'lderror', ref$.id = 999, ref$.msg = 'canceled', ref$));
      this.queue.main = null;
      this.worker.terminate();
      this.worker = null;
      this.inited = false;
      if (ret = this.queue.list.splice(0, 1)[0]) {
        ret.res();
      }
    },
    _convert: function(opt){
      var p, this$ = this;
      p = !this.queue.main
        ? Promise.resolve()
        : new Promise(function(res, rej){
          return this$.queue.list.push({
            res: res,
            rej: rej
          });
        });
      return p.then(function(){
        return new Promise(function(res, rej){
          this$.queue.main = {
            res: res,
            rej: rej
          };
          return this$.init().then(function(){
            return this$.worker.postMessage(import$({
              type: 'run'
            }, opt));
          });
        });
      });
    },
    convert: function(arg$){
      var files, format, progress, fps, repeatCount, ref$, canvas, loopValue, promises, this$ = this;
      files = arg$.files, format = arg$.format, progress = arg$.progress, fps = arg$.fps, repeatCount = arg$.repeatCount;
      ref$ = [files || [], format || 'webm', this.canvas], files = ref$[0], format = ref$[1], canvas = ref$[2];
      loopValue = format === 'gif'
        ? repeatCount == null || !repeatCount
          ? 0
          : repeatCount === 1
            ? -1
            : repeatCount - 1
        : repeatCount == null ? 0 : repeatCount;
      promises = files.map(function(file){
        var img, p;
        if (typeof file === 'string') {
          img = new Image();
          img.src = file;
          file = img;
          /* ... or fetch. this doesn't work without a server */
        }
        if (file instanceof Image) {
          p = file.complete
            ? Promise.resolve()
            : new Promise(function(res, rej){
              return file.onload = function(){
                return res();
              };
            });
          return p.then(function(){
            var width, height, ctx;
            width = file.width, height = file.height;
            canvas.width = width;
            canvas.height = height;
            ctx = canvas.getContext('2d');
            ctx.drawImage(file, 0, 0, width, height);
            return new Promise(function(res, rej){
              return canvas.toBlob(function(blob){
                var fr;
                fr = new FileReader();
                fr.onload = function(){
                  return res(new Uint8Array(fr.result));
                };
                return fr.readAsArrayBuffer(blob);
              }, 'image/png');
            });
          });
        } else if (file instanceof ArrayBuffer) {
          return Promise.resolve(new Uint8Array(file));
        } else {
          return Promise.resolve(file);
        }
      });
      return Promise.all(promises).then(function(files){
        var args, opt;
        files = files.map(function(data, idx){
          return {
            name: ('' + idx).padStart(5, '0') + ".png",
            data: data
          };
        });
        args = [].concat(ffmpeg.args[format]);
        args = args.map(function(it){
          if (it !== "<loopValue>") {
            return it;
          } else {
            return loopValue + "";
          }
        });
        args.splice(0, 0, '-r', (fps || 30) + "");
        opt = {
          arguments: args,
          MEMFS: files,
          TOTAL_MEMORY: 4 * 1024 * 1024 * 1024
        };
        if (progress) {
          this$._progress = function(it){
            return progress((it || 0) / files.length);
          };
          this$._progress(0);
        }
        return this$._convert(opt);
      }).then(function(ret){
        var blob;
        if (progress) {
          this._progress = null;
          progress(1);
        }
        blob = new Blob([ret.MEMFS[0].data], {
          type: format === 'webp'
            ? "image/webp"
            : "video/" + format
        });
        return blob;
      });
    }
  });
  if (typeof module != 'undefined' && module !== null) {
    module.exports = ffmpeg;
  } else if (typeof window != 'undefined' && window !== null) {
    window.ffmpeg = ffmpeg;
  }
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);
