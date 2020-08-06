const WidgetFieldProcessor = require("./WidgetFieldProcessor").WidgetFieldProcessor;
const WidgetPropertiesProcessor = require("./WidgetPropertiesProcessor").WidgetPropertiesProcessor;
const PageWidgetOfProcessor = require("./PageWidgetOfProcessor").PageWidgetOfProcessor;
const InlinedProcessor = require("./InlinedProcessor").InlinedProcessor;

/* global Map */
const processors = new Map();

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
        const simpleName = name.substring(1) + "Processor";
        const idx = module.filename.lastIndexOf("/");
        const modulePath = module.filename.substring(0, idx + 1) + simpleName + ".js";
        const script = eval("require('" + modulePath + "')");
        const processor = new script[simpleName]();
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
    register(new WidgetPropertiesProcessor());
    register(new PageWidgetOfProcessor());
    register(new InlinedProcessor());
}

exports.AnnotationProcessors =  {
    forId: forId,
    forName: forName,
    register: register,
    registerAll: registerAll
};

registerAll();