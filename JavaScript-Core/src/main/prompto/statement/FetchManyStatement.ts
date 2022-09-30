import FetchManyExpression from '../expression/FetchManyExpression.ts'
import { Variable } from '../runtime'
import { CursorType } from '../type'
import {StatementList} from "../statement";

export default class FetchManyStatement extends FetchManyExpression {

    constructor(type, predicate, first, last, include, orderBy, thenWith) {
        super(type, predicate, first, last, include, orderBy);
        this.thenWith = thenWith;
    }

    locateSectionAtLine(line) {
        if(line == this.start.line)
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

    check(context: Context): IType {
        super.check(context);
        return this.thenWith.check(context, new CursorType(this.type));
    }

    interpret(context: Context): IValue {
        const record = super.interpret(context);
        return this.thenWith.interpret(context, record);
    }

    toDialect(writer: CodeWriter): void {
        super.toDialect(writer);
        this.thenWith.toDialect(writer, new CursorType(this.type));
    }

    declare(transpiler: Transpiler): void {
        super.declare(transpiler);
        this.thenWith.declare(transpiler, new CursorType(this.type));
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append("(function() {").indent();
        this.transpileQuery(transpiler);
        const mutable = this.type ? this.type.mutable : false;
        transpiler.append("$DataStore.instance.fetchManyAsync(builder.build(), ")
            .append(mutable)
            .append(", function(")
            .append(this.thenWith.name.name)
            .append(") {")
            .indent();
        transpiler = transpiler.newChildTranspiler(transpiler.context);
        transpiler.context.registerValue(new Variable(this.thenWith.name, new CursorType(this.type)));
        this.thenWith.statements.transpile(transpiler);
        transpiler.dedent().append("}.bind(this));").dedent().append("}).bind(this)()");
        transpiler.flush();
        return false;
    }

}

