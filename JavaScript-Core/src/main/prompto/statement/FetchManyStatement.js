import FetchManyExpression from '../expression/FetchManyExpression.js'
import { Variable } from '../runtime/index.js'
import { CursorType } from '../type/index.js'

export default class FetchManyStatement extends FetchManyExpression {

    constructor(typ, predicate, first, last, orderBy, thenWith) {
        super(typ, predicate, first, last, orderBy);
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
        return this.thenWith.check(context, new CursorType(this.typ));
    }

    interpret(context) {
        const record = super.interpret(context);
        return this.thenWith.interpret(context, record);
    }

    toDialect(writer) {
        super.toDialect(writer);
        this.thenWith.toDialect(writer, new CursorType(this.typ));
    }

    declare(transpiler) {
        super.declare(transpiler);
        this.thenWith.declare(transpiler, new CursorType(this.typ));
    }

    transpile(transpiler) {
        transpiler.append("(function() {").indent();
        this.transpileQuery(transpiler);
        const mutable = this.typ ? this.typ.mutable : false;
        transpiler.append("$DataStore.instance.fetchManyAsync(builder.build(), ")
            .append(mutable)
            .append(", function(")
            .append(this.thenWith.name.name)
            .append(") {")
            .indent();
        transpiler = transpiler.newChildTranspiler(transpiler.context);
        transpiler.context.registerValue(new Variable(this.thenWith.name, new CursorType(this.typ)));
        this.thenWith.statements.transpile(transpiler);
        transpiler.dedent().append("}.bind(this));").dedent().append("}).bind(this)()");
        transpiler.flush();
        return false;
    }

    locateSectionAtLine(line) {
        return this;
    }
}

