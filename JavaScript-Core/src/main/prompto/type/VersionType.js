import NativeType from './NativeType.js'
import { BooleanType, IntegerType, TextType } from './index.js'
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

    checkCompare(context, section, other) {
        if (other instanceof VersionType) {
            return BooleanType.instance;
        } else {
            return super.checkCompare(context, section, other);
        }
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

    checkMember(context, section, name) {
        if ("major" === name || "minor" === name || "fix" === name) {
            return IntegerType.instance;
        } else if ("qualifier" === name) {
            return TextType.instance;
        } else {
            return super.checkMember(context, section, name);
        }
    }

    declareMember(transpiler, section, name) {
        if ("count"!==name && "minor"!==name && "fix"!==name && "qualifier"!==name) {
            super.declareMember(transpiler, section, name);
        }
    }

    transpileMember(transpiler, name) {
        if ("major" === name || "minor" === name || "fix" === name) {
            transpiler.append(name);
        } else if ("qualifier" === name) {
            transpiler.append("qualifierToString()");
        } else {
            super.transpileMember(transpiler, name);
        }
    }

    declare(transpiler) {
        transpiler.register(Version);
    }

    transpile(transpiler) {
        transpiler.append('Version')
    }

    transpileJsxCode(transpiler, expression = expression) {
        transpiler.append("StringOrNull(");
        expression.transpile(transpiler);
        transpiler.append(")");
    }

}

VersionType.instance = new VersionType();

