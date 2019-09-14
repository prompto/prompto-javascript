var IJsxExpression = require("./IJsxExpression").IJsxExpression;
var JsxType = require("../type/JsxType").JsxType;
var isCharacterUpperCase = require("../utils/Utils").isCharacterUpperCase;
var CategoryDeclaration = require("../declaration/CategoryDeclaration").CategoryDeclaration;

function JsxElementBase(id, properties) {
    IJsxExpression.call(this);
    this.id = id;
	this.properties = properties;
	return this;
}


JsxElementBase.prototype = Object.create(IJsxExpression.prototype);
JsxElementBase.prototype.constructor = JsxElementBase;


JsxElementBase.prototype.check = function(context) {
    var propertyMap = null;
    if (isCharacterUpperCase(this.id.name[0])) {
        var decl = context.getRegisteredDeclaration(this.id.name);
        if (decl == null)
            context.problemListener.reportUnknownIdentifier(this.id);
        else if(decl instanceof CategoryDeclaration && decl.isWidget())
            propertyMap = decl.properties || null;
    } else
        propertyMap = this.getHtmlProperties(this.id.name);
    this.checkProperties(context, propertyMap);
    return JsxType.instance;
};


JsxElementBase.prototype.getHtmlProperties = function(name) {
    return null; // TODO
};


JsxElementBase.prototype.checkProperties = function(context, propertyMap) {
    if(this.properties==null)
        return;
    this.properties.forEach(function(prop) {
        prop.check(context);
        if(propertyMap) {
            var declared = propertyMap.get(prop.id.name);
            if(declared==null)
                context.problemListener.reportUnknownProperty(prop, prop.id.name);
            else
                declared.validate(context, prop)
        }
    });
    // TODO check required properties
};


JsxElementBase.prototype.declare = function(transpiler) {
    if (isCharacterUpperCase(this.id.name[0])) {
        var decl = transpiler.context.getRegisteredDeclaration(this.id.name);
        if(decl==null)
            transpiler.context.problemListener.reportUnknownIdentifier(this.id);
        else
            decl.declare(transpiler);
    }
    if(this.properties!=null) {
        this.properties.forEach(function (prop) {
            prop.declare(transpiler);
        });
    }
    this.declareChildren(transpiler);
};



JsxElementBase.prototype.declareChildren = function(transpiler) {
    // nothing to do
};


JsxElementBase.prototype.transpile = function(transpiler) {
    transpiler.append("React.createElement(");
    if (isCharacterUpperCase(this.id.name[0]))
        transpiler.append(this.id.name);
    else
        transpiler.append('"').append(this.id.name).append('"');
    transpiler.append(", ");
    if(this.properties==null || this.properties.length===0)
        transpiler.append("null");
    else {
        transpiler.append("{");
        this.properties.forEach(function(attr) {
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