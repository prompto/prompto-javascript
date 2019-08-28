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
    var propertyTypes = null;
    if (isCharacterUpperCase(this.id.name[0])) {
        var decl = context.getRegisteredDeclaration(this.id.name);
        if (decl == null)
            context.problemListener.reportUnknownIdentifier(this.id);
        else if(decl instanceof CategoryDeclaration && decl.isWidget())
            propertyTypes = decl.propertyTypes || null;
    } else
        propertyTypes = this.getHtmlPropertyTypes(this.id.name);
    this.checkProperties(context, propertyTypes);
    return JsxType.instance;
};


JsxElementBase.prototype.getHtmlPropertyTypes = function(name) {
    return null; // TODO
};


JsxElementBase.prototype.checkProperties = function(context, propertyTypes) {
    if(this.properties==null)
        return;
    this.properties.forEach(function(prop) {
        var actual = prop.check(context);
        if(propertyTypes) {
            var expected = propertyTypes.get(prop.id.name);
            if(expected==null)
                context.problemListener.reportUnknownProperty(prop, prop.id.name);
            else if(!expected.isAssignableFrom(context, actual))
                context.problemListener.reportIllegalAssignment(prop, expected, actual);
        }
    });
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