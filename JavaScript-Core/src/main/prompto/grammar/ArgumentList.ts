import ObjectList from '../utils/ObjectList'
import {Argument, Identifier} from './index'
import { AndExpression, UnresolvedIdentifier } from '../expression'
import { ContextualExpression } from '../value'
import { AttributeParameter } from '../param'
import { SyntaxError } from '../error'
import {Context, Transpiler} from "../runtime";
import {IMethodDeclaration} from "../declaration";
import {CodeWriter} from "../utils";

export default class ArgumentList extends ObjectList<Argument> {

    constructor(items?: Argument[], item?: Argument) {
        super(items, item);
    }

    /* post-fix expression priority for final argument in E dialect */
    /* 'xyz with a and b as c' should read 'xyz with a, b as c' NOT 'xyz with (a and b) as c' */
    checkLastAnd(): void {
        const argument = this.slice(-1).pop();
        if(argument!=null && argument.parameter!=null && argument.expression instanceof AndExpression) {
            const and = argument.expression;
            if(and.left instanceof UnresolvedIdentifier) {
                const id = and.left.id;
                const leading = id.name.charAt(0);
                if(leading !== leading.toUpperCase()) {
                    this.pop();
                    // add AttributeParameter
                    const parameter = new AttributeParameter(id);
                    const attribute = new Argument(parameter, null);
                    this.add(attribute);
                    // fix last argument
                    argument.expression = and.right;
                    this.add(argument);
                }
            }
        }
    }

    findIndexById(id: Identifier): number {
        return this.findIndexByName(id.name);
    }

    findIndexByName(name: string): number {
        for(let i=0;i<this.length;i++) {
            if(name == this[i].name) {
                return i;
            }
        }
        return -1;
    }

    findById(id: Identifier): Argument | null {
        return this.findByName(id.name);
    }

    findByName(name: string): Argument | null {
        for(let i=0;i<this.length;i++) {
            if(name==this[i].name) {
                return this[i];
            }
        }
        return null;
    }

    makeArguments(context: Context, declaration: IMethodDeclaration): ArgumentList {
        const local = new ArgumentList(this);
        const args = new ArgumentList();
        for(let i=0; i<declaration.parameters!.length; i++) {
            const parameter = declaration.parameters![i];
            let argument = null;
            let index = local.findIndexByName(parameter.name);
            if(index<0 && i==0 && this.length>0 && this[0].parameter==null)
                index = 0;
            if(index>=0) {
                argument = local[index];
                local.splice(index, 1);
            }
            if(argument==null) {
                if (parameter.defaultExpression)
                    args.push(new Argument(parameter, parameter.defaultExpression));
                else
                    throw new SyntaxError("Missing argument:" + parameter.name);
            } else {
                const expression = new ContextualExpression(context, argument.expression);
                args.push(new Argument(parameter, expression));
            }
        }
        if(local.length > 0)
            throw new SyntaxError("Method has no argument:" + local[0].name!);
        return args;
    }

    toDialect(writer: CodeWriter): void {
        writer.toDialect(this);
    }

    toEDialect(writer: CodeWriter): void {
        let idx = 0;
        // anonymous argument before 'with'
        if(this.length>0 && this[0].parameter==null) {
            writer.append(' ');
            this[idx++].toDialect(writer);
        }
        if(idx<this.length) {
            writer.append(" with ");
            this[idx++].toDialect(writer);
            writer.append(", ");
            while(idx<this.length-1) {
                this[idx++].toDialect(writer);
                writer.append(", ");
            }
            writer.trimLast(2);
            if(idx<this.length) {
                writer.append(" and ");
                this[idx++].toDialect(writer);
            }
        }
    }

    toODialect(writer: CodeWriter): void {
        writer.append("(");
        this.forEach(arg => {
            arg.toDialect(writer);
            writer.append(", ");
        });
        if(this.length>0)
            writer.trimLast(2);
        writer.append(")");
    }

    toMDialect(writer: CodeWriter): void {
        this.toODialect(writer);
    }

    declare(transpiler: Transpiler, methodDeclaration: IMethodDeclaration | null): void {
        this.forEach(arg => {
            arg.declare(transpiler, methodDeclaration);
        });
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append("(");
        this.forEach(arg => {
            arg.transpile(transpiler);
            transpiler.append(", ");
        });
        if(this.length>0)
            transpiler.trimLast(2);
        transpiler.append(")");
    }
}
