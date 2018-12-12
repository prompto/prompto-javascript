var isNodeJs = typeof window === 'undefined' && typeof importScripts === 'undefined';
var BaseDeclaration = require("./BaseDeclaration").BaseDeclaration;
var Identifier = require("../grammar/Identifier").Identifier;
var PromptoError = require("../error/PromptoError").PromptoError;
var VoidType = require("../type/VoidType").VoidType;

function TestMethodDeclaration(id, stmts, exps, error) {
    BaseDeclaration.call(this, id);
    this.statements = stmts;
    this.assertions = exps;
    this.error = error;
    return this;
}

TestMethodDeclaration.prototype = Object.create(BaseDeclaration.prototype);
TestMethodDeclaration.prototype.constructor = TestMethodDeclaration;

TestMethodDeclaration.prototype.getDeclarationType = function() {
    return "Test";
};

TestMethodDeclaration.prototype.cleanId = function() {
    var cleanId = this.name.replace(/\W/g,'_');
    return cleanId.substring(1, cleanId.length - 1);
};


TestMethodDeclaration.prototype.declare = function(transpiler) {
    transpiler.declare(this);
    transpiler = transpiler.newLocalTranspiler();
    this.statements.declare(transpiler);
    if(this.assertions)
        this.assertions.declare(transpiler);
    if(this.error)
        this.error.declare(transpiler);
};

TestMethodDeclaration.prototype.transpile = function(transpiler) {
    transpiler = transpiler.newLocalTranspiler();
    if (this.error)
        this.transpileExpectedError(transpiler);
    else
        this.transpileAssertions(transpiler);
    transpiler.flush();
};

TestMethodDeclaration.prototype.transpileAssertions = function(transpiler) {
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
};

var NativeErrorNames = {
    DIVIDE_BY_ZERO: "DivideByZeroError",
    INDEX_OUT_OF_RANGE: RangeError.name,
    NULL_REFERENCE: ReferenceError.name,
    NOT_MUTABLE: "NotMutableError",
    NOT_STORABLE: "NotStorableError",
    READ_WRITE: "ReadWriteError"
};

TestMethodDeclaration.prototype.transpileExpectedError = function(transpiler) {
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
};

TestMethodDeclaration.prototype.check = function(context, isStart) {
    // TODO
    return VoidType.instance;
};

TestMethodDeclaration.prototype.register = function(context) {
    context.registerTestDeclaration (this);
};

TestMethodDeclaration.prototype.unregister = function(context) {
    context.unregisterTestDeclaration (this);
};

TestMethodDeclaration.prototype.getType = function(context) {
    return VoidType.instance;
};

TestMethodDeclaration.prototype.interpret = function(context)
{
    if (this.interpretBody (context)) {
        this.interpretNoError (context);
        this.interpretAsserts (context);
    }
};

TestMethodDeclaration.prototype.interpretNoError = function(context)
{
    // we land here only if no error was raised
    if (this.error != null)
        this.printMissingError (context, this.error.name, "no error");
};

TestMethodDeclaration.prototype.interpretAsserts = function(context)
{
    if (this.assertions == null)
        return;
    context.enterMethod (this);
    try {
        var success = true;
        this.assertions.forEach(function(a) {
            success &= a.interpretAssert (context, this);
        }, this);
        if (success)
            this.printSuccess (context);
    } finally {
        context.leaveMethod (this);
    }
};

TestMethodDeclaration.print = function(msg) {
    if(isNodeJs)
        process.stdout.write(msg);
    else
        console.log(msg);
};

TestMethodDeclaration.prototype.printMissingError = function(context, expected, actual)
{
    var msg = this.name + " test failed while expecting: " + expected + ", found: " + actual;
    TestMethodDeclaration.print(msg);
};


TestMethodDeclaration.prototype.printFailedAssertion = function(context, expected, actual)
{
    var msg = this.name + " test failed while verifying: " + expected + ", found: " + actual;
    TestMethodDeclaration.print(msg);
};

TestMethodDeclaration.prototype.printSuccess = function(context)
{
    var msg = this.name + " test successful";
    TestMethodDeclaration.print(msg);
};

TestMethodDeclaration.prototype.interpretBody = function(context)
{
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
};

TestMethodDeclaration.prototype.interpretError = function(context, ex)
{
    // help fix runtime issues by rethrowing non PromptoErrors
    if(!ex.interpret)
        throw ex;
    var expectedError = this.error == null ? null : this.error.interpret (context);
    var actual = ex.interpret (context, new Identifier("__test_error__"));
    if (expectedError!=null && expectedError.equals (actual))
        this.printSuccess (context);
    else {
        var actualName = actual.getMemberValue (context, "name").toString ();
        var expectedName = this.error == null ? "SUCCESS" : this.error.name;
        this.printMissingError (context, expectedName, actualName);
    }
};

TestMethodDeclaration.prototype.toDialect = function(writer)
{
    if (writer.isGlobalContext ())
        writer = writer.newLocalWriter ();
    writer.toDialect(this);
};

TestMethodDeclaration.prototype.toMDialect = function(writer)
{
    writer.append ("def test ");
    writer.append (this.name);
    writer.append (" ():\n");
    writer.indent ();
    if(this.statements!=null)
        this.statements.toDialect (writer);
    writer.dedent ();
    writer.append ("verifying:");
    if (this.error != null) {
        writer.append (" ");
        this.error.toDialect (writer);
        writer.append ("\n");
    } else if(this.assertions!=null) {
        writer.append ("\n");
        writer.indent ();
        this.assertions.forEach(function(a) {
            a.toDialect (writer);
            writer.append ("\n");
        });
        writer.dedent ();
    }
};

TestMethodDeclaration.prototype.toEDialect = function(writer)
{
    writer.append ("define ");
    writer.append (this.name);
    writer.append (" as test method doing:\n");
    writer.indent ();
    if(this.statements!=null)
        this.statements.toDialect (writer);
    writer.dedent ();
    writer.append ("and verifying");
    if (this.error != null) {
        writer.append (" ");
        this.error.toDialect (writer);
        writer.append ("\n");
    } else if(this.assertions!=null) {
        writer.append (":\n");
        writer.indent ();
        this.assertions.forEach(function(a) {
            a.toDialect (writer);
            writer.append ("\n");
        });
        writer.dedent ();
    }
};

TestMethodDeclaration.prototype.toODialect = function(writer)
{
    writer.append ("test method ");
    writer.append (this.name);
    writer.append (" () {\n");
    writer.indent ();
    if(this.statements!=null)
        this.statements.toDialect (writer);
    writer.dedent ();
    writer.append ("} verifying ");
    if (this.error != null) {
        this.error.toDialect (writer);
        writer.append (";\n");
    } else if(this.assertions!=null) {
        writer.append ("{\n");
        writer.indent ();
        this.assertions.forEach(function(a) {
            a.toDialect (writer);
            writer.append (";\n");
        });
        writer.dedent ();
        writer.append ("}\n");
    }
};


exports.TestMethodDeclaration = TestMethodDeclaration;
