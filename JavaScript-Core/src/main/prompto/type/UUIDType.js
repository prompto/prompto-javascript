import NativeType from '../../../main/prompto/type/NativeType.ts'
import { Identifier } from '../grammar'
import { UUID } from '../intrinsic'
import { UUIDValue } from '../value'

export default class UUIDType extends NativeType {

    constructor() {
        super(new Identifier("Uuid"));
    }

    convertJavaScriptValueToPromptoValue(context, value, returnType) {
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

    transpileJsxCode(transpiler, expression = expression) {
        transpiler.append("StringOrNull(");
        expression.transpile(transpiler);
        transpiler.append(")");
    }

}

UUIDType.instance = new UUIDType();
