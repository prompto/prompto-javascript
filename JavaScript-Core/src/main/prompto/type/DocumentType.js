var MissingType = require("./MissingType").MissingType;
var NativeType = require("./NativeType").NativeType;
var IntegerType = require("./IntegerType").IntegerType;
var TextType = require("./TextType").TextType;
var ListType = require("./ListType").ListType;
var SetType = require("./SetType").SetType;
var NullType = require("./NullType").NullType;
var AnyType = require("./AnyType").AnyType;
var Identifier = require("../grammar/Identifier").Identifier;
var TextLiteral = require("../literal/TextLiteral").TextLiteral;
var NullValue = require("../value/NullValue").NullValue;
var TextValue = require("../value/TextValue").TextValue;
var IntegerValue = require("../value/IntegerValue").IntegerValue;
var DecimalValue = require("../value/DecimalValue").DecimalValue;
var MethodDeclarationMap = null;
var ValueExpression = require("../expression/ValueExpression").ValueExpression;
var DocumentValue = null;
var Document = require("../intrinsic/Document").Document;
var StrictSet = require("../intrinsic/StrictSet").StrictSet;
var List = require("../intrinsic/List").List;
var ArgumentList = null;
var Argument = null;
var MethodCall = null;
var MethodSelector = null;
var compareValues = require("../utils/Utils").compareValues;
var equalArrays = require("../utils/Utils").equalArrays;

exports.resolve = function () {
    MethodDeclarationMap = require("../runtime/Context").MethodDeclarationMap;
    ArgumentList = require("../grammar/ArgumentList").ArgumentList;
    Argument = require("../grammar/Argument").Argument;
    DocumentValue = require("../value/DocumentValue").DocumentValue;
    MethodSelector = require("../expression/MethodSelector").MethodSelector;
    MethodCall = require("../statement/MethodCall").MethodCall;
};


class DocumentType extends NativeType {
 
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
            return NativeType.prototype.isMoreSpecificThan.call(this, context, other);
    }

    checkMember(context, section, name) {
        if ("count"==name) {
            return IntegerType.instance;
        } else if("keys"==name) {
            return new SetType(TextType.instance);
        } else if ("values"==name) {
            return new ListType(AnyType.instance);
        } else if (name === "text")
            return TextType.instance;
        else
            return AnyType.instance;
    }

    checkAdd(context, other, tryReverse) {
        if(other instanceof DocumentType) {
            return this;
        } else {
            return NativeType.prototype.checkAdd.call(this, context, other, tryReverse);
        }
    }

    declareAdd(transpiler, other, tryReverse, left, right) {
        if(other instanceof DocumentType) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else {
            return NativeType.prototype.declareAdd.call(this, transpiler, other, tryReverse, left, right);
        }
    }

    transpileAdd(transpiler, other, tryReverse, left, right) {
        if(other instanceof DocumentType) {
            left.transpile(transpiler);
            transpiler.append(".add(");
            right.transpile(transpiler);
            transpiler.append(")");
        } else {
            return NativeType.prototype.transpileAdd.call(this, transpiler, other, tryReverse, left, right);
        }
    }

    convertJavaScriptValueToPromptoValue(context, value, returnType) {
        if (value instanceof Document)
            return new DocumentValue(value);
        else
            return NativeType.prototype.convertJavaScriptValueToPromptoValue.call(this, context, value, returnType);
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
        if("keys"===name) {
            transpiler.require(StrictSet);
        } else if("values"==name) {
            transpiler.require(List);
        } else
            ; // nothing to do
    }

    transpileMember(transpiler, name) {
        if ("count"===name) {
            transpiler.append("length");
        } else if("keys"===name || "values"==name) {
            transpiler.append(name);
        } else if ("text" === name) {
            transpiler.append("getText()");
        } else {
            transpiler.append("getMember('").append(name).append("', false)");
        }
    }

    checkItem(context, itemType) {
        return AnyType.instance;
    }

    declareItem(transpiler, type, item) {
        type.declare(transpiler);
        item.declare(transpiler);
    }

    transpileItem(transpiler, type, item) {
        transpiler.append(".item(");
        item.transpile(transpiler);
        transpiler.append(")");
    }

    transpileAssignMember(transpiler, name) {
        transpiler.append(".getMember('").append(name).append("', true)");
    }

    transpileAssignMemberValue(transpiler, name, expression) {
        transpiler.append(".setMember('").append(name).append("', ");
        expression.transpile(transpiler);
        transpiler.append(")");
    }

    transpileAssignItemValue(transpiler, item, expression) {
        transpiler.append(".setItem(");
        item.transpile(transpiler);
        transpiler.append(", ");
        expression.transpile(transpiler);
        transpiler.append(")");
    }

    declareSorted(transpiler, key) {
        if (key == null)
            key = new TextLiteral('"key"');
        var keyname = key.toString();
        var decl = this.findGlobalMethod(transpiler.context, keyname, true);
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
        var keyname = key.toString();
        var decl = this.findGlobalMethod(transpiler.context, keyname, false);
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
        var instance = new DocumentValue();
        for (var key in node) {
            var value = this.readJSONField(context, node[key], parts);
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
        var keyname = key.toString();
        var call = this.findGlobalMethod(context, keyname, true);
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
        var methods = context.getRegisteredDeclaration(name);
        if (!(methods instanceof MethodDeclarationMap))
            return null;
        else if (!methods.protos[DocumentType.instance.name])
            return null;
        else if (returnCall) {
            var exp = new ValueExpression(this, new DocumentValue());
            var arg = new Argument(null, exp);
            var args = new ArgumentList([arg]);
            return new MethodCall(new MethodSelector(null, new Identifier(name)), args);
        } else
            return methods.protos[DocumentType.instance.name];
    }

    getGlobalMethodSortedComparator(context, call, desc) {
        var cmp = function (o1, o2) {
            var argument = call.args[0];
            argument._expression = new ValueExpression(this, o1);
            var value1 = call.interpret(context);
            argument._expression = new ValueExpression(this, o2);
            var value2 = call.interpret(context);
            return compareValues(value1, value2);
        };
        return cmp.bind(this);
    }

    getEntrySortedComparator(context, key, desc) {
        var name = key.value.getStorableData();
        return function (o1, o2) {
            var value1 = o1.getMemberValue(context, name);
            var value2 = o2.getMemberValue(context, name);
            return desc ? compareValues(value2, value1) : compareValues(value1, value2);
        };
    }

    getExpressionSortedComparator(context, expression, desc) {
        return function (o1, o2) {
            var ctx = context.newDocumentContext(o1, false);
            var value1 = expression.interpret(ctx);
            ctx = context.newDocumentContext(o2, false);
            var value2 = expression.interpret(ctx);
            return desc ? compareValues(value2, value1) : compareValues(value1, value2);
        }
    }
}

DocumentType.instance = new DocumentType();


exports.DocumentType = DocumentType;
