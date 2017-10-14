var BaseDeclaration = require("./BaseDeclaration").BaseDeclaration;
var EnumeratedNativeType = require("../type/EnumeratedNativeType").EnumeratedNativeType;

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
    writer.append("enum ");
    writer.append(this.name);
    writer.append('(');
    this.type.derivedFrom.toDialect(writer);
    writer.append("):\n");
    writer.indent();
    this.symbols.forEach(function(symbol) {
        symbol.toDialect(writer);
        writer.append("\n");
    });
    writer.dedent();
}

EnumeratedNativeDeclaration.prototype.toODialect = function(writer) {
    writer.append("enumerated ");
    writer.append(this.name);
    writer.append('(');
    this.type.derivedFrom.toDialect(writer);
    writer.append(") {\n");
    writer.indent();
    this.symbols.forEach(function(symbol) {
        symbol.toDialect(writer);
        writer.append(";\n");
    });
    writer.dedent();
    writer.append("}\n");
}

EnumeratedNativeDeclaration.prototype.toEDialect = function(writer) {
    writer.append("define ");
    writer.append(this.name);
    writer.append(" as enumerated ");
    this.type.derivedFrom.toDialect(writer);
    writer.append(" with symbols:\n");
    writer.indent();
    this.symbols.forEach(function(symbol) {
        symbol.toDialect(writer);
        writer.append("\n");
    });
    writer.dedent();
};

EnumeratedNativeDeclaration.prototype.register = function(context) {
	context.registerDeclaration(this);
    this.symbols.forEach(function(symbol) {
		symbol.register(context);
	});
};

EnumeratedNativeDeclaration.prototype.check = function(context) {
    this.symbols.forEach(function(symbol) {
		symbol.check(context);
	});
	return this.type;
};

EnumeratedNativeDeclaration.prototype.getType = function(context) {
	return this.type;
};


exports.EnumeratedNativeDeclaration = EnumeratedNativeDeclaration;
