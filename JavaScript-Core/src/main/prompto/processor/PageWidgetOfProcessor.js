var AnnotationProcessor = require("./AnnotationProcessor").AnnotationProcessor;

function PageWidgetOfProcessor() {
    AnnotationProcessor.call(this, "@PageWidgetOf");
    return this;
}

PageWidgetOfProcessor.prototype = Object.create(AnnotationProcessor.prototype);
PageWidgetOfProcessor.prototype.constructor = PageWidgetOfProcessor;


PageWidgetOfProcessor.prototype.processCategory = function(annotation, context, declaration) {
    if(declaration.isWidget(context)) {
        this.doProcessCategory(annotation, context, declaration);
    } else {
        context.problemListener.reportIllegalAnnotation("PageWidgetOf is only applicable to widgets", annotation);
    }
};


PageWidgetOfProcessor.prototype.doProcessCategory = function(annotation, context, declaration) {
    // TODO check resource
};

exports.PageWidgetOfProcessor = PageWidgetOfProcessor;