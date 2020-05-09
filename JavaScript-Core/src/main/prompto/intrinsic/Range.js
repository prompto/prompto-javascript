var equalObjects = require("../utils/Utils").equalObjects;
var StrictSet = require("./StrictSet").StrictSet;
var LocalDate = require("./LocalDate").LocalDate;
var LocalTime = require("./LocalTime").LocalTime;
var List = require("./List").List;


function Range(first, last) {
    this.first = first;
    this.last = last;
    return this;
}

Range.prototype.toString = function() {
    return "[" + this.first + ".." + this.last + "]";
};


Range.prototype.getText = Range.prototype.toString;


Range.prototype.iterate = function (fn, instance) {
    if(instance)
        fn = fn.bind(instance);
    var self = this;
    return {
        length: self.length,
        iterator: function() {
            var iterator = self.iterator();
            return {
                hasNext: function() { return iterator.hasNext(); },
                next: function() { return fn(iterator.next()); }
            };
        },
        toArray: function() {
            var array = [];
            var iterator = this.iterator();
            while(iterator.hasNext())
                array.push(iterator.next());
            return array;
        },
        toList: function() {
            return new List(false, this.toArray());
        },
        getText: function() {
            return this.toArray().join(", ");
        }
    };
};


Range.prototype.iterator = function() {
    var self = this;
    return {
        idx: 1, // since we are calling item()
        length: self.length,
        hasNext: function() { return this.idx <= this.length },
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
        items = Array.from(items.set.values());
    for (var i = 0; i < items.length; i++) {
        if (!this.has(items[i]))
            return false;
    }
    return true;
};


Range.prototype.slice1Based = function(start, end) {
    this.checkRange(start, end);
    var range = Object.create(this);
    range.first = start ? this.item(start) : this.first;
    range.last = end ? ( end > 0 ? this.item(end) : this.item(this.length + 1 + end) ) : this.last;
    return range;
};


Range.prototype.checkRange = function(start, end) {
    if(start && (start<1 || start>this.length))
        throw new RangeError();
    if(!start)
        start = 1;
    if(end) {
        if(end>=0 && (end<1 || end>this.length))
            throw new RangeError();
        else if(end<-this.length)
            throw new RangeError();
    }
};

Range.prototype.hasAny = function(items) {
    if(typeof(StrictSet) !== 'undefined' && items instanceof StrictSet)
        items = Array.from(items.set.values());
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
    return this.first + idx - 1;
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
    return String.fromCharCode(this.first + idx - 1);
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