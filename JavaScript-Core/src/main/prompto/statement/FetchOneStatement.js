import FetchOneExpression from '../expression/FetchOneExpression.js'
import { Variable } from '../runtime/index.js'

export default class FetchOneStatement extends FetchOneExpression {

    constructor(type, predicate, thenWith) {
        super(type, predicate);
        this.thenWith = thenWith;
    }

    canReturn() {
        return false;
    }

    isSimple() {
        return false;
    }

    check(context) {
        super.check(context);
        return this.thenWith.check(context, this.type);
    }

    interpret(context) {
        const record = super.interpret(context);
        return this.thenWith.interpret(context, record);
    }

    toDialect(writer) {
        super.toDialect(writer);
        this.thenWith.toDialect(writer, this.type);
    }

    declare(transpiler) {
        super.declare(transpiler);
        return this.thenWith.declare(transpiler, this.type);
    }

    transpile(transpiler) {
        transpiler.append("(function() {").indent();
        this.transpileQuery(transpiler);
        transpiler.append("$DataStore.instance.fetchOneAsync(builder.build(), function(stored) {").indent();
        this.transpileConvert(transpiler, this.thenWith.name.name);
        transpiler = transpiler.newChildTranspiler(transpiler.context);
        transpiler.context.registerValue(new Variable(this.thenWith.name, this.type));
        this.thenWith.statements.transpile(transpiler);
        transpiler.dedent().append("}.bind(this));").dedent().append("}).bind(this)()");
        transpiler.flush();
        return false;
    }

    locateSectionAtLine(line) {
        return this;
    }
}
