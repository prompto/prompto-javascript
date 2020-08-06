var ObjectList = require("../utils/ObjectList").ObjectList;
var ContextualExpression = require("../value/ContextualExpression").ContextualExpression;
var AttributeParameter = require("../param/AttributeParameter").AttributeParameter;
var Argument = require("./Argument").Argument;
var AndExpression = null;
var UnresolvedIdentifier = null;

exports.resolve = () => {
    AndExpression = require("../expression/AndExpression").AndExpression;
    UnresolvedIdentifier = require("../expression/UnresolvedIdentifier").UnresolvedIdentifier;
}

class ArgumentList extends ObjectList {

    constructor(items) {
        super(items || []);
    }

    /* post-fix expression priority for final argument in E dialect */
    /* 'xyz with a and b as c' should read 'xyz with a, b as c' NOT 'xyz with (a and b) as c' */
    checkLastAnd() {
        var argument = this.slice(-1).pop();
        if(argument!=null && argument.parameter!=null && argument.expression instanceof AndExpression) {
            var and = argument.expression;
            if(and.left instanceof UnresolvedIdentifier) {
                var id = and.left.id;
                var leading = id.name.charAt(0);
                if(leading !== leading.toUpperCase()) {
                    this.pop();
                    // add AttributeParameter
                    var parameter = new AttributeParameter(id);
                    var attribute = new Argument(parameter, null);
                    this.add(attribute);
                    // fix last argument
                    argument.expression = and.right;
                    this.add(argument);
                }
            }
        }
    }

    findIndex(name) {
        for(var i=0;i<this.length;i++) {
            if(name==this[i].name) {
                return i;
            }
        }
        return -1;
    }

    find(name) {
        for(var i=0;i<this.length;i++) {
            if(name==this[i].name) {
                return this[i];
            }
        }
        return null;
    }

    makeArguments(context, declaration) {
        var local = new ArgumentList(this);
        var args = new ArgumentList();
        for(var i=0; i<declaration.parameters.length; i++) {
            var parameter = declaration.parameters[i];
            var argument = null;
            var index = local.findIndex(parameter.name);
            if(index<0 && i==0 && this.length>0 && this[0].parameter==null)
                index = 0;
            if(index>=0) {
                argument = local[index];
                local.splice(index, 1);
            }
            if(argument==null) {
                if (parameter.defaultExpression != null)
                    args.push(new Argument(parameter, parameter.defaultExpression));
                else
                    throw new SyntaxError("Missing argument:" + parameter.name);
            } else {
                var expression = new ContextualExpression(context, argument.expression);
                args.push(new Argument(parameter, expression));
            }
        }
        if(local.length > 0)
            throw new SyntaxError("Method has no argument:" + local[0].name);
        return args;
    }

    toDialect(writer) {
        writer.toDialect(this);
    }

    toEDialect(writer) {
        var idx = 0;
        // anonymous argument before 'with'
        if(this.length>0 && this[0].parameter==null) {
            writer.append(' ');
            this[idx++].toDialect(writer);
        }
        if(idx<this.length) {
            writer.append(" with ");
            this[idx++].toDialect(writer);
            writer.append(", ");
            while(idx<this.length-1) {
                this[idx++].toDialect(writer);
                writer.append(", ");
            }
            writer.trimLast(2);
            if(idx<this.length) {
                writer.append(" and ");
                this[idx++].toDialect(writer);
            }
        }
    }

    toODialect(writer) {
        writer.append("(");
        this.forEach(arg => {
            arg.toDialect(writer);
            writer.append(", ");
        });
        if(this.length>0)
            writer.trimLast(2);
        writer.append(")");
    }

    toMDialect(writer) {
        this.toODialect(writer);
    }

    declare(transpiler, methodDeclaration) {
        this.forEach(arg => {
            arg.declare(transpiler, methodDeclaration);
        });
    }

    transpile(transpiler) {
        transpiler.append("(");
        this.forEach(arg => {
            arg.transpile(transpiler);
            transpiler.append(", ");
        });
        if(this.length>0)
            transpiler.trimLast(2);
        transpiler.append(")");
    }
}

exports.ArgumentList = ArgumentList;

