import AnnotationProcessor from './AnnotationProcessor.js'
import { PropertiesType, AnyType, TextType, TypeType } from '../type/index.js'
import { TextLiteral, BooleanLiteral, DocumentLiteral, TypeLiteral, SetLiteral } from '../literal/index.js'
import { InternalError } from '../error/index.js'
import { Identifier } from '../grammar/index.js'
import { PropertyMap, Property, ValueSetValidator, TypeSetValidator, TypeValidator } from '../property/index.js'
import { NullValue, BooleanValue } from '../value/index.js'

export default class WidgetPropertiesProcessor extends AnnotationProcessor {
  
    constructor() {
        super("@WidgetProperties");
    }

    processCategory(annotation, context, declaration) {
        if(declaration.isWidget(context)) {
            this.doProcessCategory(annotation, context, declaration);
        } else {
            context.problemListener.reportIllegalAnnotation("WidgetField is only applicable to widgets", annotation);
        }
    }

    doProcessCategory(annotation, context, widget) {
        const types = annotation.getDefaultArgument();
        const properties = this.loadProperties(annotation, context, types);
        if (properties != null) {
            widget.properties = properties;
            const widgetField = this.findWidgetPropertiesFieldAnnotation(context, widget);
            if(widgetField)
                this.overrideWidgetFieldType(context, widgetField, new PropertiesType(properties));
        }
    }

    overrideWidgetFieldType(context, widgetField, type) {
        const value = widgetField.getArgument("name");
        if(!(value instanceof TextLiteral))
            return; // raise warning
        const name = value.toString();
        const instance = context.getClosestInstanceContext();
        if(instance==null)
            throw new InternalError("Expected an instance context. Please report this bug.");
        instance.overrideWidgetFieldType(new Identifier(name.substring(1, name.length -1)), type, this);
    }

    findWidgetPropertiesFieldAnnotation(context, widget) {
        const found = widget.getAllAnnotations(context)
            .filter(a => a.name==="@WidgetField").filter(a => {
                const value = a.getArgument("isProperties");
                return value instanceof BooleanLiteral && value.value.value;
            });
        return found[0] || null;
    }

    loadProperties(annotation, context, types) {
        if (!(types instanceof DocumentLiteral)) {
            context.problemListener.reportIllegalAnnotation(annotation, "WidgetProperties expects a Document of types as unique parameter");
            return null;
        }
        const props = new PropertyMap();
        types.entries.items.forEach(function(entry) {
            const prop = this.loadProperty(annotation, context, entry);
            if(prop) {
                if(props.has(prop.name))
                    context.problemListener.reportIllegalAnnotation(entry.key, "Duplicate property: " + prop.name);
                else
                    props.set(prop.name, prop);
            }
        }, this);
        return props;
    }

    loadProperty(annotation, context, entry) {
        const prop = new Property();
        prop.name = entry.key.toString();
        const value = entry.value;
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
    }

    loadPropertyDocumentLiteral(annotation, context, entry, prop, literal) {
        const children = literal.entries;
        for(let i=0; i<children.items.length; i++) {
            const child = children.items[i];
            const name = child.key.toString();
            let value = child.value;
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
                        const type = value.value.resolve(context, t => context.problemListener.reportIllegalAnnotation(annotation, "Unkown type: " + t.name));
                        if (type) {
                            prop.validator = new TypeValidator(type);
                            break;
                        }
                    } else if(value instanceof DocumentLiteral) {
                        const embedded = this.loadProperties(annotation, context, value);
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
                        const types = Array.from(value.items.set)
                            .filter(l => l !== NullValue.instance)
                            .map(l => l.value.resolve(context, t => context.problemListener.reportIllegalAnnotation(annotation, "Unkown type: " + t.name)), this);
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
                        const texts = Array.from(value.items.set)
                            .filter(l => l !== NullValue.instance)
                            .map(l => l.toString());
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
    }

    loadPropertySetLiteral(annotation, context, entry, prop, literal) {
        const value = literal.interpret(context);
        const itemType = value.itemType || null;
        if(itemType instanceof TypeType) {
            const types = Array.from(value.items.set)
                .filter(l => l !== NullValue.instance)
                .map(l => l.value.resolve(context, t => context.problemListener.reportIllegalAnnotation(annotation, "Unkown type: " + t.name) ), this);
            if(types.indexOf(null)>=0)
                return null; // TODO something went wrong
            prop.validator = new TypeSetValidator(new Set(types));
            if(types.length==value.items.set.size)
                prop.validator = prop.validator.required();
            return prop;
        } else if(itemType === AnyType.instance || itemType === TextType.instance) {
            const texts = Array.from(value.items.set)
                .filter(l => l !== NullValue.instance)
                .map(l => l.toString());
            prop.validator = new ValueSetValidator(new Set(texts));
            if(texts.length==value.items.set.size)
                prop.validator = prop.validator.required();
            return prop;
        } else {
            context.problemListener.reportIllegalAnnotation(entry.key, "Expected a set of Types.");
            return null;
        }
    }

    loadPropertyTypeLiteral(annotation, context, entry, prop, literal) {
        const type = literal.value.resolve(context, t => context.problemListener.reportIllegalAnnotation(annotation, "Unkown type: " + t.name));
        if(!type)
            return null;
        prop.validator = new TypeValidator(type);
        return prop;
    }
}
