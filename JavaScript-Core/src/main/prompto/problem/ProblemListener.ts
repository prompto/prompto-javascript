import antlr4 from 'antlr4';
import IProblem from "../../../main/prompto/problem/IProblem";
import {Section} from "../parser";
import ProblemType from "./ProblemType";
import AbstractParser from "../parser/AbstractParser";
import {Identifier} from "../grammar";
import {MethodCall} from "../statement";
import {IExpression} from "../expression";
import {IType} from "../type";
import {JsxElement} from "../jsx";

export default class ProblemListener extends antlr4.error.ErrorListener<antlr4.Token> {

    problems: IProblem[];

    constructor() {
        super();
        this.problems = [];
    }

    collectProblem(problem: IProblem): void {
        throw new Error("Should never get there!");
    }

    reportError(section: Section, message: string): void {
        this.reportProblem(section, message, ProblemType.ERROR);
    }

    reportWarning(section: Section, message: string): void {
        this.reportProblem(section, message, ProblemType.WARNING);
    }

    reportProblem(section: Section, message: string, type: ProblemType): void {
        const problem = this.readSection(section);
        problem.type = type;
        problem.message = message;
        this.collectProblem(problem);
    }


    // noinspection JSMethodCanBeStatic
    readSection(section: Section): IProblem {
        return {
                type: ProblemType.EMPTY,
                message: "",
                path : section.path,
                startLine : section.startLocation && section.startLocation.line,
                startColumn : section.startLocation && section.startLocation.column,
                endLine : section.endLocation && section.endLocation.line,
                endColumn : section.endLocation && section.endLocation.column
            };
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    syntaxError(recognizer: AbstractParser, offendingSymbol: antlr4.Token, line: number, column: number, msg: string, e?: antlr4.error.RecognitionException): void {
        const problem = {
                type: ProblemType.ERROR,
                message: msg,
                path: recognizer.path,
                startLine: line,
                startColumn: column,
                endLine: line,
                endColumn: column + ( offendingSymbol ? offendingSymbol.text.length : 0 )
            };
        this.collectProblem(problem);
    }

    reportDuplicate(section: Section, id: Identifier): void {
        this.reportError(section, "Duplicate name: " + id.name);
    }

    reportInvalidAttribute(section: Section, id: Identifier): void {
        this.reportInvalid(section, id, "attribute");
    }

    reportInvalidCategory(section: Section, id: Identifier): void {
        this.reportInvalid(section, id, "category");
    }

    reportInvalid(section: Section,id: Identifier, type: string): void {
        this.reportError(id, "Invalid " + type + ": " + id.name);
    }

    reportUnknownAttribute(section: Section, name: string): void {
        this.reportUnknown(section, name, "attribute");
    }

    reportUnknownCategory(section: Section, name: string): void {
        this.reportUnknown(section, name, "category");
    }

    reportUnknownWidget(section: Section, name: string): void {
        this.reportUnknown(section, name, "widget");
    }

    reportUnknownMethod(section: Section, name: string): void {
        this.reportUnknown(section, name, "method");
    }

    reportUnknownVariable(section: Section, name: string): void {
        this.reportUnknown(section, name, "variable");
    }

    reportUnknownAnnotation(section: Section, name: string): void {
        this.reportUnknown(section, name, "annotation");
    }

    reportUnknownIdentifier(section: Section, name: string): void {
        this.reportUnknown(section, name, "identifier");
    }

    reportUnknown(section: Section, name: string, type: string) {
        this.reportError(section, "Unknown " + type + ": " + name);
    }

    reportUnknownProperty(section: Section, name: string): void {
        this.reportWarning(section, "Unknown property: " + name);
    }

    reportEmptyVariable(id: Identifier): void {
        this.reportError(id, "Empty variable: " + id.name);
    }

    reportMissingProperty(section: Section, name: string): void {
        this.reportWarning(section, "Missing required property: " + name);
    }

    reportMissingAttribute(section: Section, actual: string): void {
        this.reportError(section, "Expected an attribute, found: " + actual);
    }

    reportSwitchMissingStatement(section: Section): void {
        this.reportWarning(section, "Switch case requires at minimal one statement");
    }

    reportDuplicateProperty(section: Section, name: string): void {
        this.reportWarning(section, "Duplicate property: " + name);
    }

    reportNoMatchingPrototype(section: Section, call: string, expected: string[]): void {
        this.reportError(section, "No matching prototype for: " + call + ", expected: " + expected.join(", "));
    }

    reportTooManyPrototypes(section: Section, method: MethodCall): void {
        this.reportError(section, "Too many prototypes for: " + method.toString());
    }

    reportCannotIterate(section: Section, source: IExpression): void {
        this.reportError(section, "Cannot iterate over: " + source.toString());
    }

    reportCannotSort(section: Section, source: IExpression): void {
        this.reportError(section, "Cannot sort: " + source.toString());
    }

    reportInvalidItem(section: Section, parentType: IType, itemType: IType): void {
        this.reportError(section, "Type: " + parentType.toString() + " cannot read item of type: " + itemType.toString());
    }

    reportIllegalItemType(section: Section, itemType: IType, expected: IType[]): void {
        this.reportError(section, "Illegal item type, expected: [" + expected.map(t=>t.name).join(", ") + "], got: " + itemType.name);
    }

    reportInvalidCast(section: Section, target: IType, actual: IType): void {
        this.reportError(section, "Cannot cast " + actual.toString() + " to " + target.toString());
    }

    reportIllegalAssignment(section: Section, expected: IType, actual: IType): void {
        this.reportError(section, "Type " + actual.name + " is not compatible with " + expected.name);
    }

    reportIllegalAnnotation(section: Section, message: string): void {
        this.reportWarning(section, message);
    }

    reportIllegalValue(section: Section, message: string): void {
        this.reportWarning(section, message);
    }

    reportIllegalOperation(section: Section, message: string): void {
        this.reportError(section, message);
    }

    reportIllegalInitialize(section: Section): void {
        this.reportError(section, "Initialize method is only allowed in singletons!");
    }

    reportIllegalInitializeParameters(section: Section): void {
        this.reportError(section, "Initialize method cannot have parameters!");
    }

    reportIllegalWidgetConstructor(section: Section, name: string): void {
        this.reportWarning(section, "Cannot instantiate widget: " + name + " (widgets are instantiated during rendering)");
    }

    reportIllegalAbstractCategory(section: Section, name: string, missingMethod: string): void {
        this.reportError(section, "Cannot instantiate abstract category: " + name + ", missing method: " + missingMethod);
    }

    reportIllegalAbstractWidget(section: Section, name: string, missingMethod: string): void {
        this.reportError(section, "Cannot instantiate abstract widget: " + name + ", missing method: " + missingMethod);
    }

    reportIllegalAbstractMethodCall(section: Section, methodSignature: string): void {
        this.reportError(section, "Cannot call abstract method: " + methodSignature);
    }

    reportMissingClosingTag(section: Section, opening: JsxElement): void {
        this.reportError(section, "Missing closing tag '&lt;/" + opening.name + ">");
    }

    reportInvalidClosingTag(section: Section, closing: JsxElement, opening: JsxElement): void {
        this.reportError(section, "Invalid closing tag: </" + closing.name + ">, expected: </" + opening.name + ">");
    }

    // noinspection JSUnusedGlobalSymbols
    reportInvalidMember(section: Section, type: IType, name: string): void {
        this.reportError(section, "Invalid member '" + name + "' in " + type.name + " type");
    }

    reportInvalidCopySource(section: Section): void {
        this.reportError(section, "Invalid copy source");
    }

    reportNotAResource(section: Section): void {
        this.reportError(section, "Not a resource");
    }

    reportNotAResourceContext(section: Section): void {
        this.reportError(section, "Not a resource context");
    }

    reportIncompatibleTypes(section: Section, left: IType, right: IType): void {
        this.reportError(section, "Type " + right.name + " is not compatible with " + left.name);
    }

    reportNoSuperType(section: Section, type: IType): void {
        this.reportError(section, "Type " + type.name + " has no super type");
    }

    reportInconsistentHierarchy(section: Section, category: string, culprit: string): void {
        this.reportError(section, "Inconsistent hierarchy for " + category + ", unknown parent type: " + culprit);
    }

    reportAssigningVoidType(section: Section): void {
        this.reportError(section, "Cannot assign Void expression");
    }

    reportReturningVoidType(section: Section): void {
        this.reportError(section, "Cannot return void type");
    }

    reportIllegalReturn(section: Section): void {
        this.reportError(section, "A test method cannot return");
    }

    reportNotMutable(section: Section, name: string): void {
        this.reportError(section, name + " is not mutable");
    }

    reportNotStorable(section: Section, name: string): void {
        this.reportError(section, name + " is not storable");
    }

    reportUntypedRecursiveMethod(section: Section, name: string, proto: string): void {
        this.reportError(section, name + " is recursive but has no return type");
    }
}
