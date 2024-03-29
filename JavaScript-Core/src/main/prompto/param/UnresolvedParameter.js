import { VoidType } from '../type/index.js'
import { ProblemCollector } from '../problem/index.js'
import { AttributeParameter, MethodParameter } from './index.js'
import { MethodDeclarationMap } from '../runtime/index.js'
import { AttributeDeclaration } from '../declaration/index.js'

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
        return this.resolveAndCheck(context);
    }

    getProto() {
        return this.name;
    }

    getSignature(dialect) {
        return this.id.name;
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
        this.resolve(context);
        return this.resolved ? this.resolved.check(context) : null;
    }

    resolve(context) {
        if (this.resolved)
            return;
        // ignore problems during resolution
        const listener = context.problemListener;
        try {
            context.problemListener = new ProblemCollector();
            // try out various solutions
            const named = context.getRegisteredDeclaration(this.id);
            if (named instanceof AttributeDeclaration) {
                this.resolved = new AttributeParameter(this.id);
            } else if (named instanceof MethodDeclarationMap) {
                this.resolved = new MethodParameter(this.id);
            }
        } finally {
            // restore listener
            context.problemListener = listener;
        }
        if(!this.resolved)
            context.problemListener.reportUnknownAttribute(this.id, this.name);
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



