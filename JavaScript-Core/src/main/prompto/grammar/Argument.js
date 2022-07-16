import Section from '../parser/Section.js'
import { InstanceExpression, ArrowExpression, MemberSelector } from '../expression/index.js'
import { MethodType, CategoryType, VoidType } from '../type/index.js'
import { ContextualExpression } from '../value/index.js'
import { Variable } from '../runtime/index.js'
import { SyntaxError } from '../error/index.js'

export default class Argument extends Section {

    constructor(parameter, expression) {
        super();
        this.parameter = parameter;
        this._expression = expression;
   }

    get id() {
        return this.parameter ? this.parameter.id : null;
    }

    get name() {
        return this.parameter ? this.parameter.name : null;
    }

    get expression() {
        return this._expression ? this._expression : new InstanceExpression(this.id);
    }

    set expression(expression) {
        this._expression = expression;
    }

    toDialect(writer) {
        writer.toDialect(this);
    }

    toODialect(writer) {
        if(!this._expression) {
            writer.append(this.parameter.name);
        } else {
            if (this.parameter != null) {
                writer.append(this.parameter.name);
                writer.append(" = ");
            }
            this._expression.toDialect(writer);
        }
    }

    toMDialect(writer) {
        if(!this._expression) {
            writer.append(this.parameter.name);
        } else {
            if (this.parameter != null) {
                writer.append(this.parameter.name);
                writer.append(" = ");
            }
            this._expression.toDialect(writer);
        }
    }

    toEDialect(writer) {
        if(!this._expression) {
            writer.append(this.parameter.name);
        } else {
            this._expression.toDialect(writer);
            if (this.parameter != null) {
                writer.append(" as ");
                writer.append(this.parameter.name);
            }
        }
    }

    declare(transpiler, methodDeclaration) {
        if(this._expression && !this.declareArrowExpression(transpiler, methodDeclaration))
            this._expression.declare(transpiler);
    }

    declareArrowExpression(transpiler, methodDeclaration) {
        if(this.parameter==null || methodDeclaration==null)
            return false;
        const parameter = this.findParameter(methodDeclaration);
        const requiredType = parameter.getType(transpiler.context);
        const isArrow = requiredType instanceof MethodType && this._expression instanceof ArrowExpression;
        if(isArrow) {
            requiredType.declareArrowExpression(transpiler, this._expression);
            return true;
        } else
            return false;
    }

    transpile(transpiler, methodDeclaration) {
        if(this._expression && !this.transpileArrowExpression(transpiler, methodDeclaration))
            this._expression.transpile(transpiler);
    }

    transpileArrowExpression(transpiler, methodDeclaration) {
        // TODO Auto-generated method stub
        return false;
    }

    toString() {
        if(!this._expression) {
            return this.parameter.name;
        } else {
            if (this.parameter === null) {
                return this._expression.toString();
            } else {
                return this.name + " = " + this._expression.toString();
            }
        }
    }

    equals(obj) {
        if(obj===this) {
            return true;
        } else if(obj==null) {
            return false;
        } else if(!(obj instanceof Argument)) {
            return false;
        } else {
            return this.parameter.equals(obj.parameter) &&
                this.expression.equals(obj.expression);
        }
    }

    check(context) {
        if (!this._expression)
            this.checkParameterOnly(context);
        else
            this.checkParameterAndExpression(context);
    }

    checkParameterOnly(context) {
        const registered = context.getRegisteredValue(this.parameter.id);
        if (!registered)
            context.problemListener.reportUnknownIdentifier(this, this.parameter.id.name);
        else {
            const requiredType = this.parameter.check(context);
            const actualType = registered.getType(context);
            requiredType.checkAssignableFrom(context, this, actualType);
        }
    }

    checkParameterAndExpression(context) {
        const requiredType = this.parameter.check(context);
        const actualType = this.expression.check(context);
        requiredType.checkAssignableFrom(context, this, actualType);
    }

    toSection() {
        if(this.parameter && this._expression) {
            const section = new Section();
            section.copySectionFrom(this.parameter);
            section.end = this._expression.end;
            return section;
        } else if(this._expression) {
            return this._expression;
        } else {
            return this.parameter;
        }
    }

    findParameter(methodDeclaration) {
        return methodDeclaration.parameters.find(this.parameter.name);
    }

    resolve(context, methodDeclaration, checkInstance, allowDerived) {
        const parameter = this.findParameter(methodDeclaration);
        return this.resolve_(context, parameter, checkInstance, allowDerived);
    }

    resolve_(context, parameter, checkInstance, allowDerived) {
        // since we support implicit members, it's time to resolve them
        const requiredType = parameter.getType(context);
        const actualType = this.checkActualType(context, requiredType, checkInstance);
        let assignable = requiredType.isAssignableFrom(context, actualType);
        // when in dispatch, allow derived
        if (!assignable && allowDerived)
            assignable = actualType.isAssignableFrom(context, requiredType);
        // try passing member
        let expression = this.expression;
        if (!assignable && (actualType instanceof CategoryType)) {
            expression = new MemberSelector(expression, this.parameter.id);
        }
        return expression;
    }

    makeAssignment(context, declaration) {
        let argument = this.parameter;
        // when 1st argument, can be unnamed
        if(argument===null) {
            if(declaration.parameters.length === 0) {
                throw new SyntaxError("Method has no argument");
            }
            argument = declaration.parameters[0];
        } else {
            argument = declaration.parameters.find(this.name);
        }
        if(argument==null) {
            throw new SyntaxError("Method has no argument:" + this.name);
        }
    }


    checkActualType(context, requiredType, checkInstance) {
        const expression = this.expression;
        let actualType = null;
        const isArrow = Argument.isArrowExpression(expression);
        if(isArrow) {
            if(requiredType instanceof MethodType)
                actualType = Argument.checkArrowExpression(context, requiredType, expression);
            else
                actualType = VoidType.instance;
        } else if(requiredType instanceof MethodType)
            actualType = expression.checkReference(context.getCallingContext());
        else
            actualType = expression.check(context.getCallingContext());
        if(checkInstance && actualType instanceof CategoryType) {
            const value = expression.interpret(context.getCallingContext());
            if(value && value.getType)
                actualType = value.getType();
        }
        return actualType;
    }

    static isArrowExpression(expression) {
        if(expression instanceof ArrowExpression)
            return true;
        else
            return expression instanceof ContextualExpression && expression.expression instanceof ArrowExpression;
    }

    static checkArrowExpression(context, requiredType, expression) {
        context = expression instanceof ContextualExpression ? expression.calling : context.getCallingContext();
        const arrow = expression instanceof ArrowExpression ? expression : expression.expression;
        return requiredType.checkArrowExpression(context, arrow);
    }
}
