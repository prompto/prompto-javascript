import BaseExpression from './BaseExpression'
import { UnresolvedIdentifier } from '../expression'
import { IExpression}  from "./index";
import {IType} from "../type";
import {Context} from "../runtime";

export default class SelectorBase extends BaseExpression {

    parent?: IExpression | null;

    constructor(parent?: IExpression | null) {
        super();
        this.parent = parent;
    }

    checkParent(context: Context): IType {
        if (this.parent instanceof UnresolvedIdentifier)
            return this.parent.checkMember(context);
        else
            return this.parent!.check(context);
    }
}
