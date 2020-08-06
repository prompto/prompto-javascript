const AnnotationProcessor = require("./AnnotationProcessor").AnnotationProcessor;

class InlinedProcessor extends AnnotationProcessor {
    constructor() {
        super("@Inlined");
        return this;
    }

    processCategory(annotation, context, declaration) {
        // nothing to do
    }
}


exports.InlinedProcessor = InlinedProcessor;