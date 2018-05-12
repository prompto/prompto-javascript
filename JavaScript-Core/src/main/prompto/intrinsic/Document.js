function Document() {
    return this;
}

Document.prototype.toString = function() {
    return JSON.stringify(this);
};

exports.Document = Document;