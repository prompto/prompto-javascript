import NativeType from "./NativeType"
import { BooleanType } from "./index"
import { Identifier } from "../grammar/index"
import { Version } from "../intrinsic/index"
import { VersionValue } from "../value/index"

export default class VersionType extends NativeType {

    constructor() {
        super(new Identifier("Version"));
    }

    convertJavaScriptValueToPromptoValue(context, value, returnType) {
        if(value instanceof Version)
            return new VersionValue(value);
        else
            return NativeType.prototype.convertJavaScriptValueToPromptoValue.call(this, context, value, returnType);
    }

    checkCompare(context, other, section) {
        if (other instanceof VersionType) {
            return BooleanType.instance;
        } else {
            return NativeType.prototype.checkCompare.call(this, context, other, section);
        }
    }

    declare(transpiler) {
        transpiler.register(Version);
    }

    transpile(transpiler) {
        transpiler.append('Version')
    }

    declareCompare(context, other) {
        // nothing to do
    }

    transpileCompare(transpiler, other, operator, left, right) {
        left.transpile(transpiler);
        transpiler.append(".");
        operator.transpile(transpiler);
        transpiler.append("(");
        right.transpile(transpiler);
        transpiler.append(")");
    }
}

VersionType.instance = new VersionType();

