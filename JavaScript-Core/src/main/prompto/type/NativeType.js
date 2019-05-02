var BaseType = require("./BaseType").BaseType;

function NativeType(id) {
	BaseType.call(this, id);
	return this;
}

NativeType.prototype = Object.create(BaseType.prototype);
NativeType.prototype.constructor = NativeType;


NativeType.prototype.getSortedComparator = function(context, key, desc) {
    if(key==null)
        return this.getNativeSortedComparator(desc);
    else
        return this.getExpressionSortedComparator(context, key, desc);
};


NativeType.prototype.getExpressionSortedComparator = function(context, expression, desc) {
    var ArrowExpression = require("../expression/ArrowExpression").ArrowExpression;
    if(expression instanceof ArrowExpression)
        return expression.getSortedComparator(context, this, desc);
    else
        throw new Error("Not supported!");
};


NativeType.prototype.getNativeSortedComparator = function(desc) {
    if(desc)
        return function(o1, o2) {
            o1 = o1.value;
            o2 = o2.value;
            return o1 < o2 ? 1 : o1 === o2 ? 0 : -1;
        };
    else
        return function(o1, o2) {
            o1 = o1.value;
            o2 = o2.value;
            return o1 > o2 ? 1 : o1 === o2 ? 0 : -1;
        };
};


NativeType.prototype.checkUnique = function(context) {
	// nothing to do
};

NativeType.prototype.checkExists = function(context) {
	// nothing to do
};

NativeType.prototype.isMoreSpecificThan = function(context, other) {
	return false;
};

NativeType.prototype.equals = function(obj) {
	return obj===this;
};

NativeType.prototype.declareSorted = function(transpiler, key) {
    // nothing to do
};

NativeType.prototype.transpileSortedComparator = function(transpiler, key, desc) {
    var ArrowExpression = require("../expression/ArrowExpression").ArrowExpression;
    if(key instanceof ArrowExpression)
        return key.transpileSortedComparator(transpiler, this, desc);
    else if(desc)
        transpiler.append("function(o1, o2) { return o1 === o2 ? 0 : o1 > o2 ? -1 : 1; }");
};


exports.NativeType = NativeType;


