var isNodeJs = typeof window === 'undefined' && typeof importScripts === 'undefined';

function Url(path, encoding, method) {
    this.path = path;
    this.encoding = encoding || "utf-8";
    this.method = method || "GET";
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
    if(isNodeJs) {
        // need a synchronous call here, highly discouraged in main thread
        var request = eval("require('sync-request')");
        var res = request(this.method, this.path);
        return res.getBody().toString();
    } else {
        /* global XMLHttpRequest */
        var xhr = new XMLHttpRequest();
        xhr.overrideMimeType('text/plain');
        xhr.open(this.method, this.path, false);
        xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
        xhr.send();
        if (xhr.status != 200) {
            var rwe = eval("prompto.error.ReadWriteError"); // assume it's already defined
            throw new rwe("Request failed, status: " + xhr.status +", " + xhr.statusText);
        }
        return xhr.responseText;
    }
};

Url.prototype.readFullyAsync = function(callback) {
    if(isNodeJs) {
        // TODO test this
        var request = eval("require('then-request')");
        request(this.method, this.path, null, function(res) {
            callback(res.getBody().toString());
        });
    } else {
        /* global XMLHttpRequest */
        var xhr = new XMLHttpRequest();
        xhr.overrideMimeType('text/plain');
        xhr.open(this.method, this.path, true);
        xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
        xhr.onload = function() {
            if (xhr.status != 200) {
                var rwe = eval("prompto.error.ReadWriteError"); // assume it's already defined
                throw new rwe("Request failed, status: " + xhr.status +", " + xhr.statusText);
            }
            callback(xhr.responseText);
        }
        xhr.send();
    }
};

Url.prototype.readLine = function() {
    if(!this.lines) {
        var full = this.readFully() || "";
        this.lines = full.split("\n");
    }
    if(this.lines.length>0)
        return this.lines.shift();
    else
        return null;
}

Url.prototype.writeFully = function(data) {

};

Url.prototype.writeLine = function(data) {

};

exports.Url = Url;
