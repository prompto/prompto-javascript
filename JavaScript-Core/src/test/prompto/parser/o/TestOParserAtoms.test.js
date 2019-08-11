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

OTestParser.prototype.parse_method_call_statement = function() {
	return this.value(this.method_call_statement());
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



test('Tuple ', () => {
	var statement = "(1,\"John\",'12:12:12')";
	var parser = new OTestParser(statement);
	var tl = parser.parse_tuple_literal();
	expect(tl).toBeTruthy();
	expect(tl.expressions[0].toString()).toEqual("1");
	expect(tl.expressions[1].toString()).toEqual("\"John\"");
	expect(tl.expressions[2].toString()).toEqual("'12:12:12'");
	expect( tl.toString()).toEqual( "(1, \"John\", '12:12:12')");
});


test('Range ', () => {
	var statement = "[1..100]";
	var parser = new OTestParser(statement);
	var rl = parser.parse_range_literal();
	expect(rl).toBeTruthy();
	expect(rl.first.toString()).toEqual("1");
	expect(rl.last.toString()).toEqual("100");
	expect(rl.toString()).toEqual("[1..100]");
});


test('Attribute ', () => {
	var statement = "attribute id : Integer; ";
	var parser = new OTestParser(statement);
	var ad = parser.parse_attribute_declaration();
	expect(ad).toBeTruthy();
	expect(ad.name).toEqual("id");
	expect(ad.getType()).toBeTruthy();
	expect(ad.getType().name).toEqual("Integer");
});


test('ArrayAttribute ', () => {
	var statement = "attribute id : Integer[]; ";
	var parser = new OTestParser(statement);
	var ad = parser.parse_attribute_declaration();
	expect(ad).toBeTruthy();
	expect(ad.name).toEqual("id");
	expect(ad.getType()).toBeTruthy();
	expect(ad.getType().name).toEqual("Integer[]");
});


test('Category1Attribute ', () => {
	var statement = "category Person ( id );";
	var parser = new OTestParser(statement);
	var cd = parser.parse_category_declaration();
	expect(cd).toBeTruthy();
	expect(cd.name).toEqual("Person");
	expect(!cd.derivedFrom).toBeTruthy();
	expect(cd.attributes).toBeTruthy();
	expect(cd.attributes.names().indexOf("id") >= 0).toBeTruthy();
});


test('Category2Attributes ', () => {
	var statement = "category Person ( id, name );";
	var parser = new OTestParser(statement);
	var cd = parser.parse_category_declaration();
	expect(cd).toBeTruthy();
	expect(cd.name).toEqual("Person");
	expect(!cd.derivedFrom).toBeTruthy();
	expect(cd.attributes).toBeTruthy();
	expect(cd.attributes.names().indexOf("id") >= 0).toBeTruthy();
	expect(cd.attributes.names().indexOf("name") >= 0).toBeTruthy();
});


test('Category1Derived1Attribute ', () => {
	var statement = "category Employee( company ) extends Person ;";
	var parser = new OTestParser(statement);
	var cd = parser.parse_category_declaration();
	expect(cd).toBeTruthy();
	expect(cd.name).toEqual("Employee");
	expect(cd.derivedFrom).toBeTruthy();
	expect(cd.derivedFrom.names().indexOf("Person") >= 0).toBeTruthy();
	expect(cd.attributes).toBeTruthy();
	expect(cd.attributes.names().indexOf("company") >= 0).toBeTruthy();
});


test('Category2DerivedNoAttribute ', () => {
	var statement = "category Entrepreneur extends Person, Company;";
	var parser = new OTestParser(statement);
	var cd = parser.parse_category_declaration();
	expect(cd).toBeTruthy();
	expect(cd.name).toEqual("Entrepreneur");
	expect(cd.derivedFrom).toBeTruthy();
	expect(cd.derivedFrom.names().indexOf("Person") >= 0).toBeTruthy();
	expect(cd.derivedFrom.names().indexOf("Company") >= 0).toBeTruthy();
	expect(!cd.attributes).toBeTruthy();
});


test('MemberExpression ', () => {
	var statement = "p.name";
	var parser = new OTestParser(statement);
	var e = parser.parse_instance_expression();
	expect(e instanceof prompto.expression.MemberSelector).toBeTruthy();
	expect(e.name).toEqual("name");
	expect(e.parent instanceof prompto.expression.InstanceExpression).toBeTruthy();
	expect(e.parent.name).toEqual("p");
});


test('Argument ', () => {
	var statement = "Person p";
	var parser = new OTestParser(statement);
	var a = parser.parse_typed_argument();
	expect(a).toBeTruthy();
	expect(a.getType()).toBeTruthy();
	expect(a.getType().name).toEqual("Person");
	expect(a.name).toEqual("p");
});


test('List1Argument ', () => {
	var statement = "Person p";
	var parser = new OTestParser(statement);
	var l = parser.parse_argument_list();
	expect(l).toBeTruthy();
	expect(l.length).toEqual(1);
});


test('List2ArgumentsComma ', () => {
	var statement = "Person p, Employee e";
	var parser = new OTestParser(statement);
	var l = parser.parse_argument_list();
	expect(l).toBeTruthy();
	expect(l.length).toEqual(2);
});



test('MethodCallExpression ', () => {
	var statement = "print (\"person\" + p.name );";
	var parser = new OTestParser(statement);
	var ac = parser.parse_method_call_statement();
	expect(ac).toBeTruthy();
});


test('MethodCallWith ', () => {
	var statement = "print( value = \"person\" + p.name );";
	var parser = new OTestParser(statement);
	var mc = parser.parse_method_call_statement();
	expect(mc).toBeTruthy();
	expect(mc.callable.name).toEqual("print");
	expect(mc.args).toBeTruthy();
	var as = mc.args[0];
	expect(as.name).toEqual("value");
	var exp = as.expression;
	expect(exp instanceof prompto.expression.PlusExpression).toBeTruthy();
    writer = new prompto.utils.CodeWriter(prompto.parser.Dialect.O)
    mc.toDialect(writer);
    expect( writer.toString()).toEqual("print(value = \"person\" + p.name)");
});


test('Method1Parameter1Statement ', () => {
	var statement = "method printName ( Person p ) { print ( value = \"person\" + p.name); }";
	var parser = new OTestParser(statement);
	var ad = parser.parse_concrete_method_declaration();
	expect(ad).toBeTruthy();
	expect(ad.name).toEqual("printName");
	expect(ad.parameters).toBeTruthy();
	var arg = new prompto.param.CategoryParameter(
        new prompto.type.CategoryType( new prompto.grammar.Identifier("Person")),
        new prompto.grammar.Identifier("p"));
	expect(ad.parameters[0].equals(arg)).toBeTruthy();
	expect(ad.statements).toBeTruthy();
    writer = new prompto.utils.CodeWriter(prompto.parser.Dialect.O)
    ad.statements[0].toDialect(writer);
	expect(writer.toString()).toEqual("print(value = \"person\" + p.name)");
});


test('Method1Extended1Statement ', () => {
	var statement = "method printName ( Object(name) o ) { print ( value = \"object\" + o.name ); }";
	var parser = new OTestParser(statement);
	var ad = parser.parse_concrete_method_declaration();
	expect(ad).toBeTruthy();
	expect(ad.name).toEqual("printName");
	expect(ad.parameters).toBeTruthy();
	var type = new prompto.type.CategoryType(new prompto.grammar.Identifier("Object"))
	var idlist = new prompto.grammar.IdentifierList(new prompto.grammar.Identifier("name"));
	var expected = new prompto.param.ExtendedParameter(type,
        new prompto.grammar.Identifier("o"), idlist);
	expect(ad.parameters[0].equals(expected)).toBeTruthy();
	expect(ad.statements).toBeTruthy();
    writer = new prompto.utils.CodeWriter(prompto.parser.Dialect.O)
    ad.statements[0].toDialect(writer);
    expect(writer.toString()).toEqual("print(value = \"object\" + o.name)");
});


test('Method1Array1Statement ', () => {
	var statement = "method printName ( Option[] options ) { print ( value = \"array\" + options ); }";
	var parser = new OTestParser(statement);
	var ad = parser.parse_concrete_method_declaration();
	expect(ad).toBeTruthy();
	expect(ad.name).toEqual("printName");
	expect(ad.parameters).toBeTruthy();
	var type = new prompto.type.ListType(new prompto.type.CategoryType(new prompto.grammar.Identifier("Option")))
	var expected = new prompto.param.CategoryParameter(type, new prompto.grammar.Identifier("options"));
	expect(ad.parameters[0].equals(expected)).toBeTruthy();
	expect(ad.statements).toBeTruthy();
    writer = new prompto.utils.CodeWriter(prompto.parser.Dialect.O)
    ad.statements[0].toDialect(writer);
	expect(writer.toString()).toEqual("print(value = \"array\" + options)");
});


test('Constructor1Attribute ', () => {
	var statement = "Company(id=1)";
	var parser = new OTestParser(statement);
	var c = parser.parse_constructor_expression();
	expect(c).toBeTruthy();
});


test('ConstructorFrom1Attribute ', () => {
	var statement = "Company(entity,id=1)";
	var parser = new OTestParser(statement);
	var c = parser.parse_constructor_expression();
	expect(c).toBeTruthy();
});


test('Constructor2AttributesComma ', () => {
	var statement = "Company(id=1, name=\"IBM\")";
	var parser = new OTestParser(statement);
	var c = parser.parse_constructor_expression();
	expect(c).toBeTruthy();
	var as = c.args;
	expect(as).toBeTruthy();
	expect( as.length).toEqual(2);
	var a = as[0];
	expect(a).toBeTruthy();
	expect(a.name).toEqual("id");
	var e = a.expression;
	expect(e).toBeTruthy();
	expect(e instanceof prompto.literal.IntegerLiteral).toBeTruthy();
	a = as[1];
	expect(a).toBeTruthy();
	expect(a.name).toEqual("name");
	e = a.expression;
	expect(e).toBeTruthy();
	expect(e instanceof prompto.literal.TextLiteral).toBeTruthy();
});


test('AssignmentConstructor ', () => {
	var statement = "c = Company ( id = 1, name = \"IBM\" );";
	var parser = new OTestParser(statement);
	var a = parser.parse_assign_instance_statement();
	expect(a).toBeTruthy();
	expect(a.expression instanceof prompto.statement.UnresolvedCall).toBeTruthy();
});


test('NativeJava ', () => {
	var statement = "Java: System.out.println(value);";
	var parser = new OTestParser(statement);
	var call = parser.parse_native_statement();
	expect(call).toBeTruthy();
	expect(call instanceof prompto.statement.NativeCall).toBeTruthy();
});


test('NativeCSharp ', () => {
	var statement = "C#: Console.println(value);";
	var parser = new OTestParser(statement);
	var call = parser.parse_native_statement();
	expect(call).toBeTruthy();
	expect(call instanceof prompto.statement.NativeCall).toBeTruthy();
});


test('NativeMethod ', () => {
	var statement = "native method print (String value) {\r\n"
			+ "\tJava: System.out.println(value); \r\n"
			+ "\tC#: Console.println(value); }";

	var parser = new OTestParser(statement);
	var method = parser.parse_native_method_declaration();
	expect(method).toBeTruthy();
	expect(method instanceof prompto.declaration.NativeMethodDeclaration).toBeTruthy();
});


test('BooleanLiteral ', () => {
	var statement = "true";
	var parser = new OTestParser(statement);
	var literal = parser.parse_literal_expression();
	expect(literal).toBeTruthy();
	expect(literal instanceof prompto.literal.BooleanLiteral).toBeTruthy();
	expect( literal.toString()).toEqual("true");
	expect( literal.getValue().getValue()).toEqual(true);
	statement = "false";
	parser = new OTestParser(statement);
	literal = parser.parse_literal_expression();
	expect(literal).toBeTruthy();
	expect(literal instanceof prompto.literal.BooleanLiteral).toBeTruthy();
	expect( literal.toString()).toEqual("false");
	expect( literal.getValue().getValue()).toEqual(false);
});


test('TextLiteral ', () => {
	var statement = "\"hello\"";
	var parser = new OTestParser(statement);
	var literal = parser.parse_literal_expression();
	expect(literal).toBeTruthy();
	expect(literal instanceof prompto.literal.TextLiteral).toBeTruthy();
	expect( literal.text).toEqual("\"hello\"");
	expect( literal.getValue().getValue()).toEqual("hello");
});


test('IntegerLiteral ', () => {
	var statement = "1234";
	var parser = new OTestParser(statement);
	var literal = parser.parse_literal_expression();
	expect(literal).toBeTruthy();
	expect(literal instanceof prompto.literal.IntegerLiteral).toBeTruthy();
	expect( literal.toString()).toEqual("1234");
	expect( literal.getValue().IntegerValue()).toEqual(1234);
});


test('ParseHexa ', () => {
	expect( prompto.literal.HexaLiteral.parseHexa("0x0A11").IntegerValue()).toEqual(0x0A11);
});


test('HexaLiteral ', () => {
	var statement = "0x0A11";
	var parser = new OTestParser(statement);
	var literal = parser.parse_literal_expression();
	expect(literal).toBeTruthy();
	expect(literal instanceof prompto.literal.HexaLiteral).toBeTruthy();
	expect( literal.text).toEqual("0x0A11");
	expect( literal.getValue().IntegerValue()).toEqual(0x0A11);
});


test('DecimalLiteral ', () => {
	var statement = "1234.13";
	var parser = new OTestParser(statement);
	var literal = parser.parse_literal_expression();
	expect(literal).toBeTruthy();
	expect(literal instanceof prompto.literal.DecimalLiteral).toBeTruthy();
	expect( literal.toString()).toEqual("1234.13");
	expect(literal.getValue().DecimalValue()).toBeCloseTo(1234.13, 5);
});


test('EmptyListLiteral ', () => {
	var statement = "[]";
	var parser = new OTestParser(statement);
	var literal = parser.parse_literal_expression();
	expect(literal).toBeTruthy();
	expect(literal instanceof prompto.literal.ListLiteral).toBeTruthy();
	expect( literal.toString()).toEqual("[]");
	expect( literal.getValue().size()).toEqual(0);
});


test('SimpleListLiteral ', () => {
	var statement = "[ john, 123]";
	var parser = new OTestParser(statement);
	var literal = parser.parse_literal_expression();
	expect(literal).toBeTruthy();
    writer = new prompto.utils.CodeWriter(prompto.parser.Dialect.O)
    literal.toDialect(writer)
	expect( writer.toString()).toEqual("[john, 123]");
	expect(literal instanceof prompto.literal.ListLiteral).toBeTruthy();
	expect(literal.expressions[0] instanceof prompto.expression.InstanceExpression).toBeTruthy();
	expect(literal.expressions[1] instanceof prompto.literal.IntegerLiteral).toBeTruthy();
});


test('EmptyDictLiteral ', () => {
	var statement = "<:>";
	var parser = new OTestParser(statement);
	var literal = parser.parse_literal_expression();
	expect(literal).toBeTruthy();
	expect(literal instanceof prompto.literal.DictLiteral).toBeTruthy();
	expect( literal.toString()).toEqual("<:>");
});


test('SimpleDictLiteral ', () => {
	var statement = "< \"john\" : 1234, eric : 5678 >";
	var parser = new OTestParser(statement);
	var literal = parser.parse_literal_expression();
	expect(literal).toBeTruthy();
	expect(literal instanceof prompto.literal.DictLiteral).toBeTruthy();
    writer = new prompto.utils.CodeWriter(prompto.parser.Dialect.O)
    literal.toDialect(writer)
	expect( writer.toString()).toEqual("<\"john\":1234, eric:5678>");
});


test('SimpleDate ', () => {
	var statement = "'2012-10-09'";
	var parser = new OTestParser(statement);
	var literal = parser.parse_literal_expression();
	expect(literal).toBeTruthy();
	expect(literal instanceof prompto.literal.DateLiteral).toBeTruthy();
	expect( literal.text).toEqual("'2012-10-09'");
	var date = literal.getValue().getValue();
	expect( 2012).toEqual(date.getUTCFullYear());
	expect( 9).toEqual(date.getUTCMonth());
	expect( 9).toEqual(date.getUTCDate());
});


test('SimpleTime ', () => {
	var statement = "'15:03:10'";
	var parser = new OTestParser(statement);
	var literal = parser.parse_literal_expression();
	expect(literal).toBeTruthy();
	expect(literal instanceof prompto.literal.TimeLiteral).toBeTruthy();
	expect( literal.text).toEqual("'15:03:10'");
	var time = literal.getValue().getValue()
	expect( 15).toEqual(time.getUTCHours());
	expect( 3).toEqual(time.getUTCMinutes());
	expect( 10).toEqual(time.getUTCSeconds());
});


test('DateTime ', () => {
	var statement = "'2012-10-09T15:18:17'";
	var parser = new OTestParser(statement);
	var literal = parser.parse_literal_expression();
	expect(literal).toBeTruthy();
	expect(literal instanceof prompto.literal.DateTimeLiteral).toBeTruthy();
	expect( literal.text).toEqual("'2012-10-09T15:18:17'");
	var date = literal.getValue().value.date
	expect( 2012).toEqual(date.getUTCFullYear());
	expect( 9).toEqual(date.getUTCMonth());
	expect( 9).toEqual(date.getUTCDate());
	expect( 15).toEqual(date.getUTCHours());
	expect( 18).toEqual(date.getUTCMinutes());
	expect( 17).toEqual(date.getUTCSeconds());
});


test('DateTimeWithMillis ', () => {
	var statement = "'2012-10-09T15:18:17.487'";
	var parser = new OTestParser(statement);
	var literal = parser.parse_literal_expression();
	expect(literal).toBeTruthy();
	expect(literal instanceof prompto.literal.DateTimeLiteral).toBeTruthy();
	expect( literal.text).toEqual("'2012-10-09T15:18:17.487'");
	expect( 487).toEqual(literal.getValue().value.date.getUTCMilliseconds());
});


test('DateTimeWithTZ ', () => {
	var statement = "'2012-10-09T15:18:17+02:00'";
	var parser = new OTestParser(statement);
	var literal = parser.parse_literal_expression();
	expect(literal).toBeTruthy();
	expect(literal instanceof prompto.literal.DateTimeLiteral).toBeTruthy();
	expect( literal.text).toEqual("'2012-10-09T15:18:17+02:00'");
	var expected = new Date();
	expected.setUTCFullYear(2012);
	expected.setUTCMonth(9);
	expected.setUTCDate(9);
	expected.setUTCHours(15+2);
	expected.setUTCMinutes(18);
	expected.setUTCSeconds(17);
	expected.setUTCMilliseconds(0);
	var actual = literal.getValue().value.date.valueOf() + literal.getValue().value.tzOffset*1000;
	expect( actual).toEqual(expected.valueOf());
});


test('Period ', () => {
	var statement = "'P3Y'";
	var parser = new OTestParser(statement);
	var literal = parser.parse_literal_expression();
	expect(literal).toBeTruthy();
	expect(literal instanceof prompto.literal.PeriodLiteral).toBeTruthy();
	expect( literal.text).toEqual("'P3Y'");
	expect(literal.getValue().years).toEqual(3);
});


test('NativeSymbol ', () => {
	var statement = "ENTITY_1 = \"1\";";
	var parser = new OTestParser(statement);
	var symbol = parser.parse_native_symbol();
	expect(symbol).toBeTruthy();
	expect(symbol instanceof prompto.expression.NativeSymbol).toBeTruthy();
    writer = new prompto.utils.CodeWriter(prompto.parser.Dialect.O)
    symbol.expression.toDialect(writer);
	expect( writer.toString()).toEqual( "\"1\"");
});


test('ExpressionMethod ', () => {
	var statement = "x = print ( value = \"1\" );";
	var parser = new OTestParser(statement);
	var stmt = parser.parse_statement();
	expect(stmt).toBeTruthy();
    writer = new prompto.utils.CodeWriter(prompto.parser.Dialect.O)
    stmt.toDialect(writer);
	expect( writer.toString()).toEqual("x = print(value = \"1\")");
});


test('Method ', () => {
	var statement = "print (\"a\", value = \"1\");";
	var parser = new OTestParser(statement);
	var stmt = parser.parse_statement();
	expect(stmt).toBeTruthy();
    writer = new prompto.utils.CodeWriter(prompto.parser.Dialect.O)
    stmt.toDialect(writer);
	expect( writer.toString()).toEqual("print(\"a\", value = \"1\")");
});


test('InstanceExpression ', () => {
	var statement = "prefix";
	var parser = new OTestParser(statement);
	var exp = parser.parse_expression();
	expect(exp instanceof prompto.expression.InstanceExpression).toBeTruthy();
}); 

