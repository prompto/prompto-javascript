var SimpleStatement = require("./SimpleStatement").SimpleStatement;
var TupleType = require("../type/TupleType").TupleType;
var AnyType = require("../type/AnyType").AnyType;
var VoidType = require("../type/VoidType").VoidType;
var Variable = require("../runtime/Variable").Variable;
var TupleValue = require("../value/TupleValue").TupleValue;
var IntegerValue = require("../value/IntegerValue").IntegerValue;

class AssignTupleStatement extends SimpleStatement {
    constructor(names, expression) {
        super();
        this.names = names;
        this.expression = expression;
        return this;
    }

    check(context) {
        var type = this.expression.check(context);
        if(type!=TupleType.instance) {
            throw new SyntaxError("Expecting a tuple expression, got " + type.getName());
        }
        this.names.forEach(name => {
            var actual = context.getRegistered(name);
            if(actual==null) {
                context.registerValue(new Variable(name, AnyType.instance));
            } else {
                // need to check type compatibility
                var actualType = actual.getType(context);
                actualType.checkAssignableFrom(context, AnyType.instance);
            }
        }, this);
        return VoidType.instance;
    }

    declare(transpiler) {
        this.expression.declare(transpiler);
        this.names.forEach(name => {
            var actual = transpiler.context.getRegistered(name);
            if(actual==null)
                transpiler.context.registerValue(new Variable(name, AnyType.instance));
         }, this);
    }

    transpile(transpiler) {
        transpiler.append("var [");
        this.names.forEach(name => {
            transpiler.append(name).append(", ");
            var actual = transpiler.context.getRegistered(name);
            if(actual==null)
                transpiler.context.registerValue(new Variable(name, AnyType.instance));
        });
        transpiler.trimLast(2);
        transpiler.append("] = ");
        this.expression.transpile(transpiler);
    }

    interpret(context) {
        var object = this.expression.interpret(context);
        if(!(object instanceof TupleValue)) {
            throw new SyntaxError("Expecting a tuple expression, got " + typeof(object));
        }
        for(var i=0;i<this.names.length;i++) {
            var name = this.names[i];
            var value = object.getItemInContext(context, new IntegerValue(i+1)); // since getItemInContext is 1 based
            if(context.getRegisteredValue(name)==null) {
                context.registerValue(new Variable(name, AnyType.instance));
            }
            context.setValue(name, value);
        }
        return null;
    }

    toDialect(writer) {
        this.names.toDialect(writer, false);
        writer.append(" = ");
        this.expression.toDialect(writer);
    }
}


exports.AssignTupleStatement = AssignTupleStatement;