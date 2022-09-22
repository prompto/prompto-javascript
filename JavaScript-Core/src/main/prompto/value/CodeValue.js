import Value from '../../../main/prompto/value/Value.ts'
import { CodeType } from '../type'

export default class CodeValue extends Value {

    constructor(expression) {
        super(CodeType.instance);
        this.expression = expression;
    }

    check(context: Context): Type {
        return this.expression.checkCode (context);
    }

    interpret(context: Context): Value {
        return this.expression.interpretCode (context);
    }

    declareCode(transpiler) {
        this.expression.declareCode (transpiler);
    }

    transpileCode(transpiler) {
        this.expression.transpileCode (transpiler);
    }
}

