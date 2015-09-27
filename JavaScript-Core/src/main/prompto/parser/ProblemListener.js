/**
 * Created by ericvergnaud on 14/09/15.
 */

var antlr4 = require('antlr4/index');

function ProblemCollector() {
    antlr4.error.ErrorListener.call(this);
    this.problems = [];
    return this;
}

ProblemCollector.prototype = Object.create(antlr4.error.ErrorListener.prototype);
ProblemCollector.prototype.constructor = ProblemCollector;

ProblemCollector.prototype.collectProblem = function(problem) {
    this.problems.push(problem);
};

ProblemCollector.prototype.syntaxError = function(recognizer, offendingSymbol, line, column, msg, e) {
    var problem = {
            startLine: line,
            startColumn: column,
            endLine: line,
            endColumn: column + offendingSymbol.text.length,
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
    this.reportUnknownIdentifier(id, "attribute");
};

ProblemCollector.prototype.reportUnknownCategory = function(id) {
    this.reportUnknownIdentifier(id, "category");
};

ProblemCollector.prototype.reportUnknownMethod = function(id) {
    this.reportUnknownIdentifier(id, "method");
};

ProblemCollector.prototype.reportUnknownIdentifier = function(id, type) {
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