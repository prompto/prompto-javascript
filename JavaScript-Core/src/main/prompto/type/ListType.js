var ContainerType = require("./ContainerType").ContainerType;
var SetType = null;
var IntegerType = null;
var BooleanType = require("./BooleanType").BooleanType;
var Identifier = require("../grammar/Identifier").Identifier;
var ListValue = require("../value/ListValue").ListValue;
var List = require("../intrinsic/List").List;


exports.resolve = function() {
    IntegerType = require("./IntegerType").IntegerType;
    SetType = require("./SetType").SetType;
};

class ListType extends ContainerType {
  
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
        var values = value.map(function(item) {
            return this.itemType.convertJavaScriptValueToPromptoValue(context, item, null);
        }, this);
        return new ListValue(this.itemType, values);
    }

    isAssignableFrom(context, other) {
        return ContainerType.prototype.isAssignableFrom.call(this, context, other)
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
            return ContainerType.prototype.checkAdd.call(this, context, other, tryReverse);
        }
    }

    declareAdd(transpiler, other, tryReverse, left, right) {
        if((other instanceof ListType || other instanceof SetType) && this.itemType.isAssignableFrom(transpiler.context, other.itemType)) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else {
            return ContainerType.prototype.declareAdd.call(this, transpiler, other, tryReverse, left, right);
        }
    }

    transpileAdd(transpiler, other, tryReverse, left, right) {
        if((other instanceof ListType || other instanceof SetType) && this.itemType.isAssignableFrom(transpiler.context, other.itemType)) {
            left.transpile(transpiler);
            transpiler.append(".add(");
            right.transpile(transpiler);
            transpiler.append(")");
        } else {
            return ContainerType.prototype.transpileAdd.call(this, transpiler, other, tryReverse, left, right);
        }
    }

    checkSubtract(context, other) {
        if((other instanceof ListType || other instanceof SetType) && this.itemType.equals(other.itemType)) {
            return this;
        } else {
            return ContainerType.prototype.checkSubtract.call(this, context, other);
        }
    }

    declareSubtract(transpiler, other, left, right) {
        if((other instanceof ListType || other instanceof SetType) && this.itemType.equals(other.itemType)) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else {
            return ContainerType.prototype.declareSubtract.call(this, transpiler, other, left, right);
        }
    }

    transpileSubtract(transpiler, other, left, right) {
        if((other instanceof ListType || other instanceof SetType) && this.itemType.equals(other.itemType)) {
            left.transpile(transpiler);
            transpiler.append(".remove(");
            right.transpile(transpiler);
            transpiler.append(")");
        } else {
            return ContainerType.prototype.transpileSubtract.call(this, transpiler, other, left, right);
        }
    }

    checkItem(context, itemType, expression) {
        if(itemType==IntegerType.instance) {
            return this.itemType;
        } else {
            return ContainerType.prototype.checkItem.call(this, context, itemType, expression);
        }
    }

    declareItem(transpiler, itemType, item) {
        if(itemType===IntegerType.instance) {
            this.itemType.declare(transpiler);
            item.declare(transpiler);
        } else {
            return ContainerType.prototype.declareItem.call(this, transpiler, itemType, item);
        }
    }

    transpileItem(transpiler, itemType, item) {
        if(itemType===IntegerType.instance) {
            transpiler.append(".item(");
            item.transpile(transpiler);
            transpiler.append(")");
        } else {
            return ContainerType.prototype.transpileItem.call(this, transpiler, itemType, item);
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
            return ContainerType.prototype.checkMultiply.call(this, context, other, tryReverse);
        }
    }

    declareMultiply(transpiler, other, tryReverse, left, right) {
        if(other === IntegerType.instance) {
            var multiplyArray = require("../utils/Utils").multiplyArray;
            transpiler.require(multiplyArray);
            left.declare(transpiler);
            right.declare(transpiler);
        } else {
            return ContainerType.prototype.declareMultiply.call(this, transpiler, other, tryReverse, left, right);
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
            return ContainerType.prototype.transpileMultiply.call(this, transpiler, other, tryReverse, left, right);
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

    checkIterator(context, source) {
        return this.itemType;
    }

    getMemberMethods(context, name) {
        switch (name) {
            case "join":
                var JoinListMethodDeclaration = require("../builtins/ContainerTypeBuiltins").JoinListMethodDeclaration;
                return [new JoinListMethodDeclaration()];
            default:
                return ContainerType.prototype.getMemberMethods.call(context, name);
        }
    }
}


exports.ListType = ListType;

