var IJsxExpression = require("./IJsxExpression").IJsxExpression;
var JsxType = require("../type/JsxType").JsxType;
var isCharacterUpperCase = require("../utils/Utils").isCharacterUpperCase;

function JsxElementBase(id, attributes) {
    IJsxExpression.call(this);
    this.id = id;
	this.attributes = attributes;
	return this;
}


JsxElementBase.prototype = Object.create(IJsxExpression.prototype);
JsxElementBase.prototype.constructor = JsxElementBase;


JsxElementBase.prototype.check = function(context) {
    if(this.attributes!=null)
        this.attributes.forEach(function(attr) { attr.check(context);});
    return JsxType.instance;
};

JsxElementBase.prototype.declare = function(transpiler) {
    // transpiler.declare(new ReactImporter());
    if (isCharacterUpperCase(this.id.name[0]))
        transpiler.require(this.id.name);
};

JsxElementBase.prototype.transpile = function(transpiler) {
    transpiler.append("React.createElement(");
    if (isCharacterUpperCase(this.id.name[0]))
        transpiler.append(this.id.name);
    else
        transpiler.append('"').append(this.id.name).append('"');
    transpiler.append(", ");
    if(this.attributes==null || this.attributes.length===0)
        transpiler.append("null");
    else {
        transpiler.append("{");
        this.attributes.forEach(function(attr) {
            attr.transpile(transpiler);
            transpiler.append(", ");
        });
        transpiler.trimLast(2).append("}");
    }
    this.transpileChildren(transpiler);
    transpiler.append(")");
};

JsxElementBase.prototype.transpileChildren = function(transpiler) {
    // nothing to do
};

exports.JsxElementBase = JsxElementBase;