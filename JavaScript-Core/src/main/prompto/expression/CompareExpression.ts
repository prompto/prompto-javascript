import BaseExpression from './BaseExpression'
import {CmpOp, Identifier} from '../grammar'
import {MatchOp, IQueryBuilder} from '../store'
import { SyntaxError, InvalidDataError } from '../error'
import {BooleanValue, Instance, IValue} from '../value'
import { CodeWriter } from '../utils'
import { TypeFamily } from '../store'
import { LocalDate, DateTime } from '../intrinsic'
import {IExpression} from "./index";
import {Context, Transpiler} from "../runtime";
import {IType} from "../type";
import {TestMethodDeclaration} from "../declaration";
import {Dialect} from "../parser";

export default class CompareExpression extends BaseExpression {

    left: IExpression;
    operator: CmpOp;
    right: IExpression;

    constructor(left: IExpression, operator: CmpOp, right: IExpression) {
        super();
        this.left = left;
        this.operator = operator;
        this.right = right;
    }

    toString() {
        return this.left.toString() + " " + this.operator.toString() + " " + this.right.toString();
    }

    toDialect(writer: CodeWriter): void {
        this.left.toDialect(writer);
        writer.append(" ");
        this.operator.toDialect(writer);
        writer.append(" ");
        this.right.toDialect(writer);
    }

    check(context: Context): IType {
        const lt = this.left.check(context);
        const rt = this.right.check(context);
        return this.checkOperator(context, lt, rt);
    }

    checkOperator(context: Context, lt: IType, rt: IType): IType {
        return lt.checkCompare(context, this, rt);
    }

    interpret(context: Context): IValue {
        const lval = this.left.interpret(context);
        const rval = this.right.interpret(context);
        return this.compare(context, lval, rval);
    }

    declare(transpiler: Transpiler): void {
        this.left.declare(transpiler);
        this.right.declare(transpiler);
        const lt = this.left.check(transpiler.context);
        const rt = this.right.check(transpiler.context);
        return lt.declareCompare(transpiler, rt);
    }

    transpile(transpiler: Transpiler): void {
        const lt = this.left.check(transpiler.context);
        const rt = this.right.check(transpiler.context);
        return lt.transpileCompare(transpiler, rt, this.operator, this.left, this.right);
    }

    compare(context: Context, lval: IValue, rval: IValue): BooleanValue {
        const cmp = lval.CompareTo(context, rval);
        switch (this.operator) {
            case CmpOp.GT:
                return BooleanValue.ValueOf(cmp > 0);
            case CmpOp.LT:
                return BooleanValue.ValueOf(cmp < 0);
            case CmpOp.GTE:
                return BooleanValue.ValueOf(cmp >= 0);
            case CmpOp.LTE:
                return BooleanValue.ValueOf(cmp <= 0);
        }
        throw new Error("Should never get there!");
    }

    interpretAssert(context: Context, test: TestMethodDeclaration): boolean {
        const lval = this.left.interpret(context);
        const rval = this.right.interpret(context);
        const result = this.compare(context, lval, rval);
        if(result==BooleanValue.TRUE)
            return true;
        const expected = this.getExpected(context, test.dialect, 0);
        const actual = lval.toString() + this.operator.toString() + rval.toString();
        test.printFailedAssertion(context, expected, actual);
        return false;
    }

    getExpected(context: Context, dialect: Dialect, escapeMode: number): string {
        const writer = new CodeWriter(dialect, context);
        writer.escapeMode = escapeMode;
        this.toDialect(writer);
        return writer.toString();
    }

    transpileFound(transpiler: Transpiler, dialect: Dialect): void {
        transpiler.append("(");
        this.left.transpile(transpiler);
        transpiler.append(") + '").append(this.operator.toString()).append("' + (");
        this.right.transpile(transpiler);
        transpiler.append(")");
    }

    checkQuery(context: Context): IType {
        const decl = this.left.checkAttribute(context);
        if(!decl || !decl.storable)
            context.problemListener.reportNotStorable(this, decl!.name);
        const rt = this.right.check(context);
        return this.checkOperator(context, decl!.getType(), rt);
    }

    interpretQuery(context: Context, query: IQueryBuilder): void {
        const decl = this.left.checkAttribute(context);
        if(!decl || !decl.storable)
            throw new SyntaxError("Unable to interpret predicate");
        let value = this.right.interpret(context);
        const info = decl.getAttributeInfo();
        if (value instanceof Instance)
            value = value.getMemberValue(context, Identifier.DB_ID, false);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        let data = value ? value.getStorableData() : null;
        if(info.family == TypeFamily.DATETIME && data instanceof LocalDate)
            data = DateTime.fromDateAndTime(data, null);
        else if(info.family == TypeFamily.DATE && data instanceof DateTime)
            data = data.getDate();
        query.verify(info, this.getMatchOp(), data);
        if (this.operator == CmpOp.GTE || this.operator==CmpOp.LTE)
            query.not();
    }

    transpileQuery(transpiler: Transpiler, builderName: string): void {
        const decl = this.left.checkAttribute(transpiler.context);
        if(!decl || !decl.storable)
            throw new SyntaxError("Unable to interpret predicate");
        const info = decl.getAttributeInfo();
        const matchOp = this.getMatchOp();
        // TODO check for dbId field of instance value
        transpiler.append(builderName).append(".verify(").append(info.toTranspiled()).append(", MatchOp.").append(matchOp.name).append(", ");
        this.right.transpile(transpiler);
        transpiler.append(");").newLine();
        if (this.operator == CmpOp.GTE || this.operator==CmpOp.LTE)
            transpiler.append(builderName).append(".not();").newLine();
    }

    getMatchOp(): MatchOp {
        if (this.operator == CmpOp.GT || this.operator == CmpOp.LTE)
            return MatchOp.GREATER;
        else if (this.operator == CmpOp.GTE || this.operator == CmpOp.LT)
            return MatchOp.LESSER;
        else
            throw new InvalidDataError(this.operator.toString());
    }

}

