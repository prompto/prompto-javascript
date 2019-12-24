var IJsxExpression = require("./IJsxExpression").IJsxExpression;
var JsxType = require("../type/JsxType").JsxType;

function JsxFragment(openingSuite) {
    IJsxExpression.call(this);
    this.openingSuite = openingSuite;
     return this;
}


JsxFragment.prototype = Object.create(IJsxExpression.prototype);
JsxFragment.prototype.constructor = JsxFragment;


JsxFragment.prototype.toDialect = function(writer) {
    writer.append("<>");
    if(this.openingSuite!=null)
        writer.appendRaw(this.openingSuite);
    if(this.children!=null)
        this.children.forEach(function(child) {
            child.toDialect(writer);
        });
    writer.append("</>");
};


JsxFragment.prototype.check = function(context) {
    if (this.children != null)
        this.children.forEach(function(child) {
            child.check(context);
        });
    return JsxType.instance;
}

JsxFragment.prototype.declare = function(transpiler) {
    if (this.children != null)
        this.children.forEach(function(child) {
            child.declare(transpiler);
        });
}


JsxFragment.prototype.transpile = function(transpiler) {
    if (this.children != null && this.children.length > 0) {
        transpiler.append("React.createElement(React.Fragment, null");
        this.children.forEach(function(child) {
            transpiler.append(", ");
            child.transpile(transpiler);
        });
        transpiler.append(")");
    }
    return false;
}

exports.JsxFragment = JsxFragment;