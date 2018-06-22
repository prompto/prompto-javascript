var IJsxExpression = require("./IJsxExpression").IJsxExpression;
var JsxType = require("../type/JsxType").JsxType;

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


exports.JsxElementBase = JsxElementBase;