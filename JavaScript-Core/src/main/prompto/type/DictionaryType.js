import ContainerType from './ContainerType.js'
import { VoidType, TextType, BooleanType, IntegerType, ListType, SetType, EntryType } from './index.js'
import { Identifier } from '../grammar/index.js'
import { Dictionary, StrictSet, List } from '../intrinsic/index.js'
import { SwapMethodDeclaration, RemoveKeyMethodDeclaration, RemoveValueMethodDeclaration } from "../builtins/DictionaryTypeBuiltins.js";

export default class DictionaryType extends ContainerType {

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
        return super.isAssignableFrom(context, other)
            || ((other instanceof DictionaryType) && this.itemType.isAssignableFrom(context, other.itemType));
    }

    equals(obj) {
        if (obj == null) {
            return false;
        } else if (obj === this) {
            return true;
        } else if (!(obj instanceof DictionaryType)) {
            return false;
        } else {
            return this.itemType.equals(obj.itemType);
        }
    }

    checkAdd(context, section, other, tryReverse) {
        if(other instanceof DictionaryType && this.itemType.equals(other.itemType)) {
            return this;
        } else {
            return super.checkAdd(context, section, other, tryReverse);
        }
    }

    declareAdd(transpiler, other, tryReverse, left, right) {
        if(other instanceof DictionaryType && this.itemType.equals(other.itemType)) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else {
            return super.declareAdd(transpiler, other, tryReverse, left, right);
        }
    }

    transpileAdd(transpiler, other, tryReverse, left, right) {
        if(other instanceof DictionaryType && this.itemType.equals(other.itemType)) {
            left.transpile(transpiler);
            transpiler.append(".add(");
            right.transpile(transpiler);
            transpiler.append(")");
        } else {
            return super.transpileAdd(transpiler, other, tryReverse, left, right);
        }
    }

    checkContains(context, section, other) {
        if(other === TextType.instance) {
            return BooleanType.instance;
        } else {
            return super.checkContains(context, other);
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

    checkItem(context, other, section) {
        if(other === TextType.instance) {
            return this.itemType;
        } else {
            context.problemListener.reportIllegalItemType(section, other, [TextType.instance]);
            return VoidType.instance;
        }
    }

    declareItem(transpiler, itemType, item) {
        // nothing to do
    }

    transpileItem(transpiler, itemType, item) {
        transpiler.append(".getItem(");
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
            return super.checkMember(context, section, name);
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
        switch (name) {
            case "swap" :
                return [new SwapMethodDeclaration()];
            case "removeKey":
                return [new RemoveKeyMethodDeclaration()];
            case "removeValue":
                return [new RemoveValueMethodDeclaration()];
            default:
                return super.getMemberMethods.call(context, name);
        }
    }
}

