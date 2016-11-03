var NullValue = require("../value/NullValue").NullValue;
var Integer = require("../value/Integer").Integer;
var Decimal = require("../value/Decimal").Decimal;
var Text = require("../value/Text").Text;

convertFromJavaScript = function(value) {
    if(value==null) {
        return NullValue.instance;
    } else if(typeof(value)=='string') {
        return new Text(value);
    } else if(typeof(value)=='number') {
        if(value == Math.floor(value))
            return new Integer(value);
        else
            return new Decimal(value);
    } else {
        throw "Not implemented yet in convertFromJavaScript:" + typeof(value);
    }
};

exports.convertFromJavaScript = convertFromJavaScript;