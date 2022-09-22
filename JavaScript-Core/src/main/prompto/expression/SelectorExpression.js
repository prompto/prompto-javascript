import BaseExpression from './BaseExpression.ts'
import { UnresolvedIdentifier } from '../expression'

export default class SelectorExpression extends BaseExpression {

    constructor(parent) {
        super();
        this.parent = parent || null;
    }

    checkParent(context) {
        if (this.parent instanceof UnresolvedIdentifier)
            return this.parent.checkMember(context);
        else
            return this.parent.check(context);
    }
}
