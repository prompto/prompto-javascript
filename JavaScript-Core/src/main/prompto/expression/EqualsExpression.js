import Expression from './Expression.js'
import { InstanceExpression, UnresolvedIdentifier } from './index.js'
import { EqOp } from '../grammar/index.js'
import { MatchOp } from '../store/index.js'
import { Variable, LinkedVariable, LinkedValue } from '../runtime/index.js'
import {
    ContainerType,
    TextType,
    CharacterType,
    BooleanType,
    NullType,
    IntegerType,
    DecimalType,
    MethodType,
    CategoryType
} from '../type/index.js'
import { NullValue, BooleanValue, Value, TypeValue, Instance } from '../value/index.js'
import { CodeWriter, removeAccents, isAMethod, isInstanceOf } from '../utils/index.js'
import { SyntaxError } from '../error/index.js'

const VOWELS = "AEIO"; // sufficient here

export default class EqualsExpression extends Expression {
  
    constructor(left, operator, right) {
        super();
        this.left = left;
        this.operator = operator;
        this.right = right;
    }

    toString() {
        return this.left.toString() + " " + this.operator.toString() + " " + this.right.toString();
    }

    toDialect(writer) {
        this.left.toDialect(writer);
        writer.append(" ");
        this.operator.toDialect(writer);
        // make this a AN
        if(this.operator === EqOp.IS_A || this.operator ===  EqOp.IS_NOT_A) {
            const name = this.right.toString();
            if(VOWELS.indexOf(name.charAt(0))>=0)
                writer.append("n");
        }
        writer.append(" ");
        this.right.toDialect(writer);
    }

    check(context) {
        const lt = this.left.check(context);
        const rt = this.right.check(context);
        return this.checkOperator(context, lt, rt);
    }

    checkOperator(context, lt, rt) {
        if(this.operator === EqOp.CONTAINS || this.operator === EqOp.NOT_CONTAINS) {
            if(lt instanceof ContainerType)
                lt = lt.itemType;
            if(rt instanceof ContainerType)
                rt = rt.itemType;
            if(lt !== TextType.instance || !(rt === TextType.instance || rt === CharacterType.instance))
                throw new SyntaxError("'contains' only operates on textual value!");
        }
        return BooleanType.instance; // can compare all objects
    }

    interpret(context) {
        const lval = this.left.interpret(context) || NullValue.instance;
        const rval = this.right.interpret(context) || NullValue.instance;
        return this.interpretValues(context, lval, rval);
    }

    interpretValues(context, lval, rval) {
        let equal = false;
        switch(this.operator) {
            case EqOp.IS:
                equal = lval === rval;
                break;
            case EqOp.IS_NOT:
                equal = lval !== rval;
                break;
            case EqOp.IS_A:
                equal = this.isA(context,lval,rval);
                break;
            case EqOp.IS_NOT_A:
                equal = !this.isA(context,lval,rval);
                break;
            case EqOp.EQUALS:
                equal = this.areEqual(context,lval,rval);
                break;
            case EqOp.NOT_EQUALS:
                equal = !this.areEqual(context,lval,rval);
                break;
            case EqOp.ROUGHLY:
                equal = this.roughly(context,lval,rval);
                break;
            case EqOp.CONTAINS:
                equal = this.contains(context,lval,rval);
                break;
            case EqOp.NOT_CONTAINS:
                equal = !this.contains(context,lval,rval);
                break;
        }
        return BooleanValue.ValueOf(equal);
    }

    contains(context, lval, rval) {
        if(lval!=null && rval!=null && lval.Contains) {
            return lval.Contains(context, rval);
        } else {
            return false;
        }
    }

    roughly(context, lval, rval) {
        if(lval!=null && rval!=null && lval.Roughly) {
            return lval.Roughly(context, rval);
        } else {
            return this.areEqual(context, lval, rval);
        }
    }

    areEqual(context, lval, rval) {
        if(lval === rval) {
            return true;
        } else if(lval === NullValue.instance || rval === NullValue.instance) {
            return false;
        } else {
            return lval.equals(rval);
        }
    }

    isA(context, lval, rval) {
        if(lval instanceof Value && rval instanceof TypeValue) {
            const actual = lval.type;
            if(actual === NullType.instance)
                return false;
            const toCheck = rval.value.resolve(context);
            return toCheck.isAssignableFrom(context, actual);
        } else
            return false;
    }

    downcast(context, setValue) {
        if(this.operator === EqOp.IS_A) {
            const id = this.readLeftId();
            if(id!=null) {
                let targetType = this.right.value.resolve(context);
                let value = context.getRegisteredValue(id);
                if(value==null && !setValue) // need a thing to avoid NPE
                    value = new Variable(id, targetType);
                const sourceType = value.getType(context);
                if(sourceType.isMutable(context))
                    targetType = targetType.asMutable(context, true);
                const local = context.newChildContext();
                value = new LinkedVariable(targetType, value);
                local.registerValue(value, false);
                if(setValue)
                    local.setValue(id, new LinkedValue(context));
                context = local;
            }
        }
        return context;
    }

    readLeftId() {
        if(this.left instanceof InstanceExpression)
            return this.left.id;
        else if(this.left instanceof UnresolvedIdentifier)
            return this.left.id;
        else
            return null;
    }

    interpretAssert(context, test) {
        const lval = this.left.interpret(context) || NullValue.instance;
        const rval = this.right.interpret(context) || NullValue.instance;
        const result = this.interpretValues(context, lval, rval);
        if(result === BooleanValue.TRUE)
            return true;
        const expected = this.getExpected(context, test.dialect);
        const actual = lval.toString() + " " + this.operator.toString(test.dialect) + " " + rval.toString();
        test.printFailedAssertion(context, expected, actual);
        return false;
    }

    checkQuery(context) {
        const decl = this.left.checkAttribute(context);
        if(decl && !decl.storable)
            context.problemListener.reportNotStorable(this, decl.name);
        const rt = this.right.check(context);
        return this.checkOperator(context, decl.getType(), rt);
    }

    interpretQuery(context, query) {
        const decl = this.left.checkAttribute(context);
        if(!decl || !decl.storable)
            throw new SyntaxError("Unable to interpret predicate");
        let value = this.right.interpret(context);
        if (value instanceof Instance)
            value = value.getMemberValue(context, "dbId", false);
        const info = decl.getAttributeInfo();
        const data = value.getStorableData();
        const match = this.getMatchOp();
        query.verify(info, match, data);
        if (this.operator === EqOp.NOT_EQUALS || this.operator === EqOp.IS_NOT || this.operator === EqOp.NOT_CONTAINS)
            query.not();
    }

    getMatchOp() {
        switch (this.operator) {
            case EqOp.IS:
            case EqOp.IS_NOT:
            case EqOp.EQUALS:
            case EqOp.NOT_EQUALS:
                return MatchOp.EQUALS;
            case EqOp.ROUGHLY:
                return MatchOp.ROUGHLY;
            case EqOp.CONTAINS:
            case EqOp.NOT_CONTAINS:
                return MatchOp.CONTAINS
            default:
                throw new Error("Not supported:" + this.operator.toString());
        }
    }

    declare(transpiler) {
        this.left.declare(transpiler);
        this.right.declare(transpiler);
        if (this.operator === EqOp.ROUGHLY) {
            transpiler.require(removeAccents);
        } else if (this.operator === EqOp.IS_A || this.operator === EqOp.IS_NOT_A) {
            transpiler.require(isAMethod);
            transpiler.require(isInstanceOf);
        }
    }

    transpile(transpiler) {
        switch (this.operator) {
            case EqOp.EQUALS:
                this.transpileEquals(transpiler);
                break;
            case EqOp.NOT_EQUALS:
                this.transpileNotEquals(transpiler);
                break;
            case EqOp.ROUGHLY:
                this.transpileRoughly(transpiler);
                break;
            case EqOp.CONTAINS:
                this.transpileContains(transpiler);
                break;
            case EqOp.NOT_CONTAINS:
                this.transpileNotContains(transpiler);
                break;
            case EqOp.IS:
                this.transpileIs(transpiler);
                break;
            case EqOp.IS_NOT:
                this.transpileIsNot(transpiler);
                break;
            case EqOp.IS_A:
                this.transpileIsA(transpiler);
                break;
            case EqOp.IS_NOT_A:
                this.transpileIsNotA(transpiler);
                break;
            default:
                throw new Error("Cannot transpile:" + this.operator.toString());
        }
    }

    transpileFound(transpiler, dialect) {
        transpiler.append("(");
        this.left.transpile(transpiler);
        transpiler.append(") + ' ").append(this.operator.toString(dialect)).append(" ' + (");
        this.right.transpile(transpiler);
        transpiler.append(")");
    }

    getExpected(context, dialect, escapeMode) {
        const writer = new CodeWriter(dialect, context);
        writer.escapeMode = escapeMode;
        this.toDialect(writer);
        return writer.toString();
    }

    transpileRoughly(transpiler) {
        transpiler.append("removeAccents(");
        this.left.transpile(transpiler);
        transpiler.append(").toLowerCase() === removeAccents(");
        this.right.transpile(transpiler);
        transpiler.append(").toLowerCase()");
    }

    transpileIs(transpiler) {
        this.left.transpile(transpiler);
        transpiler.append(" === ");
        this.right.transpile(transpiler);
    }

    transpileIsNot(transpiler) {
        this.left.transpile(transpiler);
        transpiler.append(" !== ");
        this.right.transpile(transpiler);
    }

    transpileEquals(transpiler) {
        const lt = this.left.check(transpiler.context);
        if(lt === BooleanType.instance || lt === IntegerType.instance || lt === DecimalType.instance || lt === CharacterType.instance || lt === TextType.instance) {
            this.left.transpile(transpiler);
            transpiler.append(" === ");
            this.right.transpile(transpiler);
        } else {
            transpiler.append("equalObjects(");
            this.left.transpile(transpiler);
            transpiler.append(", ");
            this.right.transpile(transpiler);
            transpiler.append(")");
        }
    }

    transpileNotEquals(transpiler) {
        const lt = this.left.check(transpiler.context);
        if(lt === BooleanType.instance || lt === IntegerType.instance || lt === DecimalType.instance || lt === CharacterType.instance || lt === TextType.instance) {
            this.left.transpile(transpiler);
            transpiler.append(" !== ");
            this.right.transpile(transpiler);
        } else {
            transpiler.append("!equalObjects(");
            this.left.transpile(transpiler);
            transpiler.append(", ");
            this.right.transpile(transpiler);
            transpiler.append(")");
        }
    }

    transpileContains(transpiler) {
        this.left.transpile(transpiler);
        transpiler.append(".contains(");
        this.right.transpile(transpiler);
        transpiler.append(")");
    }

    transpileNotContains(transpiler) {
        transpiler.append("!");
        this.transpileContains(transpiler);
    }

    transpileIsNotA(transpiler) {
        transpiler.append("!(");
        this.transpileIsA(transpiler);
        transpiler.append(")");
    }

    transpileIsA(transpiler) {
        const right = this.right.value.resolve(transpiler.context);
        if(right===BooleanType.instance) {
            transpiler.append("isABoolean(");
            this.left.transpile(transpiler);
            transpiler.append(")");
        } else if(right===IntegerType.instance) {
            transpiler.append("isAnInteger(");
            this.left.transpile(transpiler);
            transpiler.append(")");
        } else if(right===DecimalType.instance) {
            transpiler.append("isADecimal(");
            this.left.transpile(transpiler);
            transpiler.append(")");
        } else if(right===TextType.instance) {
            transpiler.append("isAText(");
            this.left.transpile(transpiler);
            transpiler.append(")");
        } else if(right===CharacterType.instance) {
            transpiler.append("isACharacter(");
            this.left.transpile(transpiler);
            transpiler.append(")");
        } else if(right instanceof MethodType) {
            transpiler.append("isAMethod(");
            this.left.transpile(transpiler);
            transpiler.append(", ");
            right.transpileMethodType(transpiler);
            transpiler.append(")");
        } else if(right instanceof CategoryType) {
            transpiler.append("isInstanceOf(");
            this.left.transpile(transpiler);
            transpiler.append(", ");
            this.right.transpile(transpiler);
            transpiler.append(")");
        } else {
            this.left.transpile(transpiler);
            transpiler.append(" instanceof ");
            this.right.transpile(transpiler);
        }
    }

    declareQuery(transpiler) {
        transpiler.require(MatchOp);
        this.left.declare(transpiler);
        this.right.declare(transpiler);
    }

    transpileQuery(transpiler, builder) {
        const decl = this.left.checkAttribute(transpiler.context);
        if(!decl || !decl.storable)
            throw new SyntaxError("Unable to transpile predicate");
        const info = decl.getAttributeInfo();
        const matchOp = this.getMatchOp();
        // TODO check for dbId field of instance value
        transpiler.append(builder).append(".verify(").append(info.toTranspiled()).append(", MatchOp.").append(matchOp.name).append(", ");
        this.right.transpile(transpiler);
        transpiler.append(");").newLine();
        if (this.operator === EqOp.NOT_EQUALS || this.operator === EqOp.IS_NOT || this.operator === EqOp.NOT_CONTAINS)
            transpiler.append(builder).append(".not();").newLine();
    }
}
