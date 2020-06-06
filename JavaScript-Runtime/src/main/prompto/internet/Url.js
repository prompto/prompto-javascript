var isNodeJs = typeof window === 'undefined' && typeof importScripts === 'undefined';

if(!isNodeJs) {
    /* global XMLHttpRequest */
}

function Url(path, encoding, method) {
    this.path = path;
    this.encoding = encoding || "utf-8";
    this.httpRequestMethod = method || "GET";
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
        var res = request(this.httpRequestMethod, this.path);
        return res.getBody().toString();
    } else {
        var xhr = this.createHttpRequest(false);
        xhr.send();
        this.checkStatus(xhr);
        return xhr.responseText;
    }
};

Url.prototype.checkStatus = function(xhr) {
    if (xhr.status != 200) {
        try {
            var rwe = eval("prompto.error.ReadWriteError"); // assume it's already defined
            throw new rwe("Request failed, status: " + xhr.status +", " + xhr.statusText);
        } catch(error) {
            throw new Error("Request failed, status: " + xhr.status +", " + xhr.statusText);
        }

    }
};

Url.prototype.readFullyAsync = function(callback) {
    if(isNodeJs) {
        // gracefully readFully sync during testing
        if(process.env.JEST_WORKER_ID !== undefined) {
            var result = this.readFully();
            callback(result);
        } else {
            var request = eval("require('then-request')");
            request(this.httpRequestMethod, this.path, null, function(x, res) {
                callback(res.getBody());
            });
        }
    } else {
        var self = this;
        var xhr = this.createHttpRequest(true);
        xhr.onload = function() {
            self.checkStatus(xhr);
            callback(xhr.responseText);
        }
        xhr.send();
    }
};

Url.prototype.createHttpRequest = function(async) {
    var xhr = new XMLHttpRequest();
    xhr.overrideMimeType('text/plain');
    xhr.open(this.httpRequestMethod, this.path, async);
    xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    return xhr;
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
