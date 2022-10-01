import BaseValue from './BaseValue'
import {CodeType, IType} from '../type'
import {CodeExpression} from "../expression";
import {Context, Transpiler} from "../runtime";
import IValue from "../../../main/prompto/value/IValue";

export default class CodeValue extends BaseValue<CodeExpression> {

    constructor(expression: CodeExpression) {
        super(CodeType.instance, expression);
    }

    check(context: Context): IType {
        return this.value.checkCode (context);
    }

    interpret(context: Context): IValue {
        return this.value.interpretCode (context);
    }

    declareCode(transpiler: Transpiler): void {
        this.value.declareCode (transpiler);
    }

    transpileCode(transpiler: Transpiler): void {
        this.value.transpileCode (transpiler);
    }
}

