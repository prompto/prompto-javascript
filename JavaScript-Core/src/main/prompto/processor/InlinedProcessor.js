import AnnotationProcessor from '../../../main/prompto/processor/AnnotationProcessor.ts'

export default class InlinedProcessor extends AnnotationProcessor {

    constructor() {
        super("@Inlined");
    }

    processCategory(annotation, context, declaration) {
        // nothing to do
    }
}

