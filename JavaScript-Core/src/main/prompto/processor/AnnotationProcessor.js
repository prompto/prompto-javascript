var processors = new Map();

function AnnotationProcessor() {
    return this;
}

AnnotationProcessor.forId = function(id) {
    const result = processors.get(id);
    if (result) {
        return result;
    }
    var simpleName = id.name.substring(1) + "Processor";
    var parts = module.filename.split("/");
    var idx = module.filename.lastIndexOf("/");
    var modulePath = module.filename.substring(0, idx + 1) + simpleName + ".js";
    var script = eval("require('" + modulePath + "')");
    var processor = new script[simpleName]();
    processors.set(id, processor);
    return processor;
};


AnnotationProcessor.prototype.processCategory = function(annotation, context, declaration) {
    throw new Error("Missing override!");
};

exports.AnnotationProcessor = AnnotationProcessor;