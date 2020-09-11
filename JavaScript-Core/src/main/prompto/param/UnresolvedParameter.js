import { VoidType } from "../type/index"
import { ProblemCollector } from "../problem/index"
import { AttributeParameter, MethodParameter } from "./index"
import { MethodDeclarationMap } from "../runtime/index"
import { AttributeDeclaration } from "../declaration/index"

export default class UnresolvedParameter {
  
    constructor(id) {
        this.id = id;
        this.resolved = null;
    }

    get name() {
        return this.id.name;
    }

    setMutable(mutable) {
        this.mutable = mutable;
    }

    getTranspiledName(context) {
        this.resolveAndCheck(context);
        return this.resolved.getTranspiledName(context);
    }

    toDialect(writer) {
        writer.append(this.name);
        if(this.defaultExpression!=null) {
            writer.append(" = ");
            this.defaultExpression.toDialect(writer);
        }
    }

    check(context) {
        this.resolveAndCheck(context);
    }

    getProto() {
        return this.name;
    }

    getType(context) {
        this.resolveAndCheck(context);
        return this.resolved.getType(context);
    }

    register(context) {
        this.resolveAndCheck(context);
        if(this.resolved!=null)
            this.resolved.register(context);
        if(this.defaultExpression!=null)
            context.setValue(this.id, this.defaultExpression.interpret(context));
    }

    checkValue(context, value) {
        this.resolveAndCheck(context);
        if(this.resolved!=null)
            return this.resolved.checkValue(context, value);
        else
            return VoidType.instance;
    }

    resolveAndCheck(context) {
        if(this.resolved!=null)
            return;
        // ignore problems during resolution
        const listener = context.problemListener;
        try {
            context.problemListener = new ProblemCollector();
            // try out various solutions
            const named = context.getRegisteredDeclaration(this.name);
            if (named instanceof AttributeDeclaration) {
                this.resolved = new AttributeParameter(this.id);
            } else if (named instanceof MethodDeclarationMap) {
                this.resolved = new MethodParameter(this.id);
            }
        } finally {
            // restore listener
            context.problemListener = listener;
        }
        if(this.resolved==null)
            context.problemListener.reportUnknownVariable(this.id);
        else
            this.resolved.setMutable(this.mutable);
    }

    declare(transpiler) {
        this.resolveAndCheck(transpiler.context);
        this.resolved.declare(transpiler);
    }

    transpile(transpiler) {
        this.resolveAndCheck(transpiler.context);
        this.resolved.transpile(transpiler);
    }

    transpileCall(transpiler, expression) {
        this.resolveAndCheck(transpiler.context);
        this.resolved.transpileCall(transpiler, expression);
    }

    equals(other) {
        return other === this || (other instanceof UnresolvedParameter && this.name === other.name);
    }
}



