export default class AnnotationProcessor {

    constructor(name) {
        this.name = name;
    }

    processCategory(annotation, context, declaration) {
        throw new Error("Missing override!");
    }
}
