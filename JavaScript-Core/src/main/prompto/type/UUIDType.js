
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
}

UUIDType.instance = new UUIDType();
