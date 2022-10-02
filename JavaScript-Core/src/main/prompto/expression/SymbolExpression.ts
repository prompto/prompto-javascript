import BaseExpression from './BaseExpression'
import {IType, VoidType} from "../type";
import {NullValue, IValue} from "../value";
import {Identifier} from "../grammar";
import {Context, Transpiler} from "../runtime";
import {CodeWriter} from "../utils";
import EnumSymbol from "./EnumSymbol";

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
        const symbol = context.getRegisteredInstance(this.id);
        if(symbol instanceof EnumSymbol)
            return symbol.check(context);
        else {
            context.problemListener.reportUnknownIdentifier(this, this.name);
            return VoidType.instance;
        }
    }

    interpretExpression(context: Context): IValue {
        const symbol = context.getRegisteredInstance(this.id);
        if(symbol instanceof EnumSymbol)
            return symbol.interpretExpression(context);
        else {
            context.problemListener.reportUnknownIdentifier(this, this.name);
            return NullValue.instance;
        }

    }

    declare(transpiler: Transpiler): void {
        const symbol = transpiler.context.getRegisteredInstance(this.id);
        if(symbol instanceof EnumSymbol)
            symbol.declare(transpiler);
    }

    transpile(transpiler: Transpiler): void {
        const symbol = transpiler.context.getRegisteredInstance(this.id);
        if(symbol instanceof EnumSymbol)
            symbol.transpile(transpiler);
    }
}

