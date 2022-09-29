import AnnotationProcessor from './AnnotationProcessor'
import {Context} from "../runtime";
import {Annotation} from "../grammar";
import {CategoryDeclaration} from "../declaration";

export default class PageWidgetOfProcessor extends AnnotationProcessor {

    constructor() {
        super("@PageWidgetOf");
    }

    processCategory(context: Context, annotation: Annotation, declaration: CategoryDeclaration): void {
        if(declaration.isWidget(context)) {
            this.doProcessCategory(context, annotation, declaration);
        } else {
            context.problemListener.reportIllegalAnnotation(annotation, "PageWidgetOf is only applicable to widgets", );
        }
    }

    doProcessCategory(context: Context, annotation: Annotation, declaration: CategoryDeclaration): void {
        // TODO check resource
    }
}
