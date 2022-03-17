var isNodeJs = typeof window === 'undefined' && typeof importScripts === 'undefined';

function xmlWrite(doc) {
    var parser = isNodeJs ? new NodeSerializer() : new WebSerializer();
    var document = parser.convertToDocument(doc);
    return parser.documentToString(document);
}

function XmlSerializer() {
    return this;
}

XmlSerializer.prototype.convertToDocument = function(doc) {
    var keys = doc.$user_keys.filter(function(key) { return !key.startsWith("@"); });
    if(keys.length !== 1)
        throw new Error("Document must have a single root element");
    var document = this.createDocument();
    this.convertRootDocument(document, keys[0], doc);
    return document;
};

XmlSerializer.prototype.convertRootDocument = function(document, tagName, doc) {
    var element = this.createElement(document, tagName);
    this.setElementAttributes(element, doc);
    this.convertValue(element, doc.$safe_getMember(tagName, false));
    return element;
};

XmlSerializer.prototype.setElementAttributes = function(element, doc) {
    doc.$user_keys.filter(function(key) { return key.startsWith("@"); })
        .forEach(function(key) {
            this.setAttribute(element, key.substring(1), doc.$safe_getMember(key).toString());
        }, this);
};

XmlSerializer.prototype.convertValue = function(parent, value) {
    if(value !== null) {
        if (intrinsic.List && value instanceof intrinsic.List)
            value.forEach(function (item) {
                this.convertValue(parent, item);
            }, this);
        else if (intrinsic.StrictSet && value instanceof intrinsic.StrictSet)
            value.toArray().forEach(function (item) {
                this.convertValue(parent, item);
            }, this);
        else if (intrinsic.Dictionary && value instanceof intrinsic.Dictionary)
            this.convertDict(parent, value)
        else if (intrinsic.Document && value instanceof intrinsic.Document)
            this.convertDocument(parent, value)
        else
            this.setElementText(parent, value.toString());
    }
};

XmlSerializer.prototype.convertDict = function(parent, value) {
    value.$keys.forEach(function(key) {
        var element = this.createElement(parent, key);
        this.convertValue(element, value.getItem(key));
    }, this);
};

XmlSerializer.prototype.convertDocument = function(parent, value) {
    this.setElementAttributes(parent, value);
    var children = value.$user_keys.filter(function(key) { return !key.startsWith("@") && key !== "$value"; });
    if(children.length > 0) {
        children.forEach(function(key) {
            var element = this.createElement(parent, key);
            this.convertValue(element, value.$safe_getMember(key));
        }, this);
    } else
        this.setElementText(parent, value.$safe_getMember("$value").toString());
};

function NodeSerializer() {
    XmlSerializer.call(this);
    return this;
}

NodeSerializer.prototype = Object.create(XmlSerializer.prototype);
NodeSerializer.prototype.constructor = NodeSerializer;

NodeSerializer.prototype.createDocument = function() {
    var xmlbuilder = require('xmlbuilder2');
    return xmlbuilder.create({ version: '1.0' });
};

NodeSerializer.prototype.createElement = function(parent, tagName) {
    return parent.ele(tagName);
};

NodeSerializer.prototype.setElementText = function(element, value) {
    return element.txt(value);
};

NodeSerializer.prototype.documentToString = function(dom) {
    return dom.end();
};

function WebSerializer() {
    XmlSerializer.call(this);
    return this;
}

WebSerializer.prototype = Object.create(XmlSerializer.prototype);
WebSerializer.prototype.constructor = WebSerializer;

exports.xmlWrite = xmlWrite;
