var CategoryType = null;
var InstanceExpression = require("../expression/InstanceExpression").InstanceExpression;
var MemberSelector = require("../expression/MemberSelector").MemberSelector;
var Variable = require("../runtime/Variable").Variable;
var VoidType = require("../type/VoidType").VoidType;
var PromptoError = require("../error/PromptoError").PromptoError;
var Specificity = require("../grammar/Specificity").Specificity;

exports.resolve = function() {
    CategoryType = require("../type/CategoryType").CategoryType;
}

function ArgumentAssignment(argument, expression) {
	this.argument = argument;
	this._expression = expression;
	return this;
}

Object.defineProperty(ArgumentAssignment.prototype, "id", {
    get : function() {
        return this.argument.id;
    }
});

Object.defineProperty(ArgumentAssignment.prototype, "name", {
	get : function() {
		return this.argument ? this.argument.name : null;
	}
});

Object.defineProperty(ArgumentAssignment.prototype, "expression", {
    get : function() {
        return this._expression ? this._expression : new InstanceExpression(this.id);
    },
    set : function(expression) {
        this._expression = expression;
    }
});

// needed for error reporting
Object.defineProperty(ArgumentAssignment.prototype, "end", {
    get : function() {
        return this.expression.end;
    }
});

ArgumentAssignment.prototype.toDialect = function(writer) {
    writer.toDialect(this);
};

ArgumentAssignment.prototype.toODialect = function(writer) {
	if(!this._expression) {
        writer.append(this.argument.name);
	} else {
        if (this.argument != null) {
            writer.append(this.argument.name);
            writer.append(" = ");
        }
        this._expression.toDialect(writer);
    }
};

ArgumentAssignment.prototype.toMDialect = function(writer) {
    if(!this._expression) {
        writer.append(this.argument.name);
    } else {
        if (this.argument != null) {
            writer.append(this.argument.name);
            writer.append(" = ");
        }
        this._expression.toDialect(writer);
    }
};

ArgumentAssignment.prototype.toEDialect = function(writer) {
    if(!this._expression) {
        writer.append(this.argument.name);
    } else {
        this._expression.toDialect(writer);
        if (this.argument != null) {
            writer.append(" as ");
            writer.append(this.argument.name);
        }
    }
};


ArgumentAssignment.prototype.declare = function(transpiler) {
    if(this._expression)
    	this._expression.declare(transpiler);
};

ArgumentAssignment.prototype.transpile = function(transpiler) {
    this._expression.transpile(transpiler);
};


ArgumentAssignment.prototype.toString = function() {
    if(!this._expression) {
        return this.argument.name;
    } else {
        if (this.argument === null) {
            return this._expression.toString();
        } else {
            return this.name + " = " + this._expression.toString();
        }
    }
};

ArgumentAssignment.prototype.equals = function(obj) {
	if(obj==this) {
		return true;
	} else if(obj==null) {
		return false;
	} else if(!(obj instanceof ArgumentAssignment)) {
		return false;
	} else {
		return this.argument.equals(obj.argument) &&
			this.expression.equals(other.expression);
	}
};

ArgumentAssignment.prototype.check = function(context) {
	var actual = context.getRegisteredValue(this.argument.name);
	if(actual==null) {
        var actualType = this.expression.check(context);
		context.registerValue(new Variable(this.argument.id, actualType));
	} else {
		// need to check type compatibility
		var actualType = actual.getType(context);
		var newType = this.expression.check(context);
        actualType.checkAssignableFrom(context, newType);
	}
	return VoidType.instance;
};

ArgumentAssignment.prototype.resolve = function(context, methodDeclaration, checkInstance, allowDerived) {
	// since we support implicit members, it's time to resolve them
	var name = this.argument.name;
	var expression = this.expression;
	var argument = methodDeclaration.args.find(name);
	var required = argument.getType(context);
	var actual = expression.check(context.getCallingContext());
	if(checkInstance && actual instanceof CategoryType) {
		var value = expression.interpret(context.getCallingContext());
		if(value && value.getType) {
			actual = value.getType();
		}
	}
	var assignable = required.isAssignableFrom(context, actual);
	// when in dispatch, allow derived
	if(!assignable && allowDerived)
        assignable = actual.isAssignableFrom(context, required);
	// try passing member
	if(!assignable && (actual instanceof CategoryType)) {
		expression = new MemberSelector(expression, this.argument.id);
	}
	return expression;
};

ArgumentAssignment.prototype.makeAssignment = function(context, declaration) {
	var argument = this.argument;
	// when 1st argument, can be unnamed
	if(argument===null) {
		if(declaration.args.length==0) {
			throw new SyntaxError("Method has no argument");
		}
		argument = declaration.args[0];
	} else {
		argument = declaration.args.find(this.name);
	}
	if(argument==null) {
		throw new SyntaxError("Method has no argument:" + this.name);
	}
};

ArgumentAssignment.prototype.isAssignableToArgument = function(context, argument, declaration, checkInstance, allowDerived) {
    return this.computeSpecificity(context, argument, declaration, checkInstance, allowDerived)!==Specificity.INCOMPATIBLE;
};

ArgumentAssignment.prototype.computeSpecificity = function(context, argument, declaration, checkInstance, allowDerived) {
    try {
        var required = argument.getType(context);
        var actual = this.expression.check(context);
        // retrieve actual runtime type
        if(checkInstance && (actual instanceof CategoryType)) {
            var value = this.expression.interpret(context.getCallingContext());
            if(value && value.getType) {
                actual = value.getType();
            }
        }
        if(actual.equals(required)) {
            return Specificity.EXACT;
        } else if(required.isAssignableFrom(context, actual)) {
            return Specificity.INHERITED;
        } else if(allowDerived && actual.isAssignableFrom(context, required)) {
            return Specificity.DERIVED;
        }
        actual = this.resolve(context, declaration, checkInstance).check(context);
        if(required.isAssignableFrom(context, actual)) {
            return Specificity.IMPLICIT;
        } else if(allowDerived && actual.isAssignableFrom(context, required)) {
            return Specificity.IMPLICIT;
        }
    } catch(error) {
        if(!(error instanceof PromptoError )) {
            throw error;
        }
    }
    return Specificity.INCOMPATIBLE;
};

exports.ArgumentAssignment = ArgumentAssignment;

