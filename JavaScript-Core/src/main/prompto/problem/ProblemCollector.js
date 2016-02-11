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

ProblemCollector.prototype.readSection = function(section) {
    /*if(!section.end)
        return null;*/
    return {
            path : section.path,
            startLine : section.start.line,
            startColumn : section.start.column,
            endLine : section.end.line,
            endColumn : section.end.column
            };
}

exports.ProblemCollector = ProblemCollector;