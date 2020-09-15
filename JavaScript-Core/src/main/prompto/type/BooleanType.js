import NativeType from './NativeType.js'
import { Identifier } from '../grammar/index.js'
import { BooleanValue } from '../value/index.js'

export default class BooleanType extends NativeType {
 
    constructor() {
        super(new Identifier("Boolean"));
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
            return value; // TODO for now
        }
    }

    declare(transpiler) {
        const isABoolean = require("../utils/Utils").isABoolean;
        transpiler.require(isABoolean);
    }

    transpile(transpiler) {
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
