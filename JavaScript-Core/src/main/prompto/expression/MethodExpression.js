var MethodType = require("../type/MethodType").MethodType;
var MethodDeclarationMap = null; // circular dependency
var Dialect = require("../parser/Dialect").Dialect;
var ClosureValue = require("../value/ClosureValue").ClosureValue;

exports.resolve = function() {
    MethodDeclarationMap = require("../runtime/Context").MethodDeclarationMap;
};

function MethodExpression(id) {
	this.id = id;
	return this;
}

Object.defineProperty(MethodExpression.prototype, "name", {
    get : function() {
        return this.id.name;
    }
});

MethodExpression.prototype.toString = function() {
	return "Method: " + this.name;
};

MethodExpression.prototype.toDialect = function(writer) {
    if(writer.dialect==Dialect.E)
        writer.append("Method: ");
    writer.append(this.name);
};

MethodExpression.prototype.check = function(context) {
	var named = context.getRegistered(this.name);
	if(named instanceof MethodDeclarationMap) { // global method or closure
        var decl = named.getFirst();
		return new MethodType(decl);
	} else {
		throw new SyntaxError("No method with name:" + this.name);
	}
};

MethodExpression.prototype.interpret = function(context, asMethod) {
	if(context.hasValue(this.id)) {
        return context.getValue(this.id);
    } else {
        var named = context.getRegistered(this.id);
        if (named instanceof MethodDeclarationMap) {
            var decl = named.getFirst();
            return new ClosureValue(context, new MethodType(decl))
        } else {
            throw new SyntaxError("No method with name:" + this.name);
        }
    }
};

MethodExpression.prototype.declare = function(transpiler) {
    var named = transpiler.context.getRegistered(this.name);
    var decl = named.getFirst();
    if(!decl.declarationStatement)
        decl.declare(transpiler);
};

MethodExpression.prototype.transpile = function(transpiler) {
    var named = transpiler.context.getRegistered(this.name);
    var decl = named.getFirst();
    transpiler.append(decl.getTranspiledName(transpiler.context));
};

	
exports.MethodExpression = MethodExpression;
