var processors = new Map();
var WidgetFieldProcessor = require("./WidgetFieldProcessor").WidgetFieldProcessor;

function forId(id) {
    return forName(id.name);
}

function forName(name) {
    const result = processors.get(name);
    if (result) {
        return result;
    }
    var simpleName = name.substring(1) + "Processor";
    var parts = module.filename.split("/");
    var idx = module.filename.lastIndexOf("/");
    var modulePath = module.filename.substring(0, idx + 1) + simpleName + ".js";
    var script = eval("require('" + modulePath + "')");
    var processor = new script[simpleName]();
    processors.set(name, processor);
    return processor;
};

function register(processor) {
    processors.set(processor.name, processor);
};

function registerAll() {
    register(new WidgetFieldProcessor());
}

exports.AnnotationProcessors =  {
    forId: forId,
    forName: forName,
    register: register,
    registerAll: registerAll
};

registerAll();