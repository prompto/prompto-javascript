var BaseDeclaration = require("./BaseDeclaration").BaseDeclaration;
var EnumeratedNativeType = require("../type/EnumeratedNativeType").EnumeratedNativeType;
var List = require("../intrinsic/List").List;

class EnumeratedNativeDeclaration extends BaseDeclaration {

    constructor(id, derivedFrom, symbols) {
        super(id);
        this.type = new EnumeratedNativeType(id, derivedFrom);
        this.symbols = symbols || [];
        this.symbols.forEach(function (symbol) {
            symbol.type = this.type;
        }, this);
    }

    getDeclarationType() {
        return "Enumerated";
    }

    getSymbol(name) {
        return this.symbols.filter(s => { return s.name === name; })[0] || null;
    }

    unregister(context) {
        context.unregisterDeclaration (this);
        this.symbols.forEach(symbol => {
            symbol.unregister(context);
        });
    }

    toDialect(writer) {
        writer.toDialect(this);
    }

    toMDialect(writer) {
        writer.append("enum ").append(this.name).append('(');
        this.type.derivedFrom.toDialect(writer);
        writer.append("):").newLine().indent();
        this.symbols.forEach(symbol => {
            symbol.toDialect(writer);
            writer.newLine();
        });
        writer.dedent();
    }

    toODialect(writer) {
        writer.append("enumerated ").append(this.name).append('(');
        this.type.derivedFrom.toDialect(writer);
        writer.append(") {").newLine().indent();
        this.symbols.forEach(symbol => {
            symbol.toDialect(writer);
            writer.append(";").newLine();
        });
        writer.dedent().append("}").newLine();
    }

    toEDialect(writer) {
        writer.append("define ").append(this.name).append(" as enumerated ");
        this.type.derivedFrom.toDialect(writer);
        writer.append(" with symbols:").newLine().indent();
        this.symbols.forEach(symbol => {
            symbol.toDialect(writer);
            writer.newLine();
        });
        writer.dedent();
    }

    register(context) {
        context.registerDeclaration(this);
        this.symbols.forEach(symbol => {
            symbol.register(context);
        });
    }

    check(context) {
        this.symbols.forEach(symbol => {
            symbol.check(context);
        });
        return this.type;
    }

    transpile(transpiler) {
        transpiler.append("function " + this.name + "(name, value) { this.name = name; this.value = value; return this; };").newLine();
        transpiler.append(this.name).append(".prototype.toString = function() { return this.name; };").newLine();
        transpiler.append(this.name).append(".prototype.equals = function(other) { return this==other; };").newLine();
        this.symbols.forEach(symbol => {symbol.initialize(transpiler);});
        var names = this.symbols.map(symbol => { return symbol.name; });
        transpiler.append(this.name).append(".symbols = new List(false, [").append(names.join(", ")).append("]);").newLine();
        transpiler.append(this.name).append(".symbolOf = function(name) { return eval(name); };").newLine();
    }

    getType(context) {
        return this.type;
    }

    declare(transpiler) {
        transpiler.require(List);
        transpiler.declare(this);
    }
}


exports.EnumeratedNativeDeclaration = EnumeratedNativeDeclaration;
