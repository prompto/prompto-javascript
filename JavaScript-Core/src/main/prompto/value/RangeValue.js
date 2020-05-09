var Value = require("./Value").Value;
var IntegerValue = require("./IntegerValue").IntegerValue;
var IndexOutOfRangeError = require("../error/IndexOutOfRangeError").IndexOutOfRangeError;
var InternalError = require("../error/InternalError").InternalError;
var BaseType = require("../type/BaseType").BaseType;
var RangeType = require("../type/RangeType").RangeType;

function RangeValue(itemType, left, right) {
    if(!(itemType instanceof BaseType))
        return;
	Value.call(this, new RangeType(itemType));
	var cmp = left.cmp(right);
	if(cmp<0) {
		this.low = left;
		this.high = right;
	} else {
		this.low = right;
		this.high = left;
	}
	return this;
}

RangeValue.prototype = Object.create(Value.prototype);
RangeValue.prototype.constructor = RangeValue;

RangeValue.prototype.getMemberValue = function(context, name) {
	if("count" == name)
		return new IntegerValue(this.size());
	else
		throw new SyntaxError("No member support for " + name + " in " + this.constructor.name);
};

RangeValue.prototype.toString = function() {
	return "[" + (this.low==null?"":this.low.toString()) + ".."
			+ (this.high==null?"":this.high.toString()) + "]";
};

RangeValue.prototype.equals = function(obj) {
	if(obj instanceof RangeValue) {
		return this.low.equals(obj.low) && this.high.equals(obj.high);
	} else {
		return false;
	}
};


RangeValue.prototype.hasItem = function(context, lval) {
	var a = lval.cmp(this.low);
	var b = this.high.cmp(lval);
	return a>=0 && b>=0;
};

RangeValue.prototype.getItemInContext = function(context, index) {
	if (index instanceof IntegerValue) {
		try {
			var value = this.getItem(index.IntegerValue());
			if (value instanceof Value) {
				return value;
			} else {
				throw new InternalError("Item not a value!");
			}
		} catch (e) {
			throw new IndexOutOfRangeError();
		}

	} else {
		throw new SyntaxError("No such item:" + index.toString());
	}
};

RangeValue.prototype.slice = function(fi, li) {
	var size = this.size();
	var first = this.checkFirst(fi, size);
	var last = this.checkLast(li, size);
	return this.newInstance(this.getItem(first),this.getItem(last));
}

RangeValue.prototype.checkFirst = function(fi, size) {
	var value = (fi == null) ? 1 : fi.IntegerValue();
	if (value < 1 || value > size) {
		throw new IndexOutOfRangeError();
	}
	return value;
};

RangeValue.prototype.checkLast = function(li, size) {
	var value = (li == null) ? size : li.IntegerValue();
	if (value < 0) {
		value = size + 1 + li.IntegerValue();
	}
	if (value < 1 || value > size) {
		throw new IndexOutOfRangeError();
	}
	return value;
};

RangeValue.prototype.getIterator = function(context) {
	return new RangeIterator(context, this);
};

function RangeIterator(context, range) {
	this.context = context;
	this.range = range;
	this.index = 0;
	return this;
}

RangeIterator.prototype.hasNext = function() {
	return this.index<this.range.size();
};

RangeIterator.prototype.next = function() {
	return this.range.getItemInContext(this.context, new IntegerValue(++this.index));
};


exports.RangeValue = RangeValue;