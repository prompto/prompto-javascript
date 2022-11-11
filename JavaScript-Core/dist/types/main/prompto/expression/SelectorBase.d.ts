import BaseExpression from './BaseExpression';
import { IExpression } from "./index";
import { IType } from "../type";
import { Context } from "../runtime";
export default class SelectorBase extends BaseExpression {
    parent?: IExpression | null;
    constructor(parent?: IExpression | null);
    checkParent(context: Context): IType;
}
