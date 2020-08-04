var NativeType = require("./NativeType").NativeType;
var BooleanType = require("./BooleanType").BooleanType;
var SetType = require("./SetType").SetType;
var ListType = require("./ListType").ListType;
var IntegerType = require("./IntegerType").IntegerType;
var AnyType = require("./AnyType").AnyType;
var Identifier = require("../grammar/Identifier").Identifier;

class TupleType extends NativeType {

    constructor() {
        super(new Identifier("Tuple"));
    }

    withItemType(itemType) {
        return this;
    }

    isAssignableFrom(context, other) {
        return NativeType.prototype.isAssignableFrom.call(this, context, other)
            || (other instanceof ListType) || (other instanceof SetType);
    }

    checkItem(context, other) {
        if(other==IntegerType.instance) {
            return AnyType.instance;
        } else {
            return NativeType.prototype.checkItem.call(this, context, other);
        }
    }

    declareItem(transpiler, itemType, item) {
        if(itemType===IntegerType.instance) {
            item.declare(transpiler);
        } else {
            return NativeType.prototype.declareItem.call(this, transpiler, itemType, item);
        }
    }

    transpileItem(transpiler, itemType, item) {
        if(itemType===IntegerType.instance) {
            transpiler.append("[");
            item.transpile(transpiler);
            transpiler.append("-1]");
        } else {
            return NativeType.prototype.transpileItem.call(this, transpiler, itemType, item);
        }
    }

    transpileAssignItemValue(transpiler, item, expression) {
        transpiler.append(".setItem(");
        item.transpile(transpiler);
        transpiler.append(", ");
        expression.transpile(transpiler);
        transpiler.append(")");
    }

    checkMember(context, section, name) {
        if ("count"==name) {
            return IntegerType.instance;
        } else {
            return NativeType.prototype.checkMember.call(this, context, section, name);
        }
    }

    declareMember(transpiler, section, name) {
        if ("count" !== name) {
            return NativeType.prototype.declareMember.call(this, transpiler, section, name);
        }
    }

    transpileMember(transpiler, name) {
        if ("count" == name) {
            transpiler.append("length");
        } else {
            return NativeType.prototype.transpileMember.call(this, transpiler, name);
        }
    }

    checkAdd(context, other, tryReverse) {
        if(other === TupleType.instance || other instanceof ListType || other instanceof SetType) {
            return this;
        } else {
            return NativeType.prototype.checkAdd.call(this, context, other, tryReverse);
        }
    }

    declareAdd(transpiler, other, tryReverse, left, right) {
        if(other === TupleType.instance || other instanceof ListType || other instanceof SetType) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else {
            return NativeType.prototype.declareAdd.call(this, transpiler, other, tryReverse, left, right);
        }
    }

    transpileAdd(transpiler, other, tryReverse, left, right) {
        if(other === TupleType.instance || other instanceof ListType || other instanceof SetType) {
            left.transpile(transpiler);
            transpiler.append(".add(");
            right.transpile(transpiler);
            transpiler.append(")");
        } else {
            return NativeType.prototype.transpileAdd.call(this, transpiler, other, tryReverse, left, right);
        }
    }

    checkContains(context, other) {
        return BooleanType.instance;
    }

    declareContains(transpiler, other, container, item) {
        container.declare(transpiler);
        item.declare(transpiler);
    }

    transpileContains(transpiler, other, container, item) {
        container.transpile(transpiler);
        transpiler.append(".includes(");
        item.transpile(transpiler);
        transpiler.append(")");
    }

    declareContainsAllOrAny(transpiler, other, container, items) {
        var StrictSet = require("../intrinsic/StrictSet").StrictSet;
        transpiler.require(StrictSet);
        container.declare(transpiler);
        items.declare(transpiler);
    }

    transpileContainsAll(transpiler, other, container, items) {
        container.transpile(transpiler);
        transpiler.append(".hasAll(");
        items.transpile(transpiler);
        transpiler.append(")");
    }

    transpileContainsAny(transpiler, other, container, items) {
        container.transpile(transpiler);
        transpiler.append(".hasAny(");
        items.transpile(transpiler);
        transpiler.append(")");
    }

    checkContainsAllOrAny(context, other) {
        return BooleanType.instance;
    }

    getMemberMethods(context, name) {
        switch (name) {
            case "join":
                var JoinTupleMethodDeclaration = require("../builtins/ContainerTypeBuiltins").JoinTupleMethodDeclaration;
                return [new JoinTupleMethodDeclaration()];
            default:
                return NativeType.prototype.getMemberMethods.call(context, name);
        }
    }
}

TupleType.instance = new TupleType();

exports.TupleType = TupleType;

