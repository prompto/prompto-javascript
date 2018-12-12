var MissingType = require("./MissingType").MissingType;
var NativeType = require("./NativeType").NativeType;
var TextType = require("./TextType").TextType;
var NullType = require("./NullType").NullType;
var AnyType = require("./AnyType").AnyType;
var Identifier = require("../grammar/Identifier").Identifier;
var TextLiteral = require("../literal/TextLiteral").TextLiteral;
var TextValue = require("../value/TextValue").TextValue;
var IntegerValue = require("../value/IntegerValue").IntegerValue;
var MethodDeclarationMap = null;
var ExpressionValue = require("../value/ExpressionValue").ExpressionValue;
var DocumentValue = null;
var Document = require("../intrinsic/Document").Document;
var List = require("../intrinsic/List").List;
var ArgumentAssignmentList = null;
var ArgumentAssignment = null;
var MethodCall = require("../statement/MethodCall").MethodCall;
var MethodSelector = require("../expression/MethodSelector").MethodSelector;
var compareValues = require("../utils/Utils").compareValues;

exports.resolve = function() {
    MethodDeclarationMap = require("../runtime/Context").MethodDeclarationMap;
    ArgumentAssignmentList = require("../grammar/ArgumentAssignmentList").ArgumentAssignmentList;
    ArgumentAssignment = require("../grammar/ArgumentAssignment").ArgumentAssignment;
    DocumentValue = require("../value/DocumentValue").DocumentValue;
};


function DocumentType() {
	NativeType.call(this, new Identifier("Document"));
	return this;
}

DocumentType.prototype = Object.create(NativeType.prototype);
DocumentType.prototype.constructor = DocumentType;



DocumentType.prototype.withItemType = function(itemType) {
    return this;
};



DocumentType.prototype.isMoreSpecificThan = function(context, other) {
    if ((other instanceof NullType) || (other instanceof AnyType) || (other instanceof MissingType))
        return true;
    else
        return NativeType.prototype.isMoreSpecificThan.call(this, context, other);
};


DocumentType.prototype.checkMember = function(context, section, name) {
	return AnyType.instance;
};

DocumentType.prototype.convertJavaScriptValueToPromptoValue = function(context, value, returnType) {
    if(value instanceof Document)
        return new DocumentValue(value);
    else
        return NativeType.prototype.convertJavaScriptValueToPromptoValue.call(this, context, value, returnType);
};


DocumentType.prototype.declare = function(transpiler) {
    transpiler.register(Document);
    transpiler.register(List);
};


DocumentType.prototype.transpile = function(transpiler) {
    transpiler.append('Document')
};


DocumentType.prototype.declareMember = function(transpiler, name) {
    // nothing to do
};


DocumentType.prototype.transpileMember = function(transpiler, name) {
    if ("text"!==name) {
        transpiler.append(name);
    } else {
        transpiler.append("getText()");
    }
};



DocumentType.prototype.transpileAssignMember = function(transpiler, name) {
    transpiler.append(".getMember('").append(name).append("', true)");
};


DocumentType.prototype.transpileAssignMemberValue = function(transpiler, name, expression) {
    transpiler.append(".setMember('").append(name).append("', ");
    expression.transpile(transpiler);
    transpiler.append(")");
};

DocumentType.prototype.transpileAssignItemValue = function(transpiler, item, expression) {
    transpiler.append(".setItem(");
    item.transpile(transpiler);
    transpiler.append(", ");
    expression.transpile(transpiler);
    transpiler.append(")");
};


DocumentType.prototype.declareSorted = function(transpiler, key) {
    if(key==null)
        key = new TextLiteral('"key"');
    var keyname = key.toString();
    var decl = this.findGlobalMethod(transpiler.context, keyname, true);
    if (decl != null) {
        decl.declare(transpiler);
    } else {
        transpiler = transpiler.newDocumentTranspiler();
        key.declare(transpiler);
    }
};


DocumentType.prototype.transpileSorted = function(transpiler, desc, key) {
    if(key==null)
        key = new TextLiteral('"key"');
    var keyname = key.toString();
    var decl = this.findGlobalMethod(transpiler.context, keyname, false);
    if (decl != null) {
        this.transpileSortedByGlobalMethod(transpiler, desc, decl.getTranspiledName(transpiler.context));
    } else if(key instanceof TextLiteral) {
        this.transpileSortedByEntry(transpiler, desc, key);
    } else {
        this.transpileSortedByExpression(transpiler, desc, key);
    }
};

DocumentType.prototype.transpileSortedByGlobalMethod = function(transpiler, desc, name) {
    transpiler.append("function(o1, o2) { return ")
        .append(name).append("(o1) === ").append(name).append("(o2)").append(" ? 0 : ")
        .append(name).append("(o1) > ").append(name).append("(o2)").append(" ? ");
    if(desc)
        transpiler.append("-1 : 1; }");
    else
        transpiler.append("1 : -1; }");
};


DocumentType.prototype.transpileSortedByEntry = function(transpiler, descending, key) {
    transpiler.append("function(o1, o2) { return ");
    this.transpileEqualEntries(transpiler, key);
    transpiler.append(" ? 0 : ");
    this.transpileGreaterEntries(transpiler, key);
    transpiler.append(" ? ");
    if(descending)
        transpiler.append("-1 : 1; }");
    else
        transpiler.append("1 : -1; }");
};


DocumentType.prototype.transpileEqualEntries = function(transpiler, key) {
    transpiler.append("o1[");
    key.transpile(transpiler);
    transpiler.append("] === o2[");
    key.transpile(transpiler);
    transpiler.append("]");
};


DocumentType.prototype.transpileGreaterEntries = function(transpiler, key) {
    transpiler.append("o1[");
    key.transpile(transpiler);
    transpiler.append("] > o2[");
    key.transpile(transpiler);
    transpiler.append("]");
};


DocumentType.prototype.transpileSortedByExpression = function(transpiler, descending, key) {
    transpiler = transpiler.newDocumentTranspiler();
    transpiler.append("function(o1, o2) { var v1 = (function() { return ");
    key.transpile(transpiler);
    transpiler.append("; }).bind(o1)(); var v2 = (function() { return ");
    key.transpile(transpiler);
    transpiler.append("; }).bind(o2)(); return v1===v2 ? 0 : v1 > v2 ? ");
    if(descending)
        transpiler.append("-1 : 1; }");
    else
        transpiler.append("1 : -1; }");
    transpiler.flush();
};





DocumentType.prototype.checkItem = function(context, itemType) {
    if(itemType===TextType.instance)
        return AnyType.instance;
    else
        throw ("text");
};


DocumentType.prototype.transpileItem = function(transpiler, type, item) {
    transpiler.append(".item(");
    item.transpile(transpiler);
    transpiler.append(")");
};

DocumentType.prototype.readJSONValue = function(context, node, parts) {
    var instance = new DocumentValue();
    for(key in node) {
        var value = this.readJSONField(context, node[key], parts);
        instance.setMember(context, key, value);
    }
    return instance;
};

DocumentType.prototype.readJSONField = function(context, node, parts) {
    if(!node)
        return NullValue.instance;
    else if(typeof(node)===typeof(true))
        return Boolean.ValueOf(node);
    else if(typeof(node)===typeof(1))
        return new IntegerValue(node);
    else if(typeof(node)===typeof(1.0))
        return new Decimal(node)
    else if(typeof(node)===typeof(""))
        return new TextValue(node)
    else if(typeof(node)===typeof([]))
        throw new Error("list");
    else if(typeof(node)===typeof({}))
        throw new Error("dict/object");
    else
        throw new Error(typeof(node).toString());
};

DocumentType.prototype.sort = function(context, list, desc, key) {
    if (list.size() <= 1) {
        return list;
    }
    key = key || null;
    if (key == null) {
        key = new TextLiteral('"key"');
    }
    var keyname = key.toString();
    var call = this.findGlobalMethod(context, keyname, true);
    if(call!=null) {
        return this.sortByGlobalMethod(context, list, desc, call);
    } else if(key instanceof TextLiteral) {
        return this.sortByEntry(context, list, desc, key);
    } else {
        return this.sortByExpression(context, list, desc, key);
    }
};


/* look for a method which takes Document as sole parameter */
DocumentType.prototype.findGlobalMethod = function(context, name, returnCall) {
    var methods = context.getRegisteredDeclaration(name);
    if(!(methods instanceof MethodDeclarationMap))
        return null;
    else if(!methods.protos[DocumentType.instance.name])
        return null;
    else if(returnCall) {
        var exp = new ExpressionValue(this, new DocumentValue());
        var arg = new ArgumentAssignment(null, exp);
        var args = new ArgumentAssignmentList([arg]);
        return new MethodCall(new MethodSelector(null, new Identifier(name)), args);
    } else
        return methods.protos[DocumentType.instance.name];
};


DocumentType.prototype.sortByGlobalMethod = function(context, list, desc, call) {
    var self = this;
    function cmp(o1, o2) {
        var assignment = call.assignments[0];
        assignment._expression = new ExpressionValue(self, o1);
        var value1 = call.interpret(context);
        assignment._expression = new ExpressionValue(self, o2);
        var value2 = call.interpret(context);
        return compareValues(value1, value2);
    }

    return NativeType.prototype.doSort(context, list, cmp, desc);
};


DocumentType.prototype.sortByEntry = function(context, list, desc, key) {
    var name = key.value.getStorableData();
    function cmp(o1, o2) {
        var value1 = o1.getMemberValue(context, name);
        var value2 = o2.getMemberValue(context, name);
        return compareValues(value1, value2);
    }

    return NativeType.prototype.doSort(context, list, cmp, desc);
};


DocumentType.prototype.sortByExpression = function(context, list, desc, expression) {

    function cmp(o1, o2) {
        var co = context.newDocumentContext(o1, false);
        var value1 = expression.interpret(co);
        co = context.newDocumentContext(o2, false);
        var value2 = expression.interpret(co);
        return compareValues(value1, value2);
    }
    return NativeType.prototype.doSort(context, list, cmp, desc);
};

DocumentType.instance = new DocumentType();


exports.DocumentType = DocumentType;
