import Parameter from './Parameter.js'
import { MethodType } from '../type/index.js'
import { equalObjects } from '../utils/index.js'
import { SyntaxError } from '../error/index.js'

export default class CategoryParameter extends Parameter {
    
    constructor(type, id, defaultExpression) {
        super(id);
        this.type = type;
        this.resolved  = null;
        this.defaultExpression = defaultExpression || null;
    }

    setMutable(mutable) {
        this.type.mutable = mutable;
        this.mutable = mutable;
    }

    getProto() {
        return this.type.name;
    }

    getSignature(dialect) {
        return this.type.name + " " + this.id.name;
    }

    getTranspiledName(context) {
        return this.type.getTranspiledName(context);
    }

    equals(other) {
        return other === this || (other instanceof CategoryParameter && equalObjects(this.type, other.type));
    }

    checkValue(context, expression) {
        this.resolve(context);
        if(this.resolved instanceof MethodType)
            return expression.interpretReference(context);
        else
            return super.checkValue(context, expression);
    }

    transpileCall(transpiler, expression) {
        this.resolve(transpiler.context);
        if(this.resolved instanceof MethodType)
            expression.transpileReference(transpiler, this.resolved);
        else
            super.transpileCall(transpiler, expression);
    }

    register(context) {
        const actual = context.contextForValue(this.name);
        if(actual===context) {
            throw new SyntaxError("Duplicate argument: \"" + this.name + "\"");
        }
        this.resolve(context);
        if(this.resolved === this.type)
            context.registerValue(this);
        else {
            const param = new CategoryParameter(this.resolved, this.id);
            param.setMutable(this.mutable);
            context.registerValue(param);
        }
        if(this.defaultExpression!=null)
            context.setValue(this.id, this.defaultExpression.interpret(context));
    }

    check(context) {
        this.resolve(context);
        if(this.resolved)
            this.resolved.checkExists(context);
        else
            context.problemListener.reportUnknownCategory(this.type.id, this.type.name);
    }

    resolve(context) {
        if(this.resolved==null) {
            this.resolved = this.type.resolve(context, null);
        }
    }

    declare(transpiler) {
        this.resolve(transpiler.context);
        if(this.resolved instanceof MethodType)
            this.resolved.declare(transpiler);
        else
            this.type.declare(transpiler);
    }

    getType(context) {
        return this.type;
    }

    toEDialect(writer) {
        const anonymous = "any" === this.type.name;
        this.type.toDialect(writer, true);
        if(anonymous) {
            writer.append(' ');
            writer.append(this.name);
        }
        if(!anonymous) {
            writer.append(' ');
            writer.append(this.name);
        }
    }

    toODialect(writer) {
        this.type.toDialect(writer, true);
        writer.append(' ');
        writer.append(this.name);
    }

    toMDialect(writer) {
        writer.append(this.name);
        writer.append(':');
        this.type.toDialect(writer, true);
    }
}

