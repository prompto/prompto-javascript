var Period = require("./Period").Period;

function LocalDate(value) {
    var date = new Date(value);
    date.__proto__ = LocalDate.prototype;
    return date;
}

LocalDate.parse = function(value) {
    return new LocalDate(value);
};

LocalDate.prototype.__proto__ = Date.prototype;

LocalDate.prototype.toString = function() {
    return this.toISOString().substring(0, 10);
};


LocalDate.prototype.addPeriod = function (period) {
    var result = new LocalDate();
    var year = this.getUTCFullYear() + (period.years || 0);
    result.setUTCFullYear(year);
    var month = this.getUTCMonth() + (period.months || 0);
    result.setUTCMonth(month);
    var day = this.getUTCDate() + ((period.weeks || 0) * 7) + (period.days || 0);
    result.setUTCDate(day);
    return result;
};


LocalDate.prototype.subtractDate = function(value) {
    var data = [];
    data[0] = this.getUTCFullYear() - value.getUTCFullYear();
    data[1] = this.getUTCMonth() - value.getUTCMonth();
    data[3] = this.getUTCDate() - value.getUTCDate();
    return new Period(data);
};



LocalDate.prototype.subtractPeriod = function(value) {
    var date = new LocalDate();
    var year = this.getUTCFullYear() - (value.years || 0);
    date.setUTCFullYear(year);
    var month = this.getUTCMonth() - (value.months || 0);
    date.setUTCMonth(month);
    var day = this.getUTCDate() - ((value.weeks || 0) * 7) - (value.days || 0);
    date.setUTCDate(day);
    return date;
};



exports.LocalDate = LocalDate;