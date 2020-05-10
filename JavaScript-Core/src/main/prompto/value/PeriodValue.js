var Value = require("./Value").Value;
var IntegerValue = require("./IntegerValue").IntegerValue;
var PeriodType = null;

exports.resolve = function() {
    PeriodType = require("../type/PeriodType").PeriodType;
};


function PeriodValue(value) {
    Value.call(this, PeriodType.instance);
    this.value = value;
    ["years", "months", "weeks", "days", "hours", "minutes", "seconds", "millis"].forEach(function(name) {
        Object.defineProperty(this, name, {
            get: function () {
                return this.value[name];
            }
        });
    }, this)
    return this;
}

PeriodValue.prototype = Object.create(Value.prototype);
PeriodValue.prototype.constructor = PeriodValue;



PeriodValue.prototype.Add = function(context, value) {
    if (value instanceof PeriodValue) {
        return new PeriodValue(this.value.add(value.value));
    } else {
        throw new SyntaxError("Illegal: PeriodValue + " + typeof(value));
    }
};

PeriodValue.prototype.Minus = function(context) {
    return new PeriodValue(this.value.minus());
};

PeriodValue.prototype.Subtract = function(context, value) {
    if (value instanceof PeriodValue) {
        return new PeriodValue(this.value.subtract(value.value));
    } else {
        throw new SyntaxError("Illegal: PeriodValue + " + typeof(value));
    }
};


PeriodValue.prototype.Multiply = function(context, value) {
    if (value instanceof IntegerValue) {
        return new PeriodValue(this.value.multiply(value.value));
    } else {
        throw new SyntaxError("Illegal: PeriodValue * " + typeof(value));
    }
};

PeriodValue.prototype.toString = function() {
    return this.value.toString();
};

PeriodValue.prototype.equals = function(obj) {
    if (obj instanceof PeriodValue) {
        return this.value.equals(obj.value);
    } else {
        return false;
    }
};



PeriodValue.prototype.toDocumentValue = function(context) {
    return new TextValue(this.toString());
};


exports.PeriodValue = PeriodValue;
