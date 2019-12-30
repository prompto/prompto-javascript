var NativeType = require("./NativeType").NativeType;
var IterableType = require("./IterableType").IterableType;
var IntegerType = require("./IntegerType").IntegerType;
var Identifier = require("../grammar/Identifier").Identifier;
var Variable = require("../runtime/Variable").Variable;
var ToListMethodDeclaration = require("./ToListMethodDeclaration").ToListMethodDeclaration;

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
    return this.itemType.equals(obj.itemType);
};

CursorType.prototype.checkIterator = function(context, source) {
    return this.itemType;
};


CursorType.prototype.declareIterator = function(transpiler, name, expression) {
    transpiler = transpiler.newChildTranspiler(null);
    transpiler.context.registerValue(new Variable(name, this.itemType));
    expression.declare(transpiler);
};


CursorType.prototype.transpileIterator = function(transpiler, name, expression) {
    transpiler.append(".iterate(function(").append(name.name).append(") { return ");
    transpiler = transpiler.newChildTranspiler(null);
    transpiler.context.registerValue(new Variable(name, this.itemType));
    expression.transpile(transpiler);
    transpiler.append("; }, this)");
    transpiler.flush();
};


CursorType.prototype.checkMember = function(context, section, name) {
    if ("count"===name)
        return IntegerType.instance;
    else if ("totalCount"===name)
        return IntegerType.instance;
    else
        return IterableType.prototype.checkMember.call(this, context, section, name);
};

CursorType.prototype.declareMember = function(transpiler, section, name) {
    if("count"!==name && "totalCount"!==name)
        IterableType.prototype.declareMember.call(this, transpiler, section, name);
};

CursorType.prototype.transpileMember = function(transpiler, name) {
    if("count"===name || "totalCount"===name) {
        transpiler.append(name);
    } else
        IterableType.prototype.transpileMember.call(this, transpiler, name);
};


CursorType.prototype.getMemberMethods = function(context, name) {
    switch (name) {
        case "toList":
            return [new ToListMethodDeclaration(this.itemType)];
        default:
            return NativeType.prototype.getMemberMethods.call(context, name);
    }
};

exports.CursorType = CursorType;
