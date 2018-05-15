function RangeLiteral(first, last) {
	this.first = first;
	this.last = last;
	return this;
}


RangeLiteral.prototype.toString = function() {
	return "[" + this.first.toString() + ".." + this.last.toString() + "]";
};

RangeLiteral.prototype.toDialect = function(writer) {
    writer.append("[");
    this.first.toDialect(writer);
    writer.append("..");
    this.last.toDialect(writer);
    writer.append("]");
};


RangeLiteral.prototype.check = function(context) {
	var firstType = this.first.check(context);
	var lastType = this.last.check(context);
	return firstType.checkRange(context,lastType);
};

RangeLiteral.prototype.interpret = function(context) {
	var type = this.first.check(context);
	if("IntegerLimits"==type.name) {
		type = IntegerType.instance;
	}
	var of = this.first.interpret(context);
	var ol = this.last.interpret(context);
	return type.newRange(of,ol);
};

RangeLiteral.prototype.declare = function(transpiler) {
    var firstType = this.first.check(transpiler.context);
    firstType.declare(transpiler);
    var lastType = this.last.check(transpiler.context);
    lastType.declare(transpiler);
    return firstType.declareRange(transpiler, lastType);
};

RangeLiteral.prototype.transpile = function(transpiler) {
    var firstType = this.first.check(transpiler.context);
    return firstType.transpileRange(transpiler, this.first, this.last);
};

exports.RangeLiteral = RangeLiteral;

