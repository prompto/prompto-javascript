import FetchOneExpression from '../expression/FetchOneExpression.ts'
import { Variable } from '../runtime'
import {StatementList} from "../statement";

export default class FetchOneStatement extends FetchOneExpression {

    constructor(type, predicate, include, thenWith) {
        super(type, predicate, include);
        this.thenWith = thenWith;
    }

    locateSectionAtLine(line) {
        if(line === this.start.line)
            return this;
        else if(this.statements instanceof StatementList)
            return this.statements.locateSectionAtLine(line);
        else
            return null;
    }

    canReturn() {
        return false;
    }

    isSimple() {
        return false;
    }

    check(context: Context): Type {
        super.check(context);
        return this.thenWith.check(context, this.type);
    }

    interpret(context: Context): Value {
        const record = super.interpret(context);
        return this.thenWith.interpret(context, record);
    }

    toDialect(writer: CodeWriter): void {
        super.toDialect(writer);
        this.thenWith.toDialect(writer, this.type);
    }

    declare(transpiler: Transpiler): void {
        super.declare(transpiler);
        return this.thenWith.declare(transpiler, this.type);
    }

    transpile(transpiler: Transpiler): void {
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

}
