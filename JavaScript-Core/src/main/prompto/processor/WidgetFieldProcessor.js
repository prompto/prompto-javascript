var AnnotationProcessor = require("./AnnotationProcessor").AnnotationProcessor;
var TextLiteral = require("../literal/TextLiteral").TextLiteral;
var TypeExpression = require("../expression/TypeExpression").TypeExpression;
var Identifier = require("../grammar/Identifier").Identifier;

function WidgetFieldProcessor() {
    AnnotationProcessor.call(this, "@WidgetField");
    return this;
}

WidgetFieldProcessor.prototype = Object.create(AnnotationProcessor.prototype);
WidgetFieldProcessor.prototype.constructor = WidgetFieldProcessor;


WidgetFieldProcessor.prototype.processCategory = function(annotation, context, declaration) {
    if(declaration.isWidget(context)) {
        this.doProcessCategory(annotation, context, declaration);
    } else {
        context.problemListener.reportIllegalAnnotation("WidgetField is only applicable to widgets", annotation);
    }
};


WidgetFieldProcessor.prototype.doProcessCategory = function(annotation, context, declaration) {
    var fieldName = annotation.getArgument("name");
    var fieldType = annotation.getArgument("type");
    if(!(fieldName instanceof TextLiteral)) {
        context.problemListener.reportIllegalAnnotation("WidgetField requires a Text value for argument 'name'", annotation)
    } else if(!(fieldType instanceof TypeExpression)) {
        context.problemListener.reportIllegalAnnotation("WidgetField requires a a Type value for argument 'type'", annotation)
    } else {
        var name = fieldName.toString();
        var type = fieldType.value;
        context.registerWidgetField(new Identifier(name.substring(1, name.length-1)), type);
    }
};

exports.WidgetFieldProcessor = WidgetFieldProcessor;