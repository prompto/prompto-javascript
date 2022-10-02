import FetchOneExpression from '../expression/FetchOneExpression'
import {Context, Transpiler, Variable} from '../runtime'
import {IType} from "../type";
import {IExpression} from "../expression";
import {IdentifierList, ThenWith} from "../grammar";
import {Section} from "../parser";
import {IValue} from "../value";
import {CodeWriter} from "../utils";

export default class FetchOneStatement extends FetchOneExpression {

    thenWith: ThenWith;

    constructor(type: IType, predicate: IExpression, include: IdentifierList | null, thenWith: ThenWith) {
        super(type, predicate, include);
        this.thenWith = thenWith;
    }

    locateSectionAtLine(line: number): Section | null {
        if(line == this.startLocation.line)
            return this;
        else if(this.thenWith?.statements)
            return this.thenWith?.statements.locateSectionAtLine(line);
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
        return this.thenWith.check(context, this.type!);
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    interpretExpression(context: Context): IValue | null {
        const record = super.interpretExpression(context);
        this.thenWith.interpret(context, record);
        return null;
    }

    toDialect(writer: CodeWriter): void {
        super.toDialect(writer);
        this.thenWith.toDialect(writer, this.type!);
    }

    declare(transpiler: Transpiler): void {
        super.declare(transpiler);
        return this.thenWith.declare(transpiler, this.type!);
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append("(function() {").indent();
        this.transpileQuery(transpiler);
        transpiler.append("$DataStore.instance.fetchOneAsync(builder.build(), function(stored) {").indent();
        this.transpileConvert(transpiler, this.thenWith.id.name);
        transpiler = transpiler.newChildTranspiler(transpiler.context);
        transpiler.context.registerInstance(new Variable(this.thenWith.id, this.type!), true);
        this.thenWith.statements.transpile(transpiler);
        transpiler.dedent().append("}.bind(this));").dedent().append("}).bind(this)()");
        transpiler.flush();
    }

}
