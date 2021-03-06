import AnnotationProcessor from './AnnotationProcessor.js'
import { TextLiteral, TypeLiteral } from '../literal/index.js'
import { TypeExpression } from '../expression/index.js'
import { Identifier } from '../grammar/index.js'

export default class WidgetFieldProcessor extends AnnotationProcessor {

    constructor() {
        super("@WidgetField");
    }

    processCategory(annotation, context, declaration) {
        if(declaration.isWidget(context)) {
            this.doProcessCategory(annotation, context, declaration);
        } else {
            context.problemListener.reportIllegalAnnotation("WidgetField is only applicable to widgets", annotation);
        }
    }

    doProcessCategory(annotation, context, declaration) {
        const fieldName = annotation.getArgument("name");
        const fieldType = annotation.getArgument("type");
        if(!(fieldName instanceof TextLiteral)) {
            context.problemListener.reportIllegalAnnotation("WidgetField requires a Text value for argument 'name'", annotation)
        } else if(!(fieldType instanceof TypeExpression || fieldType instanceof TypeLiteral)) {
            context.problemListener.reportIllegalAnnotation("WidgetField requires a a Type value for argument 'type'", annotation)
        } else {
            const instance = context.getClosestInstanceContext();
            if(instance) {
                const name = fieldName.toString();
                const type = fieldType.value;
                instance.registerWidgetField(new Identifier(name.substring(1, name.length - 1)), type, this);
            } else
                context.problemListener.reportError("Expected an instance context!");
        }
    }
}