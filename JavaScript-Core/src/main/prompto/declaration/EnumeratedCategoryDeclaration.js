var ConcreteCategoryDeclaration = require("./ConcreteCategoryDeclaration").ConcreteCategoryDeclaration;
var EnumeratedCategoryType = require("../type/EnumeratedCategoryType").EnumeratedCategoryType;
var IdentifierList = require("../grammar/IdentifierList").IdentifierList;
var Identifier = require("../grammar/Identifier").Identifier;
var List = require("../intrinsic/List").List;


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


EnumeratedCategoryDeclaration.prototype.getSymbol = function(name) {
    return this.symbols.filter(function(s) { return s.name === name; })[0] || null;
};


EnumeratedCategoryDeclaration.prototype.unregister = function(context) {
    context.unregisterDeclaration (this);
    this.symbols.forEach(function(symbol) {
        symbol.unregister(context);
    });
};


EnumeratedCategoryDeclaration.prototype.getLocalAttributes = function() {
    var attributes = ConcreteCategoryDeclaration.prototype.getLocalAttributes.call(this);
    if(!attributes)
        attributes = new IdentifierList();
    if(!attributes.hasAttribute("name"))
        attributes.add(new Identifier("name"));
    return attributes;
};


EnumeratedCategoryDeclaration.prototype.hasAttribute = function(context, name) {
    if("name"==name)
        return true;
    else
        return ConcreteCategoryDeclaration.prototype.hasAttribute.call(this, context, name);
};


EnumeratedCategoryDeclaration.prototype.setSymbols = function(symbols) {
	this.symbols = symbols || [];
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
    writer.append("enumerated category ").append(this.name);
    if(this.attributes!=null) {
        writer.append('(');
        this.attributes.toDialect(writer, true);
        writer.append(")");
    }
    if(this.derivedFrom!=null) {
        writer.append(" extends ");
        this.derivedFrom.toDialect(writer, true);
    }
    writer.append(" {").newLine().indent();
    this.symbols.forEach(function(symbol) {
        symbol.toDialect(writer);
        writer.append(";").newLine();
    });
    writer.dedent().append("}").newLine();
};

EnumeratedCategoryDeclaration.prototype.toEDialect = function(writer) {
    writer.append("define ").append(this.name).append(" as enumerated ");
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
            writer.append(", and symbols:").newLine();
    } else
        writer.append(" with symbols:").newLine();
    writer.indent();
    this.symbols.forEach(function(symbol) {
        symbol.toDialect(writer);
        writer.newLine();
    });
    writer.dedent();
};

EnumeratedCategoryDeclaration.prototype.toMDialect = function(writer) {
    writer.append("enum ").append(this.name).append("(");
    if(this.derivedFrom!=null) {
        this.derivedFrom.toDialect(writer, false);
        if(this.attributes!=null && this.attributes.length>0)
            writer.append(", ");
    }
    if(this.attributes!=null && this.attributes.length>0)
        this.attributes.toDialect(writer, false);
    writer.append("):").newLine().indent();
    this.symbols.forEach(function(symbol) {
        symbol.toDialect(writer);
        writer.newLine();
    });
    writer.dedent();
};

EnumeratedCategoryDeclaration.prototype.isUserError = function(context) {
    return this.derivedFrom && this.derivedFrom.length===1 && this.derivedFrom[0].name==="Error";
};

EnumeratedCategoryDeclaration.prototype.ensureDeclarationOrder = function(context, list, set) {
    if(set.has(this))
        return;
    if (this.isUserError(context)) {
        list.push(this);
        set.add(this);
        // don't declare inherited Error
    } else
        ConcreteCategoryDeclaration.prototype.ensureDeclarationOrder.call(this, context, list, set);
};


EnumeratedCategoryDeclaration.prototype.declare = function(transpiler) {
    if(this.name==="Error")
        return;
    transpiler.require(List);
    ConcreteCategoryDeclaration.prototype.declare.call(this, transpiler);
};

EnumeratedCategoryDeclaration.prototype.transpile = function(transpiler) {
    if (this.isUserError(transpiler.context))
        this.transpileUserError(transpiler);
    else
        this.transpileEnumerated(transpiler);
};


EnumeratedCategoryDeclaration.prototype.transpileUserError = function(transpiler) {
    transpiler.append("class ").append(this.name).append(" extends Error {").indent();
    transpiler.newLine();
    transpiler.append("constructor(values) {").indent();
    transpiler.append("super(values.text);").newLine();
    transpiler.append("this.name = '").append(this.name).append("';").newLine();
    transpiler.append("this.promptoName = values.name;").newLine();
    transpiler.append("return this;").dedent();
    transpiler.append("}").newLine();
    transpiler.append("toString() {").indent().append("return this.message;").dedent().append("}").newLine();
    transpiler.append("getText() {").indent().append("return this.message;").dedent().append("}").newLine();
    transpiler.dedent().append("}").newLine();
    this.symbols.forEach(function(symbol) { symbol.initializeError(transpiler); });
    this.transpileSymbols(transpiler);
};

EnumeratedCategoryDeclaration.prototype.transpileSymbols = function(transpiler) {
    var names = this.symbols.map(function (symbol) {
        return symbol.name;
    });
    transpiler.append(this.name).append(".symbols = new List(false, [").append(names.join(", ")).append("]);").newLine();
    transpiler.append(this.name).append(".symbolOf = function(name) { return eval(name); };").newLine();
};

EnumeratedCategoryDeclaration.prototype.transpileEnumerated = function(transpiler) {
    ConcreteCategoryDeclaration.prototype.transpile.call(this, transpiler);
    transpiler.newLine();
    transpiler.append(this.name).append(".prototype.toString = function() { return this.name; };").newLine();
    if(this.hasAttribute(transpiler.context, "text"))
        transpiler.append(this.name).append(".prototype.getText = function() { return this.text; };").newLine();
    else
        transpiler.append(this.name).append(".prototype.getText = ").append(this.name).append(".prototype.toString;").newLine();
    this.symbols.forEach(function(symbol) { symbol.initialize(transpiler); });
    this.transpileSymbols(transpiler);
};

exports.EnumeratedCategoryDeclaration = EnumeratedCategoryDeclaration;