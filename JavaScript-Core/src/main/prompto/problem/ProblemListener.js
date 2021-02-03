import antlr4 from 'antlr4';

export default class ProblemListener extends antlr4.error.ErrorListener {
   
    constructor() {
        super();
        this.problems = [];
    }

    collectProblem(problem) {
        throw new Error("Should never get there!");
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


    // noinspection JSMethodCanBeStatic
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
                path : '',
                startLine : 1,
                startColumn : 1,
                endLine : 99999,
                endColumn : 99999
            };
    }

    // noinspection JSUnusedGlobalSymbols
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

    reportUnknownAttribute(section, name) {
        this.reportUnknown(section, name, "attribute");
    }

    reportUnknownCategory(section, name) {
        this.reportUnknown(section, name, "category");
    }

    reportUnknownMethod(section, name) {
        this.reportUnknown(section, name, "method");
    }

    reportUnknownVariable(section, name) {
        this.reportUnknown(section, name, "variable");
    }

    reportUnknownAnnotation(section, name) {
        this.reportUnknown(section, name, "annotation");
    }

    reportUnknownIdentifier(section, name) {
        this.reportUnknown(section, name, "identifier");
    }

    reportUnknown(section, name, type) {
        this.reportError(section, "Unknown " + type + ": " + name);
    }

    reportUnknownProperty(section, name) {
        this.reportWarning(section, "Unknown property: " + name);
    }

    reportEmptyVariable(id) {
        this.reportError(id, "Empty variable: " + id.name);
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

    reportNoMatchingPrototype(section, call, expected) {
        this.reportError(section, "No matching prototype for: " + call + ", expected: " + expected.join(", "));
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

    reportIllegalValue(section, message) {
        this.reportWarning(section, message);
    }

    reportIllegalOperation(section, message) {
        this.reportWarning(section, message);
    }

    reportIllegalInitialize(section) {
        this.reportError(section, "Initialize method is only allowed in singletons!");
    }

    reportIllegalInitializeParameters(section) {
        this.reportError(section, "Initialize method cannot have parameters!");
    }

    reportIllegalWidgetConstructor(section, name) {
        this.reportWarning(section, "Cannot instantiate widget: " + name + " (widgets are instantiated during rendering)");
    }

    reportIllegalAbstractConstructor(section, name, missingMethod) {
        this.reportError(section, "Cannot instantiate abstract category: " + name + ", missing method: " + missingMethod);
    }

    reportIllegalAbstractMethodCall(section, methodSignature) {
        this.reportError(section, "Cannot call abstract method: " + methodSignature);
    }

    reportMissingClosingTag(opening) {
        this.reportError(opening.id, "Missing closing tag '&lt;/" + opening.id.name + ">");
    }

    reportInvalidClosingTag(closing, opening) {
        this.reportError(closing, "Invalid closing tag: </" + closing.name + ">, expected: </" + opening.name + ">");
    }

    // noinspection JSUnusedGlobalSymbols
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


}
