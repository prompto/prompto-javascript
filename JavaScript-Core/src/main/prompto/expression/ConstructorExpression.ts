import BaseExpression from './BaseExpression';
import { UnresolvedIdentifier, InstanceExpression } from '../expression'
import { ArgumentList, Argument, Identifier } from '../grammar'
import { AttributeParameter } from '../param'
import {CategoryType, DocumentType, IType, VoidType} from '../type'
import { NotMutableError } from '../error'
import {Dialect, Section} from '../parser'
import {
    ConcreteWidgetDeclaration,
    NativeWidgetDeclaration,
    NativeCategoryDeclaration,
    CategoryDeclaration
} from '../declaration'
import {CodeWriter, getTypeName} from '../utils'
import {Context, Transpiler} from "../runtime";
import IExpression from "../../../main/prompto/expression/IExpression";
import {ConcreteInstance, DocumentValue, Instance, NullValue, IValue} from "../value";

export default class ConstructorExpression extends BaseExpression {

    type: CategoryType;
    copyFrom: IExpression | null;
    args: ArgumentList | null;
    checked?: boolean;

    constructor(type: CategoryType, copyFrom: IExpression | null, args: ArgumentList | null) {
        super();
        this.type = type;
        this.copyFrom = copyFrom;
        this.args = args;
    }

    checkFirstHomonym(context: Context, decl: CategoryDeclaration): void {
        if(this.checked)
            return;
        if(this.args && this.args.length>0) {
            const assign = this.args[0];
            if(!assign.parameter) {
                let id: Identifier | null = null;
                const expression = assign.expression;
                if (expression instanceof UnresolvedIdentifier)
                    id = expression.id;
                else if(expression instanceof InstanceExpression)
                    id = expression.id;
                if (id && decl.hasAttribute(context, id)) {
                    assign.parameter = new AttributeParameter(id, false);
                    assign._expression = null;
                }
            }
        }
        this.checked = true;
    }

    toDialect(writer: CodeWriter): void {
        const cd = writer.context.getRegisteredCategoryDeclaration(this.type.id);
        if(cd) {
            this.checkFirstHomonym(writer.context, cd);
            writer.toDialect(this);
        } else
            writer.context.problemListener.reportUnknownCategory(this.type.id, this.type.name);
    }

    toMDialect(writer: CodeWriter): void {
        this.toODialect(writer);
    }

    toODialect(writer: CodeWriter): void {
        this.type.toDialect(writer, false);
        const assignments = new ArgumentList();
        if (this.copyFrom != null)
            assignments.add(new Argument(new AttributeParameter(new Identifier("from")), this.copyFrom));
        if(this.args!=null)
            assignments.addAll(this.args);
        assignments.toDialect(writer);
    }

    toEDialect(writer: CodeWriter): void {
        this.type.toDialect(writer, false);
        if (this.copyFrom != null) {
            writer.append(" from ");
            writer.append(this.copyFrom.toString());
            if (this.args != null && this.args.length>0)
                writer.append(",");
        }
        if (this.args != null)
            this.args.toDialect(writer);
    }

    check(context: Context): IType {
        // need to update type, since it was arbitrarily set to CategoryType
        const decl = context.getRegisteredCategoryDeclaration(this.type.id);
        if (decl) {
            this.checkFirstHomonym(context, decl);
            decl.checkConstructorContext(context);
            this.checkConstructable(context, decl);
            this.checkCopyFrom(context);
            this.checkArguments(context, decl);
            return this.getActualType(context, decl);
        } else {
            context.problemListener.reportUnknownCategory(this.type.id, this.type.name);
            return VoidType.instance;
        }
    }

    checkConstructable(context: Context, declaration: CategoryDeclaration): void {
        if(declaration.isWidget(context))
            context.problemListener.reportIllegalWidgetConstructor(this, declaration.name);
        declaration.getAbstractMethods(context, this).forEach(method => context.problemListener.reportIllegalAbstractCategory(this, declaration.name, method.getSignature(Dialect.O)));

    }

    getActualType(context: Context, declaration: CategoryDeclaration): IType {
        return declaration.getType(context).asMutable(context, this.type.mutable);
    }

    checkCopyFrom(context: Context) : void{
        if(this.copyFrom) {
            const cft = this.copyFrom.check(context);
            if(!(cft instanceof CategoryType) && cft !== DocumentType.instance)
                context.problemListener.reportInvalidCopySource(this.copyFrom instanceof Section ? this.copyFrom : this);
        }
    }


    checkArguments(context: Context, declaration: CategoryDeclaration): void {
        if(this.args) {
            this.args.forEach(argument => this.checkArgument(context, declaration, argument));
        }
    }

    // noinspection JSMethodCanBeStatic
    checkArgument(context: Context, declaration: CategoryDeclaration, argument: Argument): void {
        const id = argument.id;
        if(id === null)
            context.problemListener.reportMissingAttribute(argument, argument.toString());
        else if(declaration.hasAttribute(context, id)) {
            context = context.newChildContext();
            argument.check(context);
        } else
            context.problemListener.reportUnknownAttribute(id, id.name);
    }

    interpret(context: Context): IValue {
        const cd = context.getRegisteredCategoryDeclaration(this.type.id);
        if(cd) {
            this.checkFirstHomonym(context, cd);
            const instance = this.type.newInstance(context);
            (instance as ConcreteInstance).mutable = true;
            if (this.copyFrom != null) {
                const copyObj = this.copyFrom.interpret(context);
                if (copyObj instanceof Instance)
                    this.copyFromInstance(context, cd, instance, copyObj);
                else if (copyObj instanceof DocumentValue)
                    this.copyFromDocument(context, instance, copyObj);
            }
            if (this.args != null) {
                this.args.forEach(arg => {
                    const value = arg.expression.interpret(context);
                    if (value != null && value.mutable && !this.type.mutable)
                        throw new NotMutableError();
                    instance.setMember(context, arg.id, value);
                }, this);
            }
            instance.mutable = this.type.mutable;
            return instance;
        } else
            return NullValue.instance;
    }

    copyFromInstance(context: Context, decl: CategoryDeclaration, instance: Instance<unknown>, copyFrom: Instance<unknown>): void {
        const names = copyFrom.getMemberNames();
        names.forEach(name => {
            if(name !== "dbId") {
                const id = new Identifier(name);
                if (decl.hasAttribute(context, id)) {
                    const value = copyFrom.GetMemberValue(context, id);
                    if (value && value.mutable && !this.type.mutable)
                        throw new NotMutableError();
                    instance.setMember(context, id, value);
                }
            }
        }, this);
    }

    copyFromDocument(context: Context, instance: Instance<unknown>, copyFrom: DocumentValue): void {
        const names = copyFrom.getMemberNames();
        names.forEach(name => {
            const id = new Identifier(name);
            const value = copyFrom.getMemberValue(context, id);
            if (value && value.mutable && !this.type.mutable)
                throw new NotMutableError();
            // TODO convert Document member to attribute type
            instance.setMember(context, id, value);
        }, this);
    }

    declare(transpiler: Transpiler): void {
        const decl = transpiler.context.getRegisteredCategoryDeclaration(this.type.id);
        if(decl)
            decl.declare(transpiler);
        if(this.copyFrom)
            this.copyFrom.declare(transpiler);
        if(this.args)
            this.args.declare(transpiler, null);
    }

    transpile(transpiler: Transpiler): void {
        const decl = transpiler.context.getRegisteredCategoryDeclaration(this.type.id);
        if (decl instanceof NativeWidgetDeclaration)
            this.transpileNativeWidget(transpiler, decl);
        else if (decl instanceof ConcreteWidgetDeclaration)
            this.transpileConcreteWidget(transpiler, decl);
        else if (decl instanceof NativeCategoryDeclaration)
            this.transpileNative(transpiler, decl);
        else
            this.transpileConcrete(transpiler);
    }

    transpileNativeWidget(transpiler: Transpiler, decl: NativeWidgetDeclaration): void {
        const bound = decl.getBoundFunction(true);
        transpiler.append("new ").append(getTypeName(bound)!).append("()");
    }

    transpileConcreteWidget(transpiler: Transpiler, decl: ConcreteWidgetDeclaration): void {
        transpiler = transpiler.newInstanceTranspiler(this.type as unknown as IType);
        transpiler.append("new ").append(this.type.name).append("()");
        transpiler.flush();
    }

    transpileNative(transpiler: Transpiler, decl: NativeCategoryDeclaration): void {
        const bound = decl.getBoundFunction(true);
        transpiler.append("new_").append(getTypeName(bound)!).append("(");
        this.transpileAssignments(transpiler);
        transpiler.append(")");
    }

    transpileConcrete(transpiler: Transpiler): void {
        transpiler = transpiler.newInstanceTranspiler(this.type as unknown as IType);
        transpiler.append("new ").append(this.type.name).append("(");
        if(this.copyFrom!=null)
            this.copyFrom.transpile(transpiler);
        else
            transpiler.append("null");
        transpiler.append(", ");
        this.transpileAssignments(transpiler);
        transpiler.append(", ");
        transpiler.appendBoolean(this.type.mutable);
        transpiler.append(")");
        transpiler.flush();
    }

    transpileAssignments(transpiler: Transpiler): void {
        if(this.args!=null) {
            transpiler.append("{");
            this.args.forEach(arg => {
                transpiler.append(arg.parameter!.name).append(":");
                arg.expression.transpile(transpiler);
                transpiler.append(", ");
            }, this);
            transpiler.trimLast(2);
            transpiler.append("}");
        } else
            transpiler.append("null");
    }
}
