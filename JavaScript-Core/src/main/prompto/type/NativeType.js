var BaseType = require("./BaseType").BaseType;

class NativeType extends BaseType {
    constructor(id) {
        super(id);
        return this;
    }

    getSortedComparator(context, key, desc) {
        if(key==null)
            return this.getNativeSortedComparator(desc);
        else
            return this.getExpressionSortedComparator(context, key, desc);
    }

    getExpressionSortedComparator(context, expression, desc) {
        var ArrowExpression = require("../expression/ArrowExpression").ArrowExpression;
        if(expression instanceof ArrowExpression)
            return expression.getSortedComparator(context, this, desc);
        else
            throw new Error("Not supported!");
    }

    getNativeSortedComparator(desc) {
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
    }

    checkUnique(context) {
        // nothing to do
    }

    checkExists(context) {
        // nothing to do
    }

    isMoreSpecificThan(context, other) {
        return false;
    }

    equals(obj) {
        return obj===this;
    }

    declareSorted(transpiler, key) {
        // nothing to do
    }

    transpileSortedComparator(transpiler, key, desc) {
        var ArrowExpression = require("../expression/ArrowExpression").ArrowExpression;
        if(key instanceof ArrowExpression)
            return key.transpileSortedComparator(transpiler, this, desc);
        else if(desc)
            transpiler.append("function(o1, o2) { return o1 === o2 ? 0 : o1 > o2 ? -1 : 1; }");
    }
}


exports.NativeType = NativeType;


