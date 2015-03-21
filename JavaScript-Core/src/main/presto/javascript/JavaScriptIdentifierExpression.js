var JavaScriptExpression = require("./JavaScriptExpression").JavaScriptExpression;
var PrestoError = require("../error/PrestoError").PrestoError;

function JavaScriptIdentifierExpression(parent, identifier) {
	JavaScriptExpression.call(this);
	this.parent = parent || null;
	this.identifier = identifier || null;
	return this;
}

JavaScriptIdentifierExpression.prototype = Object.create(JavaScriptExpression.prototype);
JavaScriptIdentifierExpression.prototype.constructor = JavaScriptIdentifierExpression;

JavaScriptIdentifierExpression.prototype.parse = function(ids) {
	var parts = ids.split("\\.");
	var result = null;
	for(var idx=0;idx<parts.length;idx++) {
		result = new JavaScriptIdentifierExpression(result, part[idx]);
	}
	return result;
};

JavaScriptIdentifierExpression.prototype.toString = function() {
	if(this.parent==null) {
		return this.identifier;
	} else {
		return this.parent.toString() + '.' + this.identifier;
	}
};

JavaScriptIdentifierExpression.prototype.toDialect = function(writer) {
    if(this.parent!=null) {
        this.parent.toDialect(writer);
        writer.append('.');
    }
    writer.append(this.identifier);
};


JavaScriptIdentifierExpression.prototype.interpret = function(context, module) {
	if (this.parent === null) {
		return this.interpret_root(context, module);
	} else {
		return this.interpret_child(context, module);
	}
};

JavaScriptIdentifierExpression.prototype.interpret_root = function(context, module) {
	var o = this.interpret_instance(context);
	if(o!=null) {
		return o;
	}
	o = this.interpret_module(module); // as a module import
	if(o!=null) {
		return o;
	}
	o = this.interpret_global(); // as a global declaration
	if(o!=null) {
		return o;
	}
	return null;
};


JavaScriptIdentifierExpression.prototype.interpret_instance = function(context) {
	if(context==null) {
		return null;
	} else {
		try {
			return context.getValue(this.identifier);
		} catch (e) {
			if (e instanceof PrestoError) {
				return null;
			} else {
				throw e;
			}
		}
	}
};

JavaScriptIdentifierExpression.prototype.interpret_module = function(module) {
	if(module==null) {
		return null;
	} else {
		try {
			m = module.resolve();
			o = m[this.identifier]
			if(o) {
				return o;
			} else {
				return m;
			}
		} catch (e) {
			return null;
		}
	}
};


JavaScriptIdentifierExpression.prototype.interpret_global = function() {
	try {
		return eval(this.identifier);
	} catch (e) {
		return null;
	}
};

JavaScriptIdentifierExpression.prototype.interpret_child = function(context) {
	var o = this.parent.interpret(context);
	if(o!=null) {
		return this.interpret_field(o);
	} else {
		return null();
	}
};

JavaScriptIdentifierExpression.prototype.interpret_field = function(o) {
	return o[this.identifier];
};

/*
	@Override
	public IType check(Context context) throws SyntaxError {
		if(parent==null)
			return check_root(context);
		else
			return check_child(context);
	}
	
	IType check_root(Context context) throws SyntaxError {
		IType t = check_instance(context);
		if(t!=null)
			return t;
		else
			return check_class(); // as an instance for accessing static field/method
	}

	IType check_instance(Context context) throws SyntaxError {
		INamedValue named = context.getRegisteredValue(INamedValue.class, identifier); 
		if(named==null)
			return null;
		try {
			return named.getType(context);
		} catch (SyntaxError e) {
			return null;
		}
	}
		
	IType check_class() {
		String fullName = this.toString();
		try {
			Class<?> klass = Class.forName(fullName);
			return new JavaScriptClassType(klass);
		} catch (ClassNotFoundException e1) {
			// package prefix not required for classes in java.lang package
			if(parent==null) try {
				fullName = "java.lang." + identifier;
				Class<?> klass = Class.forName(fullName);
				return new JavaScriptClassType(klass);
			} catch (ClassNotFoundException e2) {
			}	
		}
		return null;
	}

	IType check_child(Context context) throws SyntaxError {
		IType t = parent.check(context); 
		if(t!=null)
			return check_field(t);
		else
			return check_class();
	}
	
	IType check_field(IType t) {
		if(!(t instanceof JavaScriptClassType))
			return null;
		Class<?> klass = ((JavaScriptClassType)t).klass;
		try {
			Field field = klass.getField(identifier);
			return new JavaScriptClassType(field.getType());
		} catch (NoSuchFieldException e) { 
			return null;
		}
	}
*/

exports.JavaScriptIdentifierExpression = JavaScriptIdentifierExpression;
