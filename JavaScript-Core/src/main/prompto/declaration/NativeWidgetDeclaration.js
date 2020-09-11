import NativeCategoryDeclaration from "./NativeCategoryDeclaration"

export default class NativeWidgetDeclaration extends NativeCategoryDeclaration {

    constructor(name, categoryBindings, methods) {
        super(name, null, categoryBindings, null, methods);
    }

    isWidget(context) {
        return true;
    }

    getProperties(context) {
        if(typeof(this.properties)=="undefined") {
            this.properties = null;
            // don't bubble up buried problems
            const savedProblems = context.problemListener.problems;
            context.problemListener.problems = [];
            try {
                this.check(context);
            } finally {
                context.problemListener.problems = savedProblems;
            }
        }
        return this.properties;
    }

    getDeclarationType() {
        return "Widget";
    }

    getBoundFunction(fail) {
        if(this.bound==null) {
            const binding = this.getBinding(fail);
            if(binding!=null) {
                this.bound = binding.resolveWidget();
                if(fail && this.bound==null)
                    throw new SyntaxError("No JavaScript function:" + binding.toString());
            }
        }
        return this.bound;
    }

    categoryTypeToEDialect(writer) {
        writer.append("native widget");
    }

    categoryTypeToODialect(writer) {
        writer.append("native widget");
    }

    categoryTypeToMDialect(writer) {
        writer.append("native widget");
    }

    transpile(transpiler) {
        const binding = this.getBinding();
        binding.transpileWidget(transpiler);
        return true;
    }
}
