var antlr4 = require('antlr4/index');
var SyntaxError = require("../error/SyntaxError").SyntaxError;

function ProblemListener() {
    antlr4.error.ErrorListener.call(this);
    return this;
}

ProblemListener.prototype = Object.create(antlr4.error.ErrorListener.prototype);
ProblemListener.prototype.constructor = ProblemListener;

ProblemListener.prototype.syntaxError = function(recognizer, offendingSymbol, line, column, msg, e) {
    throw new SyntaxError(msg);
};

ProblemListener.prototype.reportDuplicate = function(name, declaration) {
    throw new SyntaxError("Duplicate name: " + name);
};

ProblemListener.prototype.reportUnknownAttribute = function(id) {
    throw new SyntaxError("Unknown attribute: " + id.name);
};

ProblemListener.prototype.reportUnknownCategory = function(id) {
    throw new SyntaxError("Unknown category: " + id.name);
};

ProblemListener.prototype.reportUnknownIdentifier = function(id) {
    throw new SyntaxError("Unknown identifier: " + id.name);
};

ProblemListener.prototype.reportUnknownMethod = function(id) {
    throw new SyntaxError("Unknown method: " + id.name);
};

ProblemListener.prototype.reportUnknownVariable = function(id) {
    throw new SyntaxError("Unknown variable: " + id.name);
};

ProblemListener.prototype.reportEmptyVariable = function(id) {
    throw new SyntaxError("Empty variable: " + id.name);
};

ProblemListener.prototype.reportNoMatchingPrototype = function(method) {
    throw new SyntaxError("No matching prototype for: " + method.toString());
};

ProblemListener.prototype.reportCannotIterate = function(source) {
    throw new SyntaxError("Cannot iterate over " + source.toString());
};

ProblemListener.prototype.reportNotAResource = function(method) {
    throw new SyntaxError("Not a resource");
};

ProblemListener.prototype.reportNotAResourceContext = function(method) {
    throw new SyntaxError("Not a resource context");
};

ProblemListener.prototype.reportInvalidCast = function(expression, target, actual) {
    throw new SyntaxError("Cannot cast " + actual.toString() + " to " + target.toString());
};

ProblemListener.prototype.reportExpectingBoolean = function(expression, type) {
    throw new SyntaxError("Cannot test " + expression.toString() + ", expected a Boolean got a " + type.toString());
}

ProblemListener.prototype.reportMissingClosingTag = function(opening) {
    throw new SyntaxError("Missing closing tag '&lt;/" + opening.id.name + ">'");
}

ProblemListener.prototype.reportInvalidClosingTag = function(closing, opening) {
    throw new SyntaxError("Invalid closing tag: </" + closing.name + ">, expected: </" + opening.name + ">");
}

exports.ProblemListener = ProblemListener;