var ReadWriteError = require("../error/ReadWriteError").ReadWriteError;

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
    var r = new XmlHttpRequest();
    r.open('GET', this.path, false);
    r.overrideMimeType('text/plain');
    r.send(null)
    if(r.status!=200)
        throw new ReadWriteError("Request failed, status: " + r.status);
    return r.responseText;
};

Url.prototype.writeFully = function(data) {

};

exports.Url = Url;
