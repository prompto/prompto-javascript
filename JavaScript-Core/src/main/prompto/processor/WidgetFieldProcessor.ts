import AnnotationProcessor from './AnnotationProcessor'
import { TextLiteral, TypeLiteral } from '../literal'
import { TypeExpression } from '../expression'
import {Annotation, Identifier} from '../grammar'
import {Context} from "../runtime";
import {CategoryDeclaration} from "../declaration";
import {IType} from "../type";

export default class WidgetFieldProcessor extends AnnotationProcessor {

    constructor() {
        super("@WidgetField");
    }

    processCategory(context: Context, annotation: Annotation, declaration: CategoryDeclaration<any>): void {
        if(declaration.isWidget(context)) {
            this.doProcessCategory(context, annotation, declaration);
        } else {
            context.problemListener.reportIllegalAnnotation(annotation, "WidgetField is only applicable to widgets");
        }
    }

    doProcessCategory(context: Context, annotation: Annotation, declaration: CategoryDeclaration<any>): void {
        const fieldName = annotation.getArgument("name");
        const fieldType = annotation.getArgument("type");
        if(!(fieldName instanceof TextLiteral)) {
            context.problemListener.reportIllegalAnnotation(annotation, "WidgetField requires a Text value for argument 'name'")
        } else if(!(fieldType instanceof TypeExpression || fieldType instanceof TypeLiteral)) {
            context.problemListener.reportIllegalAnnotation(annotation, "WidgetField requires a a Type value for argument 'type'")
        } else {
            const instance = context.getClosestInstanceContext();
            if(instance) {
                const name = fieldName.toString();
                const type = fieldType.value as IType;
                instance.registerWidgetField(new Identifier(name.substring(1, name.length - 1)), type, this);
            } else
                context.problemListener.reportError(annotation, "Expected an instance context!");
        }
    }
}
