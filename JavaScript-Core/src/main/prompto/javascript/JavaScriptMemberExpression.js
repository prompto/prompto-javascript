var JavaScriptSelectorExpression = require("./JavaScriptSelectorExpression").JavaScriptSelectorExpression;

function JavaScriptMemberExpression(id) {
	JavaScriptSelectorExpression.call(this);
	this.id = id;
	return this;
}

JavaScriptMemberExpression.prototype = Object.create(JavaScriptSelectorExpression.prototype);
JavaScriptMemberExpression.prototype.constructor = JavaScriptMemberExpression;

JavaScriptMemberExpression.prototype.toString = function() {
	return this.parent.toString() + "." + this.id.name;
};

JavaScriptMemberExpression.prototype.interpret = function(context) {
    var o = this.parent.interpret(context);
    if(o!=null) {
        return this.interpret_field(o);
    } else {
        return null;
    }
};

JavaScriptMemberExpression.prototype.transpile = function(transpiler) {
    if (this.parent !== null) {
        this.parent.transpile(transpiler);
        transpiler.append(".");
    }
    transpiler.append(this.id.name);
};


JavaScriptMemberExpression.prototype.getRoot = function() {
    if(this.parent!=null)
        return this.parent.getRoot();
    else
        return this.id.name;
};


JavaScriptMemberExpression.prototype.toDialect = function(writer) {
    if (this.parent !== null) {
        this.parent.toDialect(writer);
        writer.append('.');
    }
    writer.append(this.id.name);
};

JavaScriptMemberExpression.prototype.interpret_field = function(o) {
    return o[this.id.name];
};

exports.JavaScriptMemberExpression = JavaScriptMemberExpression;