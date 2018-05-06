var Section = require("../parser/Section").Section;

function Literal(text, value) {
    Section.call(this);
	this.text = text;
	this.value = value;
	return this;
}

Literal.prototype = Object.create(Section.prototype);
Literal.prototype.constructor = Section;

Literal.prototype.toDialect = function(writer) {
    writer.append(this.text);
};

Literal.prototype.toString = function() {
	return this.text;
};

Literal.prototype.transpile = function(transpiler) {
    throw new Error("Transpile not implemented by " + this.constructor.name);
};

Literal.prototype.getValue = function() {
	return this.value;
};

Literal.prototype.interpret = function(context) {
	return this.value;
};

exports.Literal = Literal;
