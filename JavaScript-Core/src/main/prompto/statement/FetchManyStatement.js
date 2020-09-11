import FetchManyExpression from "../expression/FetchManyExpression"
import { Variable } from "../runtime/index"
import { VoidType, CursorType } from "../type/index"
import { Dialect } from "../parser/index"

export default class FetchManyStatement extends FetchManyExpression {

    constructor(typ, predicate, first, last, orderBy, name, andThen) {
        super(typ, predicate, first, last, orderBy);
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
        context.registerValue(new Variable(this.name, new CursorType(this.typ)));
        this.andThen.check(context, null);
        return VoidType.instance;
    }

    interpret(context) {
        const record = FetchManyExpression.prototype.interpret.call(this, context);
        context = context.newChildContext();
        context.registerValue(new Variable(this.name, new CursorType(this.typ)));
        context.setValue(this.name, record);
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
        writer.context.registerValue(new Variable(this.name, new CursorType(this.typ)));
        writer.newLine().indent();
        this.andThen.toDialect(writer);
        writer.dedent();
        if (writer.dialect === Dialect.O)
            writer.append("}").newLine();
    }

    declare(transpiler) {
        super.declare(transpiler);
        transpiler = transpiler.newChildTranspiler(transpiler.context);
        transpiler.context.registerValue(new Variable(this.name, new CursorType(this.typ)));
        this.andThen.declare(transpiler);
    }

    transpile(transpiler) {
        transpiler.append("(function() {").indent();
        this.transpileQuery(transpiler);
        const mutable = this.typ ? this.typ.mutable : false;
        transpiler.append("$DataStore.instance.fetchManyAsync(builder.build(), ").append(mutable).append(", function(").append(this.name.name).append(") {").indent();
        transpiler = transpiler.newChildTranspiler(transpiler.context);
        transpiler.context.registerValue(new Variable(this.name, new CursorType(this.typ)));
        this.andThen.transpile(transpiler);
        transpiler.dedent().append("}.bind(this));").dedent().append("}).bind(this)()");
        transpiler.flush();
        return false;
    }

    locateSectionAtLine(line) {
        return this;
    }
}

