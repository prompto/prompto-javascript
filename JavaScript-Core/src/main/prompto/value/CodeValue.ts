import BaseValue from './BaseValue'
import {CodeType, Type} from '../type'
import {CodeExpression, Expression} from "../expression";
import {Context, Transpiler} from "../runtime";
import Value from "./Value";

export default class CodeValue extends BaseValue<CodeExpression> {

    constructor(expression: CodeExpression) {
        super(CodeType.instance, expression);
    }

    check(context: Context): Type {
        return this.value.checkCode (context);
    }

    interpret(context: Context): Value {
        return this.value.interpretCode (context);
    }

    declareCode(transpiler: Transpiler): void {
        this.value.declareCode (transpiler);
    }

    transpileCode(transpiler: Transpiler): void {
        this.value.transpileCode (transpiler);
    }
}

