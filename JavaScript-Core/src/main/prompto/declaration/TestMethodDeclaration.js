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

TestMethodDeclaration.prototype.check = function(context) {
    // TODO
    return VoidType.instance;
};

TestMethodDeclaration.prototype.register = function(context) {
    context.registerTestDeclaration (this);
};

TestMethodDeclaration.prototype.unregister = function(context) {
    context.unregisterTestDeclaration (this);
};

TestMethodDeclaration.prototype.getType = function(context)
{
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
        this.printFailure (context, this.error.name, "no error");
};

TestMethodDeclaration.prototype.interpretAsserts = function(context)
{
    if (this.assertions == null)
        return;
    context.enterMethod (this);
    try {
        var self = this;
        var success = true;
        this.assertions.forEach(function(a) {
            success &= a.interpretAssert (context, self);
        });
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

TestMethodDeclaration.prototype.printFailure = function(context, expected, actual)
{
    var msg = this.name + " test failed, expected: " + expected + ", actual: " + actual
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
    var expectedError = this.error == null ? null : this.error.interpret (context);
    var actual = ex.interpret (context, new Identifier("__test_error__"));
    if (expectedError!=null && expectedError.equals (actual))
        this.printSuccess (context);
    else {
        var actualName = actual.getMember (context, "name").toString ();
        var expectedName = this.error == null ? "SUCCESS" : this.error.name;
        this.printFailure (context, expectedName, actualName);
    }
};

TestMethodDeclaration.prototype.toDialect = function(writer)
{
    if (writer.isGlobalContext ())
        writer = writer.newLocalWriter ();
    writer.toDialect(this);
};

TestMethodDeclaration.prototype.toSDialect = function(writer)
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
