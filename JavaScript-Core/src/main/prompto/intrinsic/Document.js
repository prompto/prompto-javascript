function Document() {
    return this;
}

Document.prototype.toString = function() {
    return JSON.stringify(this);
};

Document.prototype.getText = function() {
    if(this.hasOwnProperty("text"))
        return this.text;
    else
        return this.toString();
};

Document.prototype.getMember = function(name, create) {
    if(this.hasOwnProperty(name))
        return this[name];
    else if(create) {
        this[name] = new Document();
        return this[name];
    } else
        return null;
};


Document.prototype.setMember = function(name, value) {
    this[name] = value;
};


Document.prototype.setItem = function(item, value) {
    this[item] = value;
};

Document.prototype.item = function(item) {
    return this[item];
};


exports.Document = Document;