import BaseExpression from './BaseExpression'
import { UnresolvedIdentifier } from '../expression'
import IExpression from "../../../main/prompto/expression/IExpression";
import {IType} from "../type";
import {Context} from "../runtime";

export default class SelectorExpression extends BaseExpression {

    parent: IExpression | null;

    constructor(parent?: IExpression) {
        super();
        this.parent = parent || null;
    }

    checkParent(context: Context): IType {
        if (this.parent instanceof UnresolvedIdentifier)
            return this.parent.checkMember(context);
        else
            return this.parent!.check(context);
    }
}
