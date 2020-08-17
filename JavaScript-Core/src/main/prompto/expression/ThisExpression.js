
export default class ThisExpression extends Expression {

   check(context) {
        if (context instanceof DocumentContext)
            return DocumentType.instance;
        if (context != null && !(context instanceof InstanceContext))
            context = context.getClosestInstanceContext ();
        if (context instanceof InstanceContext)
            return context.instanceType;
        else
            throw new SyntaxError ("Not in an instance context!");
    }

    interpret(context) {
        if (context instanceof DocumentContext)
            return context.document;
        if (context != null && !(context instanceof InstanceContext))
            context = context.getClosestInstanceContext ();
        if (context instanceof InstanceContext)
            return context.instance;
        else
            throw new SyntaxError ("Not in an instance context!");
    }

    toDialect(writer) {
        writer.toDialect(this);
    }

    toEDialect(writer) {
        writer.append("self");
    }

    toODialect(writer) {
        writer.append("this");
    }

    toMDialect(writer) {
        writer.append("self");
    }

    toString() {
        return "this";
    }

    declare(transpiler) {
        // nothing to do
    }

    transpile(transpiler) {
        transpiler.append("this");
    }
}
