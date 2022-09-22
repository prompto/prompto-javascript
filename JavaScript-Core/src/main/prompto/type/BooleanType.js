import NativeType from './NativeType.ts'
import { Identifier } from '../grammar'
import { BooleanValue } from '../value'
import { isABoolean } from '../utils'
import { TypeFamily } from '../store'

export default class BooleanType extends NativeType {

    constructor() {
        super(new Identifier("Boolean"));
        this.family = TypeFamily.BOOLEAN;
    }

    checkAnd(context, other) {
        if(other instanceof BooleanType) {
            return BooleanType.instance;
        } else {
            return super.checkAnd(context, other);
        }
    }

    checkOr(context, other) {
        if(other instanceof BooleanType) {
            return BooleanType.instance;
        } else {
            return super.checkOr(context, other);
        }
    }

    checkNot(context) {
        return BooleanType.instance;
    }

    convertJavaScriptValueToPromptoValue(context, value, returnType) {
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

    transpileSorted(transpiler, desc, key) {
        if(desc)
            transpiler.append("function(o1, o2) { return o1 === o2 ? 0 : o1 > o2 ? -1 : 1; }");
        else
            transpiler.append("function(o1, o2) { return o1 === o2 ? 0 : o1 > o2 ? 1 : -1; }");
    }
}

BooleanType.instance = new BooleanType();
