import {Context, Transpiler, Variable} from "../runtime";
import {IType, VoidType} from "../type";
import {Dialect} from "../parser";
import {StatementList} from "../statement";
import {Identifier} from "./index";
import {IValue} from "../value";
import {CodeWriter} from "../utils";

export default class ThenWith {

    static OrEmpty(tw: ThenWith | null) {
        return tw ? tw : new ThenWith(new Identifier(""), new StatementList());
    }

    id: Identifier;
    statements: StatementList;

    constructor(id: Identifier, statements: StatementList) {
        this.id = id;
        this.statements = statements;
    }

    check(context: Context, type: IType) {
        context = context.newChildContext();
        context.registerInstance(new Variable(this.id, type), true);
        this.statements.check(context, null);
        return VoidType.instance;
    }

    interpret(context: Context, value: IValue) {
        context = context.newChildContext();
        context.registerInstance(new Variable(this.id, value.type), true);
        context.setValue(this.id, value);
        this.statements.interpret(context);
    }

    toDialect(writer: CodeWriter, type: IType) {
        writer.append(" then with ").append(this.id.name);
        if (writer.dialect == Dialect.O)
            writer.append(" {");
        else
            writer.append(":");
        writer = writer.newChildWriter();
        writer.context.registerInstance(new Variable(this.id, type), true);
        writer.newLine().indent();
        this.statements.toDialect(writer);
        writer.dedent();
        if (writer.dialect == Dialect.O)
            writer.append("}").newLine();
    }

    declare(transpiler: Transpiler, type: IType) {
        transpiler = transpiler.newChildTranspiler(transpiler.context);
        transpiler.context.registerInstance(new Variable(this.id, type), true);
        this.statements.declare(transpiler);
    }

    transpile(transpiler: Transpiler, type: IType) {
        transpiler.append("function(")
            .append(this.id.name)
            .append(") {")
            .indent();
        transpiler = transpiler.newChildTranspiler(transpiler.context);
        transpiler.context.registerInstance(new Variable(this.id, type), true);
        this.statements.transpile(transpiler);
        transpiler.dedent()
            .append("}.bind(this)");
        transpiler.flush();

    }

}
