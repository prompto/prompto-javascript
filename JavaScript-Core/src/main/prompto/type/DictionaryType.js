import ContainerType from './ContainerType.js'
import {VoidType, TextType, BooleanType, IntegerType, ListType, SetType, EntryType} from './index.js'
import {Identifier} from '../grammar/index.js'
import {Dictionary, StrictSet, List, Document} from '../intrinsic/index.js'
import {
    SwapMethodDeclaration,
    RemoveKeyMethodDeclaration,
    RemoveValueMethodDeclaration
} from "../builtins/DictionaryTypeBuiltins.js";
import {convertToJson, convertToJsonNode} from "../utils/index.js";

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

    transpile(transpiler) {
        transpiler.append("Dictionary");
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
        if (other instanceof DictionaryType && this.itemType.equals(other.itemType)) {
            return this;
        } else {
            return super.checkAdd(context, section, other, tryReverse);
        }
    }

    declareAdd(transpiler, other, tryReverse, left, right) {
        if (other instanceof DictionaryType && this.itemType.equals(other.itemType)) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else {
            return super.declareAdd(transpiler, other, tryReverse, left, right);
        }
    }

    transpileAdd(transpiler, other, tryReverse, left, right) {
        if (other instanceof DictionaryType && this.itemType.equals(other.itemType)) {
            left.transpile(transpiler);
            transpiler.append(".add(");
            right.transpile(transpiler);
            transpiler.append(")");
        } else {
            return super.transpileAdd(transpiler, other, tryReverse, left, right);
        }
    }

    checkContains(context, section, other) {
        if (other === TextType.instance) {
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
        if (other === TextType.instance) {
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

    checkMember(context, section, id) {
        switch (id.name) {
            case "count":
                return IntegerType.instance;
            case "keys":
                return new SetType(TextType.instance);
            case "values":
                return new ListType(this.itemType);
            default:
                return super.checkMember(context, section, id);
        }
    }

    declareMember(transpiler, section, id) {
        switch (id.name) {
            case "keys":
                transpiler.require(StrictSet);
                break;
            case "values":
                transpiler.require(List);
                break;
            case "json":
                transpiler.require(convertToJson);
                transpiler.require(convertToJsonNode);
                transpiler.require(Document);
                break;
            case "count":
                break;
            default:
                super.declareMember(transpiler, section, id);
        }
    }

    transpileMember(transpiler, id) {
        switch(id.name) {
            case "count":
                transpiler.append("length");
                break;
            case "keys":
            case "values":
                transpiler.append(id.name);
                break;
            case "json":
                transpiler.append("toJson()");
                break;
            default:
             super.transpileMember(transpiler, id);
        }
    }

    getMemberMethods(context, id) {
        switch (id.name) {
            case "swap" :
                return [new SwapMethodDeclaration()];
            case "removeKey":
                return [new RemoveKeyMethodDeclaration()];
            case "removeValue":
                return [new RemoveValueMethodDeclaration()];
            default:
                return super.getMemberMethods.call(context, id);
        }
    }
}

