import Expression from './Expression.js';
import { UnresolvedIdentifier, InstanceExpression } from './index.js'
import { ArgumentList, Argument, Identifier } from '../grammar/index.js'
import { AttributeParameter } from '../param/index.js'
import { CategoryType, DocumentType } from '../type/index.js'
import { NotMutableError } from '../error/index.js'
import { ConcreteWidgetDeclaration, NativeWidgetDeclaration, NativeCategoryDeclaration } from '../declaration/index.js'
import { getTypeName } from '../utils/index.js'

export default class ConstructorExpression extends Expression {
  
    constructor(type, copyFrom, args) {
        super();
        this.type = type;
        this.copyFrom = copyFrom;
        this.args = args;
        this.checked = false;
    }

    checkFirstHomonym(context, decl) {
        if(this.checked)
            return;
        if(this.args && this.args.length>0) {
            const assign = this.args[0];
            if(!assign.parameter) {
                let id = null;
                if (assign.expression instanceof UnresolvedIdentifier || assign.expression instanceof InstanceExpression)
                    id = assign.expression.id;
                if (id && decl.hasAttribute(context, id.name)) {
                    assign.parameter = new AttributeParameter(id);
                    assign._expression = null;
                }
            }
        }
        this.checked = true;

    }

    toDialect(writer) {
        const cd = writer.context.getRegisteredDeclaration(this.type.name);
        if(cd==null)
            writer.context.problemListener.reportUnknownCategory(this.type.id);
        this.checkFirstHomonym(writer.context, cd);
        writer.toDialect(this);
    }

    toMDialect(writer) {
        this.toODialect(writer);
    }

    toODialect(writer) {
        this.type.toDialect(writer);
        const assignments = new ArgumentList();
        if (this.copyFrom != null)
            assignments.add(new Argument(new AttributeParameter(new Identifier("from")), this.copyFrom));
        if(this.args!=null)
            assignments.addAll(this.args);
        assignments.toDialect(writer);
    }

    toEDialect(writer) {
        this.type.toDialect(writer);
        if (this.copyFrom != null) {
            writer.append(" from ");
            writer.append(this.copyFrom.toString());
            if (this.args != null && this.args.length>0)
                writer.append(",");
        }
        if (this.args != null)
            this.args.toDialect(writer);
    }

    check(context) {
        // need to update type, since it was arbitrarily set to CategoryType
        const cd = context.getRegisteredDeclaration(this.type.name);
        if(cd==null)
            context.problemListener.reportUnknownCategory(this.type.id);
        this.checkFirstHomonym(context, cd);
        cd.checkConstructorContext(context);
        if(this.copyFrom!=null) {
            const cft = this.copyFrom.check(context);
            if(!(cft instanceof CategoryType) && cft!=DocumentType.instance)
                context.problemListener.reportInvalidCopySource(this.copyFrom);
                // throw new SyntaxError("Cannot copy from " + cft.getName());
        }
        if(this.args!=null) {
            this.args.forEach(argument => {
                if(!cd.hasAttribute(context, argument.name))
                    context.problemListener.reportUnknownAttribute(argument.id);
                argument.check(context);
            });
        }
        return cd.getType().asMutable(context, this.type.mutable);
    }

    interpret(context) {
        const cd = context.getRegisteredDeclaration(this.type.name);
        this.checkFirstHomonym(context, cd);
        const instance = this.type.newInstance(context);
        instance.mutable = true;
        if(this.copyFrom!=null) {
            const copyObj = this.copyFrom.interpret(context);
            if((copyObj.getMemberValue || null)!=null) {
                const names = copyObj.getMemberNames();
                names.forEach(function(name) {
                    if(name !== "dbId" && cd.hasAttribute(context, name)) {
                        const value = copyObj.getMemberValue(context, name);
                        if(value!=null && value.mutable && !this.type.mutable)
                            throw new NotMutableError();
                        // TODO convert Document member to attribute type
                        instance.setMember(context, name, value);
                    }
                }, this);
            }
        }
        if(this.args!=null) {
            this.args.forEach(function(argument) {
                const value = argument.expression.interpret(context);
                if(value!=null && value.mutable && !this.type.mutable)
                    throw new NotMutableError();
                instance.setMember(context, argument.name, value);
            }, this);
        }
        instance.mutable = this.type.mutable;
        return instance;
    }

    declare(transpiler) {
        const cd = transpiler.context.getRegisteredDeclaration(this.type.name);
        cd.declare(transpiler);
        if(this.copyFrom)
            this.copyFrom.declare(transpiler);
        if(this.args)
            this.args.declare(transpiler, null);
    }

    transpile(transpiler) {
        const decl = transpiler.context.getRegisteredDeclaration(this.type.name);
        if (decl instanceof NativeWidgetDeclaration)
            this.transpileNativeWidget(transpiler, decl);
        else if (decl instanceof ConcreteWidgetDeclaration)
            this.transpileConcreteWidget(transpiler, decl);
        else if (decl instanceof NativeCategoryDeclaration)
            this.transpileNative(transpiler, decl);
        else
            this.transpileConcrete(transpiler);
    }

    transpileNativeWidget(transpiler, decl) {
        const bound = decl.getBoundFunction(true);
        transpiler.append("new ").append(getTypeName(bound)).append("()");
    }

    transpileConcreteWidget(transpiler, decl) {
        transpiler = transpiler.newInstanceTranspiler(this.type);
        transpiler.append("new ").append(this.type.name).append("()");
        transpiler.flush();
    }

    transpileNative(transpiler, decl) {
        const bound = decl.getBoundFunction(true);
        transpiler.append("new_").append(getTypeName(bound)).append("(");
        this.transpileAssignments(transpiler);
        transpiler.append(")");
    }

    transpileConcrete(transpiler) {
        transpiler = transpiler.newInstanceTranspiler(this.type);
        transpiler.append("new ").append(this.type.name).append("(");
        if(this.copyFrom!=null)
            this.copyFrom.transpile(transpiler);
        else
            transpiler.append("null");
        transpiler.append(", ");
        this.transpileAssignments(transpiler);
        transpiler.append(", ");
        transpiler.append(this.type.mutable);
        transpiler.append(")");
        transpiler.flush();
    }

    transpileAssignments(transpiler) {
        if(this.args!=null) {
            transpiler.append("{");
            this.args.forEach(argument => {
                transpiler.append(argument.parameter.name).append(":");
                argument.expression.transpile(transpiler);
                transpiler.append(", ");
            }, this);
            transpiler.trimLast(2);
            transpiler.append("}");
        } else
            transpiler.append("null");
    }
}
