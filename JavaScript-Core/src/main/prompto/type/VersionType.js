import NativeType from './NativeType.js'
import {BooleanType, IntegerType, TextType} from './index.js'
import {Identifier} from '../grammar/index.js'
import {Version} from '../intrinsic/index.js'
import {VersionValue} from '../value/index.js'

export default class VersionType extends NativeType {

    constructor() {
        super(new Identifier("Version"));
    }

    convertJavaScriptValueToPromptoValue(context, value, returnType) {
        if (value instanceof Version)
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

    checkMember(context, section, id) {
        switch (id.name) {
            case "major":
            case "minor":
            case "fix":
                return IntegerType.instance;
            case "qualifier":
                return TextType.instance;
            default:
                return super.checkMember(context, section, id);
        }
    }

    declareMember(transpiler, section, id) {
        switch (id.name) {
            case "major":
            case "minor":
            case "fix":
            case "qualifier":
                break;
            default:
                super.declareMember(transpiler, section, id);
        }
    }

    transpileMember(transpiler, id) {
        switch (id.name) {
            case "major":
            case "minor":
            case "fix":
                transpiler.append(id.name);
                break;
            case "qualifier":
                transpiler.append("qualifierToString()");
                break;
            default:
                super.transpileMember(transpiler, id);
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

