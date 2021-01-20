import {Variable} from "../runtime";
import {VoidType} from "../type";
import {Dialect} from "../parser";

export default class ThenWith {

    static OrEmpty(tw) {
        return tw ? tw : new ThenWith(null, null);
    }

    constructor(name, statements) {
        this.name = name;
        this.statements = statements;
    }

    check(context, typ) {
        context = context.newChildContext();
        context.registerValue(new Variable(this.name, typ));
        this.statements.check(context, null);
        return VoidType.instance;
    }

    interpret(context, value) {
        context = context.newChildContext();
        context.registerValue(new Variable(this.name, value.type));
        context.setValue(this.name, value);
        this.statements.interpret(context);
        return null;
    }

    toDialect(writer, typ) {
        writer.append(" then with ").append(this.name.name);
        if (writer.dialect === Dialect.O)
            writer.append(" {");
        else
            writer.append(":");
        writer = writer.newChildWriter();
        writer.context.registerValue(new Variable(this.name, typ));
        writer.newLine().indent();
        this.statements.toDialect(writer);
        writer.dedent();
        if (writer.dialect === Dialect.O)
            writer.append("}").newLine();
    }

    declare(transpiler, typ) {
        transpiler = transpiler.newChildTranspiler(transpiler.context);
        transpiler.context.registerValue(new Variable(this.name, typ));
        this.statements.declare(transpiler);
    }

    transpile(transpiler, typ) {
        transpiler.append("function(")
            .append(this.name.name)
            .append(") {")
            .indent();
        transpiler = transpiler.newChildTranspiler(transpiler.context);
        transpiler.context.registerValue(new Variable(this.name, typ));
        this.statements.transpile(transpiler);
        transpiler.dedent()
            .append("}.bind(this)");
        transpiler.flush();

    }

}