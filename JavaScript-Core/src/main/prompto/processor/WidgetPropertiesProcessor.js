var AnnotationProcessor = require("./AnnotationProcessor").AnnotationProcessor;
var TextLiteral = require("../literal/TextLiteral").TextLiteral;
var TypeLiteral = require("../literal/TypeLiteral").TypeLiteral;
var BooleanLiteral = require("../literal/BooleanLiteral").BooleanLiteral;
var DocumentLiteral = require("../literal/DocumentLiteral").DocumentLiteral;
var Property = require("../property/Property").Property;
var PropertyMap = require("../property/PropertyMap").PropertyMap;
var PropertiesType = require("../type/PropertiesType").PropertiesType;
var InternalError = require("../error/InternalError").InternalError;
var Identifier = require("../grammar/Identifier").Identifier;

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
    var properties = this.checkProperties(annotation, context, types);
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
    instance.registerWidgetField(new Identifier(name.substring(1, name.length -1)), type, true);
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


WidgetPropertiesProcessor.prototype.checkProperties = function(annotation, context, types) {
    if (!(types instanceof DocumentLiteral)) {
        context.problemListener.reportIllegalAnnotation(annotation, "WidgetProperties expects a Document of types as unique parameter");
        return null;
    }
    var props = new PropertyMap();
    types.entries.items.forEach(function(entry) {
        var prop = this.checkProperty(annotation, context, entry);
        if(prop) {
            if(props.has(prop.name))
                context.problemListener.reportIllegalAnnotation(entry.key, "Duplicate property: " + prop.name);
            else
                props.set(prop.name, prop);
        }
    }, this);
    return props;
};

WidgetPropertiesProcessor.prototype.checkProperty = function(annotation, context, entry) {
    var prop = new Property();
    prop.name = entry.key.toString();
    if(entry.value instanceof TypeLiteral) {
        prop.type = entry.value.value;
        return prop;
    } else if(entry.value instanceof DocumentLiteral) {
        var children = entry.value.entries;
        for(var i=0; i<children.items.length; i++) {
            var child = children.items[i];
            var name = child.key.toString();
            var value = child.value;
            switch(name) {
                case "help":
                    if(value instanceof TextLiteral)
                        prop.help = value.value.getStorableData();
                    else
                        context.problemListener.reportIllegalAnnotation(child.key, "Expected a Text value for 'help'.");
                    break;
                case "type":
                    if(value instanceof TypeLiteral)
                        prop.type = value.value;
                    else if(value instanceof DocumentLiteral) {
                        var embedded = this.checkProperties(annotation, context, value);
                        if(embedded)
                            prop.type = new PropertiesType(embedded);
                        else
                            return null;
                    } else
                        context.problemListener.reportIllegalAnnotation(child.key, "Expected a Type value for 'type'.");
                    break;
                default:
                    context.problemListener.reportIllegalAnnotation(child.key, "Unknown property attribute: " + name);
                    return null;
            }
        }
        return prop;
    } else {
        context.problemListener.reportIllegalAnnotation(annotation, "WidgetProperties expects a Document of types as unique parameter");
        return null;
    }
};

exports.WidgetPropertiesProcessor = WidgetPropertiesProcessor;