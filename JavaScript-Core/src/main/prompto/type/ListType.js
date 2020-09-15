import ContainerType from './ContainerType.js'
import { IntegerType, SetType, BooleanType } from './index.js'
import { Identifier } from '../grammar/index.js'
import { List } from '../intrinsic/index.js'
import { ListValue } from '../value/index.js'
import { JoinListMethodDeclaration } from '../builtins/ContainerTypeBuiltins.js';

export default class ListType extends ContainerType {
  
    constructor(itemType) {
        super(new Identifier(itemType.name+"[]"), itemType);
    }

    withItemType(itemType) {
        return new ListType(itemType);
    }

    declare(transpiler) {
        transpiler.register(List);
        this.itemType.declare(transpiler);
    }

    transpile(transpiler) {
        transpiler.append('List')
    }

    getTranspiledName(context) {
        return this.itemType.getTranspiledName(context) + "_list";
    }

    convertJavaScriptValueToPromptoValue(context, value, returnType) {
        const values = value.map(function(item) {
            return this.itemType.convertJavaScriptValueToPromptoValue(context, item, null);
        }, this);
        return new ListValue(this.itemType, values);
    }

    isAssignableFrom(context, other) {
        return super.isAssignableFrom(context, other)
            || ((other instanceof ListType) && this.itemType.isAssignableFrom(context, other.itemType));
    }

    equals(obj) {
        if(obj===this) {
            return true;
        }
        if(obj===null) {
            return false;
        }
        if(!(obj instanceof ListType)) {
            return false;
        }
        return this.itemType.equals(obj.itemType);
    }

    checkAdd(context, other, tryReverse) {
        if((other instanceof ListType || other instanceof SetType) && this.itemType.isAssignableFrom(context, other.itemType)) {
            return this;
        } else {
            return super.checkAdd(context, other, tryReverse);
        }
    }

    declareAdd(transpiler, other, tryReverse, left, right) {
        if((other instanceof ListType || other instanceof SetType) && this.itemType.isAssignableFrom(transpiler.context, other.itemType)) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else {
            return super.declareAdd(transpiler, other, tryReverse, left, right);
        }
    }

    transpileAdd(transpiler, other, tryReverse, left, right) {
        if((other instanceof ListType || other instanceof SetType) && this.itemType.isAssignableFrom(transpiler.context, other.itemType)) {
            left.transpile(transpiler);
            transpiler.append(".add(");
            right.transpile(transpiler);
            transpiler.append(")");
        } else {
            return super.transpileAdd(transpiler, other, tryReverse, left, right);
        }
    }

    checkSubtract(context, other) {
        if((other instanceof ListType || other instanceof SetType) && this.itemType.equals(other.itemType)) {
            return this;
        } else {
            return super.checkSubtract(context, other);
        }
    }

    declareSubtract(transpiler, other, left, right) {
        if((other instanceof ListType || other instanceof SetType) && this.itemType.equals(other.itemType)) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else {
            return super.declareSubtract(transpiler, other, left, right);
        }
    }

    transpileSubtract(transpiler, other, left, right) {
        if((other instanceof ListType || other instanceof SetType) && this.itemType.equals(other.itemType)) {
            left.transpile(transpiler);
            transpiler.append(".remove(");
            right.transpile(transpiler);
            transpiler.append(")");
        } else {
            return super.transpileSubtract(transpiler, other, left, right);
        }
    }

    checkItem(context, itemType, expression) {
        if(itemType==IntegerType.instance) {
            return this.itemType;
        } else {
            return super.checkItem(context, itemType, expression);
        }
    }

    declareItem(transpiler, itemType, item) {
        if(itemType===IntegerType.instance) {
            this.itemType.declare(transpiler);
            item.declare(transpiler);
        } else {
            return super.declareItem(transpiler, itemType, item);
        }
    }

    transpileItem(transpiler, itemType, item) {
        if(itemType===IntegerType.instance) {
            transpiler.append(".item(");
            item.transpile(transpiler);
            transpiler.append(")");
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

    checkMultiply(context, other, tryReverse) {
        if(other === IntegerType.instance) {
            return this;
        } else {
            return super.checkMultiply(context, other, tryReverse);
        }
    }

    declareMultiply(transpiler, other, tryReverse, left, right) {
        if(other === IntegerType.instance) {
            const multiplyArray = require("../utils/Utils").multiplyArray;
            transpiler.require(multiplyArray);
            left.declare(transpiler);
            right.declare(transpiler);
        } else {
            return super.declareMultiply(transpiler, other, tryReverse, left, right);
        }
    }

    transpileMultiply(transpiler, other, tryReverse, left, right) {
        if(other === IntegerType.instance) {
            transpiler.append("multiplyArray(");
            left.transpile(transpiler);
            transpiler.append(",");
            right.transpile(transpiler);
            transpiler.append(")");
        } else {
            return super.transpileMultiply(transpiler, other, tryReverse, left, right);
        }
    }

    checkSlice(context) {
        return this;
    }

    declareSlice(transpiler, first, last) {
        // nothing to do
    }

    transpileSlice(transpiler, first, last) {
        transpiler.append(".slice1Based(");
        if(first) {
            first.transpile(transpiler);
        } else
            transpiler.append("null");
        if(last) {
            transpiler.append(",");
            last.transpile(transpiler);
        }
        transpiler.append(")");
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

    checkContainsAllOrAny(context, other) {
        return BooleanType.instance;
    }

    declareContainsAllOrAny(transpiler, other, container, items) {
        const StrictSet = require("../intrinsic/StrictSet").StrictSet;
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

    checkIterator(context, source) {
        return this.itemType;
    }

    getMemberMethods(context, name) {
        switch (name) {
            case "join":
                return [new JoinListMethodDeclaration()];
            default:
                return super.getMemberMethods.call(context, name);
        }
    }
}


