import NativeType from './NativeType.js'
import { IntegerType, ListType, SetType, AnyType, BooleanType } from './index.js'
import { Identifier } from '../grammar/index.js'
import { StrictSet } from '../intrinsic/index.js'
import { JoinTupleMethodDeclaration } from '../builtins/ContainerTypeBuiltins.js'

export default class TupleType extends NativeType {

    constructor() {
        super(new Identifier("Tuple"));
    }

    withItemType(itemType) {
        return this;
    }

    isAssignableFrom(context, other) {
        return super.isAssignableFrom(context, other)
            || (other instanceof ListType) || (other instanceof SetType);
    }

    checkItem(context, other) {
        if(other==IntegerType.instance) {
            return AnyType.instance;
        } else {
            return super.checkItem(context, other);
        }
    }

    declareItem(transpiler, itemType, item) {
        if(itemType===IntegerType.instance) {
            item.declare(transpiler);
        } else {
            return super.declareItem(transpiler, itemType, item);
        }
    }

    transpileItem(transpiler, itemType, item) {
        if(itemType===IntegerType.instance) {
            transpiler.append("[");
            item.transpile(transpiler);
            transpiler.append("-1]");
        } else {
            return super.transpileItem(transpiler, itemType, item);
        }
    }

    transpileAssignItemValue(transpiler, item, expression) {
        transpiler.append(".setItem(");
        item.transpile(transpiler);
        transpiler.append(", ");
        expression.transpile(transpiler);
        transpiler.append(")");
    }

    checkMember(context, section, id) {
        if ("count" === id.name) {
            return IntegerType.instance;
        } else {
            return super.checkMember(context, section, id);
        }
    }

    declareMember(transpiler, section, id) {
        if ("count" !== id.name) {
            return super.declareMember(transpiler, section, id);
        }
    }

    transpileMember(transpiler, id) {
        if ("count" === id.name) {
            transpiler.append("length");
        } else {
            return super.transpileMember(transpiler, id);
        }
    }

    checkAdd(context, section, other, tryReverse) {
        if(other === TupleType.instance || other instanceof ListType || other instanceof SetType) {
            return this;
        } else {
            return super.checkAdd(context, section, other, tryReverse);
        }
    }

    declareAdd(transpiler, other, tryReverse, left, right) {
        if(other === TupleType.instance || other instanceof ListType || other instanceof SetType) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else {
            return super.declareAdd(transpiler, other, tryReverse, left, right);
        }
    }

    transpileAdd(transpiler, other, tryReverse, left, right) {
        if(other === TupleType.instance || other instanceof ListType || other instanceof SetType) {
            left.transpile(transpiler);
            transpiler.append(".add(");
            right.transpile(transpiler);
            transpiler.append(")");
        } else {
            return super.transpileAdd(transpiler, other, tryReverse, left, right);
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

    declareHasAllOrAny(transpiler, other, container, items) {
        transpiler.require(StrictSet);
        container.declare(transpiler);
        items.declare(transpiler);
    }

    transpileHasAllValue(transpiler, other, container, items) {
        container.transpile(transpiler);
        transpiler.append(".hasAll(");
        items.transpile(transpiler);
        transpiler.append(")");
    }

    transpileHasAnyValue(transpiler, other, container, items) {
        container.transpile(transpiler);
        transpiler.append(".hasAny(");
        items.transpile(transpiler);
        transpiler.append(")");
    }

    checkHasAllOrAny(context, other) {
        return BooleanType.instance;
    }

    getMemberMethods(context, id) {
        switch (id.name) {
            case "join":
                return [new JoinTupleMethodDeclaration()];
            default:
                return super.getMemberMethods(context, id);
        }
    }
}

TupleType.instance = new TupleType();


