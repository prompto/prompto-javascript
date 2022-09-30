import NativeType from './NativeType'
import { Identifier } from '../grammar'
import { BooleanValue } from '../value'
import { isABoolean } from '../utils'
import { TypeFamily } from '../store'
import {Context, Transpiler} from "../runtime";
import {Section} from "../parser";
import IType from "./IType";
import {IExpression} from "../expression";

export default class BooleanType extends NativeType {

    static instance = new BooleanType();

    constructor() {
        super(new Identifier("Boolean"), TypeFamily.BOOLEAN);
    }

    checkAnd(context: Context, section: Section, other: IType): IType {
        if(other instanceof BooleanType) {
            return BooleanType.instance;
        } else {
            return super.checkAnd(context, section, other);
        }
    }

    checkOr(context: Context, section: Section, other: IType): IType {
        if(other instanceof BooleanType) {
            return BooleanType.instance;
        } else {
            return super.checkOr(context, section, other);
        }
    }

    checkNot(context: Context, section: Section): IType {
        return BooleanType.instance;
    }

    convertJavaScriptValueToPromptoValue(context: Context, value: any, returnType: IType) {
        if (typeof(value)=='boolean') {
            return BooleanValue.ValueOf(value);
        } else {
            return super.convertJavaScriptValueToPromptoValue(context, value, returnType);
        }
    }

    declare(transpiler: Transpiler): void {
        transpiler.require(isABoolean);
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append('"Boolean"');
    }

    transpileSorted(transpiler: Transpiler, desc: boolean, key: IExpression) {
        if(desc)
            transpiler.append("function(o1, o2) { return o1 == o2 ? 0 : o1 > o2 ? -1 : 1; }");
        else
            transpiler.append("function(o1, o2) { return o1 == o2 ? 0 : o1 > o2 ? 1 : -1; }");
    }
}


