import NativeType from './NativeType'
import {BooleanType, IntegerType, TextType} from './index'
import {CmpOp, Identifier} from '../grammar'
import {Version} from '../intrinsic'
import {IValue, VersionValue} from '../value'
import {TypeFamily} from "../store";
import {Context, Transpiler} from "../runtime";
import IType from "./IType";
import {Section} from "../parser";
import {IExpression} from "../expression";

export default class VersionType extends NativeType {

    static instance = new VersionType();

    constructor() {
        super(new Identifier("Version"), TypeFamily.VERSION);
    }

    convertJavaScriptValueToPromptoValue(context: Context, value: any, returnType: IType | null): IValue {
        if (value instanceof Version)
            return new VersionValue(value);
        else
            return super.convertJavaScriptValueToPromptoValue(context, value, returnType);
    }

    checkCompare(context: Context, section: Section, other: IType): IType {
        if (other instanceof VersionType) {
            return BooleanType.instance;
        } else {
            return super.checkCompare(context, section, other);
        }
    }

    declareCompare(transpiler: Transpiler, other: IType): void {
        // nothing to do
    }

    transpileCompare(transpiler: Transpiler, other: IType, operator: CmpOp, left: IExpression, right: IExpression): void {
        left.transpile(transpiler);
        transpiler.append(".");
        operator.transpile(transpiler);
        transpiler.append("(");
        right.transpile(transpiler);
        transpiler.append(")");
    }

    checkMember(context: Context, section: Section, id: Identifier): IType {
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

    declareMember(transpiler: Transpiler, member: Identifier): void {
        switch (member.name) {
            case "major":
            case "minor":
            case "fix":
            case "qualifier":
                break;
            default:
                super.declareMember(transpiler, member);
        }
    }

    transpileMember(transpiler: Transpiler, id: Identifier): void {
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

    declare(transpiler: Transpiler): void {
        transpiler.register(Version);
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append('Version')
    }

    transpileJsxCode(transpiler: Transpiler, expression: IExpression): void {
        transpiler.append("StringOrNull(");
        expression.transpile(transpiler);
        transpiler.append(")");
    }

}

