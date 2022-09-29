import AnnotationProcessor from './AnnotationProcessor'
import {Annotation} from "../grammar";
import {Context} from "../runtime";
import {CategoryDeclaration} from "../declaration";

export default class InlinedProcessor extends AnnotationProcessor {

    constructor() {
        super("@Inlined");
    }

    processCategory(context: Context, annotation: Annotation, declaration: CategoryDeclaration): void {
        // nothing to do
    }
}

