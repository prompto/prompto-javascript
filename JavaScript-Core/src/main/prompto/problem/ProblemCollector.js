/**
 * Created by ericvergnaud on 14/09/15.
 */

var ProblemListener = require('./ProblemListener').ProblemListener;

function ProblemCollector() {
    ProblemListener.call(this);
    this.problems = [];
    return this;
}

ProblemCollector.prototype = Object.create(ProblemListener.prototype);
ProblemCollector.prototype.constructor = ProblemCollector;

ProblemCollector.prototype.collectProblem = function(problem) {
    this.problems.push(problem);
};

ProblemCollector.prototype.readSection = function(section) {
    return {
        path : section.path,
        startLine : section.start.line,
        startColumn : section.start.column,
        endLine : section.end.line,
        endColumn : section.end.column
    };
}

ProblemCollector.prototype.syntaxError = function(recognizer, offendingSymbol, line, column, msg, e) {
    var problem = {
            startLine: line,
            startColumn: column,
            endLine: line,
            endColumn: column + ( offendingSymbol ? offendingSymbol.text.length : 0 ),
            type: "error",
            message: msg
        };
        ;
    this.collectProblem(problem);
};

ProblemCollector.prototype.reportDuplicate = function(name, declaration) {
    var problem = this.readSection(declaration.id);
    problem.type = "error";
    problem.message = "Duplicate name: " + name;
    this.collectProblem(problem);
};

ProblemCollector.prototype.reportUnknownAttribute = function(id) {
    this.reportUnknown(id, "attribute");
};

ProblemCollector.prototype.reportUnknownCategory = function(id) {
    this.reportUnknown(id, "category");
};

ProblemCollector.prototype.reportUnknownMethod = function(id) {
    this.reportUnknown(id, "method");
};

ProblemCollector.prototype.reportUnknownVariable = function(id) {
    this.reportUnknown(id, "variable");
};

ProblemCollector.prototype.reportUnknownIdentifier = function(id) {
    this.reportUnknown(id, "identifier");
};


ProblemCollector.prototype.reportEmptyVariable = function(id) {
    var problem = this.readSection(id);
    problem.type = "error";
    problem.message = "Empty variable: " + id.name;
    this.collectProblem(problem);
};


ProblemCollector.prototype.reportUnknown = function(id, type) {
    var problem = this.readSection(id);
    problem.type = "error";
    problem.message = "Unknown " + type + ": " + id.name;
    this.collectProblem(problem);
};

ProblemCollector.prototype.reportNoMatchingPrototype = function(method) {
    var problem = this.readSection(method);
    problem.type = "error";
    problem.message = "No matching prototype for: " + method.toString();
    this.collectProblem(problem);
};


ProblemCollector.prototype.reportCannotIterate = function(source) {
    var problem = this.readSection(source);
    problem.type = "error";
    problem.message = "Cannot iterate over: " + source.toString();
    this.collectProblem(problem);
};


ProblemCollector.prototype.reportInvalidCast = function(expression, target, actual) {
    var problem = this.readSection(expression);
    problem.type = "error";
    problem.message = "Cannot cast " + actual.toString() + " to " + target.toString();
    this.collectProblem(problem);
};

ProblemCollector.prototype.reportExpectingBoolean = function(expression, type) {
    var problem = this.readSection(expression);
    problem.type = "error";
    problem.message = "Cannot test " + expression.toString() + ", expected a Boolean got a " + type.toString();
    this.collectProblem(problem);
}

ProblemCollector.prototype.reportMissingClosingTag = function(opening) {
    var problem = this.readSection(opening.id);
    problem.type = "error";
    problem.message = "Missing closing tag '&lt;/" + opening.id.name + ">";
    this.collectProblem(problem);
}

ProblemCollector.prototype.reportInvalidClosingTag = function(closing, opening) {
    var problem = this.readSection(closing);
    problem.type = "error";
    problem.message = "Invalid closing tag: </" + closing.name + ">, expected: </" + opening.name + ">";
    this.collectProblem(problem);
}


exports.ProblemCollector = ProblemCollector;