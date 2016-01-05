var isNodeJs = typeof window === 'undefined' && typeof importScripts === 'undefined';
var JavaScriptSelectorExpression = require("./JavaScriptSelectorExpression").JavaScriptSelectorExpression;
var JavaScriptExpressionList = require("./JavaScriptExpressionList").JavaScriptExpressionList;
var SyntaxError = require("../error/SyntaxError").SyntaxError;
var NativeInstance = require("../value/NativeInstance").NativeInstance;

function JavaScriptMethodExpression(id, args) {
	JavaScriptSelectorExpression.call(this);
	this.id = id;
	this.args = args || new JavaScriptExpressionList();
	return this;
}

JavaScriptMethodExpression.prototype = Object.create(JavaScriptSelectorExpression.prototype);
JavaScriptMethodExpression.prototype.constructor = JavaScriptMethodExpression;


JavaScriptMethodExpression.prototype.toString = function() {
	return this.parent.toString() + "." + this.id.name + "(" + this.args.toString() + ")";
};

/*
	
@Override
public IType check(Context context) throws SyntaxError {
	Method method = findMethod(context);
	if(method==null)
		return null;
	else
		return new JavaScriptClassType(method.getReturnType());
}

*/
JavaScriptMethodExpression.prototype.interpret = function(context, module) {
	var args = this.args.computeArguments(context);
	if (this.parent === null) {
		return this.interpretGlobal(context, module, args);
	} else {
		return this.interpretMember(context, module, args);
	}
};

var stringToFunction = function(str) {
    var arr = str.split(".");
    var fn = isNodeJs ? this : window;
    for (var i = 0, len = arr.length; i < len; i++) {
        fn = fn[arr[i]];
    }
    return fn;
};

JavaScriptMethodExpression.prototype.interpretNew = function(context, module) {
    var m = stringToFunction(this.id.name);
    if(!m) {
        throw new SyntaxError(this.id.name + " is not a function");
    }
    var args = this.args.computeArguments(context);
    return args.length ? new m(args) : new m();
};

JavaScriptMethodExpression.prototype.interpretGlobal = function(context, module, args) {
    var m = stringToFunction(this.id.name);
    if(!m) {
        throw new SyntaxError(this.id.name + " is not a function");
    }
    return m.apply(args);
};


JavaScriptMethodExpression.prototype.interpretMember = function(context, module, args) {
	var p = this.parent.interpret(context, module)
	if(p===null) {
		throw "Null reference";
	}
	if(p instanceof NativeInstance) {
		p = p.instance;
	}
	var m = p[this.id.name];
	if(!m) {
		throw new SyntaxError(this.id.name + " is not a member of " + p.toString());
	}
	return m.apply(p, args);
};

JavaScriptMethodExpression.prototype.toDialect = function(writer) {
    if(this.parent!=null) {
        this.parent.toDialect(writer);
        writer.append('.');
    }
    writer.append(this.id.name);
    writer.append('(');
    if(this.args!=null)
        this.args.toDialect(writer);
    writer.append(')');
};

exports.JavaScriptMethodExpression = JavaScriptMethodExpression;