import ReadAllExpression from "../expression/ReadAllExpression"
import { Dialect } from "../parser/index"
import { Variable } from "../runtime/index"
import { VoidType, TextType } from "../type/index"

export default class ReadStatement extends ReadAllExpression {

    constructor(source, name, andThen) {
        super(source);
        this.name = name;
        this.andThen = andThen;
    }

    canReturn() {
        return false;
    }

    isSimple() {
        return false;
    }

    check(context) {
        super.check(context);
        context = context.newChildContext();
        context.registerValue(new Variable(this.name, TextType.instance));
        this.andThen.check(context, null);
        return VoidType.instance;
    }

    interpret(context) {
        const result = ReadAllExpression.prototype.interpret.call(this, context);
        context = context.newChildContext();
        context.registerValue(new Variable(this.name, TextType.instance));
        context.setValue(this.name, result);
        this.andThen.interpret(context);
        return null;
    }

    toDialect(writer) {
        super.toDialect(writer);
        writer.append(" then with ").append(this.name.name);
        if (writer.dialect === Dialect.O)
            writer.append(" {");
        else
            writer.append(":");
        writer = writer.newChildWriter();
        writer.context.registerValue(new Variable(this.name, TextType.instance));
        writer.newLine().indent();
        this.andThen.toDialect(writer);
        writer.dedent();
        if (writer.dialect === Dialect.O)
            writer.append("}").newLine();
    }

    declare(transpiler) {
        super.declare(transpiler);
        transpiler = transpiler.newChildTranspiler(transpiler.context);
        transpiler.context.registerValue(new Variable(this.name, TextType.instance));
        this.andThen.declare(transpiler);
    }

    transpile(transpiler) {
        this.resource.transpile(transpiler);
        transpiler.append(".readFullyAsync(function(").append(this.name.name).append(") {").indent();
        transpiler = transpiler.newChildTranspiler(transpiler.context);
        transpiler.context.registerValue(new Variable(this.name, TextType.instance));
        this.andThen.transpile(transpiler);
        transpiler.dedent().append("}.bind(this))")
        transpiler.flush();
        return false;
    }

    locateSectionAtLine(line) {
        return this;
    }
}

