function DateTime(date, tzOffset) {
    this.date = date;
    this.tzOffset = tzOffset;
    return this;
}


DateTime.parseOffset = function(text) {
    var hours = parseInt(text.substring(0,2));
    var i = text[2]==':' ? 3 : 2;
    var minutes = parseInt(text.substring(i,i+2));
    return ((hours * 60) + minutes) * 60;
};

DateTime.parseTZOffset = function(text) {
    var i = text.indexOf('Z');
    if(i>0)
        return 0;
    i = text.indexOf('+');
    if(i>0)
        return parseOffset(text.substring(i+1));
    i = text.lastIndexOf('-');
    if(i>10) // skip date separator
        return -parseOffset(text.substring(i+1));
    return 0;
};

DateTime.parseUTCDate = function(text) {
    var i = text.indexOf('Z');
    if(i<0) {
        i = text.indexOf('+');
        if(i>0)
            text = text.substring(0, i);
        else {
            i = text.lastIndexOf('-');
            if(i>10) // skip date separator
                text = text.substring(0, i);
        }
    }
    return new Date(text);
};


DateTime.parse = function(text) {
    var date = DateTime.parseUTCDate(text);
    var tzOffset = DateTime.parseTZOffset(text);
    return new DateTime(date, tzOffset);
};

DateTime.prototype.addPeriod = function (period) {
    var date = new Date();
    var year = this.date.getUTCFullYear() + (period.years || 0);
    date.setUTCFullYear(year);
    var month = this.date.getUTCMonth() + (period.months || 0);
    date.setUTCMonth(month);
    var day = this.date.getUTCDate() + ((period.weeks || 0) * 7) + (period.days || 0);
    date.setUTCDate(day);
    var hour = this.date.getUTCHours() + (period.hours || 0);
    date.setUTCHours(hour);
    var minute = this.date.getUTCMinutes() + (period.minutes || 0);
    date.setUTCMinutes(minute);
    var second = this.date.getUTCSeconds() + (period.seconds || 0);
    date.setUTCSeconds(second);
    var millis = this.date.getUTCMilliseconds() + (period.millis || 0);
    date.setUTCMilliseconds(millis);
    return new DateTime(date, this.tzOffset);
};


DateTime.prototype.toString = function() {
    var s = this.date.toISOString();
    if(this.tzOffset == 0)
        return s;
    s = s.substring(0, s.length()-1); // truncate trailing 'Z';
    var offset = this.tzOffset;
    if (offset > 0)
        s += "+";
    else {
        offset = -offset;
        s += "-";
    }
    s += ("00" + Math.floor(offset / 3600)).slice(-2);
    s += ":";
    s += ("00" + Math.floor((offset % 3600) / 60)).slice(-2);
    return s;
}


exports.DateTime = DateTime;