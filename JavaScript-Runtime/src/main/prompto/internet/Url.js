var isNodeJs = typeof window === 'undefined' && typeof importScripts === 'undefined';

if(!isNodeJs) {
    /* global XMLHttpRequest */
}

function Url(path, encoding, httpMethod, httpHeaders) {
	this.path = path;
	this.encoding = encoding;
	this.httpMethod = httpMethod;
	this.httpHeaders = httpHeaders;
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
    if (isNodeJs)
        return this.readFullyNodeJs();
    else
        return this.readFullyBrowser();
};

Url.prototype.readFullyBrowser = function() {
	var protocol = this.getProtocol();
	if(protocol.startsWith("http"))
        return this.readFullyHttp();
    else
        this.throwError("Url only supports HTTP protocol in browser.");
};

Url.prototype.readFullyNodeJs = function() {
    // need a synchronous call here, highly discouraged in main thread
    var request = eval("require('sync-request')");
    var method = this.httpMethod || "GET";
    var res = request(method, this.path);
    return res.getBody().toString();
};

Url.prototype.readFullyHttp = function() {
    var xhr = this.createHttpRequest(false);
    xhr.send();
	this.checkHttpStatus(xhr);
    return xhr.responseText;
};

Url.prototype.readFullyAsync = function(callback) {
    if (isNodeJs)
        return this.readFullyAsyncNodeJs(callback);
    else
        return this.readFullyAsyncBrowser(callback);
};

Url.prototype.readFullyAsyncBrowser = function(callback) {
    var protocol = this.getProtocol();
    if(protocol.startsWith("http"))
        return this.readFullyAsyncHttp(callback);
    else
        this.throwError("Url only supports HTTP protocol in browser.");
};

Url.prototype.readFullyAsyncNodeJs = function(callback) {
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
};

Url.prototype.readFullyAsyncHttp = function(callback) {
	var self = this;
	var xhr = this.createHttpRequest(true);
	xhr.onload = function() {
		self.checkHttpStatus(xhr);
		callback(xhr.responseText);
	};
	xhr.send();
};

Url.prototype.checkHttpStatus = function(xhr) {
    if (xhr.status !== 200)
        this.throwError("Request failed, status: " + xhr.status + ", " + xhr.statusText);
};

Url.prototype.throwError = function(message) {
    var rwe = null;
    try {
        rwe = eval("prompto.error.ReadWriteError"); // assume it's already defined
    } catch (error) {
        rwe = null;
    }
    if(rwe)
        throw new rwe(message);
    else
        throw new Error(message);
};

Url.prototype.createHttpRequest = function(async) {
    var xhr = new XMLHttpRequest();
    xhr.overrideMimeType('text/plain');
	var httpMethod = this.getHttpMethod();
	xhr.open(httpMethod, this.path, async);
	// Accept-Charset is not allowed in browsers, so ignore this.encoding
	var httpHeaders = { Accept: "application/json, text/plain", "Content-Type": "application/x-www-form-urlencoded" };
	if(this.httpHeaders) {
        this.httpHeaders.forEach(function(header) {
            httpHeaders[header.name] = header.text;
        });
	}
	for(var name in httpHeaders) {
		xhr.setRequestHeader(name, httpHeaders[name]);
	}
    return xhr;
};

Url.prototype.getProtocol = function() {
	var idx = this.path.indexOf(":");
	return idx < 0 ? "http" : this.path.substring(0, idx);
};

Url.prototype.getHttpMethod = function() {
	if(this.httpMethod) {
		// fetch value from enum
		if(this.httpMethod.value)
			return this.httpMethod.value;
		else
			return this.httpMethod;
	} else
		return "GET";
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
	var self = this;
	var async = callback !== null;
	var xhr = this.createHttpRequest(async);
	xhr.onload = function() {
		self.checkHttpStatus(xhr);
		if(callback !== null)
			callback(xhr.responseText);
	};
	data = this.serialize(data);
	xhr.send(data);
};

Url.prototype.serialize = function(data) {
    var writeJSONValue = eval("writeJSONValue");
	return JSON.stringify(writeJSONValue(data));
};

Url.prototype.writeLine = function(data) {
	this.throwError("Url only supports full HTTP writes in browser.");
};

exports.Url = Url;