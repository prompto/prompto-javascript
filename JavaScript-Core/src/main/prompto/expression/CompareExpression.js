import Expression from './Expression.js'
import { CmpOp } from '../grammar/index.js'
import { MatchOp } from '../store/index.js'
import { SyntaxError, InvalidDataError } from '../error/index.js'
import { BooleanValue, Instance } from '../value/index.js'
import { CodeWriter } from '../utils/index.js'
import { TypeFamily } from '../store/index.js'
import { LocalDate, DateTime } from '../intrinsic/index.js'

export default class CompareExpression extends Expression {
  
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
        const lt = this.left.check(context);
        const rt = this.right.check(context);
        return this.checkOperator(context, lt, rt);
    }

    checkOperator(context, lt, rt) {
        return lt.checkCompare(context, this, rt);
    }

    interpret(context) {
        const lval = this.left.interpret(context);
        const rval = this.right.interpret(context);
        return this.compare(context, lval, rval);
    }

    declare(transpiler) {
        this.left.declare(transpiler);
        this.right.declare(transpiler);
        const lt = this.left.check(transpiler.context);
        const rt = this.right.check(transpiler.context);
        return lt.declareCompare(transpiler, rt);
    }

    transpile(transpiler) {
        const lt = this.left.check(transpiler.context);
        const rt = this.right.check(transpiler.context);
        return lt.transpileCompare(transpiler, rt, this.operator, this.left, this.right);
    }

    compare(context, lval, rval) {
        const cmp = lval.compareToValue(context, rval);
        switch (this.operator) {
            case CmpOp.GT:
                return BooleanValue.ValueOf(cmp > 0);
            case CmpOp.LT:
                return BooleanValue.ValueOf(cmp < 0);
            case CmpOp.GTE:
                return BooleanValue.ValueOf(cmp >= 0);
            case CmpOp.LTE:
                return BooleanValue.ValueOf(cmp <= 0);
            default:
                context.problemListener.reportIllegalOperand();
                // throw new SyntaxError("Illegal operand: " + this.operator.toString());
        }
    }

    interpretAssert(context, test) {
        const lval = this.left.interpret(context);
        const rval = this.right.interpret(context);
        const result = this.compare(context, lval, rval);
        if(result==BooleanValue.TRUE)
            return true;
        const expected = this.getExpected(context, test.dialect);
        const actual = lval.toString() + this.operator.toString() + rval.toString();
        test.printFailedAssertion(context, expected, actual);
        return false;
    }

    getExpected(context, dialect, escapeMode) {
        const writer = new CodeWriter(dialect, context);
        writer.escapeMode = escapeMode;
        this.toDialect(writer);
        return writer.toString();
    }

    transpileFound(transpiler, dialect) {
        transpiler.append("(");
        this.left.transpile(transpiler);
        transpiler.append(") + '").append(this.operator.toString()).append("' + (");
        this.right.transpile(transpiler);
        transpiler.append(")");
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
        if(!decl.storable)
            throw new SyntaxError("Unable to interpret predicate");
        let value = this.right.interpret(context);
        const info = decl.getAttributeInfo();
        if (value instanceof Instance)
            value = value.getMemberValue(context, "dbId", false);
        let data = value == null ? null : value.getStorableData();
        if(info.family === TypeFamily.DATETIME && data instanceof LocalDate)
            data = DateTime.fromDateAndTime(data, null);
        else if(info.family === TypeFamily.DATE && data instanceof DateTime)
            data = data.getDate();
        query.verify(info, this.getMatchOp(), data);
        if (this.operator == CmpOp.GTE || this.operator==CmpOp.LTE)
            query.not();
    }

    transpileQuery(transpiler, builder) {
        const decl = this.left.checkAttribute(transpiler.context);
        if(!decl.storable)
            throw new SyntaxError("Unable to interpret predicate");
        const info = decl.getAttributeInfo();
        const matchOp = this.getMatchOp();
        // TODO check for dbId field of instance value
        transpiler.append(builder).append(".verify(").append(info.toTranspiled()).append(", MatchOp.").append(matchOp.name).append(", ");
        this.right.transpile(transpiler);
        transpiler.append(");").newLine();
        if (this.operator == CmpOp.GTE || this.operator==CmpOp.LTE)
            transpiler.append(builder).append(".not();").newLine();
    }

    getMatchOp() {
        if (this.operator == CmpOp.GT || this.operator == CmpOp.LTE)
            return MatchOp.GREATER;
        else if (this.operator == CmpOp.GTE || this.operator == CmpOp.LT)
            return MatchOp.LESSER;
        else
            throw new InvalidDataError(this.operator.toString());
    }
}

