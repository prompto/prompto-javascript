var isNodeJs = typeof window === 'undefined' && typeof importScripts === 'undefined';

if(isNodeJs) {

    var fs = require("fs");

    exports.listRoots = function() {
        return ["/"];
    };
    exports.listChildren = function(path) {
        return fs.readdirSync(path);
    };
    exports.pathExists = function(path) {
        try {
            fs.accessSync(path);
            return true;
        } catch (e) {
            return false;
        }
    };
    exports.pathIsFile = function(path) {
        var stats = fs.statSync(path);
        return stats.isFile();
    };
    exports.pathIsLink = function(path) {
        var stats = fs.statSync(path);
        return stats.isSymbolicLink();
   };
    exports.pathIsDirectory = function(path) {
        var stats = fs.statSync(path);
        return stats.isDirectory();
   };
}