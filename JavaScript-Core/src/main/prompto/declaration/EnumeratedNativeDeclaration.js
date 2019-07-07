var BaseDeclaration = require("./BaseDeclaration").BaseDeclaration;
var EnumeratedNativeType = require("../type/EnumeratedNativeType").EnumeratedNativeType;
var List = require("../intrinsic/List").List;

function EnumeratedNativeDeclaration(id, derivedFrom, symbols) {
	BaseDeclaration.call(this, id);
	this.type = new EnumeratedNativeType(id, derivedFrom);
	this.symbols = symbols || [];
    this.symbols.forEach(function (symbol) {
        symbol.type = this.type;
    }, this);
	return this;
}

EnumeratedNativeDeclaration.prototype = Object.create(BaseDeclaration.prototype);
EnumeratedNativeDeclaration.prototype.constructor = EnumeratedNativeDeclaration;


EnumeratedNativeDeclaration.prototype.getDeclarationType = function() {
    return "Enumerated";
};


EnumeratedNativeDeclaration.prototype.getSymbol = function(name) {
    return this.symbols.filter(function(s) { return s.name === name; })[0] || null;
};

EnumeratedNativeDeclaration.prototype.unregister = function(context) {
    context.unregisterDeclaration (this);
    this.symbols.forEach(function(symbol) {
        symbol.unregister(context);
    });
};

EnumeratedNativeDeclaration.prototype.toDialect = function(writer) {
    writer.toDialect(this);
};


EnumeratedNativeDeclaration.prototype.toMDialect = function(writer) {
    writer.append("enum ").append(this.name).append('(');
    this.type.derivedFrom.toDialect(writer);
    writer.append("):").newLine().indent();
    this.symbols.forEach(function(symbol) {
        symbol.toDialect(writer);
        writer.newLine();
    });
    writer.dedent();
}

EnumeratedNativeDeclaration.prototype.toODialect = function(writer) {
    writer.append("enumerated ").append(this.name).append('(');
    this.type.derivedFrom.toDialect(writer);
    writer.append(") {").newLine().indent();
    this.symbols.forEach(function(symbol) {
        symbol.toDialect(writer);
        writer.append(";").newLine();
    });
    writer.dedent().append("}").newLine();
}

EnumeratedNativeDeclaration.prototype.toEDialect = function(writer) {
    writer.append("define ").append(this.name).append(" as enumerated ");
    this.type.derivedFrom.toDialect(writer);
    writer.append(" with symbols:").newLine().indent();
    this.symbols.forEach(function(symbol) {
        symbol.toDialect(writer);
        writer.newLine();
    });
    writer.dedent();
};

EnumeratedNativeDeclaration.prototype.register = function(context) {
	context.registerDeclaration(this);
    this.symbols.forEach(function(symbol) {
		symbol.register(context);
	});
};

EnumeratedNativeDeclaration.prototype.check = function(context, isStart) {
    this.symbols.forEach(function(symbol) {
		symbol.check(context);
	});
	return this.type;
};

EnumeratedNativeDeclaration.prototype.transpile = function(transpiler) {
    transpiler.append("function " + this.name + "(name, value) { this.name = name; this.value = value; return this; };").newLine();
    transpiler.append(this.name).append(".prototype.toString = function() { return this.name; };").newLine();
    this.symbols.forEach(function(symbol) {symbol.initialize(transpiler);});
    var names = this.symbols.map(function(symbol) { return symbol.name; });
    transpiler.append(this.name).append(".symbols = new List(false, [").append(names.join(", ")).append("]);").newLine();
    transpiler.append(this.name).append(".symbolOf = function(name) { return eval(name); };").newLine();
};

EnumeratedNativeDeclaration.prototype.getType = function(context) {
	return this.type;
};

EnumeratedNativeDeclaration.prototype.declare = function(transpiler) {
    transpiler.require(List);
};


exports.EnumeratedNativeDeclaration = EnumeratedNativeDeclaration;
