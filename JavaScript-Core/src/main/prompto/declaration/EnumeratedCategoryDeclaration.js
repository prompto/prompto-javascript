var ConcreteCategoryDeclaration = require("./ConcreteCategoryDeclaration").ConcreteCategoryDeclaration;
var EnumeratedCategoryType = require("../type/EnumeratedCategoryType").EnumeratedCategoryType;

function EnumeratedCategoryDeclaration(id, attrs, derived, symbols) {
	ConcreteCategoryDeclaration.call(this, id, attrs, derived, null);
	this.setSymbols(symbols);
	return this;
}

EnumeratedCategoryDeclaration.prototype = Object.create(ConcreteCategoryDeclaration.prototype);
EnumeratedCategoryDeclaration.prototype.constructor = EnumeratedCategoryDeclaration;


EnumeratedCategoryDeclaration.prototype.getDeclarationType = function() {
    return "Enumerated";
};


EnumeratedCategoryDeclaration.prototype.unregister = function(context) {
    context.unregisterDeclaration (this);
    this.symbols.forEach(function(symbol) {
        symbol.unregister(context);
    });
};

EnumeratedCategoryDeclaration.prototype.setSymbols = function(symbols) {
	this.symbols = symbols;
	var type = new EnumeratedCategoryType(this.id);
	this.symbols.forEach(function(symbol) {
        symbol.type = type;
	});
};

EnumeratedCategoryDeclaration.prototype.register = function(context) {
	context.registerDeclaration(this);
    this.symbols.forEach(function(symbol) {
        symbol.register(context);
	});
};

EnumeratedCategoryDeclaration.prototype.check = function(context) {
	ConcreteCategoryDeclaration.prototype.check.call(this, context);
    this.symbols.forEach(function(symbol) {
        symbol.check(context);
	});
	return this.getType(context);
};

EnumeratedCategoryDeclaration.prototype.getType = function(context) {
	return new EnumeratedCategoryType(this.id);
};

EnumeratedCategoryDeclaration.prototype.toODialect = function(writer) {
    writer.append("enumerated category ");
    writer.append(this.name);
    if(this.attributes!=null) {
        writer.append('(');
        this.attributes.toDialect(writer, true);
        writer.append(")");
    }
    if(this.derivedFrom!=null) {
        writer.append(" extends ");
        this.derivedFrom.toDialect(writer, true);
    }
    writer.append(" {\n");
    writer.indent();
    this.symbols.forEach(function(symbol) {
        symbol.toDialect(writer);
        writer.append(";\n");
    });
    writer.dedent();
    writer.append("}\n");
}

EnumeratedCategoryDeclaration.prototype.toEDialect = function(writer) {
    writer.append("define ");
    writer.append(this.name);
    writer.append(" as enumerated ");
    if(this.derivedFrom!=null)
        this.derivedFrom.toDialect(writer, true);
    else
        writer.append("category");
    if(this.attributes!=null && this.attributes.length>0) {
        if(this.attributes.length==1)
            writer.append(" with attribute ");
        else
            writer.append(" with attributes ");
        this.attributes.toDialect(writer, true);
        if(this.symbols!=null && this.symbols.length>0)
            writer.append(", and symbols:\n");
    } else
        writer.append(" with symbols:\n");
    writer.indent();
    this.symbols.forEach(function(symbol) {
        symbol.toDialect(writer);
        writer.append("\n");
    });
    writer.dedent();
}

EnumeratedCategoryDeclaration.prototype.toMDialect = function(writer) {
    writer.append("enum ");
    writer.append(this.name);
    writer.append("(");
    if(this.derivedFrom!=null) {
        this.derivedFrom.toDialect(writer, false);
        if(this.attributes!=null && this.attributes.length>0)
            writer.append(", ");
    }
    if(this.attributes!=null && this.attributes.length>0)
        this.attributes.toDialect(writer, false);
    writer.append("):\n");
    writer.indent();
    this.symbols.forEach(function(symbol) {
        symbol.toDialect(writer);
        writer.append("\n");
    });
    writer.dedent();
}

exports.EnumeratedCategoryDeclaration = EnumeratedCategoryDeclaration;