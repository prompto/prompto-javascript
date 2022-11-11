import ContextualExpression from './ContextualExpression';
import { IMethodDeclaration } from "../declaration";
import { Context } from "../runtime";
import { ArrowExpression } from "../expression";
import IValue from "./IValue";
export default class ArrowValue extends ContextualExpression {
    method: IMethodDeclaration;
    constructor(method: IMethodDeclaration, calling: Context, expression: ArrowExpression);
    interpretExpression(context: Context): IValue;
}
