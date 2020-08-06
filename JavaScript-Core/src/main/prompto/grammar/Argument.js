var Section = require("../parser/Section").Section;
var CategoryType = null;
var InstanceExpression = require("../expression/InstanceExpression").InstanceExpression;
var ArrowExpression = require("../expression/ArrowExpression").ArrowExpression;
var ContextualExpression = require("../value/ContextualExpression").ContextualExpression;
var MemberSelector = require("../expression/MemberSelector").MemberSelector;
var Variable = require("../runtime/Variable").Variable;
var VoidType = require("../type/VoidType").VoidType;
var MethodType = require("../type/MethodType").MethodType;
var PromptoError = require("../error/PromptoError").PromptoError;
var Specificity = require("../grammar/Specificity").Specificity;

exports.resolve = () => {
    CategoryType = require("../type/CategoryType").CategoryType;
}

class Argument extends Section {

    constructor(parameter, expression) {
        super();
        this.parameter = parameter;
        this._expression = expression;
   }

    get id() {
        return this.parameter.id;
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
        var parameter = this.findParameter(methodDeclaration);
        var requiredType = parameter.getType(transpiler.context);
        var isArrow = requiredType instanceof MethodType && this._expression instanceof ArrowExpression;
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
        if(obj==this) {
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
        var actual = context.getRegisteredValue(this.parameter.name);
        if(actual==null) {
            var actualType = this.expression.check(context);
            context.registerValue(new Variable(this.parameter.id, actualType));
        } else {
            // need to check type compatibility
            actualType = actual.getType(context);
            var newType = this.expression.check(context);
            var section = this.toSection();
            actualType.checkAssignableFrom(context, newType, section);
        }
        return VoidType.instance;
    }

    toSection() {
        if(this.parameter && this._expression) {
            var section = new Section();
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
        // since we support implicit members, it's time to resolve them
        var expression = this.expression;
        var parameter = this.findParameter(methodDeclaration);
        var requiredType = parameter.getType(context);
        var checkArrow = requiredType instanceof MethodType && expression instanceof ContextualExpression && expression.expression instanceof ArrowExpression;
        var actualType = checkArrow ? requiredType.checkArrowExpression(expression) : expression.check(context.getCallingContext());
        if(checkInstance && actualType instanceof CategoryType) {
            var value = expression.interpret(context.getCallingContext());
            if(value && value.getType) {
                actualType = value.getType();
            }
        }
        var assignable = requiredType.isAssignableFrom(context, actualType);
        // when in dispatch, allow derived
        if(!assignable && allowDerived)
            assignable = actualType.isAssignableFrom(context, requiredType);
        // try passing member
        if(!assignable && (actualType instanceof CategoryType)) {
            expression = new MemberSelector(expression, this.parameter.id);
        }
        return expression;
    }

    makeAssignment(context, declaration) {
        var argument = this.parameter;
        // when 1st argument, can be unnamed
        if(argument===null) {
            if(declaration.parameters.length==0) {
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

    isAssignableToArgument(context, argument, declaration, checkInstance, allowDerived) {
        return this.computeSpecificity(context, argument, declaration, checkInstance, allowDerived)!==Specificity.INCOMPATIBLE;
    }

    computeSpecificity(context, parameter, declaration, checkInstance, allowDerived) {
        try {
            var requiredType = parameter.getType(context).resolve(context, null);
            var actualType = this.checkActualType(context, requiredType, this.expression, checkInstance).resolve(context, null);
            // retrieve actual runtime type
            if(checkInstance && (actualType instanceof CategoryType)) {
                var value = this.expression.interpret(context.getCallingContext());
                if(value && value.getType) {
                    actualType = value.getType();
                }
            }
            if(actualType.equals(requiredType)) {
                return Specificity.EXACT;
            } else if(requiredType.isAssignableFrom(context, actualType)) {
                return Specificity.INHERITED;
            } else if(allowDerived && actualType.isAssignableFrom(context, requiredType)) {
                return Specificity.DERIVED;
            }
            actualType = this.resolve(context, declaration, checkInstance).check(context);
            if(requiredType.isAssignableFrom(context, actualType)) {
                return Specificity.IMPLICIT;
            } else if(allowDerived && actualType.isAssignableFrom(context, requiredType)) {
                return Specificity.IMPLICIT;
            }
        } catch(error) {
            if(!(error instanceof PromptoError )) {
                throw error;
            }
        }
        return Specificity.INCOMPATIBLE;
    }

    checkActualType(context, requiredType, expression, checkInstance) {
        var actualType = null;
        var isArrow = this.isArrowExpression(requiredType, expression);
        if(isArrow)
            actualType = this.checkArrowExpression(context, requiredType, expression);
        else if(requiredType instanceof MethodType)
            actualType = expression.checkReference(context.getCallingContext());
        else
            actualType = expression.check(context.getCallingContext());
        if(checkInstance && actualType instanceof CategoryType) {
            var value = expression.interpret(context.getCallingContext());
            if(value && value.getType)
                actualType = value.getType();
        }
        return actualType;
    }

    isArrowExpression(requiredType, expression) {
        if(!(requiredType instanceof MethodType))
            return false;
        if(expression instanceof ArrowExpression)
            return true;
        else
            return expression instanceof ContextualExpression && expression.expression instanceof ArrowExpression;
    }

    checkArrowExpression(context, requiredType, expression) {
        context = expression instanceof ContextualExpression ? expression.calling : context.getCallingContext();
        var arrow = expression instanceof ArrowExpression ? expression : expression.expression;
        return requiredType.checkArrowExpression(context, arrow);
    }
}

exports.Argument = Argument;

