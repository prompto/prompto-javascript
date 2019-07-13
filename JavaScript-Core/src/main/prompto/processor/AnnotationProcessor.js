function AnnotationProcessor(name) {
    this.name = name;
    return this;
}

AnnotationProcessor.prototype.processCategory = function(annotation, context, declaration) {
    throw new Error("Missing override!");
};

exports.AnnotationProcessor = AnnotationProcessor;