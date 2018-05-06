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


exports.LocalDate = LocalDate;