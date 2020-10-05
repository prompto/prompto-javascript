import AnnotationProcessor from './AnnotationProcessor.js'

export default class InlinedProcessor extends AnnotationProcessor {

    constructor() {
        super("@Inlined");
    }

    processCategory(annotation, context, declaration) {
        // nothing to do
    }
}

