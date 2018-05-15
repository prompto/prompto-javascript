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

Range.prototype.equals = function(obj) {
    if(Object.is(this, obj))
        return true;
    else if(Object.getPrototypeOf(this) === Object.getPrototypeOf(obj))
        return equalObjects(this.first, obj.first) && equalObjects(this.last, obj.last);
    else
        return false;
};

Range.prototype.hasAll = function(items) {
    if(typeof(StrictSet) !== 'undefined' && items instanceof StrictSet)
        items = Array.from(items.values());
    for (var i = 0; i < items.length; i++) {
        if (!this.has(items[i]))
            return false;
    }
    return true;
};


Range.prototype.slice1Based = function(start, end) {
    var range = Object.create(this);
    range.first = start ? this.item(start-1) : this.first;
    range.last = end ? ( end > 0 ? this.item(end-1) : this.item(this.length + 1 + end) ) : this.last;
    return range;
};


Range.prototype.hasAny = function(items) {
    if(typeof(StrictSet) !== 'undefined' && items instanceof StrictSet)
        items = Array.from(items.values());
    for (var i = 0; i < items.length; i++) {
        if (this.has(items[i]))
            return true;
    }
    return false;
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

IntegerRange.prototype.has = function(value) {
    var int = Math.floor(value);
    return int==value && int>=this.first && int<=this.last;
};

function CharacterRange(first, last) {
    IntegerRange.call(this, first.charCodeAt(0), last.charCodeAt(0));
    return this;
}

CharacterRange.prototype = Object.create(IntegerRange.prototype);
CharacterRange.prototype.constructor = CharacterRange;

CharacterRange.prototype.has = function(value) {
    var int = value.charCodeAt(0);
    return int>=this.first && int<=this.last;
};


CharacterRange.prototype.item = function(idx) {
    return String.fromCharCode(this.first + idx);
};


function DateRange(first, last) {
    Range.call(this, first, last);
    return this;
}

DateRange.prototype = Object.create(Range.prototype);
DateRange.prototype.constructor = DateRange;

Object.defineProperty(DateRange.prototype, "length", {
    get: function() {
        var h = this.last.valueOf();
        var l = this.first.valueOf();
        return 1 + ( (h-l)/(24*60*60*1000));
    }
});

DateRange.prototype.item = function(idx) {
    var millis = this.first.valueOf() + (idx-1)*(24*60*60*1000);
    if(millis > this.last.valueOf()) {
        throw new RangeError();
    } else {
        return new LocalDate(millis);
    }
};

DateRange.prototype.has = function(value) {
    var int = value.valueOf();
    return int>=this.first.valueOf() && int<=this.last.valueOf();
};

function TimeRange(first, last) {
    Range.call(this, first, last);
    return this;
}

TimeRange.prototype = Object.create(Range.prototype);
TimeRange.prototype.constructor = TimeRange;

Object.defineProperty(TimeRange.prototype, "length", {
    get: function() {
        return 1 + (this.last.valueOf() - this.first.valueOf())/1000;
    }
});

TimeRange.prototype.item = function(idx) {
    var result = this.first.valueOf() + (idx-1)*1000;
    if(result > this.last.valueOf()) {
        throw new RangeError();
    }
    return new LocalTime(result);
};

TimeRange.prototype.has = function(value) {
    var int = value.valueOf();
    return int >= this.first.valueOf() && int <= this.last.valueOf();
};


exports.Range = Range;
exports.IntegerRange = IntegerRange;
exports.CharacterRange = CharacterRange;
exports.DateRange = DateRange;
exports.TimeRange = TimeRange;