var AnnotationProcessor = require("./AnnotationProcessor").AnnotationProcessor;

class PageWidgetOfProcessor extends AnnotationProcessor {
    constructor() {
        super("@PageWidgetOf");
        return this;
    }

    processCategory(annotation, context, declaration) {
        if(declaration.isWidget(context)) {
            this.doProcessCategory(annotation, context, declaration);
        } else {
            context.problemListener.reportIllegalAnnotation("PageWidgetOf is only applicable to widgets", annotation);
        }
    }

    doProcessCategory(annotation, context, declaration) {
        // TODO check resource
    }
}

exports.PageWidgetOfProcessor = PageWidgetOfProcessor;