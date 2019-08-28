var isNodeJs = typeof window === 'undefined' && typeof importScripts === 'undefined';
var isWorker = typeof window === 'undefined' && typeof importScripts === 'function';
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
	return (this.parent === null ? "" : (this.parent.toString() + ".")) + this.id.name + "(" + this.args.toString() + ")";
};


JavaScriptMethodExpression.prototype.interpret = function(context, module) {
    var m = this.findInstanceAndMethod(context, module);
    if(!m)
        throw new SyntaxError("Could not find function: "+ this.id.name + (module ? " in module: " + module.toString() : ""));
	var args = this.args.computeArguments(context);
    return m.method.apply(m.instance, args);
};


JavaScriptMethodExpression.prototype.transpile = function(transpiler) {
    if (this.parent !== null) {
        this.parent.transpile(transpiler);
        transpiler.append(".");
    }
    transpiler.append(this.id.name).append("(");
    this.args.transpile(transpiler);
    transpiler.append(")");
};


JavaScriptMethodExpression.prototype.getRoot = function() {
    if(this.parent!=null)
        return this.parent.getRoot();
    else
        return this.id.name;
};


JavaScriptMethodExpression.prototype.findInstanceAndMethod = function(context, module) {
    if (this.parent === null) {
        return this.findGlobal(context, module);
    } else {
        return this.findMember(context, module);
    }
};

var stringToFunction = function(str) {
    var arr = str.split(".");
    /* global self, window */
    var fn = isNodeJs ? this : isWorker ? self : window;
    for (var i = 0, len = arr.length; i < len; i++) {
        fn = fn[arr[i]];
    }
    return fn;
};

JavaScriptMethodExpression.prototype.interpretNew = function(context, module) {
    var m = this.findInstanceAndMethod(context, module);
    if(!m)
        throw new SyntaxError("Could not find function: "+ this.id.name);
    var args = this.args.computeArguments(context);
    return args.length ? new m.method(args) : new m.method();
};

JavaScriptMethodExpression.prototype.findGlobal = function(context, module) {
    if(module!=null)
        return this.findInModule(context, module);
    else
        return { instance: null, method: stringToFunction(this.id.name) };
};

JavaScriptMethodExpression.prototype.findInModule = function(context, module) {
    try {
        var m = module.resolve();
        if(m[this.id.name])
            return { instance: null, method: m[this.id.name] };
        else
            throw true;
    } catch (e) {
        throw new SyntaxError("Could not resolve module method: " + module.toString() + " " + this.id.name);
    }
};

JavaScriptMethodExpression.prototype.findMember = function(context, module) {
	var i = this.parent.interpret(context, module)
	if(i===null) {
		throw "Null reference";
	}
	if(i instanceof NativeInstance) {
		i = i.instance;
	}
    if(i[this.id.name])
        return { instance:i, method: i[this.id.name] };
    else
        throw new SyntaxError("Could not resolve member method: " + this.toString());
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