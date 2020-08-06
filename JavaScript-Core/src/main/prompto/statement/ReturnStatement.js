const SimpleStatement = require("./SimpleStatement").SimpleStatement;
const NullValue = require("../value/NullValue").NullValue;
const VoidResult = require("../runtime/VoidResult").VoidResult;
const VoidType = require("../type/VoidType").VoidType;

class ReturnStatement extends SimpleStatement {
  
    constructor(expression, fromArrowExpression) {
        super();
        this.expression = expression || null;
        this.fromArrowExpression = fromArrowExpression || false;
    }

    toString() {
        return "return " + this.expression==null ? "" : this.expression.toString();
    }

    toDialect(writer) {
        writer.append("return");
        if(this.expression!=null) {
            writer.append(" ");
            this.expression.toDialect(writer);
        }
    }

    equals(obj) {
        if(obj==this) {
            return true;
        }
        if(obj==null) {
            return false;
        }
        if(!(obj instanceof ReturnStatement)) {
            return false;
        }
        if(this.expression==obj.expression)
            return true;
        else if(this.expression==null || obj.expression==null)
            return false;
        else
            return this.expression.equals(obj.expression);
    }

    declare(transpiler) {
        if(this.expression)
            this.expression.declare(transpiler);
    }

    transpile(transpiler) {
        transpiler.append("return");
        if(this.expression) {
            transpiler.append(" ");
            this.expression.transpile(transpiler);
        }
    }

    check(context) {
        if(this.expression==null)
            return VoidType.instance;
        const type = this.expression.check(context);
        if(type == VoidType.instance && !this.fromArrowExpression)
            context.problemListener.reportReturningVoidType(this.expression);
        return type;
    }

    interpret(context) {
        if(this.expression==null)
            return VoidResult.instance;
        else
            return this.expression.interpret(context) || NullValue.instance;
    }

    canReturn() {
        return true;
    }
}

exports.ReturnStatement = ReturnStatement;
