import NativeType from './NativeType.js'
import { NullType, AnyType, MissingType, SetType, TextType, ListType, IntegerType } from './index.js'
import { ValueExpression, MethodSelector } from '../expression/index.js'
import { Identifier, ArgumentList, Argument } from '../grammar/index.js'
import { MethodDeclarationMap } from '../runtime/index.js'
import { MethodCall } from '../statement/index.js'
import { DocumentValue, NullValue, IntegerValue, DecimalValue, TextValue } from '../value/index.js'
import { TextLiteral } from '../literal/index.js'
import {equalArrays, compareValues, isANumber, convertToJson, convertToJsonNode} from '../utils/index.js'
// ensure babel does not inject _xxx.default
const StrictSet = require('../intrinsic/StrictSet.js').default;
const List = require('../intrinsic/List.js').default;
const Document = require('../intrinsic/Document.js').default;

export default class DocumentType extends NativeType {
 
    constructor() {
        super(new Identifier("Document"));
    }

    withItemType(itemType) {
        return this;
    }

    isMoreSpecificThan(context, other) {
        if ((other instanceof NullType) || (other instanceof AnyType) || (other instanceof MissingType))
            return true;
        else
            return super.isMoreSpecificThan(context, other);
    }

    checkMember(context, section, name) {
        switch(name) {
            case "count":
                return IntegerType.instance;
            case "keys":
                return new SetType(TextType.instance);
            case "values":
                return new ListType(AnyType.instance);
            case "text":
            case "json":
                return TextType.instance;
            default:
                return AnyType.instance;
        }
    }

    checkAdd(context, section, other, tryReverse) {
        if(other instanceof DocumentType) {
            return this;
        } else {
            return super.checkAdd(context, section, other, tryReverse);
        }
    }

    declareAdd(transpiler, other, tryReverse, left, right) {
        if(other instanceof DocumentType) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else {
            return super.declareAdd(transpiler, other, tryReverse, left, right);
        }
    }

    transpileAdd(transpiler, other, tryReverse, left, right) {
        if(other instanceof DocumentType) {
            left.transpile(transpiler);
            transpiler.append(".$safe_add(");
            right.transpile(transpiler);
            transpiler.append(")");
        } else {
            return super.transpileAdd(transpiler, other, tryReverse, left, right);
        }
    }

    convertJavaScriptValueToPromptoValue(context, value, returnType) {
        if (value instanceof Document)
            return new DocumentValue(value);
        else
            return super.convertJavaScriptValueToPromptoValue(context, value, returnType);
    }

    declare(transpiler) {
        transpiler.register(Document);
        transpiler.register(List);
        transpiler.require(equalArrays);
    }

    transpile(transpiler) {
        transpiler.append('Document')
    }

    declareMember(transpiler, section, name) {
        switch(name) {
            case "keys":
                transpiler.require(StrictSet);
                break;
            case "values":
                transpiler.require(List);
                break;
            case "json":
                transpiler.require(convertToJson);
                transpiler.require(convertToJsonNode);
                break;
        }
    }

    transpileMember(transpiler, name) {
        switch(name) {
            case "count":
            transpiler.append("$safe_length");
            break;
            case "keys":
            case "values":
                transpiler.append("$safe_" + name);
                break;
            case "text":
                transpiler.append("getText()");
                break;
            case "json":
                transpiler.append("toJson()");
                break;
            default:
                transpiler.append("$safe_getMember('").append(name).append("', false)");
        }
    }

    transpileAssignMember(transpiler, name) {
        transpiler.append(".$safe_getMember('").append(name).append("', true)");
    }

    transpileAssignMemberValue(transpiler, name, expression) {
        transpiler.append(".$safe_setMember('").append(name).append("', ");
        expression.transpile(transpiler);
        transpiler.append(")");
    }

    checkItem(context, itemType) {
        return AnyType.instance;
    }

    declareItem(transpiler, type, item) {
        type.declare(transpiler);
        item.declare(transpiler);
        transpiler.require(isANumber);
    }

    transpileItem(transpiler, type, item) {
        transpiler.append(".$safe_getItem(");
        item.transpile(transpiler);
        transpiler.append(")");
    }

    transpileAssignItemValue(transpiler, item, expression) {
        transpiler.append(".$safe_setItem(");
        item.transpile(transpiler);
        transpiler.append(", ");
        expression.transpile(transpiler);
        transpiler.append(")");
    }

    declareSorted(transpiler, key) {
        if (key == null)
            key = new TextLiteral('"key"');
        const keyname = key.toString();
        const decl = this.findGlobalMethod(transpiler.context, keyname, true);
        if (decl != null) {
            decl.declare(transpiler);
        } else {
            transpiler = transpiler.newDocumentTranspiler();
            key.declare(transpiler);
        }
    }

    transpileSortedComparator(transpiler, key, desc) {
        if (key == null)
            key = new TextLiteral('"key"');
        const keyname = key.toString();
        const decl = this.findGlobalMethod(transpiler.context, keyname, false);
        if (decl != null) {
            this.transpileGlobalMethodSortedComparator(transpiler, decl.getTranspiledName(transpiler.context), desc);
        } else if (key instanceof TextLiteral) {
            this.transpileEntrySortedComparator(transpiler, key, desc);
        } else {
            this.transpileExpressionSortedComparator(transpiler, key, desc);
        }
    }

    transpileGlobalMethodSortedComparator(transpiler, name, desc) {
        transpiler.append("function(o1, o2) { return ")
            .append(name).append("(o1) === ").append(name).append("(o2)").append(" ? 0 : ")
            .append(name).append("(o1) > ").append(name).append("(o2)").append(" ? ");
        if (desc)
            transpiler.append("-1 : 1; }");
        else
            transpiler.append("1 : -1; }");
    }

    transpileEntrySortedComparator(transpiler, key, descending) {
        transpiler.append("function(o1, o2) { return ");
        this.transpileEqualEntries(transpiler, key);
        transpiler.append(" ? 0 : ");
        this.transpileGreaterEntries(transpiler, key);
        transpiler.append(" ? ");
        if (descending)
            transpiler.append("-1 : 1; }");
        else
            transpiler.append("1 : -1; }");
    }

    transpileEqualEntries(transpiler, key) {
        transpiler.append("o1[");
        key.transpile(transpiler);
        transpiler.append("] === o2[");
        key.transpile(transpiler);
        transpiler.append("]");
    }

    transpileGreaterEntries(transpiler, key) {
        transpiler.append("o1[");
        key.transpile(transpiler);
        transpiler.append("] > o2[");
        key.transpile(transpiler);
        transpiler.append("]");
    }

    transpileExpressionSortedComparator(transpiler, key, descending) {
        transpiler = transpiler.newDocumentTranspiler();
        transpiler.append("function(o1, o2) { var v1 = (function() { return ");
        key.transpile(transpiler);
        transpiler.append("; }).bind(o1)(); var v2 = (function() { return ");
        key.transpile(transpiler);
        transpiler.append("; }).bind(o2)(); return v1===v2 ? 0 : v1 > v2 ? ");
        if (descending)
            transpiler.append("-1 : 1; }");
        else
            transpiler.append("1 : -1; }");
        transpiler.flush();
    }

    readJSONValue(context, node, parts) {
        const instance = new DocumentValue();
        for (const key in node) {
            const value = this.readJSONField(context, node[key], parts);
            instance.setMember(context, key, value);
        }
        return instance;
    }

    readJSONField(context, node, parts) {
        if (!node)
            return NullValue.instance;
        else if (typeof (node) === typeof (true))
            return Boolean.ValueOf(node);
        else if (typeof (node) === typeof (1))
            return new IntegerValue(node);
        else if (typeof (node) === typeof (1.0))
            return new DecimalValue(node)
        else if (typeof (node) === typeof (""))
            return new TextValue(node)
        else if (typeof (node) === typeof ([]))
            throw new Error("list");
        else if (typeof (node) === typeof ({}))
            throw new Error("dict/object");
        else
            throw new Error(typeof (node).toString());
    }

    getSortedComparator(context, key, desc) {
        key = key || null;
        if (key == null)
            key = new TextLiteral('"key"');
        const keyname = key.toString();
        const call = this.findGlobalMethod(context, keyname, true);
        if (call) {
            return this.getGlobalMethodSortedComparator(context, call, desc);
        } else if (key instanceof TextLiteral) {
            return this.getEntrySortedComparator(context, key, desc);
        } else {
            return this.getExpressionSortedComparator(context, key, desc);
        }
    }

    /* look for a method which takes Document as sole parameter */
    findGlobalMethod(context, name, returnCall) {
        const methods = context.getRegisteredDeclaration(name);
        if (!(methods instanceof MethodDeclarationMap))
            return null;
        else if (!methods.protos[DocumentType.instance.name])
            return null;
        else if (returnCall) {
            const exp = new ValueExpression(this, new DocumentValue());
            const arg = new Argument(null, exp);
            const args = new ArgumentList([arg]);
            return new MethodCall(new MethodSelector(null, new Identifier(name)), args);
        } else
            return methods.protos[DocumentType.instance.name];
    }

    getGlobalMethodSortedComparator(context, call, desc) {
        const cmp = function (o1, o2) {
            const argument = call.args[0];
            argument._expression = new ValueExpression(this, o1);
            const value1 = call.interpret(context);
            argument._expression = new ValueExpression(this, o2);
            const value2 = call.interpret(context);
            return compareValues(value1, value2);
        };
        return cmp.bind(this);
    }

    getEntrySortedComparator(context, key, desc) {
        const name = key.value.getStorableData();
        return (o1, o2) => {
            const value1 = o1.getMemberValue(context, name);
            const value2 = o2.getMemberValue(context, name);
            return desc ? compareValues(value2, value1) : compareValues(value1, value2);
        };
    }

    getExpressionSortedComparator(context, expression, desc) {
        return (o1, o2) => {
            let ctx = context.newDocumentContext(o1, false);
            const value1 = expression.interpret(ctx);
            ctx = context.newDocumentContext(o2, false);
            const value2 = expression.interpret(ctx);
            return desc ? compareValues(value2, value1) : compareValues(value1, value2);
        };
    }
}

DocumentType.instance = new DocumentType();


