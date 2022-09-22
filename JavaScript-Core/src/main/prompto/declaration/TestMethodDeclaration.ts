import BaseDeclaration from './BaseDeclaration'
import {Type, VoidType} from '../type'
import {ExecutionError, PromptoError} from '../error'
import { Identifier } from '../grammar'
import {Statement, StatementList} from '../statement'
import {AssertionList, SymbolExpression} from '../expression'
import {Context, Transpiler} from "../runtime";
import {TestInfo} from "../runtime/Catalog";
import {Section} from "../parser";
import {CodeWriter} from "../utils";
import {Instance, TextValue, Value} from "../value";
import {CategoryDeclaration, Declaration, MethodDeclaration} from "./index";
import {ParameterList} from "../param";

const isNodeJs = typeof window === 'undefined' && typeof importScripts === 'undefined';

export default class TestMethodDeclaration extends BaseDeclaration implements MethodDeclaration {

    statements: StatementList;
    assertions: AssertionList;
    error: SymbolExpression | null;
    closureOf: Declaration | null = null;
    memberOf: CategoryDeclaration | null = null;
    parameters: ParameterList | null = null;
    returnType: Type | null = null;

    constructor(id: Identifier, stmts: StatementList, assertions: AssertionList, error: SymbolExpression | null) {
        super(id);
        this.statements = stmts;
        this.assertions = assertions;
        this.error = error;
    }

    locateSectionAtLine(line: number): Section | null {
        const section = this.statements.locateSectionAtLine(line);
        if(section)
            return section;
        else
            return this.assertions.locateSectionAtLine(line);
    }

    getDeclarationType(): string {
        return "Test";
    }

    cleanId(): string {
        const cleanId = this.name.replace(/\W/g,'_');
        return cleanId.substring(1, cleanId.length - 1);
    }

    declare(transpiler: Transpiler): void {
        transpiler.declare(this);
        transpiler = transpiler.newLocalTranspiler();
        this.statements.declare(transpiler);
        if(this.assertions)
            this.assertions.declare(transpiler);
        if(this.error)
            this.error.declare(transpiler);
    }

    transpile(transpiler: Transpiler): void {
        transpiler = transpiler.newLocalTranspiler();
        if (this.error)
            this.transpileExpectedError(transpiler);
        else
            this.transpileAssertions(transpiler);
        transpiler.flush();
    }

    transpileAssertions(transpiler: Transpiler): void {
        transpiler.append("function ").append(this.cleanId()).append("() {");
        transpiler.indent();
        transpiler.append("try {");
        transpiler.indent();
        this.statements.transpile(transpiler);
        transpiler.append("var success = true;").newLine();
        this.assertions.forEach(assertion => {
            transpiler.append("if(");
            assertion.transpile(transpiler);
            transpiler.append(")").indent();
            transpiler.append("success &= true;").dedent();
            transpiler.append("else {").indent();
            transpiler.append("success = false;").newLine();
            transpiler.printTestName(this.name).append('failed while verifying: ');
            transpiler.escape();
            transpiler.append(assertion.getExpected(transpiler.context, this.dialect, transpiler.escapeMode));
            transpiler.unescape();
            transpiler.append(", found: ' + ");
            transpiler.escape();
            assertion.transpileFound(transpiler, this.dialect);
            transpiler.unescape();
            transpiler.append(");");
            transpiler.dedent();
            transpiler.append("}").newLine();
        }, this);
        transpiler.append("if (success)").indent().printTestName(this.name).append("successful');").dedent();
        transpiler.dedent();
        transpiler.append("} catch (e) {");
        transpiler.indent();
        transpiler.printTestName(this.name).append("failed with error: ' + e.name);");
        transpiler.append("process.stderr.write(e.stack);").newLine();
        transpiler.dedent();
        transpiler.append("}");
        transpiler.dedent();
        transpiler.append("}");
        transpiler.newLine();
        transpiler.flush();
    }

    transpileExpectedError(transpiler: Transpiler): void {
        transpiler.append("function ").append(this.cleanId()).append("() {");
        transpiler.indent();
        transpiler.append("try {");
        transpiler.indent();
        this.statements.transpile(transpiler);
        transpiler.printTestName(this.name).append("failed while expecting: ").append(this.error!.name).append(", found: no error');");
        transpiler.dedent();
        transpiler.append("} catch (e) {");
        transpiler.indent();
        transpiler.append("if(e instanceof ").append(NATIVE_ERROR_NAMES.get(this.error!.name)!).append(") {").indent();
        transpiler.printTestName(this.name).append("successful');").dedent();
        transpiler.append("} else {").indent();
        transpiler.printTestName(this.name).append('failed while expecting: ').append(this.error!.name).append(", found: ' + translateError(e));").dedent();
        transpiler.append("}");
        transpiler.dedent();
        transpiler.append("}");
        transpiler.dedent();
        transpiler.append("}");
        transpiler.newLine();
        transpiler.flush();
    }

    check(context: Context): Type {
        context = context.newLocalContext();
        this.statements.forEach(stmt => this.checkStatement(context, stmt), this);
        this.assertions.forEach(exp => exp.checkAssert(context), this);
        return VoidType.instance;
    }

    checkStatement(context: Context, statement: Statement): void {
        const type = statement.check(context);
        if(statement.canReturn() && type!=null && type!=VoidType.instance) // null indicates SyntaxError
            context.problemListener.reportIllegalReturn(statement.asSection());
    }

    register(context: Context): void {
        context.registerTestDeclaration (this);
    }

    unregister(context: Context): void {
        context.unregisterTestDeclaration (this);
    }

    getType(context: Context): Type {
        return VoidType.instance;
    }

    interpret(context: Context): Value | null {
        if (this.interpretBody (context)) {
            this.interpretNoError (context);
            this.interpretAsserts (context);
        }
        return null;
    }

    interpretNoError(context: Context): void {
        // we land here only if no error was raised
        if (this.error != null)
            this.printMissingError (context, this.error.name, "no error");
    }

    interpretAsserts(context: Context): void {
        context.enterMethod (this);
        try {
            let success = true;
            this.assertions.forEach(exp => success = success && exp.interpretAssert (context, this), this);
            if (success)
                this.printSuccess (context);
        } finally {
            context.leaveMethod (this);
        }
    }

    static print(msg: string): void {
        if(isNodeJs)
            process.stdout.write(msg);
        else
            console.log(msg);
    }

    printMissingError(context: Context, expected: string, actual: string): void {
        const msg = this.name + " test failed while expecting: " + expected + ", found: " + actual;
        TestMethodDeclaration.print(msg);
    }

    printFailedAssertion(context: Context, expected: string, actual: string): void {
        const msg = this.name + " test failed while verifying: " + expected + ", found: " + actual;
        TestMethodDeclaration.print(msg);
    }

    printSuccess(context: Context): void {
        const msg = this.name + " test successful";
        TestMethodDeclaration.print(msg);
    }

    interpretBody(context: Context): boolean {
        context.enterMethod (this);
        try {
            this.statements.interpret (context);
            return true;
        } catch (e) {
            if(e instanceof PromptoError) {
                this.interpretError(context, e);
                // no more to execute
                return false;
            } else
                throw e;

        } finally {
            context.leaveMethod (this);
        }
    }

    interpretError(context: Context, error: Error): void {
        if(error instanceof ExecutionError)
            this.interpretPromptoError(context, error);
        else
            // help fix runtime issues by rethrowing non PromptoErrors
            throw error;
    }

    interpretPromptoError(context: Context, error: ExecutionError): void {
        const actual = error.interpret (context, new Identifier("__test_error__"));
        const expectedError = this.error ? this.error.interpret (context) : null;
        if (expectedError!=null && expectedError.equals (actual))
            this.printSuccess (context);
        else {
            const errorName = this.getErrorName(context, error, actual);
            const expectedName = this.error == null ? "SUCCESS" : this.error.name;
            this.printMissingError (context, expectedName, errorName);
        }
    }

    private getErrorName(context: Context, error: ExecutionError, actual: Value): string {
        if(actual instanceof Instance) {
            const actualValue = actual.getMemberValue(context, new Identifier("name")) as TextValue;
            return actualValue.getValue();
        } else
            return actual.toString();

    }

    toDialect(writer: CodeWriter): void {
        if (writer.isGlobalContext ())
            writer = writer.newLocalWriter ();
        writer.toDialect(this);
    }

    toMDialect(writer: CodeWriter): void {
        writer.append ("def test ").append(this.name).append (" ():").newLine().indent ();
        if(this.statements!=null)
            this.statements.toDialect (writer);
        writer.dedent().append("verifying:");
        if (this.error != null) {
            writer.append (" ");
            this.error.toDialect (writer);
            writer.newLine();
        } else if(this.assertions!=null) {
            writer.newLine().indent ();
            this.assertions.forEach(a => {
                a.toDialect (writer);
                writer.newLine();
            });
            writer.dedent ();
        }
    }

    toEDialect(writer: CodeWriter): void {
        writer.append("define ").append(this.name).append(" as test method doing:").newLine().indent ();
        if(this.statements!=null)
            this.statements.toDialect (writer);
        writer.dedent().append("and verifying");
        if (this.error != null) {
            writer.append(" ");
            this.error.toDialect (writer);
            writer.newLine();
        } else if(this.assertions!=null) {
            writer.append(":").newLine().indent ();
            this.assertions.forEach(a => {
                a.toDialect (writer);
                writer.newLine();
            });
            writer.dedent ();
        }
    }

    toODialect(writer: CodeWriter): void {
        writer.append("test method ").append(this.name).append(" () {").newLine().indent ();
        if(this.statements!=null)
            this.statements.toDialect (writer);
        writer.dedent().append("} verifying ");
        if (this.error != null) {
            this.error.toDialect (writer);
            writer.append (";").newLine();
        } else if(this.assertions!=null) {
            writer.append ("{").newLine().indent ();
            this.assertions.forEach(a => {
                a.toDialect (writer);
                writer.append(";").newLine();
            });
            writer.dedent().append("}").newLine();
        }
    }

    toDeclarationInfo(context: Context): TestInfo {
        return { name: this.name, dialect: this.dialect.name };
    }

    checkChild(context: Context): Type {
        throw new Error("Should never get there!");
    }

    getProto(context?: Context): string {
        throw new Error("Should never get there!");
    }

    getTranspiledName(context: Context): string {
        throw new Error("Should never get there!");
    }

    isAbstract(): boolean {
        throw new Error("Should never get there!");
    }

    registerParameters(context: Context): void {
        throw new Error("Should never get there!");
    }

    transpileMethodType(transpiler: Transpiler): void {
        throw new Error("Should never get there!");
    }


}

const NATIVE_ERROR_NAMES = new Map<string, string>( [
    ["DIVIDE_BY_ZERO", "DivideByZeroError"],
    ["INDEX_OUT_OF_RANGE", RangeError.name],
    ["NULL_REFERENCE", ReferenceError.name],
    ["NOT_MUTABLE", "NotMutableError"],
    ["NOT_STORABLE", "NotStorableError"],
    ["READ_WRITE", "ReadWriteError"]

]);

