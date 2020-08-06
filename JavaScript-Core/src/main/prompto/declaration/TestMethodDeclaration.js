const isNodeJs = typeof window === 'undefined' && typeof importScripts === 'undefined';
const BaseDeclaration = require("./BaseDeclaration").BaseDeclaration;
const Identifier = require("../grammar/Identifier").Identifier;
const PromptoError = require("../error/PromptoError").PromptoError;
const VoidType = require("../type/VoidType").VoidType;

class TestMethodDeclaration extends BaseDeclaration {

    constructor(id, stmts, exps, error) {
        super(id);
        this.statements = stmts;
        this.assertions = exps;
        this.error = error;
    }

    getDeclarationType() {
        return "Test";
    }

    cleanId() {
        const cleanId = this.name.replace(/\W/g,'_');
        return cleanId.substring(1, cleanId.length - 1);
    }

    declare(transpiler) {
        transpiler.declare(this);
        transpiler = transpiler.newLocalTranspiler();
        this.statements.declare(transpiler);
        if(this.assertions)
            this.assertions.declare(transpiler);
        if(this.error)
            this.error.declare(transpiler);
    }

    transpile(transpiler) {
        transpiler = transpiler.newLocalTranspiler();
        if (this.error)
            this.transpileExpectedError(transpiler);
        else
            this.transpileAssertions(transpiler);
        transpiler.flush();
    }

    transpileAssertions(transpiler) {
        transpiler.append("function ").append(this.cleanId()).append("() {");
        transpiler.indent();
        transpiler.append("try {");
        transpiler.indent();
        this.statements.transpile(transpiler);
        transpiler.append("var success = true;").newLine();
        this.assertions.forEach(function (assertion) {
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

    transpileExpectedError(transpiler) {
        transpiler.append("function ").append(this.cleanId()).append("() {");
        transpiler.indent();
        transpiler.append("try {");
        transpiler.indent();
        this.statements.transpile(transpiler);
        transpiler.printTestName(this.name).append("failed while expecting: ").append(this.error.name).append(", found: no error');");
        transpiler.dedent();
        transpiler.append("} catch (e) {");
        transpiler.indent();
        transpiler.append("if(e instanceof ").append(NativeErrorNames[this.error.name]).append(") {").indent();
        transpiler.printTestName(this.name).append("successful');").dedent();
        transpiler.append("} else {").indent();
        transpiler.printTestName(this.name).append('failed while expecting: ').append(this.error.name).append(", found: ' + translateError(e));").dedent();
        transpiler.append("}");
        transpiler.dedent();
        transpiler.append("}");
        transpiler.dedent();
        transpiler.append("}");
        transpiler.newLine();
        transpiler.flush();
    }

    check(context) {
        context = context.newLocalContext();
        this.statements.forEach(function(s) {
            this.checkStatement(context, s);
        }, this);
        if(this.assertions!=null) {
            this.assertions.forEach(a => {
                context = a.check(context);
            }, this);
        }
        return VoidType.instance;
    }

    checkStatement(context, statement) {
        const type = statement.check(context);
        if(statement.canReturn() && type!=null && type!=VoidType.instance) // null indicates SyntaxError
            context.problemListener.reportIllegalReturn(statement);
    }

    register(context) {
        context.registerTestDeclaration (this);
    }

    unregister(context) {
        context.unregisterTestDeclaration (this);
    }

    getType(context) {
        return VoidType.instance;
    }

    interpret(context) {
        if (this.interpretBody (context)) {
            this.interpretNoError (context);
            this.interpretAsserts (context);
        }
    }

    interpretNoError(context) {
        // we land here only if no error was raised
        if (this.error != null)
            this.printMissingError (context, this.error.name, "no error");
    }

    interpretAsserts(context) {
        if (this.assertions == null)
            return;
        context.enterMethod (this);
        try {
            let success = true;
            this.assertions.forEach(function(a) {
                success &= a.interpretAssert (context, this);
            }, this);
            if (success)
                this.printSuccess (context);
        } finally {
            context.leaveMethod (this);
        }
    }

    static print(msg) {
        if(isNodeJs)
            process.stdout.write(msg);
        else
            console.log(msg);
    }

    printMissingError(context, expected, actual) {
        const msg = this.name + " test failed while expecting: " + expected + ", found: " + actual;
        TestMethodDeclaration.print(msg);
    }

    printFailedAssertion(context, expected, actual) {
        const msg = this.name + " test failed while verifying: " + expected + ", found: " + actual;
        TestMethodDeclaration.print(msg);
    }

    printSuccess(context) {
        const msg = this.name + " test successful";
        TestMethodDeclaration.print(msg);
    }

    interpretBody(context) {
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

    interpretError(context, ex) {
        // help fix runtime issues by rethrowing non PromptoErrors
        if(!ex.interpret)
            throw ex;
        const expectedError = this.error == null ? null : this.error.interpret (context);
        const actual = ex.interpret (context, new Identifier("__test_error__"));
        if (expectedError!=null && expectedError.equals (actual))
            this.printSuccess (context);
        else {
            const actualName = actual.getMemberValue (context, "name").toString ();
            const expectedName = this.error == null ? "SUCCESS" : this.error.name;
            this.printMissingError (context, expectedName, actualName);
        }
    }

    toDialect(writer) {
        if (writer.isGlobalContext ())
            writer = writer.newLocalWriter ();
        writer.toDialect(this);
    }

    toMDialect(writer) {
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

    toEDialect(writer) {
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

    toODialect(writer) {
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
}

const NativeErrorNames = {
    DIVIDE_BY_ZERO: "DivideByZeroError",
    INDEX_OUT_OF_RANGE: RangeError.name,
    NULL_REFERENCE: ReferenceError.name,
    NOT_MUTABLE: "NotMutableError",
    NOT_STORABLE: "NotStorableError",
    READ_WRITE: "ReadWriteError"
};


exports.TestMethodDeclaration = TestMethodDeclaration;
