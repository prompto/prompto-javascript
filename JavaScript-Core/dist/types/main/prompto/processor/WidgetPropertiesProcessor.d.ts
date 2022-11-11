import AnnotationProcessor from './AnnotationProcessor';
import { IType } from '../type';
import { DocumentLiteral, TypeLiteral, SetLiteral, DocEntry } from '../literal';
import { Annotation } from '../grammar';
import { PropertyMap, Property, PropertyValidator } from '../property';
import { SetValue, IValue } from '../value';
import { Context } from "../runtime";
import { IExpression } from "../expression";
import { CategoryDeclaration, IWidgetDeclaration } from "../declaration";
export default class WidgetPropertiesProcessor extends AnnotationProcessor {
    constructor();
    processCategory(context: Context, annotation: Annotation, declaration: CategoryDeclaration<any>): void;
    doProcessCategory(context: Context, annotation: Annotation, widget: IWidgetDeclaration): void;
    overrideWidgetFieldType(context: Context, widgetField: Annotation, type: IType): void;
    findWidgetPropertiesFieldAnnotation(context: Context, widget: IWidgetDeclaration): Annotation | null;
    loadProperties(context: Context, annotation: Annotation | null, types: IExpression): PropertyMap | null;
    loadProperty(context: Context, annotation: Annotation | null, entry: DocEntry): Property | null;
    loadPropertyFromDocumentLiteral(context: Context, annotation: Annotation | null, entry: DocEntry, prop: Property, literal: DocumentLiteral): Property | null;
    loadPropertyFromSetLiteral(context: Context, annotation: Annotation | null, entry: DocEntry, prop: Property, literal: SetLiteral): Property;
    newValidatorFromSetValue(context: Context, annotation: Annotation | null, value: SetValue): PropertyValidator | null;
    setContainsType(context: Context, value: SetValue): boolean;
    newValidatorSetValidator(context: Context, annotation: Annotation | null, value: SetValue): PropertyValidator | null;
    newValidatorFromValue(context: Context, annotation: Annotation | null, value: IValue): PropertyValidator | null;
    newValueSetValidator(context: Context, annotation: Annotation | null, value: SetValue): PropertyValidator | null;
    newTypeSetValidator(context: Context, annotation: Annotation | null, value: SetValue): PropertyValidator | null;
    loadPropertyFromTypeLiteral(context: Context, annotation: Annotation | null, entry: DocEntry, prop: Property, literal: TypeLiteral): Property | null;
}
