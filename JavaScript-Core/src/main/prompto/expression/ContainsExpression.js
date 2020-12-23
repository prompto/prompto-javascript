import Expression from './Expression.js'
import { SyntaxError } from '../error/index.js'
import { ContOp } from '../grammar/index.js'
import { MatchOp } from '../store/index.js'
import { UnresolvedIdentifier, InstanceExpression, MemberSelector, PredicateExpression } from '../expression/index.js'
import { Value, NullValue, BooleanValue, Instance } from '../value/index.js'
import { IterableType } from '../type/index.js'
import { CodeWriter } from '../utils/index.js'

export default class ContainsExpression extends Expression {
  
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
        writer.append(" ");
        this.right.toDialect(writer);
    }

    check(context) {
        if (this.right instanceof PredicateExpression)
            return this.checkPredicate(context);
        else
            return this.checkValue(context);
    }


    checkPredicate(context) {
        const lt = this.left.check(context);
        if (lt instanceof IterableType) {
            const itemType = lt.itemType;
            const arrow = this.right.toArrowExpression();
            return arrow.checkFilter(context, itemType);
        } else
            throw new SyntaxError("Expecting collection");
    }


    checkValue(context) {
        const lt = this.left.check(context);
        const rt = this.right.check(context);
        return this.checkOperator(context, lt, rt);
    }

    checkOperator(context, lt, rt) {
        switch (this.operator) {
            case ContOp.IN:
            case ContOp.NOT_IN:
                return rt.checkContains(context, this, lt);
            case ContOp.HAS:
            case ContOp.NOT_HAS:
                return lt.checkContains(context, this, rt);
            default:
                return lt.checkContainsAllOrAny(context, rt);
        }
    }

    interpret(context) {
        const lval = this.left.interpret(context);
        const rval = this.right.interpret(context);
        return this.interpretValues(context, lval, rval);
    }

    interpretValues(context, lval, rval) {
        let result = null;
        switch (this.operator) {
        case ContOp.IN:
        case ContOp.NOT_IN:
            if(rval==NullValue.instance)
                result = false;
            else if(rval.hasItem)
                result = rval.hasItem(context, lval);
            break;
        case ContOp.HAS:
        case ContOp.NOT_HAS:
            if(lval==NullValue.instance)
                result = false;
            else if(lval.hasItem)
                result = lval.hasItem(context, rval);
            break;
        case ContOp.HAS_ALL:
        case ContOp.NOT_HAS_ALL:
            if(lval==NullValue.instance || rval==NullValue.instance)
                result = false;
            else if (lval.hasItem && rval.hasItem)
                result = this.containsAll(context, lval, rval);
            break;
        case ContOp.HAS_ANY:
        case ContOp.NOT_HAS_ANY:
            if(lval==NullValue.instance || rval==NullValue.instance)
                result = false;
            else if (lval.hasItem && rval.hasItem)
                result = this.containsAny(context, lval, rval);
            break;
        }
        if (result != null)
        {
            if (this.operator.name.indexOf("NOT_")==0) {
                result = !result;
            }
            return BooleanValue.ValueOf(result);
        }
        // error management
        if (this.operator.name.lastIndexOf("IN")==this.operator.name.length-"IN".length) {
            const tmp = lval;
            lval = rval;
            rval = tmp;
        }
        const lowerName = this.operator.name.toLowerCase().replace('_', ' ');
        throw new SyntaxError("Illegal comparison: " + lval.type.toString() + " " + lowerName + " " + rval.type.toString());
    }

    containsAll(context, container, items) {
        const iterItems = items.getIterator(context);
        while(iterItems.hasNext()) {
            const item = iterItems.next();
            if (item instanceof Value) {
                if (!container.hasItem(context, item)) {
                    return false;
                }
            } else
                context.problemListener.reportIllegalContains();
                // throw new SyntaxError("Illegal contains: " + typeof(container) + " + " + typeof(item));
        }
        return true;
    }

    containsAny(context, container, items) {
        const iterItems = items.getIterator(context);
        while(iterItems.hasNext()) {
            const item = iterItems.next();
            if (item instanceof Value)
            {
                if (container.hasItem(context, item)) {
                    return true;
                }
            } else
                context.problemListener.reportIllegalContains();
                // throw new SyntaxError("Illegal contains: " + typeof(container) + " + " + typeof(item));
        }
        return false;
    }

    interpretAssert(context, test) {
        const lval = this.left.interpret(context);
        const rval = this.right.interpret(context);
        const result = this.interpretValues(context, lval, rval);
        if(result==BooleanValue.TRUE)
            return true;
        const expected = this.getExpected(context, test.dialect);
        const actual = lval.toString() + " " + this.operator.toString() +  " " + rval.toString();
        test.printFailedAssertion(context, expected, actual);
        return false;
    }

    transpileFound(transpiler, dialect) {
        transpiler.append("('");
        this.left.transpile(transpiler);
        transpiler.append("') + '").append(this.operator.toString()).append("' + ('");
        this.right.transpile(transpiler);
        transpiler.append("')");
    }

    getExpected(context, dialect, escapeMode) {
        const writer = new CodeWriter(dialect, context);
        writer.escapeMode = escapeMode;
        this.toDialect(writer);
        return writer.toString();
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
        const info = decl.getAttributeInfo();
        let value = this.right.interpret(context);
        if (value instanceof Instance)
            value = value.getMemberValue(context, "dbId", false);
        const data = value.getStorableData();
        const matchOp = this.getMatchOp(context, decl.getType(), value.type, this.operator, false);
        query.verify(info, matchOp, data);
        if (this.operator.name.indexOf("NOT_")==0)
            query.not();
    }

    transpileQuery(transpiler, builder) {
        const decl = this.left.checkAttribute(transpiler.context);
        if(!decl || !decl.storable)
            throw new SyntaxError("Unable to transpile predicate");
        const info = decl.getAttributeInfo();
        const type = this.right.check(transpiler.context);
        // TODO check for dbId field of instance value
        const matchOp = this.getMatchOp(transpiler.context, decl.getType(), type, this.operator, false);
        transpiler.append(builder).append(".verify(").append(info.toTranspiled()).append(", MatchOp.").append(matchOp.name).append(", ");
        this.right.transpile(transpiler);
        transpiler.append(");").newLine();
        if (this.operator.name.indexOf("NOT_")==0)
            transpiler.append(builder).append(".not();").newLine();
    }

    getAttributeType(context, name) {
        return context.getRegisteredDeclaration(name).getType();
    }

    getMatchOp(context, fieldType, valueType, operator, reverse) {
        if (reverse) {
            const reversed = operator.reverse();
            if (reversed == null)
                throw new SyntaxError("Cannot reverse " + this.operator.toString());
            else
                return this.getMatchOp(context, valueType, fieldType, reversed, false);
        }
        if (operator == ContOp.HAS || operator == ContOp.NOT_HAS)
            return MatchOp.HAS;
        else if (operator == ContOp.IN || operator == ContOp.NOT_IN)
            return MatchOp.IN;
        else
            throw new SyntaxError("Unsupported operator: " + operator.toString());
    }

    readFieldName(exp) {
        if (exp instanceof UnresolvedIdentifier || exp instanceof InstanceExpression || exp instanceof MemberSelector)
            return exp.toString();
        else
            return null;
    }

    declare(transpiler) {
        const lt = this.left.check(transpiler.context);
        const rt = this.right.check(transpiler.context);
        switch(this.operator) {
            case ContOp.IN:
            case ContOp.NOT_IN:
                return rt.declareContains(transpiler, lt, this.right, this.left);
            case ContOp.HAS:
            case ContOp.NOT_HAS:
                return lt.declareContains(transpiler, rt, this.left, this.right);
            default:
                return lt.declareContainsAllOrAny(transpiler, rt, this.left, this.right);
        }
    }

    transpile(transpiler) {
        const lt = this.left.check(transpiler.context);
        const rt = this.right.check(transpiler.context);
        switch(this.operator) {
            case ContOp.NOT_IN:
                transpiler.append("!");
                // no-break
            case ContOp.IN:
                return rt.transpileContains(transpiler, lt, this.right, this.left);
            case ContOp.NOT_HAS:
                transpiler.append("!");
                // no-break
            case ContOp.HAS:
                return lt.transpileContains(transpiler, rt, this.left, this.right);
            case ContOp.NOT_HAS_ALL:
                transpiler.append("!");
                // no-break
            case ContOp.HAS_ALL:
                return lt.transpileContainsAll(transpiler, rt, this.left, this.right);
            case ContOp.NOT_HAS_ANY:
                transpiler.append("!");
                // no-break
            case ContOp.HAS_ANY:
                return lt.transpileContainsAny(transpiler, rt, this.left, this.right);
            default:
                throw new Error("Unsupported " + this.operator);
        }
    }
}
