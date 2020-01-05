var Section = require("../parser/Section").Section;
var BooleanType = require("../type/BooleanType").BooleanType;
var VoidType = require("../type/VoidType").VoidType;

function JsxProperty(id, value, suite) {
    Section.call(this);
	this.id = id;
	this.value = value;
	this.suite = suite;
	return this;
}

JsxProperty.prototype = Object.create(Section.prototype);
JsxProperty.prototype.constructor = JsxProperty;


JsxProperty.prototype.check = function(context) {
    if(this.value!=null)
        return this.value.check(context);
    else
        return BooleanType.instance; // a value-less property is treated as a boolean flag
};


JsxProperty.prototype.checkProto = function(context, proto) {
    if(this.value!=null)
        return this.value.checkProto(context, proto);
    else
        return VoidType.instance; // force failure
};


JsxProperty.prototype.declareProto = function(transpiler, proto) {
    if(this.value!=null)
        this.value.declareProto(transpiler, proto);
};


JsxProperty.prototype.transpileProto = function(transpiler, proto) {
    if(this.value!=null)
        this.value.transpileProto(transpiler, proto);
};

JsxProperty.prototype.toDialect = function(writer) {
    writer.append(this.id.name);
    if(this.value!=null) {
        writer.append("=");
        this.value.toDialect(writer);
    }
    if(this.suite)
        writer.appendRaw(this.suite);
    else
        writer.append(" ");
};

JsxProperty.prototype.declare = function(transpiler) {
    if(this.value!=null)
        this.value.declare(transpiler);
};

JsxProperty.prototype.transpile = function(transpiler) {
    var name = this.id.name;
    if(name.indexOf('-')>=0)
        name = '"' + name + '"';
    transpiler.append(name);
    transpiler.append(": ");
    if(this.value!=null)
        this.value.transpile(transpiler);
    else
        transpiler.append("null");
};

exports.JsxProperty = JsxProperty;
