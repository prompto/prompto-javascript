import ContainerType from './ContainerType.js'
import { ListType, IntegerType, BooleanType } from './index.js'
import { Identifier } from '../grammar/index.js'
import { JoinSetMethodDeclaration } from '../builtins/ContainerTypeBuiltins.js'
import { List, StrictSet } from "../intrinsic/index.js";
import ToListMethodDeclaration from "../builtins/ToListMethodDeclaration";

export default class SetType extends ContainerType {
 
    constructor(itemType) {
        super(new Identifier(itemType.name+"<>"), itemType);
        this.itemType = itemType;
    }

    withItemType(itemType) {
        return new SetType(itemType);
    }

    declare(transpiler) {
        transpiler.register(List);
        transpiler.register(StrictSet);
        this.itemType.declare(transpiler);
    }

    getTranspiledName(context) {
        return this.itemType.getTranspiledName(context) + "_set";
    }

    equals(obj) {
        if(obj===this) {
            return true;
        }
        if(obj===null) {
            return false;
        }
        if(!(obj instanceof SetType)) {
            return false;
        }
        return this.itemType.equals(obj.itemType);
    }

    checkAdd(context, section, other, tryReverse) {
        if((other instanceof SetType || other instanceof ListType) && this.itemType.isAssignableFrom(context, other.itemType)) {
            return this;
        } else {
            return super.checkAdd(context, section, other, tryReverse);
        }
    }

    declareAdd(transpiler, other, tryReverse, left, right) {
        if((other instanceof SetType || other instanceof ListType) && this.itemType.isAssignableFrom(transpiler.context, other.itemType)) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else {
            return super.declareAdd(transpiler, other, tryReverse, left, right);
        }
    }

    transpileAdd(transpiler, other, tryReverse, left, right) {
        if((other instanceof SetType || other instanceof ListType) && this.itemType.isAssignableFrom(transpiler.context, other.itemType)) {
            left.transpile(transpiler);
            transpiler.append(".addAll(");
            right.transpile(transpiler);
            transpiler.append(")");
        } else {
            return super.transpileAdd(transpiler, other, tryReverse, left, right);
        }
    }

    checkSubtract(context, other) {
        if((other instanceof SetType || other instanceof ListType) && this.itemType.equals(other.itemType)) {
            return this;
        } else {
            return super.checkSubtract(context, other);
        }
    }

    declareSubtract(transpiler, other, left, right) {
        if((other instanceof SetType || other instanceof ListType) && this.itemType.equals(other.itemType)) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else {
            return super.declareSubtract(transpiler, other, left, right);
        }
    }

    transpileSubtract(transpiler, other, left, right) {
        if((other instanceof SetType || other instanceof ListType) && this.itemType.equals(other.itemType)) {
            left.transpile(transpiler);
            transpiler.append(".remove(");
            right.transpile(transpiler);
            transpiler.append(")");
        } else {
            return super.transpileSubtract(transpiler, other, left, right);
        }
    }

    checkItem(context, other, expression) {
        if(other === IntegerType.instance) {
            return this.itemType;
        } else {
            return super.checkItem(context, other, expression);
        }
    }

    declareItem(transpiler, itemType, item) {
        // nothing to do
    }

    transpileItem(transpiler, itemType, item) {
        transpiler.append(".item(");
        item.transpile(transpiler);
        transpiler.append("-1)");
    }

    declareContains(transpiler, other, container, item) {
        container.declare(transpiler);
        item.declare(transpiler);
    }

    transpileContains(transpiler, other, container, item) {
        container.transpile(transpiler);
        transpiler.append(".has(");
        item.transpile(transpiler);
        transpiler.append(")");
    }

    checkHasAllOrAny(context, other) {
        return BooleanType.instance;
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

    transpileHasAllPredicate(transpiler, container, predicate) {
        transpiler.append("(");
        container.transpile(transpiler);
        transpiler.append(").toArray().every(");
        const arrow = predicate.toArrowExpression();
        const type = container.check(transpiler.context);
        const itemType = type.itemType;
        arrow.transpileFilter(transpiler, itemType);
        transpiler.append(")");
    }

    transpileHasAnyPredicate(transpiler, container, predicate) {
        transpiler.append("(");
        container.transpile(transpiler);
        transpiler.append(").toArray().some(");
        const arrow = predicate.toArrowExpression();
        const type = container.check(transpiler.context);
        const itemType = type.itemType;
        arrow.transpileFilter(transpiler, itemType);
        transpiler.append(")");
    }


    checkIterator(context, source) {
        return this.itemType;
    }

    getMemberMethods(context, id) {
        switch (id.name) {
            case "toList":
                return [new ToListMethodDeclaration(this.itemType)];
            case "join":
                return [new JoinSetMethodDeclaration()];
            default:
                return super.getMemberMethods.call(context, id);
        }
    }

    isAssignableFrom(context, other) {
        return super.isAssignableFrom(context, other)
            || ((other instanceof SetType) && this.itemType.isAssignableFrom(context, other.itemType));
    }
}


