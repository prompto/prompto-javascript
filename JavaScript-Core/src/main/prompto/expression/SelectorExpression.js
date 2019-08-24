var Expression = require("./Expression").Expression;
var UnresolvedIdentifier;

exports.resolve = function() {
    UnresolvedIdentifier = require("./UnresolvedIdentifier").UnresolvedIdentifier;
}

function SelectorExpression(parent) {
    Expression.call(this);
	this.parent = parent || null;
	return this;
}

SelectorExpression.prototype = Object.create(Expression.prototype);
SelectorExpression.prototype.constructor = SelectorExpression;


SelectorExpression.prototype.checkParent = function(context) {
    if (this.parent instanceof UnresolvedIdentifier)
        return this.parent.checkMember(context);
    else
        return this.parent.check(context);
};


exports.SelectorExpression = SelectorExpression;