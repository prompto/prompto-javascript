var WidgetFieldProcessor = require("./WidgetFieldProcessor").WidgetFieldProcessor;

/* global Map */
var processors = new Map();

function forId(id) {
    return forName(id.name);
}

function forName(name) {
    const result = processors.get(name);
    if (result) {
        return result;
    }
    if (module && module.filename)
        return loadByName(name);
    else
        return null;
}

function loadByName(name) {
    try {
        var simpleName = name.substring(1) + "Processor";
        var idx = module.filename.lastIndexOf("/");
        var modulePath = module.filename.substring(0, idx + 1) + simpleName + ".js";
        var script = eval("require('" + modulePath + "')");
        var processor = new script[simpleName]();
        processors.set(name, processor);
        return processor;
    } catch (e) {
        return null;
    }
}

function register(processor) {
    processors.set(processor.name, processor);
}

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