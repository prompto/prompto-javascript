var AnnotationProcessor = require("./AnnotationProcessor").AnnotationProcessor;
var TextLiteral = require("../literal/TextLiteral").TextLiteral;
var SetLiteral = require("../literal/SetLiteral").SetLiteral;
var TypeLiteral = require("../literal/TypeLiteral").TypeLiteral;
var BooleanLiteral = require("../literal/BooleanLiteral").BooleanLiteral;
var DocumentLiteral = require("../literal/DocumentLiteral").DocumentLiteral;
var Property = require("../property/Property").Property;
var PropertyMap = require("../property/PropertyMap").PropertyMap;
var PropertiesType = require("../type/PropertiesType").PropertiesType;
var AnyType = require("../type/AnyType").AnyType;
var TextType = require("../type/TextType").TextType;
var TypeType = require("../type/TypeType").TypeType;
var InternalError = require("../error/InternalError").InternalError;
var Identifier = require("../grammar/Identifier").Identifier;
var TypeValidator = require("../property/TypeValidator").TypeValidator;
var TypeSetValidator = require("../property/TypeSetValidator").TypeSetValidator;
var ValueSetValidator = require("../property/ValueSetValidator").ValueSetValidator;
var NullValue = require("../value/NullValue").NullValue;
var BooleanValue = require("../value/BooleanValue").BooleanValue;

function WidgetPropertiesProcessor() {
    AnnotationProcessor.call(this, "@WidgetProperties");
    return this;
}

WidgetPropertiesProcessor.prototype = Object.create(AnnotationProcessor.prototype);
WidgetPropertiesProcessor.prototype.constructor = WidgetPropertiesProcessor;


WidgetPropertiesProcessor.prototype.processCategory = function(annotation, context, declaration) {
    if(declaration.isWidget(context)) {
        this.doProcessCategory(annotation, context, declaration);
    } else {
        context.problemListener.reportIllegalAnnotation("WidgetField is only applicable to widgets", annotation);
    }
};


WidgetPropertiesProcessor.prototype.doProcessCategory = function(annotation, context, widget) {
    var types = annotation.getDefaultArgument();
    var properties = this.loadProperties(annotation, context, types);
    if (properties != null) {
        widget.properties = properties;
        var widgetField = this.findWidgetPropertiesFieldAnnotation(context, widget);
        if(widgetField)
            this.overrideWidgetFieldType(context, widgetField, new PropertiesType(properties));
    }
};


WidgetPropertiesProcessor.prototype.overrideWidgetFieldType = function(context, widgetField, type) {
    var value = widgetField.getArgument("name");
    if(!(value instanceof TextLiteral))
        return; // raise warning
    var name = value.toString();
    var instance = context.getClosestInstanceContext();
    if(instance==null)
        throw new InternalError("Expected an instance context. Please report this bug.");
    instance.overrideWidgetFieldType(new Identifier(name.substring(1, name.length -1)), type, this);
};


WidgetPropertiesProcessor.prototype.findWidgetPropertiesFieldAnnotation = function(context, widget) {
    var found = widget.getAllAnnotations(context)
        .filter(function(a) {
            return a.name==="@WidgetField";
        }).filter(function(a) {
            var value = a.getArgument("isProperties");
            return value instanceof BooleanLiteral && value.value.value;
        });
    return found[0] || null;
};


WidgetPropertiesProcessor.prototype.loadProperties = function(annotation, context, types) {
    if (!(types instanceof DocumentLiteral)) {
        context.problemListener.reportIllegalAnnotation(annotation, "WidgetProperties expects a Document of types as unique parameter");
        return null;
    }
    var props = new PropertyMap();
    types.entries.items.forEach(function(entry) {
        var prop = this.loadProperty(annotation, context, entry);
        if(prop) {
            if(props.has(prop.name))
                context.problemListener.reportIllegalAnnotation(entry.key, "Duplicate property: " + prop.name);
            else
                props.set(prop.name, prop);
        }
    }, this);
    return props;
};

WidgetPropertiesProcessor.prototype.loadProperty = function(annotation, context, entry) {
    var prop = new Property();
    prop.name = entry.key.toString();
    var value = entry.value;
    if(value instanceof TypeLiteral)
        return this.loadPropertyTypeLiteral(annotation, context, entry, prop, value);
    else if(value instanceof SetLiteral)
        return this.loadPropertySetLiteral(annotation, context, entry, prop, value);
    else if(value instanceof DocumentLiteral)
        return this.loadPropertyDocumentLiteral(annotation, context, entry, prop, value);
    else {
        context.problemListener.reportIllegalAnnotation(annotation, "WidgetProperties expects a Document of types as unique parameter");
        return null;
    }
};

WidgetPropertiesProcessor.prototype.loadPropertyDocumentLiteral = function(annotation, context, entry, prop, literal) {
    var children = literal.entries;
    for(var i=0; i<children.items.length; i++) {
        var child = children.items[i];
        var name = child.key.toString();
        var value = child.value;
        switch(name) {
            case "required":
                if(value instanceof BooleanLiteral) {
                    prop.setRequired(value.interpret(context) === BooleanValue.TRUE);
                    break;
                }
                context.problemListener.reportIllegalAnnotation(child.key, "Expected a Boolean value for 'required'.");
                return null;
            case "help":
                if(value instanceof TextLiteral) {
                    prop.help = value.value.getStorableData();
                    break;
                }
                context.problemListener.reportIllegalAnnotation(child.key, "Expected a Text value for 'help'.");
                return null;
            case "type":
                if(value instanceof TypeLiteral) {
                    var type = value.value.resolve(context, t => context.problemListener.reportIllegalAnnotation(annotation, "Unkown type: " + t.name));
                    if (type) {
                        prop.validator = new TypeValidator(type);
                        break;
                    }
                } else if(value instanceof DocumentLiteral) {
                    var embedded = this.loadProperties(annotation, context, value);
                    if (embedded) {
                        prop.validator = new TypeValidator(new PropertiesType(embedded));
                        break;
                    }
                }
                context.problemListener.reportIllegalAnnotation(child.key, "Expected a Type value for 'type'.");
                return null;
            case "types":
                if(value instanceof SetLiteral) {
                    value = value.interpret(context);
                    var types = Array.from(value.items.set)
                        .filter(function(l) {
                           return l !== NullValue.instance;
                        })
                        .map(function (l) {
                            return l.value.resolve(context, t => context.problemListener.reportIllegalAnnotation(annotation, "Unkown type: " + t.name));
                    }, this);
                    prop.validator = new TypeSetValidator(new Set(types));
                    if(types.length==value.items.set.size)
                        prop.validator = prop.validator.required();
                    break;
                }
                context.problemListener.reportIllegalAnnotation(child.key, "Expected a Set value for 'values'.");
                return null;
            case "values":
                if(value instanceof SetLiteral) {
                    value = value.interpret(context);
                    var texts = Array.from(value.items.set)
                        .filter(function(l) {
                            return l !== NullValue.instance;
                        })
                        .map(function (l) {
                            return l.toString();
                        });
                    prop.validator = new ValueSetValidator(new Set(texts));
                    if(texts.length==value.items.set.size)
                        prop.validator = prop.validator.required();
                    break;
                }
                context.problemListener.reportIllegalAnnotation(child.key, "Expected a Set value for 'values'.");
                return null;
             default:
                context.problemListener.reportIllegalAnnotation(child.key, "Unknown property attribute: " + name);
                return null;
        }
    }
    return prop;
};


WidgetPropertiesProcessor.prototype.loadPropertySetLiteral = function(annotation, context, entry, prop, literal) {
    var value = literal.interpret(context);
    var itemType = value.itemType || null;
    if(itemType instanceof TypeType) {
        var types = Array.from(value.items.set)
            .filter(function(l) {
                return l !== NullValue.instance;
            })
            .map(function (l) {
                return l.value.resolve(context, t => context.problemListener.reportIllegalAnnotation(annotation, "Unkown type: " + t.name) );
            }, this);
        if(types.indexOf(null)>=0)
            return null; // TODO something went wrong
        prop.validator = new TypeSetValidator(new Set(types));
        if(types.length==value.items.set.size)
            prop.validator = prop.validator.required();
        return prop;
    } else if(itemType === AnyType.instance || itemType === TextType.instance) {
        var texts = Array.from(value.items.set)
            .filter(function(l) {
                return l !== NullValue.instance;
            })
            .map(function (l) {
                return l.toString();
            });
        prop.validator = new ValueSetValidator(new Set(texts));
        if(texts.length==value.items.set.size)
            prop.validator = prop.validator.required();
        return prop;
    } else {
        context.problemListener.reportIllegalAnnotation(entry.key, "Expected a set of Types.");
        return null;
    }
};

WidgetPropertiesProcessor.prototype.loadPropertyTypeLiteral = function(annotation, context, entry, prop, literal) {
    var type = literal.value.resolve(context, t => context.problemListener.reportIllegalAnnotation(annotation, "Unkown type: " + t.name));
    if(!type)
        return null;
    prop.validator = new TypeValidator(type);
    return prop;
};

exports.WidgetPropertiesProcessor = WidgetPropertiesProcessor;