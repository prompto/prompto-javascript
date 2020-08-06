const FetchOneExpression = require("../expression/FetchOneExpression").FetchOneExpression;
const Variable = require("../runtime/Variable").Variable;
const VoidType = require("../type/VoidType").VoidType;
const Dialect = require("../parser/Dialect").Dialect;

class FetchOneStatement extends FetchOneExpression {
    constructor(typ, predicate, name, andThen) {
        super(typ, predicate);
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
        context.registerValue(new Variable(this.name, this.typ));
        this.andThen.check(context, null);
        return VoidType.instance;
    }

    interpret(context) {
        const record = FetchOneExpression.prototype.interpret.call(this, context);
        context = context.newChildContext();
        context.registerValue(new Variable(this.name, this.typ));
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
        writer.context.registerValue(new Variable(this.name, this.typ));
        writer.newLine().indent();
        this.andThen.toDialect(writer);
        writer.dedent();
        if (writer.dialect === Dialect.O)
            writer.append("}").newLine();
    }

    declare(transpiler) {
        super.declare(transpiler);
        transpiler = transpiler.newChildTranspiler(transpiler.context);
        transpiler.context.registerValue(new Variable(this.name, this.typ));
        this.andThen.declare(transpiler);
    }

    transpile(transpiler) {
        transpiler.append("(function() {").indent();
        this.transpileQuery(transpiler);
        transpiler.append("$DataStore.instance.fetchOneAsync(builder.build(), function(stored) {").indent();
        this.transpileConvert(transpiler, this.name.name);
        transpiler = transpiler.newChildTranspiler(transpiler.context);
        transpiler.context.registerValue(new Variable(this.name, this.typ));
        this.andThen.transpile(transpiler);
        transpiler.dedent().append("}.bind(this));").dedent().append("}).bind(this)()");
        transpiler.flush();
        return false;
    }

    locateSectionAtLine(line) {
        return this;
    }
}

exports.FetchOneStatement = FetchOneStatement;