import antlr4 from 'antlr4';

export default class ProblemCollector extends antlr4.error.ErrorListener {
   
    constructor() {
        super();
        this.problems = [];
    }

    collectProblem(problem) {
        this.problems.push(problem);
    }

    readSection(section) {
        if(section)
            return {
                path : section.path,
                startLine : section.start && section.start.line,
                startColumn : section.start && section.start.column,
                endLine : section.end && section.end.line,
                endColumn : section.end && section.end.column
            };
        else
            return {
                path : "",
                startLine : 1,
                startColumn : 1,
                endLine : 99999,
                endColumn : 99999
            };
    }

    syntaxError(recognizer, offendingSymbol, line, column, msg, e) {
        const problem = {
                startLine: line,
                startColumn: column,
                endLine: line,
                endColumn: column + ( offendingSymbol ? offendingSymbol.text.length : 0 ),
                type: "error",
                message: msg
            };
        this.collectProblem(problem);
    }

    reportDuplicate(id) {
        this.reportError(id, "Duplicate name: " + id.name);
    }

    reportInvalidAttribute(id) {
        this.reportInvalid(id, "attribute");
    }

    reportInvalidCategory(id) {
        this.reportInvalid(id, "category");
    }

    reportInvalid(id, type) {
        this.reportError(id, "Invalid " + type + ": " + id.name);
    }

    reportUnknownAttribute(id) {
        this.reportUnknown(id, "attribute");
    }

    reportUnknownCategory(id) {
        this.reportUnknown(id, "category");
    }

    reportUnknownMethod(id) {
        this.reportUnknown(id, "method");
    }

    reportUnknownVariable(id) {
        this.reportUnknown(id, "variable");
    }

    reportUnknownAnnotation(id) {
        this.reportUnknown(id, "annotation");
    }

    reportUnknownIdentifier(id) {
        this.reportUnknown(id, "identifier");
    }

    reportEmptyVariable(id) {
        this.reportError(id, "Empty variable: " + id.name);
    }

    reportUnknown(id, type) {
        this.reportError(id, "Unknown " + type + ": " + id.name);
    }

    reportUnknownProperty(section, name) {
        this.reportWarning(section, "Unknown property: " + name);
    }

    reportMissingProperty(section, name) {
        this.reportWarning(section, "Missing required property: " + name);
    }

    reportMissingAttribute(section, actual) {
        this.reportError(section, "Expected an attribute, got: " + actual);
    }

    reportSwitchMissingStatement(section) {
        this.reportWarning(section, "Switch case requires at minimal one statement");
    }

    reportDuplicateProperty(section, name) {
        this.reportWarning(section, "Duplicate property: " + name);
    }

    reportNoMatchingPrototype(method) {
        this.reportError(method, "No matching prototype for: " + method.toString());
    }

    reportTooManyPrototypes(method) {
        this.reportError(method, "Too many prototypes for: " + method.toString());
    }

    reportCannotIterate(source) {
        this.reportError(source, "Cannot iterate over: " + source.toString());
    }

    reportCannotSort(source) {
        this.reportError(source, "Cannot sort: " + source.toString());
    }

    reportInvalidItem(parentType, itemType, source) {
        this.reportError(source, "Type: " + parentType.toString() + " cannot read item of type: " + itemType.toString());
    }

    reportInvalidCast(expression, target, actual) {
        this.reportError(expression, "Cannot cast " + actual.toString() + " to " + target.toString());
    }

    reportIllegalAssignment(expression, expected, actual) {
        this.reportError(expression, "Illegal expression type, expected: " + expected.name + ", got: " + actual.name);
    }

    reportIllegalAnnotation(section, message) {
        this.reportWarning(section, message);
    }

    reportIllegalOperation(section, message) {
        this.reportWarning(section, message);
    }

    reportMissingClosingTag(opening) {
        this.reportError(opening.id, "Missing closing tag '&lt;/" + opening.id.name + ">");
    }

    reportInvalidClosingTag(closing, opening) {
        this.reportError(closing, "Invalid closing tag: </" + closing.name + ">, expected: </" + opening.name + ">");
    }

    reportInvalidMember(section, type, name) {
        this.reportError(section, "Invalid member '" + name + "' in " + type.name + " type");
    }

    reportInvalidCopySource(section) {
        this.reportError(section, "Invalid copy source");
    }

    reportNotAResource(section) {
        this.reportError(section, "Not a resource");
    }

    reportNotAResourceContext(section) {
        this.reportError(section, "Not a resource context");
    }

    reportIncompatibleTypes(section, left, right) {
        this.reportError(section, "Type " + left.name + " is not compatible with " + right.name);
    }

    reportNoSuperType(section, type) {
        this.reportError(section, "Type " + type.name + " has no super type");
    }

    reportAssigningVoidType(section) {
        this.reportError(section, "Cannot assign void type");
    }

    reportReturningVoidType(section) {
        this.reportError(section, "Cannot return void type");
    }

    reportIllegalReturn(section) {
        this.reportError(section, "A test method cannot return");
    }

    reportNotMutable(section, name) {
        this.reportError(section, name + " is not mutable");
    }

    reportNotStorable(section, name) {
        this.reportError(section, name + " is not storable");
    }

    reportError(section, message) {
        this.reportProblem(section, message, "error");
    }

    reportWarning(section, message) {
        this.reportProblem(section, message, "warning");
    }

    reportProblem(section, message, type) {
        const problem = this.readSection(section);
        problem.type = type;
        problem.message = message;
        this.collectProblem(problem);
    }
}
