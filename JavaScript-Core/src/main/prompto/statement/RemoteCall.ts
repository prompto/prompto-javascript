import UnresolvedCall from './UnresolvedCall'
import {Dialect} from '../parser'
import {Context, Transpiler, Variable} from '../runtime'
import {IType, VoidType} from '../type'
import {IExpression} from "../expression";
import {ArgumentList, ThenWith} from "../grammar";
import {CodeWriter} from "../utils";
import {IValue} from "../value";
import RemoteRunner from "../intrinsic/RemoteRunner"

export default class RemoteCall extends UnresolvedCall {

    thenWith?: ThenWith;

    constructor(caller: IExpression, assignments: ArgumentList, thenWith?: ThenWith) {
        super(caller, assignments);
        this.thenWith = thenWith;
    }

    locateSectionAtLine(line: number) {
        if(this.thenWith)
            return this.thenWith.statements.locateSectionAtLine(line);
        else
            return null;
    }

    isSimple() {
        return false;
    }

    toDialect(writer: CodeWriter): void {
        const resultType = this.resolveAndCheck(writer.context);
        super.toDialect(writer);
        writer.append(" then");
        writer = writer.newChildWriter();
        if(this.thenWith && this.thenWith.id) {
            writer.append(" with ").append(this.thenWith.id.name);
            writer.context.registerInstance(new Variable(this.thenWith.id, resultType), true);
        }
        if (writer.dialect == Dialect.O)
            writer.append(" {");
        else
            writer.append(":");
        writer = writer.newLine().indent();
        this.thenWith?.statements!.toDialect(writer);
        writer = writer.dedent();
        if (writer.dialect == Dialect.O)
            writer.append("}").newLine();
    }

    check(context: Context): IType {
        const resultType = this.resolveAndCheck(context);
        context = context.newChildContext();
        if (this.thenWith && this.thenWith.id)
            context.registerInstance(new Variable(this.thenWith.id, resultType), true);
        this.thenWith?.statements!.check(context, VoidType.instance);
        return VoidType.instance;
    }

    interpret(context: Context): IValue | null {
        const resultType = this.resolveAndCheck(context);
        const resultValue = super.interpret(context);
        context = context.newChildContext();
        if (this.thenWith && this.thenWith.id) {
            context.registerInstance(new Variable(this.thenWith.id, resultType), true);
            context.setValue(this.thenWith.id, resultValue!);
        }
        this.thenWith?.statements!.interpret(context)
        return null;
    }

    declare(transpiler: Transpiler): void {
        const resultType = this.resolveAndCheck(transpiler.context);
        this.resolved!.declare(transpiler);
        transpiler.require(RemoteRunner);
        transpiler = transpiler.newChildTranspiler();
        if (this.thenWith && this.thenWith.id)
            transpiler.context.registerInstance(new Variable(this.thenWith.id, resultType), true);
        this.thenWith?.statements!.declare(transpiler);
    }

    transpile(transpiler: Transpiler): void {
        const resultType = this.resolveAndCheck(transpiler.context);
        transpiler = transpiler.append("RemoteRunner.run(function() {").indent().append("return ");
        this.resolved!.transpile(transpiler);
        transpiler.dedent().append("}, function(");
        if (this.thenWith && this.thenWith.id)
            transpiler.append(this.thenWith.id.name);
        transpiler.append(") {").indent();
        transpiler = transpiler.newChildTranspiler();
        if (this.thenWith && this.thenWith.id)
            transpiler.context.registerInstance(new Variable(this.thenWith.id, resultType), true);
        this.thenWith?.statements!.transpile(transpiler);
        transpiler.dedent().append("})");
        transpiler.flush();
    }
}

