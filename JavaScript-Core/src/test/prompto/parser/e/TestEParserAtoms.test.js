import antlr4 from "antlr4";
var prompto = require("../../../../main/prompto/index");


class ETestParser extends prompto.parser.ECleverParser {

    constructor(code, addLF) {
        super(code);
        var lexer = this.getTokenStream().tokenSource;
        lexer.addLF = addLF;
    }

    value = function (tree) {
        var builder = new prompto.parser.EPromptoBuilder(this);
        var walker = new antlr4.tree.ParseTreeWalker();
        walker.walk(builder, tree);
        return builder.getNodeValue(tree);
    }

    parse_atomic_literal() {
        return this.value(this.atomic_literal());
    }

    parse_assignable() {
        return this.value(this.assignable_instance());
    }


    parse_argument_assignment_list() {
        return this.value(this.argument_assignment_list());
    }

    parse_argument_assignment() {
        return this.value(this.argument_assignment());
    }


    parse_instance_expression() {
        return this.value(this.instance_expression());
    }

    parse_range_literal() {
        return this.value(this.range_literal());
    }

    parse_tuple_literal() {
        return this.value(this.tuple_literal());
    }

    parse_attribute_declaration() {
        return this.value(this.attribute_declaration());
    }

    parse_category_declaration() {
        return this.value(this.category_declaration());
    }

    parse_typed_argument() {
        return this.value(this.typed_argument());
    }

    parse_argument_list() {
        return this.value(this.full_argument_list());
    }

    parse_method_call() {
        return this.value(this.method_call_statement());
    }

    parse_native_method_declaration() {
        return this.value(this.native_method_declaration());
    }

    parse_concrete_method_declaration() {
        return this.value(this.concrete_method_declaration());
    }

    parse_constructor_expression() {
        return this.value(this.constructor_expression());
    }

    parse_assign_instance_statement() {
        return this.value(this.assign_instance_statement());
    }

    parse_native_statement() {
        return this.value(this.native_statement());
    }

    parse_literal_expression() {
        return this.value(this.literal_expression());
    }

    parse_native_symbol() {
        return this.value(this.native_symbol());
    }

    parse_statement() {
        return this.value(this.statement());
    }

    parse_expression() {
        return this.value(this.expression());
    }

}

test('Integer', () => {
    var statement = "1";
    var parser = new ETestParser(statement, false);
    var il = parser.parse_atomic_literal();
    expect(il).toBeTruthy();
    expect(il.getValue().IntegerValue()).toEqual(1);
});


test('Literal', () => {
    var statement = "1";
    var parser = new ETestParser(statement, false);
    var sl = parser.parse_literal_expression();
    expect(sl instanceof prompto.literal.IntegerLiteral).toBeTruthy();
});


test('Expression', () => {
    var statement = "1";
    var parser = new ETestParser(statement, false);
    var sl = parser.parse_expression();
    expect(sl instanceof prompto.literal.IntegerLiteral).toBeTruthy();
});


test('EmptyTuple', () => {
    var statement = "()";
    var parser = new ETestParser(statement, false);
    var tl = parser.parse_literal_expression();
    expect(tl instanceof prompto.literal.TupleLiteral).toBeTruthy();
});


test('SimpleTuple', () => {
    var statement = "(1,)";
    var parser = new ETestParser(statement, false);
    var tl = parser.parse_literal_expression();
    expect(tl instanceof prompto.literal.TupleLiteral).toBeTruthy();
});


test('ComplexTuple', () => {
    var statement = "(1,\"John\",'12:12:12')";
    var parser = new ETestParser(statement, false);
    var tl = parser.parse_tuple_literal();
    expect(tl instanceof prompto.literal.TupleLiteral).toBeTruthy();
    expect(tl.expressions[0].toString()).toEqual("1");
    expect(tl.expressions[1].toString()).toEqual("\"John\"");
    expect(tl.expressions[2].toString()).toEqual("'12:12:12'");
    expect(tl.toString()).toEqual("(1, \"John\", '12:12:12')");
});


test('Range', () => {
    var statement = "[1..100]";
    var parser = new ETestParser(statement, false);
    var rl = parser.parse_range_literal();
    expect(rl).toBeTruthy();
    expect(rl.first.toString()).toEqual("1");
    expect(rl.last.toString()).toEqual("100");
    expect(rl.toString()).toEqual("[1..100]");
});


test('Attribute', () => {
    var statement = "define id as Integer attribute\n";
    var parser = new ETestParser(statement, true);
    var ad = parser.parse_attribute_declaration();
    expect(ad).toBeTruthy();
    expect(ad.name).toEqual("id");
    expect(ad.getType().name).toEqual("Integer");
});


test('ArrayAttribute', () => {
    var statement = "define id as Integer[] attribute\n";
    var parser = new ETestParser(statement, true);
    var ad = parser.parse_attribute_declaration();
    expect(ad).toBeTruthy();
    expect(ad.name).toEqual("id");
    expect(ad.getType().name).toEqual("Integer[]");
});


test('Category1Attribute', () => {
    var statement = "define Person as category with attribute id\n";
    var parser = new ETestParser(statement, true);
    var cd = parser.parse_category_declaration();
    expect(cd).toBeTruthy();
    expect(cd.name).toEqual("Person");
    expect(cd.derivedFrom).toBeFalsy();
    expect(cd.attributes).toBeTruthy();
    expect(cd.attributes.names().indexOf("id") >= 0).toBeTruthy();
});


test('Category2Attributes', () => {
    var statement = "define Person as category with attributes id, name";
    var parser = new ETestParser(statement, false);
    var cd = parser.parse_category_declaration();
    expect(cd).toBeTruthy();
    expect(cd.name).toEqual("Person");
    expect(cd.derivedFrom).toBeFalsy();
    expect(cd.attributes).toBeTruthy();
    expect(cd.attributes.names().indexOf("id") >= 0).toBeTruthy();
    expect(cd.attributes.names().indexOf("name") >= 0).toBeTruthy();
});


test('Category1Derived1Attribute', () => {
    var statement = "define Employee as Person with attribute company";
    var parser = new ETestParser(statement, false);
    var cd = parser.parse_category_declaration();
    expect(cd).toBeTruthy();
    expect(cd.name).toEqual("Employee");
    expect(cd.derivedFrom).toBeTruthy();
    expect(cd.derivedFrom.names().indexOf("Person") >= 0).toBeTruthy();
    expect(cd.attributes).toBeTruthy();
    expect(cd.attributes.names().indexOf("company") >= 0).toBeTruthy();
});


test('Category2DerivedNoAttribute', () => {
    var statement = "define Entrepreneur as Person and Company\n";
    var parser = new ETestParser(statement, true);
    var cd = parser.parse_category_declaration();
    expect(cd).toBeTruthy();
    expect(cd.name).toEqual("Entrepreneur");
    expect(cd.derivedFrom).toBeTruthy();
    expect(cd.derivedFrom.names().indexOf("Person") >= 0).toBeTruthy();
    expect(cd.derivedFrom.names().indexOf("Company") >= 0).toBeTruthy();
    expect(cd.attributes).toBeFalsy();
});

test('MethodWith3Arguments', () => {
    var statement = "myMethod with 3 as x, 7 as y and 22 as 7\n";
    var parser = new ETestParser(statement, true);
    var cd = parser.parse_statement();
    expect(cd).toBeTruthy();
});


test('MemberExpression', () => {
    var statement = "p.name";
    var parser = new ETestParser(statement, false);
    var me = parser.parse_instance_expression();
    expect(me instanceof prompto.expression.UnresolvedSelector).toBeTruthy();
    expect(me.name).toEqual("name");
    expect(me.parent instanceof prompto.expression.UnresolvedIdentifier).toBeTruthy();
    expect(me.parent.name).toEqual("p");
});


test('Argument', () => {
    var statement = "Person p";
    var parser = new ETestParser(statement, false);
    var a = parser.parse_typed_argument();
    expect(a).toBeTruthy();
    expect(a.type.name).toEqual("Person");
    expect(a.name).toEqual("p");
});


test('List1Argument', () => {
    var statement = "Person p";
    var parser = new ETestParser(statement, false);
    var l = parser.parse_argument_list();
    expect(l).toBeTruthy();
    expect(l.length).toEqual(1);
});


test('List2ArgumentsComma', () => {
    var statement = "Person p, Employee e";
    var parser = new ETestParser(statement, false);
    var l = parser.parse_argument_list();
    expect(l).toBeTruthy();
    expect(l.length).toEqual(2);
});


test('List2ArgumentsAnd', () => {
    var statement = "Person p and Employee e";
    var parser = new ETestParser(statement, false);
    var l = parser.parse_argument_list();
    expect(l).toBeTruthy();
    expect(l.length).toEqual(2);
});


test('MethodCallExpression', () => {
    var statement = "print \"person\" + p.name";
    var parser = new ETestParser(statement, false);
    var ac = parser.parse_method_call();
    expect(ac).toBeTruthy();
});


test('SimpleArgumentAssignment', () => {
    var statement = "p.name as value";
    var parser = new ETestParser(statement, false);
    var as = parser.parse_argument_assignment();
    expect(as.name).toEqual("value");
    var exp = as.expression;
    expect(exp).toBeTruthy();
    var writer = new prompto.utils.CodeWriter(prompto.parser.Dialect.E);
    as.toDialect(writer);
    expect(writer.toString()).toEqual("p.name as value");
});


test('ComplexArgumentAssignment', () => {
    var statement = "\"person\" + p.name as value";
    var parser = new ETestParser(statement, false);
    var as = parser.parse_argument_assignment();
    expect(as.name).toEqual("value");
    var exp = as.expression;
    expect(exp instanceof prompto.expression.PlusExpression).toBeTruthy();
    var writer = new prompto.utils.CodeWriter(prompto.parser.Dialect.E)
    as.toDialect(writer);
    expect(writer.toString()).toEqual("\"person\" + p.name as value");
});


test('ArgumentAssignmentList1Arg', () => {
    var statement = "with \"person\" + p.name as value";
    var parser = new ETestParser(statement, false);
    var ls = parser.parse_argument_assignment_list();
    var as = ls[0];
    expect(as.name).toEqual("value");
    var exp = as.expression;
    expect(exp instanceof prompto.expression.PlusExpression).toBeTruthy();
    var writer = new prompto.utils.CodeWriter(prompto.parser.Dialect.E)
    as.toDialect(writer);
    expect(writer.toString()).toEqual("\"person\" + p.name as value");
});


test('MethodCallWith', () => {
    var statement = "print with \"person\" + p.name as value";
    var parser = new ETestParser(statement, false);
    var mc = parser.parse_method_call();
    expect(mc).toBeTruthy();
    expect(mc.callable.toString()).toEqual("print");
    expect(mc.args).toBeTruthy();
    var as = mc.args[0];
    expect(as.name).toEqual("value");
    var exp = as.expression;
    expect(exp instanceof prompto.expression.PlusExpression).toBeTruthy();
    var writer = new prompto.utils.CodeWriter(prompto.parser.Dialect.E)
    mc.toDialect(writer);
    expect(writer.toString()).toEqual("print with \"person\" + p.name as value");
});


test('Method1Parameter1Statement', () => {
    var statement = "define printName as method receiving Person p doing:\n" +
        "\tprint with \"person\" + p.name as value\n";
    var parser = new ETestParser(statement, true);
    var ad = parser.parse_concrete_method_declaration();
    expect(ad).toBeTruthy();
    expect(ad.name).toEqual("printName");
    expect(ad.parameters).toBeTruthy();
    var type = new prompto.type.CategoryType(new prompto.grammar.Identifier("Person"));
    var expected = new prompto.param.CategoryParameter(type, new prompto.grammar.Identifier("p"));
    expect(prompto.utils.arrayContains(ad.parameters, expected)).toBeTruthy();
    expect(ad.statements).toBeTruthy();
    var writer = new prompto.utils.CodeWriter(prompto.parser.Dialect.E)
    ad.statements[0].toDialect(writer);
    expect(writer.toString()).toEqual("print with \"person\" + p.name as value");
});


test('Method1Extended1Statement', () => {
    var statement = "define printName as method receiving Object o with attribute name doing:\n" +
        "\tprint with \"object\" + o.name as value\n";
    var parser = new ETestParser(statement, true);
    var ad = parser.parse_concrete_method_declaration();
    expect(ad).toBeTruthy();
    expect(ad.name).toEqual("printName");
    expect(ad.parameters).toBeTruthy();
    var type = new prompto.type.CategoryType(new prompto.grammar.Identifier("Object"));
    var expected = new prompto.param.ExtendedParameter(type,
        new prompto.grammar.Identifier("o"),
        new prompto.grammar.IdentifierList(new prompto.grammar.Identifier("name")));
    expect(prompto.utils.arrayContains(ad.parameters, expected)).toBeTruthy();
    expect(ad.statements).toBeTruthy();
    var writer = new prompto.utils.CodeWriter(prompto.parser.Dialect.E)
    ad.statements[0].toDialect(writer);
    expect(writer.toString()).toEqual("print with \"object\" + o.name as value");
});


test('Method1Array1Statement', () => {
    var statement = "define printName as method receiving Option[] options doing:\n" +
        "\tprint with \"array\" + args as value\n";
    var parser = new ETestParser(statement, true);
    var ad = parser.parse_concrete_method_declaration();
    expect(ad).toBeTruthy();
    expect(ad.name).toEqual("printName");
    expect(ad.parameters).toBeTruthy();
    var category = new prompto.type.CategoryType(new prompto.grammar.Identifier("Option"));
    var expected = new prompto.param.CategoryParameter(
        new prompto.type.ListType(category),
        new prompto.grammar.Identifier("options"));
    expect(prompto.utils.arrayContains(ad.parameters, expected)).toBeTruthy();
    expect(ad.statements).toBeTruthy();
    var writer = new prompto.utils.CodeWriter(prompto.parser.Dialect.E)
    ad.statements[0].toDialect(writer);
    expect(writer.toString()).toEqual("print with \"array\" + args as value");
});


test('Constructor1Attribute', () => {
    var statement = "Company with 1 as id";
    var parser = new ETestParser(statement, false);
    var c = parser.parse_constructor_expression();
    expect(c).toBeTruthy();
});


test('ConstructorFrom1Attribute', () => {
    var statement = "Company from entity with 1 as id";
    var parser = new ETestParser(statement, false);
    var c = parser.parse_constructor_expression();
    expect(c).toBeTruthy();
});


test('Constructor2AttributesComma', () => {
    var statement = "Company with 1 as id, \"IBM\" as name";
    var parser = new ETestParser(statement, false);
    var c = parser.parse_constructor_expression();
    expect(c).toBeTruthy();
    var l = c.args;
    expect(l).toBeTruthy();
    expect(l.length).toEqual(2);
    var a = l[0];
    expect(a).toBeTruthy();
    expect(a.name).toEqual("id");
    var e = a.expression;
    expect(e).toBeTruthy();
    expect(e instanceof prompto.literal.IntegerLiteral).toBeTruthy();
    a = l[1];
    expect(a).toBeTruthy();
    expect(a.name).toEqual("name");
    e = a.expression;
    expect(e).toBeTruthy();
    expect(e instanceof prompto.literal.TextLiteral).toBeTruthy();
});


test('Constructor2AttributesAnd', () => {
    var statement = "Company with 1 as id and \"IBM\" as name";
    var parser = new ETestParser(statement, false);
    var c = parser.parse_constructor_expression();
    expect(c).toBeTruthy();
    var l = c.args;
    expect(l).toBeTruthy();
    expect(l.length).toEqual(2);
    var a = l[0];
    expect(a).toBeTruthy();
    expect(a.name).toEqual("id");
    var e = a.expression;
    expect(e).toBeTruthy();
    expect(e instanceof prompto.literal.IntegerLiteral).toBeTruthy();
    a = l[1];
    expect(a).toBeTruthy();
    expect(a.name).toEqual("name");
    e = a.expression;
    expect(e).toBeTruthy();
    expect(e instanceof prompto.literal.TextLiteral).toBeTruthy();
});


test('AssignmentConstructor', () => {
    var statement = "c = Company from x with 1 as id and \"IBM\" as name";
    var parser = new ETestParser(statement, false);
    var a = parser.parse_assign_instance_statement();
    expect(a).toBeTruthy();
    expect(a.expression instanceof prompto.expression.ConstructorExpression).toBeTruthy();
});


test('NativeJava', () => {
    var statement = "Java: System.out.println(value);\n";
    var parser = new ETestParser(statement, true);
    var call = parser.parse_native_statement();
    expect(call).toBeTruthy();
    expect(call instanceof prompto.statement.NativeCall).toBeTruthy();
});


test('NativeCSharp', () => {
    var statement = "C#: Console.WriteLine(value);\n";
    var parser = new ETestParser(statement, true);
    var call = parser.parse_native_statement();
    expect(call).toBeTruthy();
    expect(call instanceof prompto.statement.NativeCall).toBeTruthy();
});


test('NativeMethod', () => {
    var statement = "define print as native method receiving String value doing:\n" +
        "\tJava: System.out.println(value);\n" +
        "\tC#: Console.println(value);\n";

    var parser = new ETestParser(statement, true);
    var method = parser.parse_native_method_declaration();
    expect(method).toBeTruthy();
    expect(method instanceof prompto.declaration.NativeMethodDeclaration).toBeTruthy();
});


test('BooleanLiteral', () => {
    var statement = "true";
    var parser = new ETestParser(statement, false);
    var literal = parser.parse_literal_expression();
    expect(literal).toBeTruthy();
    expect(literal instanceof prompto.literal.BooleanLiteral).toBeTruthy();
    expect(literal.toString()).toEqual("true");
    expect(literal.getValue().getValue()).toEqual(true);
    statement = "false";
    parser = new ETestParser(statement, false);
    literal = parser.parse_literal_expression();
    expect(literal).toBeTruthy();
    expect(literal instanceof prompto.literal.BooleanLiteral).toBeTruthy();
    expect(literal.toString()).toEqual("false");
    expect(literal.getValue().getValue()).toEqual(false);
});


test('TextLiteral', () => {
    var statement = "\"hello\"";
    var parser = new ETestParser(statement, false);
    var literal = parser.parse_literal_expression();
    expect(literal).toBeTruthy();
    expect(literal instanceof prompto.literal.TextLiteral).toBeTruthy();
    expect(literal.text).toEqual("\"hello\"");
    expect(literal.getValue().getValue()).toEqual("hello");
});


test('IntegerLiteral', () => {
    var statement = "1234";
    var parser = new ETestParser(statement, false);
    var literal = parser.parse_literal_expression();
    expect(literal).toBeTruthy();
    expect(literal instanceof prompto.literal.IntegerLiteral).toBeTruthy();
    expect(literal.toString()).toEqual("1234");
    expect(literal.getValue().IntegerValue()).toEqual(1234);
});


test('ParseHexa', () => {
    expect(prompto.literal.HexaLiteral.parseHexa("0x0A11").IntegerValue()).toEqual(0x0A11);
});


test('HexaLiteral', () => {
    var statement = "0x0A11";
    var parser = new ETestParser(statement, false);
    var literal = parser.parse_literal_expression();
    expect(literal).toBeTruthy();
    expect(literal instanceof prompto.literal.HexaLiteral).toBeTruthy();
    expect(literal.text).toEqual("0x0A11");
    expect(literal.getValue().IntegerValue()).toEqual(0x0A11);
});


test('DecimalLiteral', () => {
    var statement = "1234.13";
    var parser = new ETestParser(statement, false);
    var literal = parser.parse_literal_expression();
    expect(literal).toBeTruthy();
    expect(literal instanceof prompto.literal.DecimalLiteral).toBeTruthy();
    expect(literal.toString()).toEqual("1234.13");
    expect(literal.getValue().DecimalValue()).toBeCloseTo(1234.13, 5);
});


test('EmptyListLiteral', () => {
    var statement = "[]";
    var parser = new ETestParser(statement, false);
    var literal = parser.parse_literal_expression();
    expect(literal).toBeTruthy();
    expect(literal instanceof prompto.literal.ListLiteral).toBeTruthy();
    expect(literal.toString()).toEqual("[]");
    expect(literal.getValue().size()).toEqual(0);
});


test('SimpleListLiteral', () => {
    var statement = "[ john, 123 ]";
    var parser = new ETestParser(statement, false);
    var literal = parser.parse_literal_expression();
    expect(literal).toBeTruthy();
    expect(literal.toString()).toEqual("[john, 123]");
    expect(literal instanceof prompto.literal.ListLiteral).toBeTruthy();
    expect(literal.expressions.length).toEqual(2);
    expect(literal.expressions[0] instanceof prompto.expression.UnresolvedIdentifier).toBeTruthy();
    expect(literal.expressions[1] instanceof prompto.literal.IntegerLiteral).toBeTruthy();
});


test('EmptyDictLiteral', () => {
    var statement = "<:>";
    var parser = new ETestParser(statement, false);
    var literal = parser.parse_literal_expression();
    expect(literal).toBeTruthy();
    expect(literal instanceof prompto.literal.DictLiteral).toBeTruthy();
    expect(literal.toString()).toEqual("<:>");
});


test('SimpleDictLiteral', () => {
    var statement = "< \"john\" : 1234, eric : 5678 >";
    var parser = new ETestParser(statement, false);
    var literal = parser.parse_literal_expression();
    expect(literal).toBeTruthy();
    expect(literal instanceof prompto.literal.DictLiteral).toBeTruthy();
    var writer = new prompto.utils.CodeWriter(prompto.parser.Dialect.E)
    literal.toDialect(writer);
    expect(writer.toString()).toEqual("<\"john\":1234, eric:5678>");
});


test('SimpleDate', () => {
    var statement = "'2012-10-09'";
    var parser = new ETestParser(statement, false);
    var literal = parser.parse_literal_expression();
    expect(literal).toBeTruthy();
    expect(literal instanceof prompto.literal.DateLiteral).toBeTruthy();
    expect(literal.text).toEqual("'2012-10-09'");
    var actual = literal.getValue().getValue();
    expect(actual.getFullYear()).toEqual(2012);
    expect(actual.getMonth()).toEqual(10);
    expect(actual.getDate()).toEqual(9);
});


test('SimpleTime', () => {
    var literal = "'15:03:10'";
    var parser = new ETestParser(literal, false);
    var literal = parser.parse_literal_expression();
    expect(literal).toBeTruthy();
    expect(literal instanceof prompto.literal.TimeLiteral).toBeTruthy();
    expect(literal.text).toEqual("'15:03:10'");
    var expected = new Date(0);
    expected.setUTCHours(15);
    expected.setUTCMinutes(3);
    expected.setUTCSeconds(10);
    expected.setUTCMilliseconds(0);
    var actual = literal.getValue().getValue();
    expect(actual.getHours()).toEqual(expected.getHours());
    expect(actual.getMinutes()).toEqual(expected.getMinutes());
    expect(actual.getSeconds()).toEqual(expected.getSeconds());
});


test('DateTime', () => {
    var statement = "'2012-10-09T15:18:17'";
    var parser = new ETestParser(statement, false);
    var literal = parser.parse_literal_expression();
    expect(literal).toBeTruthy();
    expect(literal instanceof prompto.literal.DateTimeLiteral).toBeTruthy();
    expect(literal.text).toEqual("'2012-10-09T15:18:17'");
    var expected = new Date();
    expected.setUTCFullYear(2012);
    expected.setUTCMonth(10 - 1);
    expected.setUTCDate(9);
    expected.setUTCHours(15);
    expected.setUTCMinutes(18);
    expected.setUTCSeconds(17);
    expected.setUTCMilliseconds(0);
    expect(literal.getValue().value.date.toISOString()).toEqual(expected.toISOString());
});


test('DateTimeWithMillis', () => {
    var statement = "'2012-10-09T15:18:17.487'";
    var parser = new ETestParser(statement, false);
    var literal = parser.parse_literal_expression();
    expect(literal).toBeTruthy();
    expect(literal instanceof prompto.literal.DateTimeLiteral).toBeTruthy();
    expect(literal.text).toEqual("'2012-10-09T15:18:17.487'");
    var expected = new Date();
    expected.setUTCFullYear(2012);
    expected.setUTCMonth(10 - 1);
    expected.setUTCDate(9);
    expected.setUTCHours(15);
    expected.setUTCMinutes(18);
    expected.setUTCSeconds(17);
    expected.setUTCMilliseconds(487);
    expect(literal.getValue().value.date.toISOString()).toEqual(expected.toISOString());
});


test('Period', () => {
    var statement = "'P3Y'";
    var parser = new ETestParser(statement, false);
    var literal = parser.parse_literal_expression();
    expect(literal).toBeTruthy();
    expect(literal instanceof prompto.literal.PeriodLiteral).toBeTruthy();
    expect(literal.text).toEqual("'P3Y'");
    expect(literal.getValue().years).toEqual(3);
});


test('NativeSymbol', () => {
    var statement = "ENTITY_1 with \"1\" as value";
    var parser = new ETestParser(statement, true);
    var symbol = parser.parse_native_symbol();
    expect(symbol).toBeTruthy();
    expect(symbol instanceof prompto.expression.NativeSymbol).toBeTruthy();
    var writer = new prompto.utils.CodeWriter(prompto.parser.Dialect.E)
    symbol.toDialect(writer);
    expect(writer.toString()).toEqual(statement);
});


test('ExpressionWith', () => {
    var statement = "x = print with \"1\" as value";
    var parser = new ETestParser(statement, false);
    var stmt = parser.parse_statement();
    expect(stmt).toBeTruthy();
    var writer = new prompto.utils.CodeWriter(prompto.parser.Dialect.E)
    stmt.toDialect(writer);
    expect(writer.toString()).toEqual(statement);
});


test('MethodUnresolved', () => {
    var statement = "print";
    var parser = new ETestParser(statement, false);
    var stmt = parser.parse_statement();
    expect(stmt instanceof prompto.statement.UnresolvedCall).toBeTruthy();
    var writer = new prompto.utils.CodeWriter(prompto.parser.Dialect.E)
    stmt.toDialect(writer);
    expect(writer.toString()).toEqual(statement);
});


test('MethodExpression', () => {
    var statement = "print a";
    var parser = new ETestParser(statement, false);
    var stmt = parser.parse_statement();
    expect(stmt instanceof prompto.statement.UnresolvedCall).toBeTruthy();
    var writer = new prompto.utils.CodeWriter(prompto.parser.Dialect.E)
    stmt.toDialect(writer);
    expect(writer.toString()).toEqual(statement);
});


test('MethodWith', () => {
    var statement = "print \"a\" with \"1\" as value";
    var parser = new ETestParser(statement, false);
    var stmt = parser.parse_statement();
    expect(stmt).toBeTruthy();
    var writer = new prompto.utils.CodeWriter(prompto.parser.Dialect.E)
    stmt.toDialect(writer);
    expect(writer.toString()).toEqual(statement);
});


test('Instance', () => {
    var statement = "x[y]";
    var parser = new ETestParser(statement, false);
    var stmt = parser.parse_expression();
    expect(stmt).toBeTruthy();
    var writer = new prompto.utils.CodeWriter(prompto.parser.Dialect.E)
    stmt.toDialect(writer);
    expect(writer.toString()).toEqual(statement);
});


test('AssignableInstance', () => {
    var statement = "doc.vals[2]";
    var parser = new ETestParser(statement, false);
    var stmt = parser.parse_assignable();
    expect(stmt).toBeTruthy();
    var writer = new prompto.utils.CodeWriter(prompto.parser.Dialect.E)
    stmt.toDialect(writer);
    expect(writer.toString()).toEqual(statement);
});

