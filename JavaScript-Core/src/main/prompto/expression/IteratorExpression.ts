 import BaseExpression from './BaseExpression'
import { ParenthesisExpression } from '../expression'
import {Context, Transpiler, Variable} from '../runtime'
import { IteratorType, IType } from '../type'
import {IterableValue, IValue} from '../value'
import { UnresolvedCall } from '../statement'
import { InternalError } from '../error'
import { Identifier } from "../grammar";
 import IExpression from "../../../main/prompto/expression/IExpression";
 import {CodeWriter} from "../utils";
 import {IIterator} from "../intrinsic";
 import IValueIterable from "../value/IValueIterable";

export default class IteratorExpression extends BaseExpression {

    id: Identifier;
    source: IExpression;
    expression: IExpression;

    constructor(id: Identifier, source: IExpression, expression: IExpression) {
        super();
        this.id = id;
        this.source = source;
        this.expression = expression;
    }

    check(context: Context): IType {
        const elemType = this.source.check(context).checkIterator(context, this, this.source);
        const child = context.newChildContext();
        child.registerInstance(new Variable(this.id, elemType), true);
        const itemType = this.expression.check(child);
        return new IteratorType(itemType);
    }

    interpret(context: Context): IValue {
        const elemType = this.source.check(context).checkIterator(context, this, this.source);
        const items = this.source.interpret(context);
        const length = items.GetMemberValue(context, new Identifier("count")).getStorableData() as number;
        const iterable = {
            count: length,
            totalCount: length,
            getIterator: (context: Context) => this.getIterator(context, items)
        }
        return new IterableValue(context, this.id, elemType, iterable, this.expression, elemType);
    }

    declare(transpiler: Transpiler): void {
        this.source.declare(transpiler);
        const sourceType = this.source.check(transpiler.context);
        sourceType.declareIterator(transpiler, this.id, this.expression);
    }

    transpile(transpiler: Transpiler): void {
        const srcType = this.source.check(transpiler.context);
        /*var resultType = */srcType.checkIterator(transpiler.context, this, this.source);
        this.source.transpile(transpiler);
        transpiler = transpiler.newChildTranspiler()
        srcType.transpileIterator(transpiler, this.id, this.expression);
        transpiler.flush()
    }

    getIterator(context: Context, source: IValue): IIterator<IValue> {
        if (source.isIterable())
            return (source as unknown as IValueIterable).getIterator(context);
        else
            throw new InternalError("Should never get there!");
    }

    toDialect(writer: CodeWriter): void {
        const srcType = this.source.check(writer.context);
        writer = writer.newChildWriter();
        const resultType = srcType.checkIterator(writer.context, this, this.source);
        writer.context.registerInstance(new Variable(this.id, resultType), true);
        writer.toDialect(this);
    }

    toMDialect(writer: CodeWriter): void {
        const expression = IteratorExpression.extractFromParenthesisIfPossible(this.expression);
        expression.toDialect(writer);
        writer.append(" for each ");
        writer.append(this.id.name);
        writer.append(" in ");
        this.source.toDialect(writer);
    }


    toODialect(writer: CodeWriter): void {
        const expression = IteratorExpression.extractFromParenthesisIfPossible(this.expression);
        expression.toDialect(writer);
        writer.append(" for each ( ");
        writer.append(this.id.name);
        writer.append(" in ");
        this.source.toDialect(writer);
        writer.append(" )");
    }

    toEDialect(writer: CodeWriter): void {
        const expression = IteratorExpression.encloseInParenthesisIfRequired(this.expression);
        expression.toDialect(writer);
        writer.append(" for each ");
        writer.append(this.id.name);
        writer.append(" in ");
        this.source.toDialect(writer);
    }

    static encloseInParenthesisIfRequired(expression: IExpression): IExpression {
        if(IteratorExpression.mustBeEnclosedInParenthesis(expression))
            return new ParenthesisExpression(expression);
        else
            return expression;
    }

    static extractFromParenthesisIfPossible(expression: IExpression): IExpression {
        if(expression instanceof ParenthesisExpression) {
            const enclosed = expression.expression;
            if(IteratorExpression.mustBeEnclosedInParenthesis(enclosed))
                return enclosed;
        }
        return expression;
    }

    static mustBeEnclosedInParenthesis(expression: IExpression): boolean {
        return expression instanceof UnresolvedCall;
    }
}
