import Expression from './Expression.js'
import { Dialect } from '../parser/index.js'
import { BooleanValue } from '../value/index.js'
import { CodeWriter } from '../utils/index.js'

export default class OrExpression extends Expression {
  
    constructor(left, right) {
        super();
        this.left = left;
        this.right = right;
    }

    toString() {
        return this.left.toString() + " or " + this.right.toString();
    }

    toDialect(writer) {
        writer.toDialect(this);
    }

    operatorToDialect(dialect) {
        return dialect==Dialect.O ? " || " : " or ";
    }

    toEDialect(writer) {
        this.left.toDialect(writer);
        writer.append(this.operatorToDialect(writer.dialect));
        this.right.toDialect(writer);
    }

    toODialect(writer) {
        this.left.toDialect(writer);
        writer.append(this.operatorToDialect(writer.dialect));
        this.right.toDialect(writer);
    }

    toMDialect(writer) {
        this.left.toDialect(writer);
        writer.append(this.operatorToDialect(writer.dialect));
        this.right.toDialect(writer);
    }

    check(context) {
        const lt = this.left.check(context);
        const rt = this.right.check(context);
        return lt.checkOr(context, rt);
    }

    checkQuery(context) {
        if (!this.left["checkQuery"]) {
            context.problemListener.reportIllegalOperation(this, "Not a predicate: " + this.left.toString());
            return;
        }
        this.left.checkQuery(context);
        if (!this.right["checkQuery"]) {
            context.problemListener.reportIllegalOperation(this, "Not a predicate: " + this.right.toString());
            return;
        }
        this.right.checkQuery(context);
    }

    declare(transpiler) {
        this.left.declare(transpiler);
        this.right.declare(transpiler);
    }

    transpile(transpiler) {
        this.left.transpile(transpiler);
        transpiler.append(" || ");
        this.right.transpile(transpiler);
    }

    interpret(context) {
        const lval = this.left.interpret(context);
        const rval = this.right.interpret(context);
        return lval.Or(rval);
    }

    interpretAssert(context, test) {
        const lval = this.left.interpret(context);
        const rval = this.right.interpret(context);
        const result = lval.Or(rval);
        if(result==BooleanValue.TRUE)
            return true;
        const expected = this.getExpected(context, test.dialect);
        const actual = lval.toString() + this.operatorToDialect(test.dialect) + rval.toString();
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
        transpiler.append(") + '").append(this.operatorToDialect(dialect)).append("' + (");
        this.right.transpile(transpiler);
        transpiler.append(")");
    }

    interpretQuery(context, query) {
        if (!this.left["interpretQuery"])
            context.problemListener.reportIllegalOperation(this, "Not a predicate: " + this.left.toString());
        this.left.interpretQuery(context, query);
        if (!this.right["interpretQuery"])
            context.problemListener.reportIllegalOperation(this, "Not a predicate: " + this.right.toString());
        this.right.interpretQuery(context, query);
        query.or();
    }

    declareQuery(transpiler) {
        this.left.declareQuery(transpiler);
        this.right.declareQuery(transpiler);
    }

    transpileQuery(transpiler, builderName) {
        this.left.transpileQuery(transpiler, builderName);
        this.right.transpileQuery(transpiler, builderName);
        transpiler.append(builderName).append(".or();").newLine();
    }
}
