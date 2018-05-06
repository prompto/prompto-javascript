var SyntaxError = require("../error/SyntaxError").SyntaxError;

function SymbolExpression(id) {
    this.id = id;
	return this;
}

Object.defineProperty(SymbolExpression.prototype, "name", {
    get : function() {
        return this.id.name;
    }
});

SymbolExpression.prototype.toDialect = function(writer) {
    writer.append(this.name);
};

SymbolExpression.prototype.check = function(context) {
	var symbol = context.getRegisteredValue(this.name);
	if(symbol==null) {
		throw new SyntaxError("Unknown symbol:" + this.name);
	}
	return symbol.check(context);
};

SymbolExpression.prototype.interpret = function(context) {
	var symbol = context.getRegisteredValue(this.name);
	if(symbol==null) {
		throw new SyntaxError("Unknown symbol:" + this.name);
	}
	return symbol.interpret(context);
};

SymbolExpression.prototype.transpile = function(transpiler) {
    var symbol = transpiler.context.getRegisteredValue(this.name);
    if(symbol==null) {
        throw new SyntaxError("Unknown symbol:" + this.name);
    }
    symbol.transpile(transpiler);
};


exports.SymbolExpression = SymbolExpression;