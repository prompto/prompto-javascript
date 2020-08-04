var AnnotationProcessor = require("./AnnotationProcessor").AnnotationProcessor;
var TextLiteral = require("../literal/TextLiteral").TextLiteral;
var TypeLiteral = require("../literal/TypeLiteral").TypeLiteral;
var TypeExpression = require("../expression/TypeExpression").TypeExpression;
var Identifier = require("../grammar/Identifier").Identifier;

class WidgetFieldProcessor extends AnnotationProcessor {

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
        var fieldName = annotation.getArgument("name");
        var fieldType = annotation.getArgument("type");
        if(!(fieldName instanceof TextLiteral)) {
            context.problemListener.reportIllegalAnnotation("WidgetField requires a Text value for argument 'name'", annotation)
        } else if(!(fieldType instanceof TypeExpression || fieldType instanceof TypeLiteral)) {
            context.problemListener.reportIllegalAnnotation("WidgetField requires a a Type value for argument 'type'", annotation)
        } else {
            var instance = context.getClosestInstanceContext();
            if(instance) {
                var name = fieldName.toString();
                var type = fieldType.value;
                instance.registerWidgetField(new Identifier(name.substring(1, name.length - 1)), type, this);
            } else
                context.problemListener.reportError("Expected an instance context!");
        }
    }
}

exports.WidgetFieldProcessor = WidgetFieldProcessor;