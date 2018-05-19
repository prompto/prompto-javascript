var BaseType = require("./BaseType").BaseType;

function NativeType(id) {
	BaseType.call(this, id);
	return this;
}

NativeType.prototype = Object.create(BaseType.prototype);
NativeType.prototype.constructor = NativeType;

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

NativeType.prototype.sort = function(context, list, desc) {

    function cmp(o1, o2) {
        o1 = o1.value;
        o2 = o2.value;
        return o1 > o2 ? 1 : o1 === o2 ? 0 : -1;
    }
    return this.doSort(context, list, cmp, desc);
};

NativeType.prototype.declareSorted = function(transpiler, key) {
    // nothing to do
};

NativeType.prototype.transpileSorted = function(transpiler, desc, key) {
    if(desc)
        transpiler.append("function(o1, o2) { return o1 === o2 ? 0 : o1 > o2 ? -1 : 1; }");
    else
        transpiler.append("function(o1, o2) { return o1 === o2 ? 0 : o1 > o2 ? 1 : -1; }");
};


exports.NativeType = NativeType;


