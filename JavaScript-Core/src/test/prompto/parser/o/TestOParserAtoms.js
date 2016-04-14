require("../../../../exploded");

var antlr4 = require("antlr4");
var prompto = require("../../../../main/prompto/index");

function OTestParser(code) {
	prompto.parser.OCleverParser.call(this, code);
	return this;
}

OTestParser.prototype = Object.create(prompto.parser.OCleverParser.prototype);
OTestParser.prototype.constructor = OTestParser;

OTestParser.prototype.value = function (tree) {
	var builder = new prompto.parser.OPromptoBuilder(this);
	var walker = new antlr4.tree.ParseTreeWalker();
	walker.walk(builder, tree);
	return builder.getNodeValue(tree);
};

OTestParser.prototype.parse_instance_expression = function() {
	return this.value(this.instance_expression());
};

OTestParser.prototype.parse_range_literal = function() {
	return this.value(this.range_literal());
};

OTestParser.prototype.parse_tuple_literal = function() {
	return this.value(this.tuple_literal());
};

OTestParser.prototype.parse_attribute_declaration = function() {
	return this.value(this.attribute_declaration());
};

OTestParser.prototype.parse_category_declaration = function() {
	return this.value(this.category_declaration());
};

OTestParser.prototype.parse_typed_argument = function() {
	return this.value(this.typed_argument());
};

OTestParser.prototype.parse_argument_list = function() {
	return this.value(this.argument_list());
};

OTestParser.prototype.parse_method_call = function() {
	return this.value(this.method_call());
};

OTestParser.prototype.parse_native_method_declaration = function() {
	return this.value(this.native_method_declaration());
};

OTestParser.prototype.parse_concrete_method_declaration = function() {
	return this.value(this.concrete_method_declaration());
};

OTestParser.prototype.parse_constructor_expression = function() {
	return this.value(this.constructor_expression());
};

OTestParser.prototype.parse_assign_instance_statement = function() {
	return this.value(this.assign_instance_statement());
};

OTestParser.prototype.parse_native_statement = function() {
	return this.value(this.native_statement());
};

OTestParser.prototype.parse_literal_expression = function() {
	return this.value(this.literal_expression());
};

OTestParser.prototype.parse_native_symbol = function() {
	return this.value(this.native_symbol());
};

OTestParser.prototype.parse_statement = function() {
	return this.value(this.statement());
};

OTestParser.prototype.parse_expression = function() {
	return this.value(this.expression());
};



exports.testTuple = function(test) {
	var statement = "(1,\"John\",'12:12:12')";
	var parser = new OTestParser(statement);
	var tl = parser.parse_tuple_literal();
	test.ok(tl);
	test.equal("1",tl.expressions[0].toString());
	test.equal("\"John\"",tl.expressions[1].toString());
	test.equal("'12:12:12'",tl.expressions[2].toString());
	test.equal( "(1, \"John\", '12:12:12')", tl.toString());
	test.done();
};


exports.testRange = function(test) {
	var statement = "[1..100]";
	var parser = new OTestParser(statement);
	var rl = parser.parse_range_literal();
	test.ok(rl);
	test.equal("1",rl.first.toString());
	test.equal("100",rl.last.toString());
	test.equal("[1..100]",rl.toString());
	test.done();
};


exports.testAttribute = function(test) {
	var statement = "attribute id : Integer; ";
	var parser = new OTestParser(statement);
	var ad = parser.parse_attribute_declaration();
	test.ok(ad);
	test.equal("id",ad.name);
	test.ok(ad.getType());
	test.equal("Integer",ad.getType().name);
	test.done();
};


exports.testArrayAttribute = function(test) {
	var statement = "attribute id : Integer[]; ";
	var parser = new OTestParser(statement);
	var ad = parser.parse_attribute_declaration();
	test.ok(ad);
	test.equal("id",ad.name);
	test.ok(ad.getType());
	test.equal("Integer[]",ad.getType().name);
	test.done();
};


exports.testCategory1Attribute = function(test) {
	var statement = "category Person ( id );";
	var parser = new OTestParser(statement);
	var cd = parser.parse_category_declaration();
	test.ok(cd);
	test.equal("Person",cd.name);
	test.ok(!cd.derivedFrom);
	test.ok(cd.attributes);
	test.ok(cd.attributes.names().indexOf("id") >= 0);
	test.done();
};


exports.testCategory2Attributes = function(test) {
	var statement = "category Person ( id, name );";
	var parser = new OTestParser(statement);
	var cd = parser.parse_category_declaration();
	test.ok(cd);
	test.equal("Person",cd.name);
	test.ok(!cd.derivedFrom);
	test.ok(cd.attributes);
	test.ok(cd.attributes.names().indexOf("id") >= 0);
	test.ok(cd.attributes.names().indexOf("name") >= 0);
	test.done();
};


exports.testCategory1Derived1Attribute = function(test) {
	var statement = "category Employee( company ) extends Person ;";
	var parser = new OTestParser(statement);
	var cd = parser.parse_category_declaration();
	test.ok(cd);
	test.equal("Employee",cd.name);
	test.ok(cd.derivedFrom);
	test.ok(cd.derivedFrom.names().indexOf("Person") >= 0);
	test.ok(cd.attributes);
	test.ok(cd.attributes.names().indexOf("company") >= 0);
	test.done();
};


exports.testCategory2DerivedNoAttribute = function(test) {
	var statement = "category Entrepreneur extends Person, Company;";
	var parser = new OTestParser(statement);
	var cd = parser.parse_category_declaration();
	test.ok(cd);
	test.equal("Entrepreneur",cd.name);
	test.ok(cd.derivedFrom);
	test.ok(cd.derivedFrom.names().indexOf("Person") >= 0);
	test.ok(cd.derivedFrom.names().indexOf("Company") >= 0);
	test.ok(!cd.attributes);
	test.done();
};


exports.testMemberExpression = function(test) {
	var statement = "p.name";
	var parser = new OTestParser(statement);
	var e = parser.parse_instance_expression();
	test.ok(e instanceof prompto.expression.MemberSelector);
	test.equal("name",e.name);
	test.ok(e.parent instanceof prompto.expression.InstanceExpression);
	test.equal("p",e.parent.name);
	test.done();
};


exports.testArgument = function(test) {
	var statement = "Person p";
	var parser = new OTestParser(statement);
	var a = parser.parse_typed_argument();
	test.ok(a);
	test.ok(a.getType());
	test.equal("Person",a.getType().name);
	test.equal("p",a.name);
	test.done();
};


exports.testList1Argument = function(test) {
	var statement = "Person p";
	var parser = new OTestParser(statement);
	var l = parser.parse_argument_list();
	test.ok(l);
	test.equal(1,l.length);
	test.done();
};


exports.testList2ArgumentsComma = function(test) {
	var statement = "Person p, Employee e";
	var parser = new OTestParser(statement);
	var l = parser.parse_argument_list();
	test.ok(l);
	test.equal(2,l.length);
	test.done();
};



exports.testMethodCallExpression = function(test) {
	var statement = "print (\"person\" + p.name );";
	var parser = new OTestParser(statement);
	var ac = parser.parse_method_call();
	test.ok(ac);
	test.done();
};


exports.testMethodCallWith = function(test) {
	var statement = "print( value = \"person\" + p.name )";
	var parser = new OTestParser(statement);
	var mc = parser.parse_method_call();
	test.ok(mc);
	test.equal("print",mc.callable.name);
	test.ok(mc.assignments);
	var as = mc.assignments[0];
	test.equal("value",as.name);
	var exp = as.expression;
	test.ok(exp instanceof prompto.expression.AddExpression);
    writer = new prompto.utils.CodeWriter(prompto.parser.Dialect.O)
    mc.toDialect(writer);
	test.equal("print(value = \"person\" + p.name)", writer.toString());
	test.done();
};


exports.testMethod1Parameter1Statement = function(test) {
	var statement = "method printName ( Person p ) { print ( value = \"person\" + p.name); }";
	var parser = new OTestParser(statement);
	var ad = parser.parse_concrete_method_declaration();
	test.ok(ad);
	test.equal("printName",ad.name);
	test.ok(ad.args);
	var arg = new prompto.argument.CategoryArgument(
        new prompto.type.CategoryType( new prompto.grammar.Identifier("Person")),
        new prompto.grammar.Identifier("p"));
	test.ok(ad.args[0].equals(arg));
	test.ok(ad.statements);
    writer = new prompto.utils.CodeWriter(prompto.parser.Dialect.O)
    ad.statements[0].toDialect(writer);
	test.equal("print(value = \"person\" + p.name)",writer.toString());
	test.done();
};


exports.testMethod1Extended1Statement = function(test) {
	var statement = "method printName ( Object(name) o ) { print ( value = \"object\" + o.name ); }";
	var parser = new OTestParser(statement);
	var ad = parser.parse_concrete_method_declaration();
	test.ok(ad);
	test.equal("printName",ad.name);
	test.ok(ad.args);
	var type = new prompto.type.CategoryType(new prompto.grammar.Identifier("Object"))
	var idlist = new prompto.grammar.IdentifierList(new prompto.grammar.Identifier("name"));
	var expected = new prompto.argument.ExtendedArgument(type,
        new prompto.grammar.Identifier("o"), idlist);
	test.ok(ad.args[0].equals(expected));
	test.ok(ad.statements);
    writer = new prompto.utils.CodeWriter(prompto.parser.Dialect.O)
    ad.statements[0].toDialect(writer);
    test.equal("print(value = \"object\" + o.name)",writer.toString());
	test.done();
};


exports.testMethod1Array1Statement = function(test) {
	var statement = "method printName ( Option[] options ) { print ( value = \"array\" + options ); }";
	var parser = new OTestParser(statement);
	var ad = parser.parse_concrete_method_declaration();
	test.ok(ad);
	test.equal("printName",ad.name);
	test.ok(ad.args);
	var type = new prompto.type.ListType(new prompto.type.CategoryType(new prompto.grammar.Identifier("Option")))
	var expected = new prompto.argument.CategoryArgument(type, new prompto.grammar.Identifier("options"));
	test.ok(ad.args[0].equals(expected));
	test.ok(ad.statements);
    writer = new prompto.utils.CodeWriter(prompto.parser.Dialect.O)
    ad.statements[0].toDialect(writer);
	test.equal("print(value = \"array\" + options)",writer.toString());
	test.done();
};


exports.testConstructor1Attribute = function(test) {
	var statement = "Company(id=1)";
	var parser = new OTestParser(statement);
	var c = parser.parse_constructor_expression();
	test.ok(c);
	test.done();
};


exports.testConstructorFrom1Attribute = function(test) {
	var statement = "Company(entity,id=1)";
	var parser = new OTestParser(statement);
	var c = parser.parse_constructor_expression();
	test.ok(c);
	test.done();
};


exports.testConstructor2AttributesComma = function(test) {
	var statement = "Company(id=1, name=\"IBM\")";
	var parser = new OTestParser(statement);
	var c = parser.parse_constructor_expression();
	test.ok(c);
	var as = c.assignments;
	test.ok(as);
	test.equal(2, as.length);
	var a = as[0];
	test.ok(a);
	test.equal("id",a.name);
	var e = a.expression;
	test.ok(e);
	test.ok(e instanceof prompto.literal.IntegerLiteral);
	a = as[1];
	test.ok(a);
	test.equal("name",a.name);
	e = a.expression;
	test.ok(e);
	test.ok(e instanceof prompto.literal.TextLiteral);
	test.done();
};


exports.testAssignmentConstructor = function(test) {
	var statement = "c = Company ( id = 1, name = \"IBM\" );";
	var parser = new OTestParser(statement);
	var a = parser.parse_assign_instance_statement();
	test.ok(a);
	test.ok(a.expression instanceof prompto.statement.UnresolvedCall);
	test.done();
};


exports.testNativeJava = function(test) {
	var statement = "Java: System.out.println(value);";
	var parser = new OTestParser(statement);
	var call = parser.parse_native_statement();
	test.ok(call);
	test.ok(call instanceof prompto.statement.NativeCall);
	test.done();
};


exports.testNativeCSharp = function(test) {
	var statement = "C#: Console.println(value);";
	var parser = new OTestParser(statement);
	var call = parser.parse_native_statement();
	test.ok(call);
	test.ok(call instanceof prompto.statement.NativeCall);
	test.done();
};


exports.testNativeMethod = function(test) {
	var statement = "native method print (String value) {\r\n"
			+ "\tJava: System.out.println(value); \r\n"
			+ "\tC#: Console.println(value); }";

	var parser = new OTestParser(statement);
	var method = parser.parse_native_method_declaration();
	test.ok(method);
	test.ok(method instanceof prompto.declaration.NativeMethodDeclaration);
	test.done();
};


exports.testBooleanLiteral = function(test) {
	var statement = "true";
	var parser = new OTestParser(statement);
	var literal = parser.parse_literal_expression();
	test.ok(literal);
	test.ok(literal instanceof prompto.literal.BooleanLiteral);
	test.equal("true", literal.toString());
	test.equal(true, literal.getValue().getValue());
	statement = "false";
	parser = new OTestParser(statement);
	literal = parser.parse_literal_expression();
	test.ok(literal);
	test.ok(literal instanceof prompto.literal.BooleanLiteral);
	test.equal("false", literal.toString());
	test.equal(false, literal.getValue().getValue());
	test.done();
};


exports.testTextLiteral = function(test) {
	var statement = "\"hello\"";
	var parser = new OTestParser(statement);
	var literal = parser.parse_literal_expression();
	test.ok(literal);
	test.ok(literal instanceof prompto.literal.TextLiteral);
	test.equal("\"hello\"", literal.text);
	test.equal("hello", literal.getValue().getValue());
	test.done();
};


exports.testIntegerLiteral = function(test) {
	var statement = "1234";
	var parser = new OTestParser(statement);
	var literal = parser.parse_literal_expression();
	test.ok(literal);
	test.ok(literal instanceof prompto.literal.IntegerLiteral);
	test.equal("1234", literal.toString());
	test.equal(1234, literal.getValue().IntegerValue());
	test.done();
};


exports.testParseHexa = function(test) {
	test.equal(0x0A11, prompto.literal.HexaLiteral.parseHexa("0x0A11").IntegerValue());
	test.done();
};


exports.testHexaLiteral = function(test) {
	var statement = "0x0A11";
	var parser = new OTestParser(statement);
	var literal = parser.parse_literal_expression();
	test.ok(literal);
	test.ok(literal instanceof prompto.literal.HexaLiteral);
	test.equal("0x0A11", literal.text);
	test.equal(0x0A11, literal.getValue().IntegerValue());
	test.done();
};


exports.testDecimalLiteral = function(test) {
	var statement = "1234.13";
	var parser = new OTestParser(statement);
	var literal = parser.parse_literal_expression();
	test.ok(literal);
	test.ok(literal instanceof prompto.literal.DecimalLiteral);
	test.equal("1234.13", literal.toString());
	test.equal(1234.13, literal.getValue().DecimalValue(),0.0000001);
	test.done();
};


exports.testEmptyListLiteral = function(test) {
	var statement = "[]";
	var parser = new OTestParser(statement);
	var literal = parser.parse_literal_expression();
	test.ok(literal);
	test.ok(literal instanceof prompto.literal.ListLiteral);
	test.equal("[]", literal.toString());
	test.equal(0, literal.getValue().size());
	test.done();
};


exports.testSimpleListLiteral = function(test) {
	var statement = "[ john, 123]";
	var parser = new OTestParser(statement);
	var literal = parser.parse_literal_expression();
	test.ok(literal);
    writer = new prompto.utils.CodeWriter(prompto.parser.Dialect.O)
    literal.toDialect(writer)
	test.equal("[john, 123]", writer.toString());
	test.ok(literal instanceof prompto.literal.ListLiteral);
	test.ok(literal.expressions[0] instanceof prompto.expression.InstanceExpression);
	test.ok(literal.expressions[1] instanceof prompto.literal.IntegerLiteral);
	test.done();
};


exports.testEmptyDictLiteral = function(test) {
	var statement = "{}";
	var parser = new OTestParser(statement);
	var literal = parser.parse_literal_expression();
	test.ok(literal);
	test.ok(literal instanceof prompto.literal.DictLiteral);
	test.equal("{}", literal.toString());
	test.done();
};


exports.testSimpleDictLiteral = function(test) {
	var statement = "{ \"john\" : 1234, eric : 5678 }";
	var parser = new OTestParser(statement);
	var literal = parser.parse_literal_expression();
	test.ok(literal);
	test.ok(literal instanceof prompto.literal.DictLiteral);
    writer = new prompto.utils.CodeWriter(prompto.parser.Dialect.O)
    literal.toDialect(writer)
	test.equal("{\"john\":1234, eric:5678}", writer.toString());
	test.done();
};


exports.testSimpleDate = function(test) {
	var statement = "'2012-10-09'";
	var parser = new OTestParser(statement);
	var literal = parser.parse_literal_expression();
	test.ok(literal);
	test.ok(literal instanceof prompto.literal.DateLiteral);
	test.equal("'2012-10-09'", literal.text);
	var date = literal.getValue().getValue();
	test.equal(date.getUTCFullYear(), 2012);
	test.equal(date.getUTCMonth(), 9);
	test.equal(date.getUTCDate(), 9);
	test.done();
};


exports.testSimpleTime = function(test) {
	var statement = "'15:03:10'";
	var parser = new OTestParser(statement);
	var literal = parser.parse_literal_expression();
	test.ok(literal);
	test.ok(literal instanceof prompto.literal.TimeLiteral);
	test.equal("'15:03:10'", literal.text);
	var time = literal.getValue().getValue()
	test.equal(time.getUTCHours(), 15);
	test.equal(time.getUTCMinutes(), 03);
	test.equal(time.getUTCSeconds(), 10);
	test.done();
};


exports.testDateTime = function(test) {
	var statement = "'2012-10-09T15:18:17'";
	var parser = new OTestParser(statement);
	var literal = parser.parse_literal_expression();
	test.ok(literal);
	test.ok(literal instanceof prompto.literal.DateTimeLiteral);
	test.equal("'2012-10-09T15:18:17'", literal.text);
	var date = literal.getValue().date
	test.equal(date.getUTCFullYear(), 2012);
	test.equal(date.getUTCMonth(), 9);
	test.equal(date.getUTCDate(), 9);
	test.equal(date.getUTCHours(), 15);
	test.equal(date.getUTCMinutes(), 18);
	test.equal(date.getUTCSeconds(), 17);
	test.done();
};


exports.testDateTimeWithMillis = function(test) {
	var statement = "'2012-10-09T15:18:17.487'";
	var parser = new OTestParser(statement);
	var literal = parser.parse_literal_expression();
	test.ok(literal);
	test.ok(literal instanceof prompto.literal.DateTimeLiteral);
	test.equal("'2012-10-09T15:18:17.487'", literal.text);
	test.equal(literal.getValue().date.getUTCMilliseconds(), 487);
	test.done();
};


exports.testDateTimeWithTZ = function(test) {
	var statement = "'2012-10-09T15:18:17+02:00'";
	var parser = new OTestParser(statement);
	var literal = parser.parse_literal_expression();
	test.ok(literal);
	test.ok(literal instanceof prompto.literal.DateTimeLiteral);
	test.equal("'2012-10-09T15:18:17+02:00'", literal.text);
	var expected = new Date();
	expected.setUTCFullYear(2012);
	expected.setUTCMonth(9);
	expected.setUTCDate(9);
	expected.setUTCHours(15+2);
	expected.setUTCMinutes(18);
	expected.setUTCSeconds(17);
	expected.setUTCMilliseconds(0);
	var actual = literal.getValue().date.valueOf() + literal.getValue().tzOffset*1000;
	test.equal(expected.valueOf(), actual);
	test.done();
};


exports.testPeriod = function(test) {
	var statement = "'P3Y'";
	var parser = new OTestParser(statement);
	var literal = parser.parse_literal_expression();
	test.ok(literal);
	test.ok(literal instanceof prompto.literal.PeriodLiteral);
	test.equal("'P3Y'", literal.text);
	test.equal(3,literal.getValue().years);
	test.done();
};


exports.testNativeSymbol = function(test) {
	var statement = "ENTITY_1 = \"1\";";
	var parser = new OTestParser(statement);
	var symbol = parser.parse_native_symbol();
	test.ok(symbol);
	test.ok(symbol instanceof prompto.grammar.NativeSymbol);
    writer = new prompto.utils.CodeWriter(prompto.parser.Dialect.O)
    symbol.expression.toDialect(writer);
	test.equal( "\"1\"", writer.toString());
	test.done();
};


exports.testExpressionMethod = function(test) {
	var statement = "x = print ( value = \"1\" );";
	var parser = new OTestParser(statement);
	var stmt = parser.parse_statement();
	test.ok(stmt);
    writer = new prompto.utils.CodeWriter(prompto.parser.Dialect.O)
    stmt.toDialect(writer);
	test.equal("x = print(value = \"1\")", writer.toString());
	test.done();
};


exports.testMethod = function(test) {
	var statement = "print (\"a\", value = \"1\");";
	var parser = new OTestParser(statement);
	var stmt = parser.parse_statement();
	test.ok(stmt);
    writer = new prompto.utils.CodeWriter(prompto.parser.Dialect.O)
    stmt.toDialect(writer);
	test.equal("print(\"a\", value = \"1\")", writer.toString());
	test.done();
};


exports.testInstanceExpression = function(test) {
	var statement = "prefix";
	var parser = new OTestParser(statement);
	var exp = parser.parse_expression();
	test.ok(exp instanceof prompto.expression.InstanceExpression);
	test.done();
}; 

