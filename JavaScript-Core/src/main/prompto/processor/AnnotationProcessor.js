class AnnotationProcessor {
    constructor(name) {
        this.name = name;
        return this;
    }

    processCategory(annotation, context, declaration) {
        throw new Error("Missing override!");
    }
}

exports.AnnotationProcessor = AnnotationProcessor;