function Range(first, last) {
    this.first = first;
    this.last = last;
    return this;
}

Range.prototype.values = function() {
    var self = this;
    return {
        idx: 0,
        length: self.length,
        hasNext: function() { return this.idx < this.length },
        next : function() { return self.item(this.idx++); }
    };
};

function IntegerRange(first, last) {
    Range.call(this, first, last);
    return this;
}

IntegerRange.prototype = Object.create(Range.prototype);
IntegerRange.prototype.constructor = IntegerRange;

Object.defineProperty(IntegerRange.prototype, "length", {
    get: function() {
        return 1 + this.last - this.first;
    }
});

IntegerRange.prototype.item = function(idx) {
    return this.first + idx;
};

exports.Range = Range;
exports.IntegerRange = IntegerRange;