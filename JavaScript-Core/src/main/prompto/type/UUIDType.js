const NativeType = require("./NativeType").NativeType;
const Identifier = require("../grammar/Identifier").Identifier;
let UUIDValue = null;
const UUID = require("../intrinsic/UUID").UUID;

exports.resolve = () => {
    UUIDValue = require("../value/UUIDValue").UUIDValue;
}


class UUIDType extends NativeType {
    constructor() {
        super(new Identifier("Uuid"));
        return this;
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

exports.UUIDType = UUIDType;