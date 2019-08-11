var Section = require("../parser/Section").Section;
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

function Argument(parameter, expression) {
	this.parameter = parameter;
	this._expression = expression;
	return this;
}

Argument.prototype = Object.create(Section.prototype);
Argument.prototype.constructor = Argument;

Object.defineProperty(Argument.prototype, "id", {
    get : function() {
        return this.parameter.id;
    }
});

Object.defineProperty(Argument.prototype, "name", {
	get : function() {
		return this.parameter ? this.parameter.name : null;
	}
});

Object.defineProperty(Argument.prototype, "expression", {
    get : function() {
        return this._expression ? this._expression : new InstanceExpression(this.id);
    },
    set : function(expression) {
        this._expression = expression;
    }
});

// needed for error reporting
Object.defineProperty(Argument.prototype, "end", {
    get : function() {
        return this.expression.end;
    }
});

Argument.prototype.toDialect = function(writer) {
    writer.toDialect(this);
};

Argument.prototype.toODialect = function(writer) {
	if(!this._expression) {
        writer.append(this.parameter.name);
	} else {
        if (this.parameter != null) {
            writer.append(this.parameter.name);
            writer.append(" = ");
        }
        this._expression.toDialect(writer);
    }
};

Argument.prototype.toMDialect = function(writer) {
    if(!this._expression) {
        writer.append(this.parameter.name);
    } else {
        if (this.parameter != null) {
            writer.append(this.parameter.name);
            writer.append(" = ");
        }
        this._expression.toDialect(writer);
    }
};

Argument.prototype.toEDialect = function(writer) {
    if(!this._expression) {
        writer.append(this.parameter.name);
    } else {
        this._expression.toDialect(writer);
        if (this.parameter != null) {
            writer.append(" as ");
            writer.append(this.parameter.name);
        }
    }
};


Argument.prototype.declare = function(transpiler) {
    if(this._expression)
    	this._expression.declare(transpiler);
};

Argument.prototype.transpile = function(transpiler) {
    this._expression.transpile(transpiler);
};


Argument.prototype.toString = function() {
    if(!this._expression) {
        return this.parameter.name;
    } else {
        if (this.parameter === null) {
            return this._expression.toString();
        } else {
            return this.name + " = " + this._expression.toString();
        }
    }
};

Argument.prototype.equals = function(obj) {
	if(obj==this) {
		return true;
	} else if(obj==null) {
		return false;
	} else if(!(obj instanceof Argument)) {
		return false;
	} else {
		return this.parameter.equals(obj.parameter) &&
			this.expression.equals(other.expression);
	}
};

Argument.prototype.check = function(context) {
	var actual = context.getRegisteredValue(this.parameter.name);
	if(actual==null) {
        var actualType = this.expression.check(context);
		context.registerValue(new Variable(this.parameter.id, actualType));
	} else {
		// need to check type compatibility
		var actualType = actual.getType(context);
		var newType = this.expression.check(context);
		var section = this.toSection();
        actualType.checkAssignableFrom(context, newType, section);
	}
	return VoidType.instance;
};

Argument.prototype.toSection = function() {
    if(this.parameter && this._expression) {
        var section = new Section();
        section.copySectionFrom(this.parameter);
        section.end = this._expression.end;
        return section;
    } else if(this._expression) {
        return this._expression;
    } else {
        return this.parameter;
    }
};

Argument.prototype.resolve = function(context, methodDeclaration, checkInstance, allowDerived) {
	// since we support implicit members, it's time to resolve them
	var name = this.parameter.name;
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
		expression = new MemberSelector(expression, this.parameter.id);
	}
	return expression;
};

Argument.prototype.makeAssignment = function(context, declaration) {
	var argument = this.parameter;
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

Argument.prototype.isAssignableToArgument = function(context, argument, declaration, checkInstance, allowDerived) {
    return this.computeSpecificity(context, argument, declaration, checkInstance, allowDerived)!==Specificity.INCOMPATIBLE;
};

Argument.prototype.computeSpecificity = function(context, argument, declaration, checkInstance, allowDerived) {
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

exports.Argument = Argument;

