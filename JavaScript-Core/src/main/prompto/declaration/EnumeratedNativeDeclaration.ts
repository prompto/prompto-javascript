import BaseDeclaration from './BaseDeclaration'
import {EnumeratedNativeType, IType} from '../type'
import { List } from '../intrinsic'
import {NativeSymbol} from "../expression";
import {Context, Transpiler} from "../runtime";
import {Identifier, NativeSymbolList} from "../grammar";
import {CodeWriter} from "../utils";
import {IEnumerationInfo} from "../runtime/Catalog";

export default class EnumeratedNativeDeclaration extends BaseDeclaration {

    type: EnumeratedNativeType;
    symbols: NativeSymbolList;

    constructor(id: Identifier, derivedFrom: IType, symbols?: NativeSymbolList) {
        super(id);
        this.type = new EnumeratedNativeType(id, derivedFrom);
        this.symbols = symbols || new NativeSymbolList();
        this.symbols.forEach(symbol => symbol.type = this.type, this);
    }

    toDeclarationInfo(): IEnumerationInfo {
        return { name: this.name, dialect: this.dialect.name, symbols: this.symbols.map(s => s.name)};
    }

    getDeclarationType(): string {
        return "Enumerated";
    }

    getSymbolByName(name: string): NativeSymbol {
        return this.symbols.filter(s => s.name === name)[0] || null;
    }

    unregister(context: Context): void {
        context.unregisterDeclaration (this);
        this.symbols.forEach(symbol => {
            symbol.unregister(context);
        });
    }

    toDialect(writer: CodeWriter): void {
        writer.toDialect(this);
    }

    toMDialect(writer: CodeWriter): void {
        writer.append("enum ").append(this.name).append('(');
        this.type.derivedFrom.toDialect(writer);
        writer.append("):").newLine().indent();
        this.symbols.forEach(symbol => {
            symbol.toDialect(writer);
            writer.newLine();
        });
        writer.dedent();
    }

    toODialect(writer: CodeWriter): void {
        writer.append("enumerated ").append(this.name).append('(');
        this.type.derivedFrom.toDialect(writer);
        writer.append(") {").newLine().indent();
        this.symbols.forEach(symbol => {
            symbol.toDialect(writer);
            writer.append(";").newLine();
        });
        writer.dedent().append("}").newLine();
    }

    toEDialect(writer: CodeWriter): void {
        writer.append("define ").append(this.name).append(" as enumerated ");
        this.type.derivedFrom.toDialect(writer);
        writer.append(" with symbols:").newLine().indent();
        this.symbols.forEach(symbol => {
            symbol.toDialect(writer);
            writer.newLine();
        });
        writer.dedent();
    }

    register(context: Context): void {
        context.registerDeclaration(this);
        this.symbols.forEach(symbol => {
            symbol.register(context);
        });
    }

    check(context: Context): IType {
        this.symbols.forEach(symbol => {
            symbol.check(context);
        });
        return this.type;
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append("function " + this.name + "(name, value) { this.name = name; this.value = value; return this; };").newLine();
        transpiler.append(this.name).append(".prototype.toString = function() { return this.name; };").newLine();
        transpiler.append(this.name).append(".prototype.equals = function(other) { return this==other; };").newLine();
        this.symbols.forEach(symbol => {symbol.initialize(transpiler);});
        const names = this.symbols.map(symbol => symbol.name);
        transpiler.append(this.name).append(".symbols = new List(false, [").append(names.join(", ")).append("]);").newLine();
        transpiler.append(this.name).append(".symbolOf = function(name) { return eval(name); };").newLine();
    }

    getType(context: Context): IType {
        return this.type;
    }

    declare(transpiler: Transpiler): void {
        transpiler.require(List);
        transpiler.declare(this);
    }
}

