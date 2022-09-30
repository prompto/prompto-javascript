import SimpleStatement from './SimpleStatement'
import {VoidType, ResourceType, IType} from '../type'
import {Context, Transpiler, Variable} from '../runtime'
import { SyntaxError } from '../error'
import {Identifier} from "../grammar";
import {IExpression} from "../expression";
import {CodeWriter, equalObjects} from "../utils";
import {IValue} from "../value";

export default class AssignVariableStatement extends SimpleStatement {

    id: Identifier;
    expression: IExpression;

    constructor(id: Identifier, expression: IExpression) {
        super();
        this.id = id;
        this.expression = expression;
    }

    get name() {
        return this.id.name;
    }

    toDialect(writer: CodeWriter): void {
        writer.append(this.name);
        writer.append(" = ");
        this.expression.toDialect(writer);
    }

    checkResource(context: Context) {
        const type = this.expression.check(context);
        if(!(type instanceof ResourceType)) {
            throw new SyntaxError("Not a resource!");
        }
        const actual = context.getRegisteredInstance(this.id);
        if(actual==null) {
            context.registerInstance(new Variable(this.id, type), false);
        } else {
            // need to check type compatibility
            const actualType = actual.getType(context);
            actualType.checkAssignableFrom(context, this, type);
        }
        return VoidType.instance;
    }

    equals(obj: any) {
        return obj == this || (obj instanceof AssignVariableStatement && this.name === obj.name && equalObjects(this.expression, obj.expression));
    }

    check(context: Context): IType {
        const actual = context.getRegisteredInstance(this.id);
        if(actual==null) {
            const actualType = this.expression.check(context);
            context.registerInstance(new Variable(this.id, actualType), true);
        } else {
            // need to check type compatibility
            const actualType = actual.getType(context);
            const newType = this.expression.check(context);
            actualType.checkAssignableFrom(context, this, newType);
        }
        return VoidType.instance;
    }

    interpret(context: Context): IValue | null {
        if(context.getRegisteredInstance(this.id)==null) {
            const actualType = this.expression.check(context);
            context.registerInstance(new Variable(this.id, actualType), true);
        }
        context.setValue(this.id, this.expression.interpret(context));
        return null;
    }

    declare(transpiler: Transpiler): void {
        const actual = transpiler.context.getRegisteredInstance(this.id);
        if(actual==null) {
            const actualType = this.expression.check(transpiler.context);
            transpiler.context.registerInstance(new Variable(this.id, actualType), true);
        }
        this.expression.declare(transpiler);
    }

    transpile(transpiler: Transpiler): void {
        const actual = transpiler.context.getRegisteredInstance(this.id);
        if(actual==null) {
            const actualType = this.expression.check(transpiler.context);
            transpiler.context.registerInstance(new Variable(this.id, actualType), true);
            transpiler.append("var ");
        }
        transpiler.append(this.name).append(" = ");
        this.expression.transpile(transpiler);
    }

    transpileClose(transpiler: Transpiler) {
        transpiler.append(this.name).append(".close();").newLine();
    }
}

