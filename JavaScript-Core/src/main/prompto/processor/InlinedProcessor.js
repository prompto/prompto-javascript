var AnnotationProcessor = require("./AnnotationProcessor").AnnotationProcessor;

function InlinedProcessor() {
    InlinedProcessor.call(this, "@InlinedProcessor");
    return this;
}

InlinedProcessor.prototype = Object.create(AnnotationProcessor.prototype);
InlinedProcessor.prototype.constructor = InlinedProcessor;


InlinedProcessor.prototype.processCategory = function(annotation, context, declaration) {
    // nothing to do
};


exports.InlinedProcessor = InlinedProcessor;