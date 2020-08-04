var VoidType = require("../type/VoidType").VoidType;
var AnyType = require("../type/AnyType").AnyType;
var JavaScriptType = require("./JavaScriptType").JavaScriptType;
var getTypeName = require("./JavaScriptUtils").getTypeName;
var Identifier = require("../grammar/Identifier").Identifier;
var $DataStore = require("../store/DataStore").$DataStore;


class JavaScriptStatement {
  
    constructor(expression, isReturn) {
        this.expression = expression;
        this.isReturn = isReturn || false;
        this.module = null;
   }

    toString() {
        return "" + (this.isReturn ? "return " : "") + this.expression.toString() + ";";
    }

    check(context) {
        return this.isReturn ? AnyType.instance : VoidType.instance;
    }

    interpret(context, returnType) {
        var result = this.expression.interpret(context, this.module);
        if (!this.isReturn) {
            return null;
        }
        if(result !== null) {
            var id = new Identifier(getTypeName(result));
            var type = new JavaScriptType(id);
            result = type.convertJavaScriptValueToPromptoValue(context, result, returnType);
        }
        return result;
    }

    toDialect(writer) {
        if(this.isReturn)
            writer.append("return ");
        this.expression.toDialect(writer);
        writer.append(';');
        if(this.module!=null)
            this.module.toDialect(writer);
    }

    declare(transpiler) {
        // TODO module
        var str = this.expression.toString();
        if(str.startsWith("$context"))
            transpiler.declare(new $context());
        else if(str.startsWith("$store"))
            transpiler.require($DataStore);
    }

    transpile(transpiler) {
        if(this.module!=null) {
            var rootName = this.expression.getRoot();
            this.module.transpile(transpiler, rootName);
        }
        if(this.isReturn)
            transpiler.append("return ");
        if(!this.expression.transpile)
            throw new Error(this.expression.toString());
        this.expression.transpile(transpiler);
    }
}

class $context {
    constructor() {
        return this;
    }

    transpile(transpiler) {
        transpiler.append("var $context = context;").newLine();
    }
}

exports.JavaScriptStatement = JavaScriptStatement;
