var prompto = require("../../../../../JavaScript-Core/src/main/prompto/index.js");
var any = prompto.type.AnyType.instance;

function jsonRead(text) {
    var node = JSON.parse(text);
    return toValue(node);
}

function toValue(node) {
    if(node===null)
        return prompto.value.NullValue.instance;
    else if(Array.isArray(node))
        return toList(node);
    var typeName = typeof(node);
    var converter = converters[typeName];
    return converter(node);
}

function toBoolean(node) {
    return prompto.value.Bool.ValueOf(node);
}

function toText(node) {
    return new prompto.value.Text(node);
}

function toDocument(node) {
    var values = {};
    for(var name in node) {
        if(node.hasOwnProperty(name))
            values[name] = toValue(node[name]);
    }
    return new prompto.value.Document(values);
}


function toList(node) {
    var values = node.map(toValue);
    return new prompto.value.ListValue(any, values);
}

function fromNumber(node) {
    if (node == Math.floor(node))
        return new prompto.value.Integer(node);
    else
        return new prompto.value.Decimal(node);
}

var converters = {
    "boolean" : toBoolean,
    "number" : fromNumber,
    "string" : toText,
    "object" : toDocument
}

exports.jsonRead = jsonRead;