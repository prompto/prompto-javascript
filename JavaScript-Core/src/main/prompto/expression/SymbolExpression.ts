import BaseExpression from './BaseExpression'
import {IType, VoidType} from "../type";
import {NullValue, IValue} from "../value";
import {Identifier} from "../grammar";
import {Context} from "../runtime";
import {CodeWriter} from "../utils";

export default class SymbolExpression extends BaseExpression {

    id: Identifier;

    constructor(id: Identifier) {
        super();
        this.id = id;
    }

    get name() {
        return this.id.name;
    }

    toDialect(writer: CodeWriter): void {
        writer.append(this.name);
    }

    check(context: Context): IType {
        const symbol = context.getRegisteredValue(this.id);
        if(symbol==null) {
            context.problemListener.reportUnknownIdentifier(this, this.name);
            return VoidType.instance;
        } else
            return symbol.check(context);
    }

    interpret(context: Context): IValue {
        const symbol = context.getRegisteredValue(this.id);
        if(symbol==null) {
            context.problemListener.reportUnknownIdentifier(this, this.name);
            return NullValue.instance;
        } else
            return symbol.interpret(context);
    }

    declare(transpiler: Transpiler): void {
        const symbol = transpiler.context.getRegisteredValue(this.id);
        symbol.declare(transpiler);
    }

    transpile(transpiler: Transpiler): void {
        const symbol = transpiler.context.getRegisteredValue(this.id);
        symbol.transpile(transpiler);
    }
}

