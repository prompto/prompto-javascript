var IJsxExpression = require("./IJsxExpression").IJsxExpression;
var JsxType = require("../type/JsxType").JsxType;
var isCharacterUpperCase = require("../utils/Utils").isCharacterUpperCase;
var CategoryDeclaration = require("../declaration/CategoryDeclaration").CategoryDeclaration;
var OCleverParser = require("../parser/OCleverParser").OCleverParser;
var WidgetPropertiesProcessor = require("../processor/WidgetPropertiesProcessor").WidgetPropertiesProcessor;
var TypeLiteral = require("../literal/TypeLiteral").TypeLiteral;
var AnyType = require("../type/AnyType").AnyType;

function JsxElementBase(id, properties) {
    IJsxExpression.call(this);
    this.id = id;
	this.properties = properties;
	return this;
}


JsxElementBase.prototype = Object.create(IJsxExpression.prototype);
JsxElementBase.prototype.constructor = JsxElementBase;


JsxElementBase.prototype.check = function(context) {
    if (isCharacterUpperCase(this.id.name[0])) {
        var propertyMap = null;
        var decl = context.getRegisteredDeclaration(this.id.name);
        if (decl == null)
            context.problemListener.reportUnknownIdentifier(this.id);
        else if(decl instanceof CategoryDeclaration && decl.isWidget())
            propertyMap = decl.getProperties(context);
        this.checkWidgetProperties(context, propertyMap);
    } else {
        this.checkHtmlProperties(context)
    }
    return JsxType.instance;
};

const HTML_PROPERTY_TYPES = `{
    style: Css,
    id: any,
    onClick: MouseEventCallback,
    onContextMenu: MouseEventCallback
}`;


let HTML_PROPERTIES_MAP = null;
let HTML_TEST_MODE = false;

function getHtmlProperties(context, name) {
    if(HTML_PROPERTIES_MAP==null) {
        const parser = new OCleverParser(HTML_PROPERTY_TYPES);
        const types = parser.parse_document_literal();
        if(HTML_TEST_MODE) {
            const any = new TypeLiteral(AnyType.instance);
            types.entries.items.forEach(function(e) { e.value = any; });
        }
        const processor = new WidgetPropertiesProcessor();
        HTML_PROPERTIES_MAP = processor.loadProperties(null, context, types);
    }
    return HTML_PROPERTIES_MAP; // TODO filter by html tag name
}


JsxElementBase.prototype.checkWidgetProperties = function(context, propertyMap) {
    var actualNames = new Set();
    if(this.properties!==null)
        this.properties.forEach(function(prop) {
            if(actualNames.has(prop.id.name))
                context.problemListener.reportDuplicateProperty(prop, prop.id.name);
            else
                actualNames.add(prop.id.name);
            prop.check(context);
            if(propertyMap) {
                var declared = propertyMap.get(prop.id.name);
                if(declared==null)
                    declared = getHtmlProperties(context).get(prop.id.name);
                if(declared==null)
                    context.problemListener.reportUnknownProperty(prop, prop.id.name);
                else
                    declared.validate(context, prop)
            }
        });
    if(propertyMap!==null) {
        for(var name in propertyMap.entries) {
            var prop = propertyMap.entries[name];
            if(prop.isRequired() && !actualNames.has(name))
                context.problemListener.reportMissingProperty(this, name);
        }
    }
};


JsxElementBase.prototype.checkHtmlProperties = function(context) {
    var propertyMap = getHtmlProperties(context);
    var actualNames = new Set();
    if(this.properties!==null)
        this.properties.forEach(function(prop) {
            if(actualNames.has(prop.id.name))
                context.problemListener.reportDuplicateProperty(prop, prop.id.name);
            else
                actualNames.add(prop.id.name);
            prop.check(context);
            var declared = propertyMap.get(prop.id.name);
            if(declared==null)
                context.problemListener.reportUnknownProperty(prop, prop.id.name);
            else
                declared.validate(context, prop)
        });
    Object.getOwnPropertyNames(propertyMap.entries).forEach(function(name) {
        var prop = propertyMap.entries[name];
        if(prop.isRequired() && !actualNames.has(name))
            context.problemListener.reportMissingProperty(this, name);
    }, this);
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

JsxElementBase.set_HTML_TEST_MODE = function(mode) {
    HTML_TEST_MODE = mode;
};

exports.JsxElementBase = JsxElementBase;
