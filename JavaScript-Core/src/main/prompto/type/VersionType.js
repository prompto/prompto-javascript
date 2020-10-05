import NativeType from './NativeType.js'
import { BooleanType } from './index.js'
import { Identifier } from '../grammar/index.js'
import { Version } from '../intrinsic/index.js'
import { VersionValue } from '../value/index.js'

export default class VersionType extends NativeType {

    constructor() {
        super(new Identifier("Version"));
    }

    convertJavaScriptValueToPromptoValue(context, value, returnType) {
        if(value instanceof Version)
            return new VersionValue(value);
        else
            return super.convertJavaScriptValueToPromptoValue(context, value, returnType);
    }

    checkCompare(context, other, section) {
        if (other instanceof VersionType) {
            return BooleanType.instance;
        } else {
            return super.checkCompare(context, other, section);
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

