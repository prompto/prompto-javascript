var NativeType = require("./NativeType").NativeType;
var Identifier = require("../grammar/Identifier").Identifier;
var TypeFamily = require("../store/TypeFamily").TypeFamily;
var BooleanValue = null;

exports.resolve = function() {
    BooleanValue = require("../value/BooleanValue").BooleanValue;
}

class BooleanType extends NativeType {
 
    constructor() {
        super(new Identifier("Boolean"));
        this.family = TypeFamily.BOOLEAN;
    }

    checkAnd(context, other) {
        if(other instanceof BooleanType) {
            return BooleanType.instance;
        } else {
            return NativeType.prototype.checkAnd.call(this, context, other);
        }
    }

    checkOr(context, other) {
        if(other instanceof BooleanType) {
            return BooleanType.instance;
        } else {
            return NativeType.prototype.checkOr.call(this, context, other);
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
        var isABoolean = require("../utils/Utils").isABoolean;
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


exports.BooleanType = BooleanType;