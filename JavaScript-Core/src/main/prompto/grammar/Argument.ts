import Section from '../parser/Section'
import {InstanceExpression, ArrowExpression, MemberSelector, IExpression} from '../expression'
import {MethodType, CategoryType, VoidType, IType} from '../type'
import {ContextualExpression, Instance} from '../value'
import { SyntaxError } from '../error'
import {IParameter} from "../param";
import {CodeWriter, equalObjects} from "../utils";
import {Context, Transpiler} from "../runtime";
import {IMethodDeclaration} from "../declaration";
import {Identifier} from "./index";

export default class Argument extends Section {

    parameter: IParameter | null;
    _expression: IExpression | null;

    constructor(parameter: IParameter | null, expression: IExpression | null) {
        super();
        this.parameter = parameter;
        this._expression = expression;
   }

    get id(): Identifier | null {
        return this.parameter ? this.parameter.id : null;
    }

    get name(): string | null {
        return this.parameter ? this.parameter.name : null;
    }

    get expression(): IExpression {
        return this._expression ? this._expression : new InstanceExpression(this.id!);
    }

    set expression(expression: IExpression) {
        this._expression = expression;
    }

    toDialect(writer: CodeWriter): void {
        writer.toDialect(this);
    }

    toODialect(writer: CodeWriter): void {
        if(!this._expression) {
            writer.append(this.parameter!.name);
        } else {
            if (this.parameter != null) {
                writer.append(this.parameter.name);
                writer.append(" = ");
            }
            this._expression.toDialect(writer);
        }
    }

    toMDialect(writer: CodeWriter): void {
        if(!this._expression) {
            writer.append(this.parameter!.name);
        } else {
            if (this.parameter != null) {
                writer.append(this.parameter.name);
                writer.append(" = ");
            }
            this._expression.toDialect(writer);
        }
    }

    toEDialect(writer: CodeWriter): void {
        if(!this._expression) {
            writer.append(this.parameter!.name);
        } else {
            this._expression.toDialect(writer);
            if (this.parameter != null) {
                writer.append(" as ");
                writer.append(this.parameter.name);
            }
        }
    }

    declare(transpiler: Transpiler, methodDeclaration: IMethodDeclaration | null): void {
        if(this._expression && !this.declareArrowExpression(transpiler, methodDeclaration))
            this._expression.declare(transpiler);
    }

    declareArrowExpression(transpiler: Transpiler, methodDeclaration: IMethodDeclaration | null): boolean {
        if(this.parameter==null || methodDeclaration==null)
            return false;
        const parameter = this.findParameter(methodDeclaration);
        const requiredType = parameter.getType(transpiler.context);
        const isArrow = requiredType instanceof MethodType && this._expression instanceof ArrowExpression;
        if(isArrow) {
            requiredType.declareArrowExpression(transpiler, this._expression as unknown as ArrowExpression);
            return true;
        } else
            return false;
    }

    transpile(transpiler: Transpiler, methodDeclaration?: IMethodDeclaration): void {
        if(this._expression && !this.transpileArrowExpression(transpiler, methodDeclaration))
            this._expression.transpile(transpiler);
    }

    transpileArrowExpression(transpiler: Transpiler, methodDeclaration?: IMethodDeclaration): boolean {
        // TODO Auto-generated method stub
        return false;
    }

    toString() {
        if(!this._expression) {
            return this.parameter!.name;
        } else {
            if (this.parameter == null) {
                return this._expression.toString();
            } else {
                return this.name! + " = " + this._expression.toString();
            }
        }
    }

    equals(obj: any): boolean {
        return (obj == this)
            || (obj instanceof Argument && equalObjects(this.parameter, obj.parameter) && equalObjects(this.expression, obj.expression));
    }

    check(context: Context): void {
        if (!this._expression)
            this.checkParameterOnly(context);
        else
            this.checkParameterAndExpression(context);
    }

    checkParameterOnly(context: Context): void {
        const registered = context.getRegisteredInstance(this.parameter!.id);
        if (!registered)
            context.problemListener.reportUnknownIdentifier(this, this.parameter!.id.name);
        else {
            const requiredType = this.parameter!.check(context);
            const actualType = registered.getType(context);
            requiredType.checkAssignableFrom(context, this, actualType);
        }
    }

    checkParameterAndExpression(context: Context) {
        const requiredType = this.parameter!.check(context);
        const actualType = this.expression.check(context);
        requiredType.checkAssignableFrom(context, this, actualType);
    }

    toSection() {
        if(this.parameter && this._expression) {
            const section = new Section();
            section.copySectionFrom(this.parameter as unknown as Section);
            section.endLocation = (this._expression as unknown as Section).endLocation;
            return section;
        } else if(this._expression) {
            return this._expression;
        } else {
            return this.parameter;
        }
    }

    findParameter(methodDeclaration: IMethodDeclaration): IParameter {
        return methodDeclaration.parameters!.findByName(this.parameter!.name);
    }

    resolve(context: Context, methodDeclaration: IMethodDeclaration, checkInstance: boolean, allowDerived: boolean): IExpression {
        const parameter = this.findParameter(methodDeclaration);
        return this.resolve_(context, parameter, checkInstance, allowDerived);
    }

    resolve_(context: Context, parameter: IParameter, checkInstance: boolean, allowDerived: boolean): IExpression {
        // since we support implicit members, it's time to resolve them
        const requiredType = parameter.getType(context);
        const actualType = this.checkActualType(context, requiredType, checkInstance)!;
        let assignable = requiredType.isAssignableFrom(context, actualType);
        // when in dispatch, allow derived
        if (!assignable && allowDerived)
            assignable = actualType.isAssignableFrom(context, requiredType);
        // try passing member
        let expression = this.expression;
        if (!assignable && (actualType instanceof CategoryType)) {
            expression = new MemberSelector(expression, this.parameter!.id);
        }
        return expression;
    }

    makeAssignment(context: Context, methodDeclaration: IMethodDeclaration): void {
        let argument = this.parameter;
        // when 1st argument, can be unnamed
        if(!argument) {
            if(methodDeclaration.parameters!.length == 0) {
                throw new SyntaxError("Method has no argument");
            }
            argument = methodDeclaration.parameters![0];
        } else {
            argument = methodDeclaration.parameters!.findByName(this.name);
        }
        if(!argument) {
            throw new SyntaxError("Method has no argument:" + this.name!);
        }
    }


    checkActualType(context: Context, requiredType: IType, checkInstance: boolean): IType | null {
        const calling = context.getCallingContext()!;
        const expression = this.expression;
        let actualType: IType | null;
        const isArrow = Argument.isArrowExpression(expression);
        if(isArrow) {
            if(requiredType instanceof MethodType)
                actualType = Argument.checkArrowExpression(context, requiredType, expression);
            else
                actualType = VoidType.instance;
        } else if(requiredType instanceof MethodType)
            actualType = expression.checkReference(calling);
        else
            actualType = expression.check(calling);
        if(checkInstance && actualType instanceof CategoryType) {
            const value = expression.interpret(calling);
            actualType = (value as Instance<never>).getType();
        }
        return actualType;
    }

    static isArrowExpression(expression: IExpression): boolean {
        if(expression instanceof ArrowExpression)
            return true;
        else
            return expression instanceof ContextualExpression && expression.expression instanceof ArrowExpression;
    }

    static checkArrowExpression(context: Context, requiredType: IType, expression: IExpression): IType {
        const ctx = expression instanceof ContextualExpression ? expression.calling : context.getCallingContext()!;
        const arrow = (expression instanceof ContextualExpression ? expression.expression : expression) as unknown as ArrowExpression;
        return requiredType.checkArrowExpression(ctx, arrow);
    }
}
