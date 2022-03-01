import Expression from './Expression.js'
import { VoidType } from "../type/index.js";
import { NullValue } from "../value/index.js";

export default class SymbolExpression extends Expression {

    constructor(id) {
        super();
        this.id = id;
    }

    get name() {
        return this.id.name;
    }

    toDialect(writer) {
        writer.append(this.name);
    }

    check(context) {
        const symbol = context.getRegisteredValue(this.id);
        if(symbol==null) {
            context.problemListener.reportUnknownIdentifier(this, this.name);
            return VoidType.instance;
        } else
            return symbol.check(context);
    }

    interpret(context) {
        const symbol = context.getRegisteredValue(this.id);
        if(symbol==null) {
            context.problemListener.reportUnknownIdentifier(this, this.name);
            return NullValue.instance;
        } else
            return symbol.interpret(context);
    }

    declare(transpiler) {
        const symbol = transpiler.context.getRegisteredValue(this.id);
        symbol.declare(transpiler);
    }

    transpile(transpiler) {
        const symbol = transpiler.context.getRegisteredValue(this.id);
        symbol.transpile(transpiler);
    }
}

