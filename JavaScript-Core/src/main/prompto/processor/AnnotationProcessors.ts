import { InlinedProcessor, PageWidgetOfProcessor, WidgetFieldProcessor, WidgetPropertiesProcessor } from '../processor'
import {Identifier} from "../grammar";
import AnnotationProcessor from "./AnnotationProcessor";

const processors = new Map<string, AnnotationProcessor>();

function forId(id: Identifier): AnnotationProcessor | null {
    return forName(id.name);
}

function forName(name: string): AnnotationProcessor | null {
    const result = processors.get(name);
    if (result) {
        return result;
    }
    if (module && module.filename)
        return loadByName(name);
    else
        return null;
}

function loadByName(name: string): AnnotationProcessor | null {
    try {
        const simpleName = name.substring(1) + "Processor";
        const idx = module.filename.lastIndexOf("/");
        const modulePath = module.filename.substring(0, idx + 1) + simpleName + ".js";
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const script = eval("require('" + modulePath + "')");
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call
        const processor = new script[simpleName]() as AnnotationProcessor;
        processors.set(name, processor);
        return processor;
    } catch (e) {
        return null;
    }
}

function register(processor: AnnotationProcessor) {
    processors.set(processor.name, processor);
}

function names(): string[] {
    return Array.from(processors.keys()).sort();
}

function init() {
    register(new WidgetFieldProcessor());
    register(new WidgetPropertiesProcessor());
    register(new PageWidgetOfProcessor());
    register(new InlinedProcessor());
}

export default {
    forId: forId,
    forName: forName,
    register: register,
    init: init,
    names: names
};

