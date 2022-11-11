import AnnotationProcessor from './AnnotationProcessor';
import { Context } from "../runtime";
import { Annotation } from "../grammar";
import { CategoryDeclaration } from "../declaration";
export default class PageWidgetOfProcessor extends AnnotationProcessor {
    constructor();
    processCategory(context: Context, annotation: Annotation, declaration: CategoryDeclaration<any>): void;
    doProcessCategory(context: Context, annotation: Annotation, declaration: CategoryDeclaration<any>): void;
}
