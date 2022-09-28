import AnnotationProcessor from './AnnotationProcessor'
import {PropertiesType, AnyType, TextType, TypeType, IntegerType, IType} from '../type'
import {TextLiteral, BooleanLiteral, DocumentLiteral, TypeLiteral, SetLiteral, DocEntry, Literal} from '../literal'
import { InternalError } from '../error'
import {Annotation, Identifier} from '../grammar'
import { PropertyMap, Property, ValueSetValidator, TypeSetValidator, TypeValidator, ValidatorSetValidator } from '../property'
import {NullValue, BooleanValue, SetValue, TextValue, IntegerValue, DecimalValue, TypeValue, IValue} from '../value'
import {Context} from "../runtime";
import {IExpression} from "../expression";
import {JsxProperty} from "../jsx";
import {CategoryDeclaration, IWidgetDeclaration} from "../declaration";
import {Section} from "../parser";

export default class WidgetPropertiesProcessor extends AnnotationProcessor {
  
    constructor() {
        super("@WidgetProperties");
    }

    processCategory(context: Context, annotation: Annotation, declaration: CategoryDeclaration) {
        if(declaration.isWidget(context)) {
            this.doProcessCategory(context, annotation, declaration as unknown as IWidgetDeclaration);
        } else {
            context.problemListener.reportIllegalAnnotation(annotation, "WidgetField is only applicable to widgets");
        }
    }

    doProcessCategory(context: Context, annotation: Annotation, widget: IWidgetDeclaration) {
        const types = annotation.getDefaultArgument();
        if(types) {
            const properties = this.loadProperties(context, annotation, types);
            if (properties != null) {
                widget.properties = properties;
                const widgetField = this.findWidgetPropertiesFieldAnnotation(context, widget);
                if (widgetField)
                    this.overrideWidgetFieldType(context, widgetField, new PropertiesType(properties));
            }
        }
    }

    overrideWidgetFieldType(context: Context, widgetField: Annotation, type: IType) {
        const value = widgetField.getArgument("name");
        if(!(value instanceof TextLiteral))
            return; // raise warning
        const name = value.toString();
        const instance = context.getClosestInstanceContext();
        if(instance==null)
            throw new InternalError("Expected an instance context. Please report this bug.");
        instance.overrideWidgetFieldType(new Identifier(name.substring(1, name.length -1)), type, this);
    }

    findWidgetPropertiesFieldAnnotation(context: Context, widget: IWidgetDeclaration): Annotation | null {
        const found = widget.getAllAnnotations(context)!
            .filter(a => a.name==="@WidgetField").filter(a => {
                const value = a.getArgument("isProperties");
                return value instanceof BooleanLiteral && value.value.value;
            });
        return found[0] || null;
    }

    loadProperties(context: Context, annotation: Annotation | null, types: IExpression): PropertyMap | null {
        if (types instanceof DocumentLiteral) {
            const props = new PropertyMap();
            types.entries.items.forEach(entry => {
                const prop = this.loadProperty(context, annotation, entry);
                if (prop) {
                    if (props.has(prop.name))
                        context.problemListener.reportIllegalAnnotation(entry.key.asSection(), "Duplicate property: " + prop.name!);
                    else
                        props.set(prop.name, prop);
                }
            }, this);
            return props;
        } else {
            context.problemListener.reportIllegalAnnotation(annotation, "WidgetProperties expects a Document of types as unique parameter");
            return null;
        }
    }

    loadProperty(context: Context, annotation: Annotation | null, entry: DocEntry): Property | null {
        const prop = new Property();
        prop.name = entry.key.toString();
        const value = entry.value;
        if(value instanceof TypeLiteral)
            return this.loadPropertyFromTypeLiteral(context, annotation, entry, prop, value);
        else if(value instanceof SetLiteral)
            return this.loadPropertyFromSetLiteral(context, annotation, entry, prop, value);
        else if(value instanceof DocumentLiteral)
            return this.loadPropertyFromDocumentLiteral(context, annotation, entry, prop, value);
        else {
            context.problemListener.reportIllegalAnnotation(annotation, "WidgetProperties expects a Document of types as unique parameter");
            return null;
        }
    }

    loadPropertyFromDocumentLiteral(context: Context, annotation: Annotation | null, entry: DocEntry, prop: Property, literal: DocumentLiteral) {
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
                        this.loadPropertyFromTypeLiteral(context, annotation, entry, prop, value);
                        break;
                    } else if(value instanceof DocumentLiteral) {
                        const embedded = this.loadProperties(context, annotation, value);
                        if (embedded) {
                            prop.validator = new TypeValidator(new PropertiesType(embedded));
                            break;
                        }
                    }
                    context.problemListener.reportIllegalAnnotation(child.key, "Expected a Type value for 'type'.");
                    return null;
                case "types":
                    if(value instanceof SetLiteral) {
                        this.loadPropertyFromSetLiteral(context, annotation, entry, prop, value);
                        break;
                    }
                    context.problemListener.reportIllegalAnnotation(child.key, "Expected a Set value for 'values'.");
                    return null;
                case "values":
                    if(value instanceof SetLiteral) {
                        this.loadPropertyFromSetLiteral(context, annotation, entry, prop, value);
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

    loadPropertyFromSetLiteral(context: Context, annotation: Annotation | null, entry: DocEntry, prop: Property, literal: SetLiteral) {
        const value = literal.interpret(context);
        const validator = this.newValidatorFromSetValue(context, annotation, value);
        if(validator) {
            prop.validator = validator;
            return prop;
        } else {
            context.problemListener.reportIllegalAnnotation(entry.key, "Expected a set of Types.");
            return null;
        }
    }

    newValidatorFromSetValue(context: Context, annotation: Annotation | null, value: SetValue) {
        const itemType = value.itemType || null;
        if(itemType instanceof TypeType)
            return this.newTypeSetValidator(context, annotation, value);
        else if(itemType === TextType.instance || itemType === IntegerType.instance)
            return this.newValueSetValidator(context, annotation, value);
        else if(itemType === AnyType.instance) {
            if(this.setContainsType(context, value))
                return this.newValidatorSetValidator(context, annotation, value);
            else
                return this.newValueSetValidator(context, annotation, value);
        } else {
            console.log("No validator for type: " + itemType.name);
            return null;
        }
    }

    setContainsType(context: Context, value) {
        const items = value.items.toArray();
        return items.some(v => v instanceof TypeValue);
    }

    newValidatorSetValidator(context: Context, annotation: Annotation, value: SetValue) {
        let validators = value.items
            .filter(l => l !== NullValue.instance)
            .map(l => this.newValidatorFromValue(context, annotation, l), this)
            .filter(v => v != null)
            .map(v => v.optional());
        let validator = new ValidatorSetValidator(validators);
        if(validators.length == value.items.size) // no null
            validator = validator.required();
        return validator;
    }

    newValidatorFromValue(context: Context, annotation: Annotation, value: IValue) {
        if(value instanceof SetValue)
            return this.newValidatorFromSetValue(context, annotation, value);
        else if(value instanceof TextValue || value instanceof IntegerValue || value instanceof DecimalValue) {
            value = new SetValue(value.type, [value]);
            return this.newValueSetValidator(context, annotation, value);
        } else if(value instanceof TypeValue)
           return new TypeValidator(value.value);
        else {
            console.log("No validator for type: " + value.type.name);
            return null;
        }
    }

    newValueSetValidator(context: Context, annotation: Annotation, value: SetValue){
        const texts = value.items
            .filter(l => l !== NullValue.instance)
            .map(l => l.toString());
        let validator = new ValueSetValidator(new Set<string>(texts));
        if(texts.length === value.items.length) // no null
            validator = validator.required();
        return validator;
    }

    newTypeSetValidator(context: Context, annotation: Annotation, value: SetValue) {
        const types = value.items
            .filter(l => l !== NullValue.instance)
            .map(l => l.value.resolve(context, t => context.problemListener.reportIllegalAnnotation(annotation, "Unkown type: " + t.name) ), this);
        if(types.indexOf(null)>=0)
            return null; // TODO something went wrong
        let validator = new TypeSetValidator(new Set(types));
        if(types.length === value.items.set.size)
            validator = validator.required();
        return validator;
    }


    loadPropertyFromTypeLiteral(context: Context, annotation: Annotation | null, entry: DocEntry, prop: Property, literal: TypeLiteral) {
        const section: Section = annotation || literal;
        const type = literal.value.resolve(context, t => context.problemListener.reportIllegalAnnotation(section, "Unkown type: " + t.name));
        if(!type)
            return null;
        prop.validator = new TypeValidator(type);
        return prop;
    }
}