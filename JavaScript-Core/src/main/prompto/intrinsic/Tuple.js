function Tuple(items) {
	Array.call(this);
	if((items || null)!==null) {
		this.addAll(items);
	}
	return this;
}

Tuple.prototype = Object.create(Array.prototype);
Tuple.prototype.constructor = Tuple;

Tuple.prototype.addAll = function(items) {
    if(typeof(StrictSet) !== 'undefined' && items instanceof StrictSet)
    	items = Array.from(items.set.values());
	this.push.apply(this, items);
	return this; // enable fluid API
};

Tuple.prototype.toString = function() {
	return "(" + this.join(", ") + ")";
};

exports.Tuple = Tuple;