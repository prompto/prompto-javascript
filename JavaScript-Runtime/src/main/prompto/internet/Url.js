function Url(path, encoding) {
    this.path = path;
    this.encoding = encoding || "utf-8";
    return this;
}

Url.prototype.isReadable = function() {
    return true;
};

Url.prototype.isWritable = function() {
    return true;
};

Url.prototype.close = function() {
};

Url.prototype.readFully = function() {
    var isNodeJs = typeof window === 'undefined' && typeof importScripts === 'undefined';
    if(isNodeJs) {
        // need a synchronous call here, highly discouraged in main thread
        var request = require('sync-request');
        var res = request('GET', this.path);
        return res.getBody().toString();
    } else {
        var r = new XMLHttpRequest();
        r.overrideMimeType('text/plain');
        r.open('GET', this.path, false);
        r.send();
        if (r.status != 200) {
            var rwe = eval("prompto.error.ReadWriteError"); // assume it's already defined
            throw new rwe("Request failed, status: " + r.status +", " + r.statusText);
        }
        return r.responseText;
    }
};

Url.prototype.writeFully = function(data) {

};

exports.Url = Url;
