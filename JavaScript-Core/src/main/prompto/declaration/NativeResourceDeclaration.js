
export default class NativeResourceDeclaration extends NativeCategoryDeclaration {

    constructor(id, attributes, categoryBindings, attributeBindings, methods) {
        super(id, attributes, categoryBindings, attributeBindings, methods);
    }

    getType(context) {
        return new ResourceType(this.id);
    }

    newInstance(context) {
        return new NativeResource(context, this);
    }

    checkConstructorContext(context) {
        if(!(context instanceof ResourceContext))
            context.problemListener.reportNotAResourceContext(this);
    }

    categoryTypeToEDialect(writer) {
        writer.append("native resource");
    }

    categoryTypeToODialect(writer) {
        writer.append("native resource");
    }

    categoryTypeToMDialect(writer) {
        writer.append("native resource");
    }
}


