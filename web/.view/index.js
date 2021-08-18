 (function() { function pug_attr(t,e,n,r){if(!1===e||null==e||!e&&("class"===t||"style"===t))return"";if(!0===e)return" "+(r?t:t+'="'+t+'"');var f=typeof e;return"object"!==f&&"function"!==f||"function"!=typeof e.toJSON||(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;
function pug_rethrow(e,n,r,t){if(!(e instanceof Error))throw e;if(!("undefined"==typeof window&&n||t))throw e.message+=" on line "+r,e;var o,a,i,s;try{t=t||require("fs").readFileSync(n,{encoding:"utf8"}),o=3,a=t.split("\n"),i=Math.max(r-o,0),s=Math.min(a.length,r+o)}catch(t){return e.message+=" - could not read from "+n+" ("+t.message+")",void pug_rethrow(e,null,r)}o=a.slice(i,s).map(function(e,n){var t=n+i+1;return(t==r?"  > ":"    ")+t+"| "+e}).join("\n"),e.path=n;try{e.message=(n||"Pug")+":"+r+"\n"+o+"\n\n"+e.message}catch(e){}throw e}function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {;
    var locals_for_with = (locals || {});
    
    (function (JSON, b64img, blockLoader, cssLoader, decache, escape, scriptLoader, version) {
      ;pug_debug_line = 1;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003C!DOCTYPE html\u003E";
;pug_debug_line = 2;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Chtml\u003E";
;pug_debug_line = 2;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fffmpeg\u002Fnode_modules\u002F@loadingio\u002Fbootstrap.ext\u002Fdist\u002Findex.pug";
if(!scriptLoader) { scriptLoader = {url: {}, config: {}}; }
;pug_debug_line = 3;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fffmpeg\u002Fnode_modules\u002F@loadingio\u002Fbootstrap.ext\u002Fdist\u002Findex.pug";
if(!decache) { decache = (version? "?v=" + version : ""); }
;pug_debug_line = 4;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fffmpeg\u002Fnode_modules\u002F@loadingio\u002Fbootstrap.ext\u002Fdist\u002Findex.pug";
pug_mixins["script"] = pug_interp = function(url,config){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 5;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fffmpeg\u002Fnode_modules\u002F@loadingio\u002Fbootstrap.ext\u002Fdist\u002Findex.pug";
scriptLoader.config = (config ? config : {});
;pug_debug_line = 6;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fffmpeg\u002Fnode_modules\u002F@loadingio\u002Fbootstrap.ext\u002Fdist\u002Findex.pug";
if (!scriptLoader.url[url]) {
;pug_debug_line = 7;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fffmpeg\u002Fnode_modules\u002F@loadingio\u002Fbootstrap.ext\u002Fdist\u002Findex.pug";
scriptLoader.url[url] = true;
;pug_debug_line = 8;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fffmpeg\u002Fnode_modules\u002F@loadingio\u002Fbootstrap.ext\u002Fdist\u002Findex.pug";
if (/^https?:\/\/./.exec(url)) {
;pug_debug_line = 9;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fffmpeg\u002Fnode_modules\u002F@loadingio\u002Fbootstrap.ext\u002Fdist\u002Findex.pug";
pug_html = pug_html + "\u003Cscript" + (" type=\"text\u002Fjavascript\""+pug_attr("src", url, true, true)+pug_attr("defer", !!scriptLoader.config.defer, true, true)+pug_attr("async", !!scriptLoader.config.async, true, true)) + "\u003E\u003C\u002Fscript\u003E";
}
else {
;pug_debug_line = 12;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fffmpeg\u002Fnode_modules\u002F@loadingio\u002Fbootstrap.ext\u002Fdist\u002Findex.pug";
pug_html = pug_html + "\u003Cscript" + (" type=\"text\u002Fjavascript\""+pug_attr("src", url + decache, true, true)+pug_attr("defer", !!scriptLoader.config.defer, true, true)+pug_attr("async", !!scriptLoader.config.async, true, true)) + "\u003E\u003C\u002Fscript\u003E";
}
}
};
;pug_debug_line = 15;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fffmpeg\u002Fnode_modules\u002F@loadingio\u002Fbootstrap.ext\u002Fdist\u002Findex.pug";
if(!cssLoader) { cssLoader = {url: {}}; }
;pug_debug_line = 16;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fffmpeg\u002Fnode_modules\u002F@loadingio\u002Fbootstrap.ext\u002Fdist\u002Findex.pug";
pug_mixins["css"] = pug_interp = function(url,config){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 17;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fffmpeg\u002Fnode_modules\u002F@loadingio\u002Fbootstrap.ext\u002Fdist\u002Findex.pug";
cssLoader.config = (config ? config : {});
;pug_debug_line = 18;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fffmpeg\u002Fnode_modules\u002F@loadingio\u002Fbootstrap.ext\u002Fdist\u002Findex.pug";
if (!cssLoader.url[url]) {
;pug_debug_line = 19;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fffmpeg\u002Fnode_modules\u002F@loadingio\u002Fbootstrap.ext\u002Fdist\u002Findex.pug";
cssLoader.url[url] = true;
;pug_debug_line = 20;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fffmpeg\u002Fnode_modules\u002F@loadingio\u002Fbootstrap.ext\u002Fdist\u002Findex.pug";
pug_html = pug_html + "\u003Clink" + (" rel=\"stylesheet\" type=\"text\u002Fcss\""+pug_attr("href", url + decache, true, true)) + "\u003E";
}
};
;pug_debug_line = 22;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fffmpeg\u002Fnode_modules\u002F@loadingio\u002Fbootstrap.ext\u002Fdist\u002Findex.pug";
if(!blockLoader) { blockLoader = {name: {}, config: {}}; }
;pug_debug_line = 23;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fffmpeg\u002Fnode_modules\u002F@loadingio\u002Fbootstrap.ext\u002Fdist\u002Findex.pug";










;pug_debug_line = 28;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fffmpeg\u002Fnode_modules\u002F@loadingio\u002Fbootstrap.ext\u002Fdist\u002Findex.pug";
var escjson = function(obj) { return 'JSON.parse(unescape("' + escape(JSON.stringify(obj)) + '"))'; };
;pug_debug_line = 30;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fffmpeg\u002Fnode_modules\u002F@loadingio\u002Fbootstrap.ext\u002Fdist\u002Findex.pug";
var eschtml = (function() { var MAP = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&#34;', "'": '&#39;' }; var repl = function(c) { return MAP[c]; }; return function(s) { return s.replace(/[&<>'"]/g, repl); }; })();
;pug_debug_line = 33;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fffmpeg\u002Fnode_modules\u002F@loadingio\u002Fbootstrap.ext\u002Fdist\u002Findex.pug";









;pug_debug_line = 36;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fffmpeg\u002Fnode_modules\u002F@loadingio\u002Fbootstrap.ext\u002Fdist\u002Findex.pug";
var b64img = {};
;pug_debug_line = 37;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fffmpeg\u002Fnode_modules\u002F@loadingio\u002Fbootstrap.ext\u002Fdist\u002Findex.pug";
b64img.px1 = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAAAAAAALAAAAAABAAEAQAICRAEAOw=="
;pug_debug_line = 39;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fffmpeg\u002Fnode_modules\u002F@loadingio\u002Fbootstrap.ext\u002Fdist\u002Findex.pug";
var loremtext = {
  zh: "料何緊許團人受間口語日是藝一選去，得系目、再驗現表爸示片球法中轉國想我樹我，色生早都沒方上情精一廣發！能生運想毒一生人一身德接地，說張在未安人、否臺重壓車亞是我！終力邊技的大因全見起？切問去火極性現中府會行多他千時，來管表前理不開走於展長因，現多上我，工行他眼。總務離子方區面人話同下，這國當非視後得父能民觀基作影輕印度民雖主他是一，星月死較以太就而開後現：國這作有，他你地象的則，引管戰照十都是與行求證來亞電上地言裡先保。大去形上樹。計太風何不先歡的送但假河線己綠？計像因在……初人快政爭連合多考超的得麼此是間不跟代光離制不主政重造的想高據的意臺月飛可成可有時情乎為灣臺我養家小，叫轉於可！錢因其他節，物如盡男府我西上事是似個過孩而過要海？更神施一關王野久沒玩動一趣庭顧倒足要集我民雲能信爸合以物頭容戰度系士我多學一、區作一，過業手：大不結獨星科表小黨上千法值之兒聲價女去大著把己。",
  en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
};

;pug_debug_line = 45;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fffmpeg\u002Fnode_modules\u002F@loadingio\u002Fbootstrap.ext\u002Fdist\u002Findex.pug";







;pug_debug_line = 47;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fffmpeg\u002Fnode_modules\u002F@loadingio\u002Fbootstrap.ext\u002Fdist\u002Findex.pug";













;pug_debug_line = 4;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Chead\u003E";
;pug_debug_line = 5;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_mixins["css"]("assets/lib/bootstrap/main/css/bootstrap.min.css");
;pug_debug_line = 6;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_mixins["css"]("assets/lib/@loadingio/bootstrap.ext/main/index.min.css");
;pug_debug_line = 7;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_mixins["css"]("assets/lib/ldcover/main/ldcv.min.css");
pug_html = pug_html + "\u003C\u002Fhead\u003E";
;pug_debug_line = 8;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Cbody\u003E";
;pug_debug_line = 9;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Cvideo" + (" ld=\"video\" width=\"200\" height=\"200\""+pug_attr("controls", true, true, true)+pug_attr("loop", true, true, true)) + "\u003E\u003C\u002Fvideo\u003E";
;pug_debug_line = 10;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Ca ld=\"download\"\u003E";
;pug_debug_line = 10;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "download\u003C\u002Fa\u003E";
;pug_debug_line = 11;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_mixins["script"]("assets/lib/proxise/main/proxise.min.js");
;pug_debug_line = 12;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_mixins["script"]("assets/lib/@loadingio/ldquery/main/ldq.min.js");
;pug_debug_line = 13;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_mixins["script"]("assets/lib/ldview/main/index.min.js");
;pug_debug_line = 14;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_mixins["script"]("assets/lib/ldcover/main/ldcv.min.js");
;pug_debug_line = 16;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Cscript\u003E";
;pug_debug_line = 16;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "var convert;\nconvert = function(opt){\n  var files, type, useWorker, worker, lock, promises;\n  opt == null && (opt = {});\n  files = opt.files;\n  type = opt.type || 'webm';\n  useWorker = !(opt.worker != null) || opt.worker;\n  worker = useWorker ? new Worker(\"\u002Fassets\u002Fffmpeg\u002Fffmpeg-worker-\" + type + \".js\") : null;\n  lock = {\n    finish: proxise(function(){}),\n    init: proxise(function(){\n      if (!useWorker) {\n        return Promise.resolve();\n      }\n      return worker.onmessage = function(e){\n        var msg;\n        msg = e.data;\n        switch (msg.type) {\n        case 'ready':\n          return lock.init.resolve();\n        case 'stderr':\n          return console.log(msg.data);\n        case 'done':\n          return lock.finish.resolve(msg.data);\n        }\n      };\n    })\n  };\n  promises = files.map(function(file){\n    if (typeof file === 'string') {\n      return ld$.fetch(file, {\n        method: \"GET\"\n      }).then(function(blob){\n        return blob.arrayBuffer();\n      }).then(function(buf){\n        return new Uint8Array(buf);\n      });\n    } else {\n      return Promise.resolve(file);\n    }\n  });\n  return lock.init().then(function(){\n    return Promise.all(promises);\n  }).then(function(files){\n    var opt;\n    files = files.map(function(data, idx){\n      return {\n        name: ('' + idx).padStart(5, '0') + \".png\",\n        data: data\n      };\n    });\n    opt = import$({\n      arguments: convert.args[type],\n      MEMFS: files,\n      TOTAL_MEMORY: 1024 * 1024 * 1024\n    }, useWorker\n      ? {}\n      : {\n        print: function(){},\n        printErr: function(it){\n          return console.log(it);\n        },\n        onExit: function(){}\n      });\n    if (useWorker) {\n      worker.postMessage(import$({\n        type: 'run'\n      }, opt));\n      return lock.finish();\n    } else {\n      return ffmpeg(opt);\n    }\n  }).then(function(ret){\n    var blob, url;\n    blob = new Blob([ret.MEMFS[0].data], {\n      type: \"video\u002F\" + type\n    });\n    url = URL.createObjectURL(blob);\n    return {\n      blob: blob,\n      url: url\n    };\n  });\n};\nconvert.args = {\n  mp4: [\"-i\", \"%05d.png\", \"-c:v\", \"libx264\", \"-pix_fmt\", \"yuv420p\", \"out.mp4\"],\n  webm: [\"-i\", \"%05d.png\", \"-auto-alt-ref\", \"0\", \"-c:v\", \"libvpx\", \"-b:v\", \"2M\", \"-crf\", \"-1\", \"out.webm\"]\n};\nfunction import$(obj, src){\n  var own = {}.hasOwnProperty;\n  for (var key in src) if (own.call(src, key)) obj[key] = src[key];\n  return obj;\n}\u003C\u002Fscript\u003E";
;pug_debug_line = 17;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Cscript\u003E";
;pug_debug_line = 17;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "(function(it){\n  return it.apply({});\n})(function(){\n  var type, files;\n  type = 'webm';\n  files = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45].map(function(idx){\n    return \"\u002Fassets\u002Fimg\u002Fframes\u002Fframe-\" + idx + \".png\";\n  });\n  return convert({\n    files: files,\n    type: type,\n    worker: true\n  }).then(function(arg$){\n    var blob, url, view;\n    blob = arg$.blob, url = arg$.url;\n    return view = new ldview({\n      root: document.body,\n      handler: {\n        download: function(arg$){\n          var node;\n          node = arg$.node;\n          node.setAttribute('href', url);\n          return node.setAttribute('download', \"output.\" + type);\n        },\n        video: function(arg$){\n          var node, src;\n          node = arg$.node;\n          src = document.createElement(\"source\");\n          src.setAttribute('src', url);\n          return node.appendChild(src);\n        }\n      }\n    });\n  });\n});\u003C\u002Fscript\u003E\u003C\u002Fbody\u003E\u003C\u002Fhtml\u003E";
    }.call(this, "JSON" in locals_for_with ?
        locals_for_with.JSON :
        typeof JSON !== 'undefined' ? JSON : undefined, "b64img" in locals_for_with ?
        locals_for_with.b64img :
        typeof b64img !== 'undefined' ? b64img : undefined, "blockLoader" in locals_for_with ?
        locals_for_with.blockLoader :
        typeof blockLoader !== 'undefined' ? blockLoader : undefined, "cssLoader" in locals_for_with ?
        locals_for_with.cssLoader :
        typeof cssLoader !== 'undefined' ? cssLoader : undefined, "decache" in locals_for_with ?
        locals_for_with.decache :
        typeof decache !== 'undefined' ? decache : undefined, "escape" in locals_for_with ?
        locals_for_with.escape :
        typeof escape !== 'undefined' ? escape : undefined, "scriptLoader" in locals_for_with ?
        locals_for_with.scriptLoader :
        typeof scriptLoader !== 'undefined' ? scriptLoader : undefined, "version" in locals_for_with ?
        locals_for_with.version :
        typeof version !== 'undefined' ? version : undefined));
    ;} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line);};return pug_html;}; module.exports = template; })() 