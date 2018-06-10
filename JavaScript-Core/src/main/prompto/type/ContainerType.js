var IterableType = require("./IterableType").IterableType;
var BooleanType = require("./BooleanType").BooleanType;
var Variable = require("../runtime/Variable").Variable;

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


ContainerType.prototype.checkMember = function(context, name) {
    if ("count" == name) {
        var IntegerType = require("./IntegerType").IntegerType;
        return IntegerType.instance;
    } else {
        return IterableType.prototype.checkMember.call(this, context, name);
    }
};


ContainerType.prototype.declareMember = function(transpiler, name) {
    if ("count" !== name) {
        return IterableType.prototype.declareMember.call(this, transpiler, name);
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


exports.ContainerType = ContainerType;

