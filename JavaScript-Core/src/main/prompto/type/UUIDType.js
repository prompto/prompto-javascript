import NativeType from './NativeType.js'
import { Identifier } from '../grammar/index.js'
import { UUID } from '../intrinsic/index.js'
import { UUIDValue } from '../value/index.js'

export default class UUIDType extends NativeType {

    constructor() {
        super(new Identifier("Uuid"));
    }

    convertJavaScriptValueToPromptoValue(context, value, returnType) {
        if(value instanceof UUID || typeof(value) == 'string') {
            return new UUIDValue(value);
        } else {
            return value; // TODO for now
        }
    }

    declare(transpiler) {
        transpiler.register(UUID);
    }

    transpile(transpiler) {
        transpiler.append("Uuid");
    }

    transpileJsxCode(transpiler, expression = expression) {
        transpiler.append("StringOrNull(");
        expression.transpile(transpiler);
        transpiler.append(")");
    }

}

UUIDType.instance = new UUIDType();
