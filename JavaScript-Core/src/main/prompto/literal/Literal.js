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
    writer.append(this.escapedText(writer.escapeMode));
};

Literal.prototype.parentToDialect = function(writer) {
    this.toDialect(writer);
};

Literal.prototype.escapedText = function(escapeMode) {
    if(escapeMode)
        return this.text.replace(/'/g, "\\'");
    else
        return this.text;
};

Literal.prototype.toString = function() {
	return this.text;
};

Literal.prototype.toString = function() {
    return this.text;
};


Literal.prototype.checkAttribute = function(context) {
    context.problemListener.reportMissingAttribute(this, this.toString());
};

Literal.prototype.declare = function(transpiler) {
    throw new Error("Declare not implemented by " + this.constructor.name);
};

Literal.prototype.transpile = function(transpiler) {
    throw new Error("Transpile not implemented by " + this.constructor.name);
};


Literal.prototype.declareParent = function(transpiler) {
    this.declare(transpiler);
};

Literal.prototype.transpileParent = function(transpiler) {
    this.transpile(transpiler);
};


Literal.prototype.getValue = function() {
	return this.value;
};

Literal.prototype.interpret = function(context) {
	return this.value;
};

exports.Literal = Literal;
