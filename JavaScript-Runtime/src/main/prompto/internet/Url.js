var HttpHeader = require("./HttpHeader").HttpHeader;
var isNodeJs = typeof window === 'undefined' && typeof importScripts === 'undefined';

if(!isNodeJs) {
    /* global XMLHttpRequest */
}

function Url(path, encoding, httpMethod, httpHeaders) {
    this.path = path;
    this.encoding = encoding || "utf-8";
    this.httpMethod = httpMethod || "GET";
    this.httpHeaders = httpHeaders || [ new HttpHeader("Content-Type", "application/x-www-form-urlencoded")];
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
        var method = this.httpMethod || "GET";
        var res = request(method, this.path);
        return res.getBody().toString();
    } else {
        var xhr = this.createHttpRequest(false);
        xhr.send();
        this.checkStatus(xhr);
        return xhr.responseText;
    }
};

Url.prototype.checkStatus = function(xhr) {
    if (xhr.status !== 200) {
        var rwe;
        try {
            rwe = eval("prompto.error.ReadWriteError"); // assume it's already defined
        } catch(error) {
            throw new Error("Request failed, status: " + xhr.status +", " + xhr.statusText);
        }
        throw new rwe("Request failed, status: " + xhr.status +", " + xhr.statusText);
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
            var method = this.httpMethod || "GET";
            request(method, this.path, null, function(x, res) {
                callback(res.getBody());
            });
        }
    } else {
        var self = this;
        var xhr = this.createHttpRequest(true);
        xhr.onload = function() {
            self.checkStatus(xhr);
            callback(xhr.responseText);
        };
        xhr.send();
    }
};

Url.prototype.createHttpRequest = function(async) {
    var method = this.httpMethod || "GET";
    var xhr = new XMLHttpRequest();
    xhr.overrideMimeType('text/plain');
    xhr.open(method, this.path, async);
    this.httpHeaders.forEach(function(header) {
        xhr.setRequestHeader(header.name, header.text);
    });
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
};

Url.prototype.writeFully = function(data, callback) {

};

Url.prototype.writeLine = function(data) {

};

exports.Url = Url;
