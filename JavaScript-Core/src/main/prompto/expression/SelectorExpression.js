
export default class SelectorExpression extends Expression {
    constructor(parent) {
        super();
        this.parent = parent || null;
        return this;
    }

    checkParent(context) {
        if (this.parent instanceof UnresolvedIdentifier)
            return this.parent.checkMember(context);
        else
            return this.parent.check(context);
    }
}
