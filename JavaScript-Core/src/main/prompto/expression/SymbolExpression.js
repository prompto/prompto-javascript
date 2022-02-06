import Expression from './Expression.js'
import { SyntaxError } from '../error/index.js'

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
            throw new SyntaxError("Unknown symbol:" + this.name);
        }
        return symbol.check(context);
    }

    interpret(context) {
        const symbol = context.getRegisteredValue(this.id);
        if(symbol==null) {
            throw new SyntaxError("Unknown symbol:" + this.name);
        }
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

