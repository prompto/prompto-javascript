var JavaScriptSelectorExpression = require("./JavaScriptSelectorExpression").JavaScriptSelectorExpression;

function JavaScriptItemExpression(item) {
	JavaScriptSelectorExpression.call(this);
	this.item = item || null;
	return this;
}

JavaScriptItemExpression.prototype = Object.create(JavaScriptSelectorExpression.prototype);
JavaScriptItemExpression.prototype.constructor = JavaScriptItemExpression;

/*
	@Override
	public IType check(Context context) throws SyntaxError {
		// TODO Auto-generated method stub
		return null;
	}
	
	@Override
	public Object evaluate(Context context) {
		// TODO Auto-generated method stub
		return null;
	}
*/

JavaScriptItemExpression.prototype.toString = function() {
	return this.parent.toString() + "[" + this.item.toString() + "]";
};

exports.JavaScriptItemExpression = JavaScriptItemExpression;