var isNodeJs = typeof window === 'undefined' && typeof importScripts === 'undefined';

if(isNodeJs) {
    var net = require("net");
    exports.writer = net.Socket;
    exports.stdout = process.stdout;
    exports.stderr = process.stderr;
} else {
    exports.writer = console;
    exports.stdout = { write : function(t) { console.log(t); }};
    exports.stderr = { write : function(t) { console.error(t); }};
}
