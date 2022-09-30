import NativeType from './NativeType'
import { Identifier } from '../grammar'
import { UUID } from '../intrinsic'
import {IValue, UUIDValue} from '../value'
import {TypeFamily} from "../store";
import {Context, Transpiler} from "../runtime";
import IType from "./IType";
import {IExpression} from "../expression";

export default class UUIDType extends NativeType {

    static instance = new UUIDType();

    constructor() {
        super(new Identifier("Uuid"), TypeFamily.UUID);
    }

    convertJavaScriptValueToPromptoValue(context: Context, value: any, returnType: IType | null): IValue {
        if(value instanceof UUID || typeof(value) == 'string') {
            return new UUIDValue(value);
        } else {
            return super.convertJavaScriptValueToPromptoValue(context, value, returnType);
        }
    }

    declare(transpiler: Transpiler): void {
        transpiler.register(UUID);
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append("Uuid");
    }

    transpileJsxCode(transpiler: Transpiler, expression: IExpression): void {
        transpiler.append("StringOrNull(");
        expression.transpile(transpiler);
        transpiler.append(")");
    }

}
