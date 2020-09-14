import ConcreteCategoryDeclaration from "./ConcreteCategoryDeclaration"
import { EnumeratedCategoryType } from "../type/index"
import { List } from "../intrinsic/index"
import { Identifier, IdentifierList } from "../grammar/index"

export default class EnumeratedCategoryDeclaration extends ConcreteCategoryDeclaration {

    constructor(id, attrs, derived, symbols) {
        super(id, attrs, derived, null);
        this.setSymbols(symbols);
    }

    getDeclarationType() {
        return "Enumerated";
    }

    getSymbol(name) {
        return this.symbols.filter(s => s.name === name)[0] || null;
    }

    unregister(context) {
        context.unregisterDeclaration (this);
        this.symbols.forEach(symbol => {
            symbol.unregister(context);
        });
    }

    getLocalAttributes() {
        let attributes = super.getLocalAttributes();
        if(!attributes)
            attributes = new IdentifierList();
        if(!attributes.hasAttribute("name"))
            attributes.add(new Identifier("name"));
        return attributes;
    }

    hasAttribute(context, name) {
        if("name"==name)
            return true;
        else
            return super.hasAttribute(context, name);
    }

    setSymbols(symbols) {
        this.symbols = symbols || [];
        const type = new EnumeratedCategoryType(this.id);
        this.symbols.forEach(symbol => {
            symbol.type = type;
        });
    }

    register(context) {
        context.registerDeclaration(this);
        this.symbols.forEach(symbol => {
            symbol.register(context);
        });
    }

    check(context) {
        super.check(context);
        this.symbols.forEach(symbol => {
            symbol.check(context);
        });
        return this.getType(context);
    }

    getType(context) {
        return new EnumeratedCategoryType(this.id);
    }

    toODialect(writer) {
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
        this.symbols.forEach(symbol => {
            symbol.toDialect(writer);
            writer.append(";").newLine();
        });
        writer.dedent().append("}").newLine();
    }

    toEDialect(writer) {
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
        this.symbols.forEach(symbol => {
            symbol.toDialect(writer);
            writer.newLine();
        });
        writer.dedent();
    }

    toMDialect(writer) {
        writer.append("enum ").append(this.name).append("(");
        if(this.derivedFrom!=null) {
            this.derivedFrom.toDialect(writer, false);
            if(this.attributes!=null && this.attributes.length>0)
                writer.append(", ");
        }
        if(this.attributes!=null && this.attributes.length>0)
            this.attributes.toDialect(writer, false);
        writer.append("):").newLine().indent();
        this.symbols.forEach(symbol => {
            symbol.toDialect(writer);
            writer.newLine();
        });
        writer.dedent();
    }

    isUserError(context) {
        return this.derivedFrom && this.derivedFrom.length===1 && this.derivedFrom[0].name==="Error";
    }

    ensureDeclarationOrder(context, list, set) {
        if(set.has(this))
            return;
        if (this.isUserError(context)) {
            list.push(this);
            set.add(this);
            // don't declare inherited Error
        } else
            super.ensureDeclarationOrder(context, list, set);
    }

    declare(transpiler) {
        if(this.name==="Error")
            return;
        transpiler.require(List);
        super.declare(transpiler);
    }

    transpile(transpiler) {
        if (this.isUserError(transpiler.context))
            this.transpileUserError(transpiler);
        else
            this.transpileEnumerated(transpiler);
    }

    transpileUserError(transpiler) {
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
        this.symbols.forEach(symbol => { symbol.initializeError(transpiler); });
        this.transpileSymbols(transpiler);
    }

    transpileSymbols(transpiler) {
        const names = this.symbols.map(symbol => symbol.name);
        transpiler.append(this.name).append(".symbols = new List(false, [").append(names.join(", ")).append("]);").newLine();
        transpiler.append(this.name).append(".symbolOf = function(name) { return eval(name); };").newLine();
    }

    transpileEnumerated(transpiler) {
        super.transpile(transpiler);
        transpiler.newLine();
        transpiler.append(this.name).append(".prototype.toString = function() { return this.name; };").newLine();
        transpiler.append(this.name).append(".prototype.equals = function(other) { return this==other; };").newLine();
        if(this.hasAttribute(transpiler.context, "text"))
            transpiler.append(this.name).append(".prototype.getText = function() { return this.text; };").newLine();
        else
            transpiler.append(this.name).append(".prototype.getText = ").append(this.name).append(".prototype.toString;").newLine();
        this.symbols.forEach(symbol => { symbol.initialize(transpiler); });
        this.transpileSymbols(transpiler);
    }
}
