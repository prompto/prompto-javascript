var SelectorExpression = require("./SelectorExpression").SelectorExpression;
var UnresolvedIdentifier = null;
var SymbolExpression = require("./SymbolExpression").SymbolExpression;
var TypeExpression = require("./TypeExpression").TypeExpression;
var NullReferenceError = require("../error/NullReferenceError").NullReferenceError;
var EnumeratedCategoryType = null;
var CategoryType = null;
var NullValue = require("../value/NullValue").NullValue;
var Value = require("../value/Value").Value;
var Text = require("../value/TextValue").Text;

exports.resolve = function() {
    UnresolvedIdentifier = require("./UnresolvedIdentifier").UnresolvedIdentifier;
    EnumeratedCategoryType = require("../type/EnumeratedCategoryType").EnumeratedCategoryType;
    CategoryType = require("../type/CategoryType").CategoryType;

}

function MemberSelector(parent, id) {
	SelectorExpression.call(this, parent);
	this.id = id;
	return this;
}

MemberSelector.prototype = Object.create(SelectorExpression.prototype);
MemberSelector.prototype.constructor = MemberSelector;

Object.defineProperty(MemberSelector.prototype, "name", {
    get : function() {
        return this.id.name;
    }
});

MemberSelector.prototype.toDialect = function(writer) {
    // ensure singletons are not treated as constructors
    try {
        this.resolveParent(writer.context);
    } catch(e) {
        // ignore
    }
    this.parent.toDialect(writer);
    writer.append(".");
    writer.append(this.name);
};



MemberSelector.prototype.declareParent = function(transpiler) {
    // resolve parent to keep clarity
    var parent = this.resolveParent(transpiler.context);
    parent.declare(transpiler);
};


MemberSelector.prototype.declare = function(transpiler) {
    this.declareParent(transpiler);
    var parentType = this.checkParent(transpiler.context);
    return parentType.declareMember(transpiler, this.name);
};


MemberSelector.prototype.transpile = function(transpiler) {
    // resolve parent to keep clarity
    var parent = this.resolveParent(transpiler.context);
    // special case for singletons
    if(this.transpileSingleton(transpiler, parent))
        return;
    // special case for 'static' type members (like Enum.symbols, Type.name etc...)
    if(this.transpileTypeMember(transpiler, parent))
        return;
    // finally resolve instance member
    this.transpileInstanceMember(transpiler, parent);
};

MemberSelector.prototype.transpileSingleton = function(transpiler, parent) {
    if(parent instanceof TypeExpression && parent.value instanceof CategoryType && !(parent.value instanceof EnumeratedCategoryType)) {
        parent.value.transpileInstance(transpiler);
        transpiler.append(".").append(this.name);
        return true;
    } else
        return false;
};


MemberSelector.prototype.transpileTypeMember = function(transpiler, parent) {
    return false; // TODO
};

MemberSelector.prototype.transpileInstanceMember = function(transpiler, parent) {
    parent.transpile(transpiler);
    transpiler.append(".");
    var type = parent.check(transpiler.context);
    type.transpileMember(transpiler, this.name);
};


MemberSelector.prototype.toString = function() {
	return this.parent.toString() + "." + this.name;
};

MemberSelector.prototype.check = function(context) {
    var parentType = this.checkParent(context);
    return parentType.checkMember(context, this.name);
};

MemberSelector.prototype.interpret = function(context) {
    // resolve parent to keep clarity
    var parent = this.resolveParent(context);
    // special case for singletons
    var value = this.interpretSingleton(context, parent);
    if(value!=null)
        return value;
    // special case for 'static' type members (like Enum.symbols, Type.name etc...)
    value = this.interpretTypeMember(context, parent);
    if(value!=null)
        return value;
    // finally resolve instance member
    return this.interpretInstanceMember(context, parent);
};

MemberSelector.prototype.interpretInstanceMember = function(context, parent) {
    var instance = this.parent.interpret(context);
    if (instance == null || instance == NullValue.instance)
        throw new NullReferenceError();
    else
        return instance.getMemberValue(context, this.name, true);
};

MemberSelector.prototype.interpretTypeMember = function(context, parent) {
    if(parent instanceof TypeExpression)
        return parent.getMemberValue(context, this.name);
    else
        return null;
};

MemberSelector.prototype.interpretSingleton = function(context, parent) {
    if(parent instanceof TypeExpression && parent.value instanceof CategoryType && !(parent.value instanceof EnumeratedCategoryType)) {
        var instance = context.loadSingleton(parent.value);
        if(instance!=null)
            return instance.getMemberValue(context, this.name);
    }
    return null;
};

MemberSelector.prototype.resolveParent = function(context) {
    if(this.parent instanceof UnresolvedIdentifier) {
        this.parent.checkMember(context);
        return this.parent.resolved;
    } else
        return this.parent;
};

exports.MemberSelector = MemberSelector;

