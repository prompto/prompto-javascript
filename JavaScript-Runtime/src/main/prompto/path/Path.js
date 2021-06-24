var isNodeJs = typeof window === 'undefined' && typeof importScripts === 'undefined';

if(isNodeJs) {

    var fs = require("fs");
    var crypto = require("crypto");
    var os = require("os");
    var path = require("path");
    var zlib = require('zlib');

    function createTempFile(prefix, suffix, tmpdir) {
        prefix = (typeof prefix !== 'undefined') ? prefix : 'tmp.';
        suffix = (typeof suffix !== 'undefined') ? suffix : '';
        tmpdir = tmpdir ? tmpdir : os.tmpdir();
        return path.join(tmpdir, prefix + crypto.randomBytes(16).toString('hex') + suffix);
    }

    exports.listRoots = function () {
        return ["/"];
    };
    exports.listChildren = function (path) {
        return fs.readdirSync(path);
    };
    exports.pathExists = function (path) {
        try {
            fs.accessSync(path);
            return true;
        } catch (e) {
            return false;
        }
    };
    exports.pathIsFile = function (path) {
        var stats = fs.statSync(path);
        return stats.isFile();
    };
    exports.pathIsLink = function (path) {
        var stats = fs.statSync(path);
        return stats.isSymbolicLink();
    };
    exports.pathIsDirectory = function (path) {
        var stats = fs.statSync(path);
        return stats.isDirectory();
    };
    exports.compressToTempPath = function (path) {
        var inflated = fs.createReadStream(path);
        try {
            var deflatedFile = createTempFile("deflated", ".gz");
            var deflated = fs.createWriteStream(deflatedFile);
            try {
                inflated.pipe(zlib.createDeflate()).pipe(deflated);
                return deflatedFile;
            } finally {
                deflated.close();
            }
        } finally {
            inflated.close();
        }
    }
    exports.decompressToTempPath = function (path) {
        var deflated = fs.createReadStream(path);
        try {
            var inflatedFile = createTempFile("inflated", ".raw");
            var inflated = fs.createWriteStream(inflatedFile);
            try {
                inflated.pipe(zlib.createInflate()).pipe(deflated);
                return inflatedFile;
            } finally {
                inflated.close();
            }
        } finally {
            deflated.close();
        }
    }
}