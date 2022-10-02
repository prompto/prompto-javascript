import FetchManyExpression from '../expression/FetchManyExpression'
import {Context, Transpiler, Variable} from '../runtime'
import {AnyType, CursorType, IType} from '../type'
import {IExpression} from "../expression";
import {IdentifierList, OrderByClauseList, ThenWith} from "../grammar";
import {Section} from "../parser";
import {IValue, NullValue} from "../value";
import {CodeWriter} from "../utils";

export default class FetchManyStatement extends FetchManyExpression {

    thenWith: ThenWith;

    constructor(type: IType | null, first: IExpression | null, last: IExpression | null,
                predicate: IExpression | null, include: IdentifierList | null, orderBy: OrderByClauseList | null,
                thenWith: ThenWith) {
        super(type, predicate, first, last, include, orderBy);
        this.thenWith = thenWith;
    }

    locateSectionAtLine(line: number): Section | null {
        if(line == this.startLocation.line)
            return this;
        else
            return this.thenWith.statements.locateSectionAtLine(line);
    }

    canReturn() {
        return false;
    }

    isSimple() {
        return false;
    }

    check(context: Context): IType {
        super.check(context);
        return this.thenWith.check(context, new CursorType(this.type || AnyType.instance));
    }

    interpret(context: Context): IValue {
        const record = super.interpret(context);
        this.thenWith.interpret(context, record);
        return NullValue.instance;
    }

    toDialect(writer: CodeWriter): void {
        super.toDialect(writer);
        this.thenWith.toDialect(writer, new CursorType(this.type || AnyType.instance));
    }

    declare(transpiler: Transpiler): void {
        super.declare(transpiler);
        this.thenWith.declare(transpiler, new CursorType(this.type || AnyType.instance));
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append("(function() {").indent();
        this.transpileQuery(transpiler);
        const mutable = this.type ? this.type.mutable : false;
        transpiler.append("$DataStore.instance.fetchManyAsync(builder.build(), ")
            .appendBoolean(mutable)
            .append(", function(")
            .append(this.thenWith.id.name)
            .append(") {")
            .indent();
        transpiler = transpiler.newChildTranspiler(transpiler.context);
        transpiler.context.registerInstance(new Variable(this.thenWith.id, new CursorType(this.type || AnyType.instance)), true);
        this.thenWith.statements.transpile(transpiler);
        transpiler.dedent().append("}.bind(this));").dedent().append("}).bind(this)()");
        transpiler.flush();
    }

}

