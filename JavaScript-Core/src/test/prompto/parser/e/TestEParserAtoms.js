require("../../../../exploded");

var antlr4 = require("antlr4");
var prompto = require("../../../../main/prompto/index");


function ETestParser(code, addLF) {
    prompto.parser.ECleverParser.call(this, code);
    var lexer = this.getTokenStream().tokenSource;
    lexer.addLF = addLF;
    return this;
}

ETestParser.prototype = Object.create(prompto.parser.ECleverParser.prototype);
ETestParser.prototype.constructor = ETestParser;

ETestParser.prototype.value = function (tree) {
    var builder = new prompto.parser.EPromptoBuilder(this);
    var walker = new antlr4.tree.ParseTreeWalker();
    walker.walk(builder, tree);
    return builder.getNodeValue(tree);
};

ETestParser.prototype.parse_atomic_literal = function () {
    return this.value(this.atomic_literal());
};

ETestParser.prototype.parse_assignable = function () {
    return this.value(this.assignable_instance());
};


ETestParser.prototype.parse_argument_assignment_list = function () {
    return this.value(this.argument_assignment_list());
};

ETestParser.prototype.parse_argument_assignment = function () {
    return this.value(this.argument_assignment());
};


ETestParser.prototype.parse_instance_expression = function () {
    return this.value(this.instance_expression());
};

ETestParser.prototype.parse_range_literal = function () {
    return this.value(this.range_literal());
};

ETestParser.prototype.parse_tuple_literal = function () {
    return this.value(this.tuple_literal());
};

ETestParser.prototype.parse_attribute_declaration = function () {
    return this.value(this.attribute_declaration());
};

ETestParser.prototype.parse_category_declaration = function () {
    return this.value(this.category_declaration());
};

ETestParser.prototype.parse_typed_argument = function () {
    return this.value(this.typed_argument());
};

ETestParser.prototype.parse_argument_list = function () {
    return this.value(this.full_argument_list());
};

ETestParser.prototype.parse_method_call = function () {
    return this.value(this.method_call_statement());
};

ETestParser.prototype.parse_native_method_declaration = function () {
    return this.value(this.native_method_declaration());
};

ETestParser.prototype.parse_concrete_method_declaration = function () {
    return this.value(this.concrete_method_declaration());
};

ETestParser.prototype.parse_constructor_expression = function () {
    return this.value(this.constructor_expression());
};

ETestParser.prototype.parse_assign_instance_statement = function () {
    return this.value(this.assign_instance_statement());
};

ETestParser.prototype.parse_native_statement = function () {
    return this.value(this.native_statement());
};

ETestParser.prototype.parse_literal_expression = function () {
    return this.value(this.literal_expression());
};

ETestParser.prototype.parse_native_symbol = function () {
    return this.value(this.native_symbol());
};

ETestParser.prototype.parse_statement = function () {
    return this.value(this.statement());
};

ETestParser.prototype.parse_expression = function () {
    return this.value(this.expression());
};


exports.testInteger = function (test) {
    var statement = "1";
    var parser = new ETestParser(statement, false);
    var il = parser.parse_atomic_literal();
    test.ok(il);
    test.equal(1, il.getValue().IntegerValue());
    test.done();
};


exports.testLiteral = function (test) {
    var statement = "1";
    var parser = new ETestParser(statement, false);
    var sl = parser.parse_literal_expression();
    test.ok(sl instanceof prompto.literal.IntegerLiteral);
    test.done();
};


exports.testExpression = function (test) {
    var statement = "1";
    var parser = new ETestParser(statement, false);
    var sl = parser.parse_expression();
    test.ok(sl instanceof prompto.literal.IntegerLiteral);
    test.done();
};


exports.testEmptyTuple = function (test) {
    var statement = "()";
    var parser = new ETestParser(statement, false);
    var tl = parser.parse_literal_expression();
    test.ok(tl instanceof prompto.literal.TupleLiteral);
    test.done();
};


exports.testSimpleTuple = function (test) {
    var statement = "(1)";
    var parser = new ETestParser(statement, false);
    var tl = parser.parse_literal_expression();
    test.ok(tl instanceof prompto.literal.TupleLiteral);
    test.done();
};


exports.testComplexTuple = function (test) {
    var statement = "(1,\"John\",'12:12:12')";
    var parser = new ETestParser(statement, false);
    var tl = parser.parse_tuple_literal();
    test.ok(tl instanceof prompto.literal.TupleLiteral);
    test.equal("1", tl.expressions[0].toString());
    test.equal("\"John\"", tl.expressions[1].toString());
    test.equal("'12:12:12'", tl.expressions[2].toString());
    test.equal("(1, \"John\", '12:12:12')", tl.toString());
    test.done();
};


exports.testRange = function (test) {
    var statement = "[1..100]";
    var parser = new ETestParser(statement, false);
    var rl = parser.parse_range_literal();
    test.ok(rl);
    test.equal("1", rl.first.toString());
    test.equal("100", rl.last.toString());
    test.equal("[1..100]", rl.toString());
    test.done();
};


exports.testAttribute = function (test) {
    var statement = "define id as : Integer attribute\n";
    var parser = new ETestParser(statement, true);
    var ad = parser.parse_attribute_declaration();
    test.ok(ad);
    test.equal("id", ad.name);
    test.equal("Integer", ad.getType().name);
    test.done();
};


exports.testArrayAttribute = function (test) {
    var statement = "define id as : Integer[] attribute\n";
    var parser = new ETestParser(statement, true);
    var ad = parser.parse_attribute_declaration();
    test.ok(ad);
    test.equal("id", ad.name);
    test.equal("Integer[]", ad.getType().name);
    test.done();
};


exports.testCategory1Attribute = function (test) {
    var statement = "define Person as: category with attribute: id\n";
    var parser = new ETestParser(statement, true);
    var cd = parser.parse_category_declaration();
    test.ok(cd);
    test.equal("Person", cd.name);
    test.ok(!cd.derivedFrom);
    test.ok(cd.attributes);
    test.ok(cd.attributes.indexOf("id") >= 0);
    test.done();
};


exports.testCategory2Attributes = function (test) {
    var statement = "define Person as: category with attributes: id, name";
    var parser = new ETestParser(statement, false);
    var cd = parser.parse_category_declaration();
    test.ok(cd);
    test.equal("Person", cd.name);
    test.ok(!cd.derivedFrom);
    test.ok(cd.attributes);
    test.ok(cd.attributes.indexOf("id") >= 0);
    test.ok(cd.attributes.indexOf("name") >= 0);
    test.done();
};


exports.testCategory1Derived1Attribute = function (test) {
    var statement = "define Employee as: Person with attribute: company";
    var parser = new ETestParser(statement, false);
    var cd = parser.parse_category_declaration();
    test.ok(cd);
    test.equal("Employee", cd.name);
    test.ok(cd.derivedFrom);
    test.ok(cd.derivedFrom.indexOf("Person") >= 0);
    test.ok(cd.attributes);
    test.ok(cd.attributes.indexOf("company") >= 0);
    test.done();
};


exports.testCategory2DerivedNoAttribute = function (test) {
    var statement = "define Entrepreneur as: Person and Company\n";
    var parser = new ETestParser(statement, true);
    var cd = parser.parse_category_declaration();
    test.ok(cd);
    test.equal("Entrepreneur", cd.name);
    test.ok(cd.derivedFrom);
    test.ok(cd.derivedFrom.indexOf("Person") >= 0);
    test.ok(cd.derivedFrom.indexOf("Company") >= 0);
    test.ok(!cd.attributes);
    test.done();
};


exports.testMemberExpression = function (test) {
    var statement = "p.name";
    var parser = new ETestParser(statement, false);
    var me = parser.parse_instance_expression();
    test.ok(me instanceof prompto.expression.MemberSelector);
    test.equal("name", me.name);
    test.ok(me.parent instanceof prompto.grammar.UnresolvedIdentifier);
    test.equal("p", me.parent.name);
    test.done();
};


exports.testArgument = function (test) {
    var statement = "Person p";
    var parser = new ETestParser(statement, false);
    var a = parser.parse_typed_argument();
    test.ok(a);
    test.equal("Person", a.type.name);
    test.equal("p", a.name);
    test.done();
};


exports.testList1Argument = function (test) {
    var statement = "Person p";
    var parser = new ETestParser(statement, false);
    var l = parser.parse_argument_list();
    test.ok(l);
    test.equal(1, l.length);
    test.done();
};


exports.testList2ArgumentsComma = function (test) {
    var statement = "Person p, Employee e";
    var parser = new ETestParser(statement, false);
    var l = parser.parse_argument_list();
    test.ok(l);
    test.equal(2, l.length);
    test.done();
};


exports.testList2ArgumentsAnd = function (test) {
    var statement = "Person p and Employee e";
    var parser = new ETestParser(statement, false);
    var l = parser.parse_argument_list();
    test.ok(l);
    test.equal(2, l.length);
    test.done();
};


exports.testMethodCallExpression = function (test) {
    var statement = "print \"person\" + p.name";
    var parser = new ETestParser(statement, false);
    var ac = parser.parse_method_call();
    test.ok(ac);
    test.done();
};


exports.testSimpleArgumentAssignment = function (test) {
    var statement = "p.name as value";
    var parser = new ETestParser(statement, false);
    var as = parser.parse_argument_assignment();
    test.equal("value", as.name);
    var exp = as.expression;
    test.ok(exp);
    writer = new prompto.utils.CodeWriter(prompto.parser.Dialect.E)
    as.toDialect(writer);
    test.equal("p.name as value", writer.toString());
    test.done();
};


exports.testComplexArgumentAssignment = function (test) {
    var statement = "\"person\" + p.name as value";
    var parser = new ETestParser(statement, false);
    var as = parser.parse_argument_assignment();
    test.equal("value", as.name);
    var exp = as.expression;
    test.ok(exp instanceof prompto.expression.AddExpression);
    writer = new prompto.utils.CodeWriter(prompto.parser.Dialect.E)
    as.toDialect(writer);
    test.equal("\"person\" + p.name as value", writer.toString());
    test.done();
};


exports.testArgumentAssignmentList1Arg = function (test) {
    var statement = "with \"person\" + p.name as value";
    var parser = new ETestParser(statement, false);
    var ls = parser.parse_argument_assignment_list();
    var as = ls[0];
    test.equal("value", as.name);
    var exp = as.expression;
    test.ok(exp instanceof prompto.expression.AddExpression);
    writer = new prompto.utils.CodeWriter(prompto.parser.Dialect.E)
    as.toDialect(writer);
    test.equal("\"person\" + p.name as value", writer.toString());
    test.done();
};


exports.testMethodCallWith = function (test) {
    var statement = "print with \"person\" + p.name as value";
    var parser = new ETestParser(statement, false);
    var mc = parser.parse_method_call();
    test.ok(mc);
    test.equal("print", mc.callable.toString());
    test.ok(mc.assignments);
    var as = mc.assignments[0];
    test.equal("value", as.name);
    var exp = as.expression;
    test.ok(exp instanceof prompto.expression.AddExpression);
    writer = new prompto.utils.CodeWriter(prompto.parser.Dialect.E)
    mc.toDialect(writer);
    test.equal("print with \"person\" + p.name as value", writer.toString());
    test.done();
};


exports.testMethod1Parameter1Statement = function (test) {
    var statement = "define printName as: method receiving: Person p doing:\n" +
        "\tprint with \"person\" + p.name as value\n";
    var parser = new ETestParser(statement, true);
    var ad = parser.parse_concrete_method_declaration();
    test.ok(ad);
    test.equal("printName", ad.name);
    test.ok(ad.args);
    var expected = new prompto.grammar.CategoryArgument(new prompto.type.CategoryType("Person"), "p", null);
    test.ok(prompto.utils.arrayContains(ad.args, expected));
    test.ok(ad.statements);
    writer = new prompto.utils.CodeWriter(prompto.parser.Dialect.E)
    ad.statements[0].toDialect(writer);
    test.equal("print with \"person\" + p.name as value", writer.toString());
    test.done();
};


exports.testMethod1Extended1Statement = function (test) {
    var statement = "define printName as: method receiving: Object o with attribute: name doing:\n" +
        "\tprint with \"object\" + o.name as value\n";
    var parser = new ETestParser(statement, true);
    var ad = parser.parse_concrete_method_declaration();
    test.ok(ad);
    test.equal("printName", ad.name);
    test.ok(ad.args);
    var expected = new prompto.grammar.CategoryArgument(new prompto.type.CategoryType("Object"), "o", new prompto.grammar.IdentifierList("name"));
    test.ok(prompto.utils.arrayContains(ad.args, expected));
    test.ok(ad.statements);
    writer = new prompto.utils.CodeWriter(prompto.parser.Dialect.E)
    ad.statements[0].toDialect(writer);
    test.equal("print with \"object\" + o.name as value", writer.toString());
    test.done();
};


exports.testMethod1Array1Statement = function (test) {
    var statement = "define printName as: method receiving: Option[] options doing:\n" +
        "\tprint with \"array\" + args as value\n";
    var parser = new ETestParser(statement, true);
    var ad = parser.parse_concrete_method_declaration();
    test.ok(ad);
    test.equal("printName", ad.name);
    test.ok(ad.args);
    var expected = new prompto.grammar.CategoryArgument(
        new prompto.type.ListType(
            new prompto.type.CategoryType("Option")), "options", null);
    test.ok(prompto.utils.arrayContains(ad.args, expected));
    test.ok(ad.statements);
    writer = new prompto.utils.CodeWriter(prompto.parser.Dialect.E)
    ad.statements[0].toDialect(writer);
    test.equal("print with \"array\" + args as value", writer.toString());
    test.done();
};


exports.testConstructor1Attribute = function (test) {
    var statement = "Company with 1 as id";
    var parser = new ETestParser(statement, false);
    var c = parser.parse_constructor_expression();
    test.ok(c);
    test.done();
};


exports.testConstructorFrom1Attribute = function (test) {
    var statement = "Company from entity with 1 as id";
    var parser = new ETestParser(statement, false);
    var c = parser.parse_constructor_expression();
    test.ok(c);
    test.done();
};


exports.testConstructor2AttributesComma = function (test) {
    var statement = "Company with 1 as id, \"IBM\" as name";
    var parser = new ETestParser(statement, false);
    var c = parser.parse_constructor_expression();
    test.ok(c);
    var l = c.assignments;
    test.ok(l);
    test.equal(2, l.length);
    var a = l[0];
    test.ok(a);
    test.equal("id", a.name);
    var e = a.expression;
    test.ok(e);
    test.ok(e instanceof prompto.literal.IntegerLiteral);
    a = l[1];
    test.ok(a);
    test.equal("name", a.name);
    e = a.expression;
    test.ok(e);
    test.ok(e instanceof prompto.literal.TextLiteral);
    test.done();
};


exports.testConstructor2AttributesAnd = function (test) {
    var statement = "Company with 1 as id and \"IBM\" as name";
    var parser = new ETestParser(statement, false);
    var c = parser.parse_constructor_expression();
    test.ok(c);
    var l = c.assignments;
    test.ok(l);
    test.equal(2, l.length);
    var a = l[0];
    test.ok(a);
    test.equal("id", a.name);
    var e = a.expression;
    test.ok(e);
    test.ok(e instanceof prompto.literal.IntegerLiteral);
    a = l[1];
    test.ok(a);
    test.equal("name", a.name);
    e = a.expression;
    test.ok(e);
    test.ok(e instanceof prompto.literal.TextLiteral);
    test.done();
};


exports.testAssignmentConstructor = function (test) {
    var statement = "c = Company from x with 1 as id and \"IBM\" as name";
    var parser = new ETestParser(statement, false);
    var a = parser.parse_assign_instance_statement();
    test.ok(a);
    test.ok(a.expression instanceof prompto.expression.ConstructorExpression);
    test.done();
};


exports.testNativeJava = function (test) {
    var statement = "Java: System.out.println(value);\n";
    var parser = new ETestParser(statement, true);
    var call = parser.parse_native_statement();
    test.ok(call);
    test.ok(call instanceof prompto.statement.NativeCall);
    test.done();
};


exports.testNativeCSharp = function (test) {
    var statement = "C#: Console.WriteLine(value);\n";
    var parser = new ETestParser(statement, true);
    var call = parser.parse_native_statement();
    test.ok(call);
    test.ok(call instanceof prompto.statement.NativeCall);
    test.done();
};


exports.testNativeMethod = function (test) {
    var statement = "define print as: native method receiving: String value doing:\n" +
        "\tJava: System.out.println(value);\n" +
        "\tC#: Console.println(value);\n";

    var parser = new ETestParser(statement, true);
    var method = parser.parse_native_method_declaration();
    test.ok(method);
    test.ok(method instanceof prompto.declaration.NativeMethodDeclaration);
    test.done();
};


exports.testBooleanLiteral = function (test) {
    var statement = "true";
    var parser = new ETestParser(statement, false);
    var literal = parser.parse_literal_expression();
    test.ok(literal);
    test.ok(literal instanceof prompto.literal.BooleanLiteral);
    test.equal("true", literal.toString());
    test.equal(true, literal.getValue().getValue());
    statement = "false";
    parser = new ETestParser(statement, false);
    literal = parser.parse_literal_expression();
    test.ok(literal);
    test.ok(literal instanceof prompto.literal.BooleanLiteral);
    test.equal("false", literal.toString());
    test.equal(false, literal.getValue().getValue());
    test.done();
};


exports.testTextLiteral = function (test) {
    var statement = "\"hello\"";
    var parser = new ETestParser(statement, false);
    var literal = parser.parse_literal_expression();
    test.ok(literal);
    test.ok(literal instanceof prompto.literal.TextLiteral);
    test.equal("\"hello\"", literal.text);
    test.equal("hello", literal.getValue().getValue());
    test.done();
};


exports.testIntegerLiteral = function (test) {
    var statement = "1234";
    var parser = new ETestParser(statement, false);
    var literal = parser.parse_literal_expression();
    test.ok(literal);
    test.ok(literal instanceof prompto.literal.IntegerLiteral);
    test.equal("1234", literal.toString());
    test.equal(1234, literal.getValue().IntegerValue());
    test.done();
};


exports.testParseHexa = function (test) {
    test.equal(0x0A11, prompto.literal.HexaLiteral.parseHexa("0x0A11").IntegerValue());
    test.done();
};


exports.testHexaLiteral = function (test) {
    var statement = "0x0A11";
    var parser = new ETestParser(statement, false);
    var literal = parser.parse_literal_expression();
    test.ok(literal);
    test.ok(literal instanceof prompto.literal.HexaLiteral);
    test.equal("0x0A11", literal.text);
    test.equal(0x0A11, literal.getValue().IntegerValue());
    test.done();
};


exports.testDecimalLiteral = function (test) {
    var statement = "1234.13";
    var parser = new ETestParser(statement, false);
    var literal = parser.parse_literal_expression();
    test.ok(literal);
    test.ok(literal instanceof prompto.literal.DecimalLiteral);
    test.equal("1234.13", literal.toString());
    test.equal(1234.13, literal.getValue().DecimalValue(), 0.0000001);
    test.done();
};


exports.testEmptyListLiteral = function (test) {
    var statement = "[]";
    var parser = new ETestParser(statement, false);
    var literal = parser.parse_literal_expression();
    test.ok(literal);
    test.ok(literal instanceof prompto.literal.ListLiteral);
    test.equal("[]", literal.toString());
    test.equal(0, literal.getValue().size());
    test.done();
};


exports.testSimpleListLiteral = function (test) {
    var statement = "[ john, 123 ]";
    var parser = new ETestParser(statement, false);
    var literal = parser.parse_literal_expression();
    test.ok(literal);
    test.equal("[john, 123]", literal.toString());
    test.ok(literal instanceof prompto.literal.ListLiteral);
    test.equal(2, literal.expressions.length);
    test.ok(literal.expressions[0] instanceof prompto.grammar.UnresolvedIdentifier);
    test.ok(literal.expressions[1] instanceof prompto.literal.IntegerLiteral);
    test.done();
};


exports.testEmptyDictLiteral = function (test) {
    var statement = "{}";
    var parser = new ETestParser(statement, false);
    var literal = parser.parse_literal_expression();
    test.ok(literal);
    test.ok(literal instanceof prompto.literal.DictLiteral);
    test.equal("{}", literal.toString());
    test.done();
};


exports.testSimpleDictLiteral = function (test) {
    var statement = "{ \"john\" : 1234, eric : 5678 }";
    var parser = new ETestParser(statement, false);
    var literal = parser.parse_literal_expression();
    test.ok(literal);
    test.ok(literal instanceof prompto.literal.DictLiteral);
    writer = new prompto.utils.CodeWriter(prompto.parser.Dialect.E)
    literal.toDialect(writer);
    test.equal("{\"john\":1234, eric:5678}", writer.toString());
    test.done();
};


exports.testSimpleDate = function (test) {
    var statement = "'2012-10-09'";
    var parser = new ETestParser(statement, false);
    var literal = parser.parse_literal_expression();
    test.ok(literal);
    test.ok(literal instanceof prompto.literal.DateLiteral);
    test.equal("'2012-10-09'", literal.text);
    var expected = new Date(2012, 10 - 1, 9);
    var actual = literal.getValue().getValue();
    test.equal(expected.getFullYear(), actual.getFullYear());
    test.equal(expected.getMonth(), actual.getMonth());
    test.equal(expected.getDate(), actual.getDate());
    test.done();
};


exports.testSimpleTime = function (test) {
    var statement = "'15:03:10'";
    var parser = new ETestParser(statement, false);
    var literal = parser.parse_literal_expression();
    test.ok(literal);
    test.ok(literal instanceof prompto.literal.TimeLiteral);
    test.equal("'15:03:10'", literal.text);
    var expected = new Date();
    expected.setUTCHours(15);
    expected.setUTCMinutes(3);
    expected.setUTCSeconds(10);
    expected.setUTCMilliseconds(0);
    var actual = literal.getValue().getValue();
    test.equal(expected.getHours(), actual.getHours());
    test.equal(expected.getMinutes(), actual.getMinutes());
    test.equal(expected.getSeconds(), actual.getSeconds());
    test.done();
};


exports.testDateTime = function (test) {
    var statement = "'2012-10-09T15:18:17'";
    var parser = new ETestParser(statement, false);
    var literal = parser.parse_literal_expression();
    test.ok(literal);
    test.ok(literal instanceof prompto.literal.DateTimeLiteral);
    test.equal("'2012-10-09T15:18:17'", literal.text);
    var expected = new Date();
    expected.setUTCFullYear(2012);
    expected.setUTCMonth(10 - 1);
    expected.setUTCDate(9);
    expected.setUTCHours(15);
    expected.setUTCMinutes(18);
    expected.setUTCSeconds(17);
    expected.setUTCMilliseconds(0);
    test.equal(expected.toISOString(), literal.getValue().date.toISOString());
    test.done();
};


exports.testDateTimeWithMillis = function (test) {
    var statement = "'2012-10-09T15:18:17.487'";
    var parser = new ETestParser(statement, false);
    var literal = parser.parse_literal_expression();
    test.ok(literal);
    test.ok(literal instanceof prompto.literal.DateTimeLiteral);
    test.equal("'2012-10-09T15:18:17.487'", literal.text);
    var expected = new Date();
    expected.setUTCFullYear(2012);
    expected.setUTCMonth(10 - 1);
    expected.setUTCDate(9);
    expected.setUTCHours(15);
    expected.setUTCMinutes(18);
    expected.setUTCSeconds(17);
    expected.setUTCMilliseconds(487);
    test.equal(expected.toISOString(), literal.getValue().date.toISOString());
    test.done();
};


exports.testPeriod = function (test) {
    var statement = "'P3Y'";
    var parser = new ETestParser(statement, false);
    var literal = parser.parse_literal_expression();
    test.ok(literal);
    test.ok(literal instanceof prompto.literal.PeriodLiteral);
    test.equal("'P3Y'", literal.text);
    test.equal(3, literal.getValue().years);
    test.done();
};


exports.testNativeSymbol = function (test) {
    var statement = "ENTITY_1 with \"1\" as value";
    var parser = new ETestParser(statement, true);
    var symbol = parser.parse_native_symbol();
    test.ok(symbol);
    test.ok(symbol instanceof prompto.grammar.NativeSymbol);
    writer = new prompto.utils.CodeWriter(prompto.parser.Dialect.E)
    symbol.toDialect(writer);
    test.equal(statement, writer.toString());
    test.done();
};


exports.testExpressionWith = function (test) {
    var statement = "x = print with \"1\" as value";
    var parser = new ETestParser(statement, false);
    var stmt = parser.parse_statement();
    test.ok(stmt);
    writer = new prompto.utils.CodeWriter(prompto.parser.Dialect.E)
    stmt.toDialect(writer);
    test.equal(statement, writer.toString());
    test.done();
};


exports.testMethodUnresolved = function (test) {
    var statement = "print";
    var parser = new ETestParser(statement, false);
    var stmt = parser.parse_statement();
    test.ok(stmt instanceof prompto.statement.UnresolvedCall);
    writer = new prompto.utils.CodeWriter(prompto.parser.Dialect.E)
    stmt.toDialect(writer);
    test.equal(statement, writer.toString());
    test.done();
};


exports.testMethodExpression = function (test) {
    var statement = "print a";
    var parser = new ETestParser(statement, false);
    var stmt = parser.parse_statement();
    test.ok(stmt instanceof prompto.statement.UnresolvedCall);
    writer = new prompto.utils.CodeWriter(prompto.parser.Dialect.E)
    stmt.toDialect(writer);
    test.equal(statement, writer.toString());
    test.done();
};


exports.testMethodWith = function (test) {
    var statement = "print \"a\" with \"1\" as value";
    var parser = new ETestParser(statement, false);
    var stmt = parser.parse_statement();
    test.ok(stmt);
    writer = new prompto.utils.CodeWriter(prompto.parser.Dialect.E)
    stmt.toDialect(writer);
    test.equal(statement, writer.toString());
    test.done();
};


exports.testInstance = function (test) {
    var statement = "x[y]";
    var parser = new ETestParser(statement, false);
    var stmt = parser.parse_expression();
    test.ok(stmt);
    writer = new prompto.utils.CodeWriter(prompto.parser.Dialect.E)
    stmt.toDialect(writer);
    test.equal(statement, writer.toString());
    test.done();
};


exports.testAssignableInstance = function (test) {
    var statement = "doc.vals[2]";
    var parser = new ETestParser(statement, false);
    var stmt = parser.parse_assignable();
    test.ok(stmt);
    writer = new prompto.utils.CodeWriter(prompto.parser.Dialect.E)
    stmt.toDialect(writer);
    test.equal(statement, writer.toString());
    test.done();
};

