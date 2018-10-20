var IterableType = require("./IterableType").IterableType;
var IntegerType = require("./IntegerType").IntegerType;
var Identifier = require("../grammar/Identifier").Identifier;

function CursorType(itemType) {
    IterableType.call(this, new Identifier("Cursor<" + itemType.name + ">"), itemType);
    return this;
}

CursorType.prototype = Object.create(IterableType.prototype);
CursorType.prototype.constructor = CursorType;


CursorType.prototype.withItemType = function(itemType) {
    return new CursorType(itemType);
};


CursorType.prototype.isAssignableFrom = function(context, other) {
    return IterableType.prototype.isAssignableFrom.call(this, context, other)
        || ((other instanceof CursorType) && this.itemType.isAssignableFrom(context, other.itemType));
};

CursorType.prototype.equals = function(obj) {
    if(obj==this)
        return true;
    if(!(obj instanceof CursorType))
        return false;
    return this.itemType.equals(other.itemType);
};

CursorType.prototype.checkIterator = function(context, source) {
    return this.itemType;
};

CursorType.prototype.checkMember = function(context, section, name) {
    if ("count"===name)
        return IntegerType.instance;
    else if ("totalCount"===name)
        return IntegerType.instance;
    else
        return IterableType.prototype.checkMember.call(this, context, section, name);
};

CursorType.prototype.declareMember = function(transpiler, name) {
    if("count"!==name && "totalCount"!==name)
        IterableType.prototype.declareMember.call(this, transpiler, name);
};

CursorType.prototype.transpileMember = function(transpiler, name) {
    if("count"===name || "totalCount"===name) {
        transpiler.append(name);
    } else
        IterableType.prototype.transpileMember.call(this, transpiler, name);
};

exports.CursorType = CursorType;
