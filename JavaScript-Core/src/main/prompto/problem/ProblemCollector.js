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

ProblemCollector.prototype.readSection = function(section) {
    return {
        path : section.path,
        startLine : section.start && section.start.line,
        startColumn : section.start && section.start.column,
        endLine : section.end && section.end.line,
        endColumn : section.end && section.end.column
    };
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
    this.collectProblem(problem);
};

ProblemCollector.prototype.reportDuplicate = function(name, declaration) {
    this.reportError(declaration.id, "Duplicate name: " + name);
};

ProblemCollector.prototype.reportInvalidAttribute = function(id) {
    this.reportInvalid(id, "attribute");
};

ProblemCollector.prototype.reportInvalidCategory = function(id) {
    this.reportInvalid(id, "category");
};

ProblemCollector.prototype.reportInvalid = function(id, type) {
    this.reportError(id, "Invalid " + type + ": " + id.name);
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

ProblemCollector.prototype.reportUnknownAnnotation = function(id) {
    this.reportUnknown(id, "annotation");
};

ProblemCollector.prototype.reportUnknownIdentifier = function(id) {
    this.reportUnknown(id, "identifier");
};


ProblemCollector.prototype.reportEmptyVariable = function(id) {
    this.reportError(id, "Empty variable: " + id.name);
};


ProblemCollector.prototype.reportUnknown = function(id, type) {
    this.reportError(id, "Unknown " + type + ": " + id.name);
};


ProblemCollector.prototype.reportUnknownProperty = function(section, name) {
    this.reportWarning(section, "Unknown property: " + name);
};


ProblemCollector.prototype.reportMissingProperty = function(section, name) {
    this.reportWarning(section, "Missing required property: " + name);
};


ProblemCollector.prototype.reportSwitchMissingStatement = function(section) {
    this.reportWarning(section, "Switch case requires at minimal one statement");
};


ProblemCollector.prototype.reportDuplicateProperty = function(section, name) {
    this.reportWarning(section, "Duplicate property: " + name);
};


ProblemCollector.prototype.reportNoMatchingPrototype = function(method) {
    this.reportError(method, "No matching prototype for: " + method.toString());
};


ProblemCollector.prototype.reportCannotIterate = function(source) {
    this.reportError(source, "Cannot iterate over: " + source.toString());
};


ProblemCollector.prototype.reportInvalidItem = function(parentType, itemType, source) {
    this.reportError(source, "Type: " + parentType.toString() + " cannot read item of type: " + itemType.toString());
};


ProblemCollector.prototype.reportInvalidCast = function(expression, target, actual) {
    this.reportError(expression, "Cannot cast " + actual.toString() + " to " + target.toString());
};

ProblemCollector.prototype.reportIllegalAssignment = function(expression, expected, actual) {
    this.reportError(expression, "Illegal expression type, expected: " + expected.name + ", got: " + actual.name);
};

ProblemCollector.prototype.reportIllegalAnnotation = function(section, message) {
    this.reportWarning(section, message);
};

ProblemCollector.prototype.reportMissingClosingTag = function(opening) {
    this.reportError(opening.id, "Missing closing tag '&lt;/" + opening.id.name + ">");
};

ProblemCollector.prototype.reportInvalidClosingTag = function(closing, opening) {
    this.reportError(closing, "Invalid closing tag: </" + closing.name + ">, expected: </" + opening.name + ">");
};

ProblemCollector.prototype.reportInvalidMember = function(section, type, name) {
    this.reportError(section, "Invalid member '" + name + "' in " + type.name + " type");
};

ProblemCollector.prototype.reportInvalidCopySource = function(section) {
    this.reportError(section, "Invalid copy source");
};


ProblemCollector.prototype.reportNotAResource = function(section) {
    this.reportError(section, "Not a resource");
};


ProblemCollector.prototype.reportNotAResourceContext = function(section) {
    this.reportError(section, "Not a resource context");
};


ProblemCollector.prototype.reportIncompatibleTypes = function(section, left, right) {
    this.reportError(section, "Type " + left.name + " is not compatible with " + right.name);
};


ProblemCollector.prototype.reportNoSuperType = function(section, type) {
    this.reportError(section, "Type " + type.name + " has no super type");
};

ProblemCollector.prototype.reportError = function(section, message) {
    this.reportProblem(section, message, "error");
};


ProblemCollector.prototype.reportWarning = function(section, message) {
    this.reportProblem(section, message, "warning");
};


ProblemCollector.prototype.reportProblem = function(section, message, type) {
    var problem = this.readSection(section);
    problem.type = type;
    problem.message = message;
    this.collectProblem(problem);
};


exports.ProblemCollector = ProblemCollector;