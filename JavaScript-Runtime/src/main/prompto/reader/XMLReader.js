var isNodeJs = typeof window === 'undefined' && typeof importScripts === 'undefined';

function xmlRead(text, keepNamespaces, keepAttributes) {
    var parser = isNodeJs ? new NodeParser(keepNamespaces, keepAttributes) : new WebParser(keepNamespaces, keepAttributes);
    return parser.read(text);
}

function XmlParser(keepNamespaces, keepAttributes) {
    this.keepNamespaces = keepNamespaces;
    this.keepAttributes = keepAttributes;
    return this;
}

XmlParser.prototype.convertDocument = function(doc) {
    var result = new intrinsic.Document();
    this.convertElement(result, this.getDocumentElement(doc));
    return result;
}

XmlParser.prototype.convertElement = function(parent, element) {
    var tagName = this.getNodeName(element);
    if(parent.$safe_getMember(tagName, false) !== null)
        this.convertListElement(parent, tagName, element);
    else
        parent.$safe_setMember(tagName, this.convertElementValue(element));
};

XmlParser.prototype.convertListElement = function(parent, tagName, element) {
    var list = null;
    var current = parent.$safe_getMember(tagName, false);
    if(current instanceof intrinsic.List)
        list = current;
    else {
        list = new intrinsic.List();
        list.addValue(current);
        parent.$safe_setMember(tagName, list);
    }
    list.addValue(this.convertElementValue(element));
}

XmlParser.prototype.convertElementValue = function(element) {
    var hasAttributes = this.keepAttributes && element.attributes.length > 0;
    var hasChildren = this.elementHasChildren(element);
    if(hasAttributes || hasChildren) {
        var result = new intrinsic.Document();
        if(this.keepAttributes) {
            this.getAttributes(element).forEach(function(attr) {
                result.$safe_setMember("@" + this.getNodeName(attr), this.getAttributeText(attr));
            }, this);
        }
        if(hasChildren) {
            this.getChildNodes(element).forEach(function(node) {
                if(this.isElement(node))
                    this.convertElement(result, node);
            }, this);
        } else
            result.$safe_setMember("$value", this.getElementText(element));
        return result;
    } else
        return this.getElementText(element);
};


XmlParser.prototype.elementHasChildren = function(element) {
    return this.getChildNodes(element).some(function(node) {
        return this.isElement(node);
    }, this);
};

function NodeParser(keepNamespaces, keepAttributes) {
    XmlParser.call(this, keepNamespaces, keepAttributes);
    return this;
}
NodeParser.prototype = Object.create(XmlParser.prototype);
NodeParser.prototype.constructor = NodeParser;

NodeParser.prototype.read = function(text) {
    var xmlbuilder = require('xmlbuilder2');
    var parsed = xmlbuilder.create(text);
    return this.convertDocument(parsed);
};

NodeParser.prototype.getDocumentElement = function(dom) {
    return dom.root().node;
}

NodeParser.prototype.getChildNodes = function(node) {
    return Array.from(node.childNodes);
};

NodeParser.prototype.isElement = function(node) {
    return node.nodeType === 1;
};

NodeParser.prototype.getNodeName = function(node) {
    return node.tagName;
};

NodeParser.prototype.getAttributeText = function(node) {
    return node.data;
};

NodeParser.prototype.getElementText = function(node) {
    return Array.from(node.childNodes).filter(function(node) {
        return node.nodeType === 3;
    }).map(function(node) {
        return node.data;
    }).join("");
};




function WebParser(keepNamespaces, keepAttributes) {
    XmlParser.call(this, keepNamespaces, keepAttributes);
    return this;
}
WebParser.prototype = Object.create(XmlParser.prototype);
WebParser.prototype.constructor = WebParser;


exports.xmlRead = xmlRead;
