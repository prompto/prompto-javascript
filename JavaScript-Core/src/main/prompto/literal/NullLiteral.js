
export default class NullLiteral {

    check(context) {
        return NullType.instance;
    }

    interpret(context) {
        return NullValue.instance;
    }

    declare(transpiler) {
        // nothing to do
    }

    transpile(transpiler) {
        transpiler.append("null");
    }

    toDialect(writer) {
        writer.toDialect(this);
    }

    toEDialect(writer) {
        writer.append("nothing");
    }

    toODialect(writer) {
        writer.append("null");
    }

    toMDialect(writer) {
        writer.append("None");
    }
}

NullLiteral.instance = new NullLiteral();
