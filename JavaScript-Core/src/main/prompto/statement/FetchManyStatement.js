const FetchManyExpression = require("../expression/FetchManyExpression").FetchManyExpression;
const CursorType = require("../type/CursorType").CursorType;
const Variable = require("../runtime/Variable").Variable;
const VoidType = require("../type/VoidType").VoidType;
const Dialect = require("../parser/Dialect").Dialect;

class FetchManyStatement extends FetchManyExpression {
    constructor(typ, predicate, first, last, orderBy, name, andThen) {
        super(typ, predicate, first, last, orderBy);
        this.name = name;
        this.andThen = andThen;
        return this;
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


exports.FetchManyStatement = FetchManyStatement;