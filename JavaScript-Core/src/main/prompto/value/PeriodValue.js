var Value = require("./Value").Value;
var IntegerValue = require("./IntegerValue").IntegerValue;
var TextValue = require("./TextValue").TextValue;
var PeriodType = null;

exports.resolve = function() {
    PeriodType = require("../type/PeriodType").PeriodType;
};


class PeriodValue extends Value {
 
    constructor(value) {
        super(PeriodType.instance);
        this.value = value;
        ["years", "months", "weeks", "days", "hours", "minutes", "seconds", "millis"].forEach(function(name) {
            Object.defineProperty(this, name, {
                get: function () {
                    return this.value[name];
                }
            });
        }, this)
    }

    totalMilliseconds() {
        return this.value.totalMilliseconds();
    }

    convertToJavaScript() {
        return this.value;
    }

    Add(context, value) {
        if (value instanceof PeriodValue) {
            return new PeriodValue(this.value.add(value.value));
        } else {
            throw new SyntaxError("Illegal: PeriodValue + " + typeof(value));
        }
    }

    Minus(context) {
        return new PeriodValue(this.value.minus());
    }

    Subtract(context, value) {
        if (value instanceof PeriodValue) {
            return new PeriodValue(this.value.subtract(value.value));
        } else {
            throw new SyntaxError("Illegal: PeriodValue + " + typeof(value));
        }
    }

    Multiply(context, value) {
        if (value instanceof IntegerValue) {
            return new PeriodValue(this.value.multiply(value.value));
        } else {
            throw new SyntaxError("Illegal: PeriodValue * " + typeof(value));
        }
    }

    toString() {
        return this.value.toString();
    }

    equals(obj) {
        if (obj instanceof PeriodValue) {
            return this.value.equals(obj.value);
        } else {
            return false;
        }
    }

    toDocumentValue(context) {
        return new TextValue(this.toString());
    }
}


exports.PeriodValue = PeriodValue;
