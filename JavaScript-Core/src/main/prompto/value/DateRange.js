var RangeValue = require("./RangeValue").RangeValue;
var DateValue = require("./DateValue").DateValue;
var LocalDate = require("../intrinsic/LocalDate").LocalDate;
var IndexOutOfRangeError = require("../error/IndexOutOfRangeError").IndexOutOfRangeError;

var DateType = null;

exports.resolve = function() {
    DateType = require("../type/DateType").DateType;
};

class DateRange extends RangeValue {
    constructor(left, right) {
        super(DateType.instance, left, right);
        return this;
    }

    size() {
        var h = this.high.value.valueOf();
        var l = this.low.value.valueOf();
        return 1 + ( (h-l)/(24*60*60*1000));
    }

    getItem(index) {
        var millis = this.low.value.valueOf() + (index-1)*(24*60*60*1000);
        if(millis>this.high.value.valueOf()) {
            throw new IndexOutOfRangeError();
        } else {
            return new DateValue(new LocalDate(millis));
        }
    }
}


exports.DateRange = DateRange;
