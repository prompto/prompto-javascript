var Literal = require("./Literal").Literal;
var DateType = require("../type/DateType").DateType;
var LocalDate = require("../value/LocalDate").LocalDate;


function DateLiteral(text) {
	Literal.call(this, text, new LocalDate(new Date(text.substring(1,text.length-1))));
	return this;
}

DateLiteral.prototype = Object.create(Literal.prototype);
DateLiteral.prototype.constructor = DateLiteral;

DateLiteral.prototype.check = function(context) {
	return DateType.instance;
};

DateLiteral.prototype.transpile = function(transpiler) {
    transpiler.append("new Date(").append(this.text).append(")");
};

exports.DateLiteral = DateLiteral;
