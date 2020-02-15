var IterableType = require("./IterableType").IterableType;
var BooleanType = require("./BooleanType").BooleanType;
var TextType = null;
var Identifier = require("../grammar/Identifier").Identifier;
var Variable = require("../runtime/Variable").Variable;
var TextLiteral = null;
var BuiltInMethodDeclaration = null;
var CategoryParameter = null;

exports.resolve = function() {
    TextType = require("./TextType").TextType;
    TextLiteral = require("../literal/TextLiteral").TextLiteral;
    CategoryParameter = require("../param/CategoryParameter").CategoryParameter;
    resolveBuiltInMethodDeclaration();
};

function ContainerType(id, itemType) {
    IterableType.call(this, id);
	this.itemType = itemType;
	return this;
}

ContainerType.prototype = Object.create(IterableType.prototype);
ContainerType.prototype.constructor = ContainerType;

ContainerType.prototype.checkContains = function(context, other) {
	if(other.isAssignableFrom(context, this.itemType)) {
		return BooleanType.instance;
	} else {
		return IterableType.prototype.checkContains.call(this, context, other);
	}
};


ContainerType.prototype.checkMember = function(context, section, name) {
    if ("count" == name) {
        var IntegerType = require("./IntegerType").IntegerType;
        return IntegerType.instance;
    } else {
        return IterableType.prototype.checkMember.call(this, context, section, name);
    }
};


ContainerType.prototype.declareMember = function(transpiler, section, name) {
    if ("count" !== name) {
        return IterableType.prototype.declareMember.call(this, transpiler, section, name);
    }
};


ContainerType.prototype.transpileMember = function(transpiler, name) {
    if ("count" == name) {
        transpiler.append("length");
    } else {
        return IterableType.prototype.transpileMember.call(this, transpiler, name);
    }
};


ContainerType.prototype.declareSorted = function(transpiler, key) {
    // nothing to do
};

ContainerType.prototype.declareIterator = function(transpiler, name, expression) {
    transpiler = transpiler.newChildTranspiler();
    transpiler.context.registerValue(new Variable(name, this.itemType));
    expression.declare(transpiler);
};


ContainerType.prototype.transpileIterator = function(transpiler, name, expression) {
    transpiler.append(".iterate(function(").append(name).append(") { return ");
    transpiler = transpiler.newChildTranspiler();
    transpiler.context.registerValue(new Variable(name, this.itemType));
    expression.transpile(transpiler);
    transpiler.append("; }, this)");
    transpiler.flush();
};


function BaseJoinMethodDeclaration() {
    BuiltInMethodDeclaration.call(this, "join", new CategoryParameter(TextType.instance, new Identifier("delimiter"), new TextLiteral('","')));
    return this;
}

exports.ContainerType = ContainerType;
exports.BaseJoinMethodDeclaration = BaseJoinMethodDeclaration;

function resolveBuiltInMethodDeclaration() {
    TextValue = require("../value/TextValue").TextValue;
    BuiltInMethodDeclaration = require("../declaration/BuiltInMethodDeclaration").BuiltInMethodDeclaration;

    BaseJoinMethodDeclaration.prototype = Object.create(BuiltInMethodDeclaration.prototype);
    BaseJoinMethodDeclaration.prototype.constructor = BaseJoinMethodDeclaration;

    BaseJoinMethodDeclaration.prototype.interpret = function(context) {
        var items = this.getItems(context);
        var texts = items.map(function(value) { return value.toString(); });
        var delimiter = context.getValue(new Identifier("delimiter")).getStorableData();
        var joined = texts.join(delimiter);
        return new TextValue(joined);
    };

    BaseJoinMethodDeclaration.prototype.check = function(context) {
        return TextType.instance;
    };

    BaseJoinMethodDeclaration.prototype.transpileCall = function(transpiler, assignments) {
        transpiler.append("join(");
        assignments[0].transpile(transpiler);
        transpiler.append(")");
    };


}