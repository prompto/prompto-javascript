import UnresolvedCall from './UnresolvedCall.js'
import { Dialect } from '../parser/index.js'
import { Variable } from '../runtime/index.js'
import { VoidType } from '../type/index.js'
import RemoteRunner from "../intrinsic/RemoteRunner.js"

export default class RemoteCall extends UnresolvedCall {

    constructor(caller, assignments, resultName, andThen) {
        super(caller, assignments);
        this.resultName = resultName;
        this.andThen = andThen;
    }

    isSimple() {
        return false;
    }

    toDialect(writer) {
        const resultType = this.resolveAndCheck(writer.context);
        super.toDialect(writer);
        writer.append(" then");
        writer = writer.newChildWriter();
        if(this.resultName!=null) {
            writer.append(" with ").append(this.resultName.name);
            writer.context.registerValue(new Variable(this.resultName, resultType));
        }
        if (writer.dialect == Dialect.O)
            writer.append(" {");
        else
            writer.append(":");
        writer = writer.newLine().indent();
        this.andThen.toDialect(writer);
        writer = writer.dedent();
        if (writer.dialect == Dialect.O)
            writer.append("}").newLine();
    }

    check(context) {
        const resultType = this.resolveAndCheck(context);
        context = context.newChildContext();
        if (this.resultName != null)
            context.registerValue(new Variable(this.resultName, resultType));
        this.andThen.check(context, VoidType.instance);
        return VoidType.instance;
    }

    interpret(context) {
        const resultType = this.resolveAndCheck(context);
        const resultValue = super.interpret(context);
        context = context.newChildContext();
        if (this.resultName != null) {
            context.registerValue(new Variable(this.resultName, resultType));
            context.setValue(this.resultName, resultValue);
        }
        this.andThen.interpret(context)
        return null;
    }

    declare(transpiler) {
        const resultType = this.resolveAndCheck(transpiler.context);
        this.resolved.declare(transpiler);
        transpiler.require(RemoteRunner);
        transpiler = transpiler.newChildTranspiler();
        if (this.resultName != null)
            transpiler.context.registerValue(new Variable(this.resultName, resultType));
        this.andThen.declare(transpiler);
    }

    transpile(transpiler) {
        const resultType = this.resolveAndCheck(transpiler.context);
        transpiler = transpiler.append("RemoteRunner.run(function() {").indent().append("return ");
        this.resolved.transpile(transpiler);
        transpiler.dedent().append("}, function(");
        if (this.resultName != null)
            transpiler.append(this.resultName.name);
        transpiler.append(") {").indent();
        transpiler = transpiler.newChildTranspiler();
        if (this.resultName != null)
            transpiler.context.registerValue(new Variable(this.resultName, resultType));
        this.andThen.transpile(transpiler);
        transpiler.dedent().append("})");
        transpiler.flush();
    }
}

