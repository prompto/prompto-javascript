var Identifier = require("../grammar/Identifier").Identifier;
var ContainerType = require("./ContainerType").ContainerType;
var BooleanType = require("./BooleanType").BooleanType;
var IntegerType = require("./IntegerType").IntegerType;
var TextType = require("./TextType").TextType;
var SetType = require("./SetType").SetType;
var ListType = require("./ListType").ListType;
var EntryType = require("./EntryType").EntryType;
var List = require("../intrinsic/List").List;
var StrictSet = require("../intrinsic/StrictSet").StrictSet;
var Dictionary = require("../intrinsic/Dictionary").Dictionary;


class DictionaryType extends ContainerType {

    constructor(itemType) {
        super(new Identifier(itemType.name + "<:>"), itemType);
        this.itemType = itemType;
    }

    withItemType(itemType) {
        return new DictionaryType(itemType);
    }

    getTranspiledName(context) {
        return this.itemType.getTranspiledName(context) + "_dict";
    }

    declare(transpiler) {
        transpiler.require(Dictionary);
    }

    isAssignableFrom(context, other) {
        return ContainerType.prototype.isAssignableFrom.call(this, context, other)
            || ((other instanceof DictionaryType) && this.itemType.isAssignableFrom(context, other.itemType));
    }

    equals(obj) {
        if (obj == null) {
            return false;
        } else if (obj == this) {
            return true;
        } else if (!(obj instanceof DictionaryType)) {
            return false;
        } else {
            return this.itemType.equals(obj.itemType);
        }
    }

    checkAdd(context, other, tryReverse) {
        if(other instanceof DictionaryType && this.itemType.equals(other.itemType)) {
            return this;
        } else {
            return ContainerType.prototype.checkAdd.call(this, context, other, tryReverse);
        }
    }

    declareAdd(transpiler, other, tryReverse, left, right) {
        if(other instanceof DictionaryType && this.itemType.equals(other.itemType)) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else {
            return ContainerType.prototype.declareAdd.call(this, transpiler, other, tryReverse, left, right);
        }
    }

    transpileAdd(transpiler, other, tryReverse, left, right) {
        if(other instanceof DictionaryType && this.itemType.equals(other.itemType)) {
            left.transpile(transpiler);
            transpiler.append(".add(");
            right.transpile(transpiler);
            transpiler.append(")");
        } else {
            return ContainerType.prototype.transpileAdd.call(this, transpiler, other, tryReverse, left, right);
        }
    }

    checkContains(context, section, other) {
        if(other==TextType.instance) {
            return BooleanType.instance;
        } else {
            return ContainerType.prototype.checkContains.call(this, context, other);
        }
    }

    declareContains(transpiler, other, container, item) {
        transpiler.require(StrictSet);
        container.declare(transpiler);
        item.declare(transpiler);
    }

    transpileContains(transpiler, other, container, item) {
        container.transpile(transpiler);
        transpiler.append(".has(");
        item.transpile(transpiler);
        transpiler.append(")");
    }

    checkContainsAllOrAny(context, other) {
        return BooleanType.instance;
    }

    declareContainsAllOrAny(transpiler, other, container, items) {
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

    checkItem(context, other, expression) {
        if(other==TextType.instance) {
            return this.itemType;
        } else {
            return ContainerType.prototype.checkItem.call(this, context, other, expression);
        }
    }

    declareItem(transpiler, itemType, item) {
        // nothing to do
    }

    transpileItem(transpiler, itemType, item) {
        transpiler.append(".item(");
        item.transpile(transpiler);
        transpiler.append(")");
    }

    transpileAssignItemValue(transpiler, item, expression) {
        transpiler.append(".setItem(");
        item.transpile(transpiler);
        transpiler.append(", ");
        expression.transpile(transpiler);
        transpiler.append(")");
    }

    checkIterator(context, source) {
        return new EntryType(this.itemType);
    }

    checkMember(context, section, name) {
        if ("count"==name) {
            return IntegerType.instance;
        } else if("keys"==name) {
            return new SetType(TextType.instance);
        } else if ("values"==name) {
            return new ListType(this.itemType);
        } else {
            return ContainerType.prototype.checkMember.call(this, context, section, name);
        }
    }

    declareMember(transpiler, section, name) {
        if("keys"===name) {
            transpiler.require(StrictSet);
        } else if("values"==name) {
            transpiler.require(List);
        } else if ("count"!==name) {
            super.declareMember(transpiler, section, name);
        }
    }

    transpileMember(transpiler, name) {
        if ("count"===name) {
            transpiler.append("length");
        } else if("keys"===name || "values"==name) {
            transpiler.append(name);
        } else {
            super.transpileMember(transpiler, name);
        }
    }

    getMemberMethods(context, name) {
        if (name === "swap" ) {
            var SwapMethodDeclaration = require("../builtins/DictionaryTypeBuiltins").SwapMethodDeclaration;
            return [new SwapMethodDeclaration()];
        } else
            return ContainerType.prototype.getMemberMethods.call(context, name);
    }
}

exports.DictionaryType = DictionaryType;
