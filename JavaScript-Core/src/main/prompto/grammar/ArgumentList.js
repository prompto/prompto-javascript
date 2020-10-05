import ObjectList from '../utils/ObjectList.js'
import { Argument } from './index.js'
import { AndExpression, UnresolvedIdentifier } from '../expression/index.js'
import { ContextualExpression } from '../value/index.js'
import { AttributeParameter } from '../param/index.js'
import { SyntaxError } from '../error/index.js'

export default class ArgumentList extends ObjectList {

    constructor(items) {
        super(items || []);
    }

    /* post-fix expression priority for final argument in E dialect */
    /* 'xyz with a and b as c' should read 'xyz with a, b as c' NOT 'xyz with (a and b) as c' */
    checkLastAnd() {
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

    findIndex(name) {
        for(let i=0;i<this.length;i++) {
            if(name==this[i].name) {
                return i;
            }
        }
        return -1;
    }

    find(name) {
        for(let i=0;i<this.length;i++) {
            if(name==this[i].name) {
                return this[i];
            }
        }
        return null;
    }

    makeArguments(context, declaration) {
        const local = new ArgumentList(this);
        const args = new ArgumentList();
        for(let i=0; i<declaration.parameters.length; i++) {
            const parameter = declaration.parameters[i];
            let argument = null;
            let index = local.findIndex(parameter.name);
            if(index<0 && i==0 && this.length>0 && this[0].parameter==null)
                index = 0;
            if(index>=0) {
                argument = local[index];
                local.splice(index, 1);
            }
            if(argument==null) {
                if (parameter.defaultExpression != null)
                    args.push(new Argument(parameter, parameter.defaultExpression));
                else
                    throw new SyntaxError("Missing argument:" + parameter.name);
            } else {
                const expression = new ContextualExpression(context, argument.expression);
                args.push(new Argument(parameter, expression));
            }
        }
        if(local.length > 0)
            throw new SyntaxError("Method has no argument:" + local[0].name);
        return args;
    }

    toDialect(writer) {
        writer.toDialect(this);
    }

    toEDialect(writer) {
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

    toODialect(writer) {
        writer.append("(");
        this.forEach(arg => {
            arg.toDialect(writer);
            writer.append(", ");
        });
        if(this.length>0)
            writer.trimLast(2);
        writer.append(")");
    }

    toMDialect(writer) {
        this.toODialect(writer);
    }

    declare(transpiler, methodDeclaration) {
        this.forEach(arg => {
            arg.declare(transpiler, methodDeclaration);
        });
    }

    transpile(transpiler) {
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
