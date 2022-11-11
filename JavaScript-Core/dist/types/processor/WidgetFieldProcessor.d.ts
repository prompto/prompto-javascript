import AnnotationProcessor from './AnnotationProcessor';
import { Annotation } from '../grammar';
import { Context } from "../runtime";
import { CategoryDeclaration } from "../declaration";
export default class WidgetFieldProcessor extends AnnotationProcessor {
    constructor();
    processCategory(context: Context, annotation: Annotation, declaration: CategoryDeclaration<any>): void;
    doProcessCategory(context: Context, annotation: Annotation, declaration: CategoryDeclaration<any>): void;
}
