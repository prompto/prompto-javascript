require("../../../../exploded");

var antlr4 = require("antlr4");
var ELexer = require("../../../../generated/prompto/parser/ELexer").ELexer;
var tokenNamesAsString = require("../BaseELexerTest").tokenNamesAsString;
var parseTokenNamesFromString = require("../BaseELexerTest").parseTokenNamesFromString;

exports.testIntegerAttribute= function(test) {
	var actual = parseTokenNamesFromString("define id as Integer attribute");
	var expected = tokenNamesAsString([ ELexer.DEFINE, ELexer.VARIABLE_IDENTIFIER,
			ELexer.AS, ELexer.INTEGER, ELexer.ATTRIBUTE, ELexer.LF ]);
	test.equal(expected,actual);
	test.done();
};


exports.testStringAttribute= function(test) {
	var actual = parseTokenNamesFromString("define name as Text attribute");
	var expected = tokenNamesAsString([ ELexer.DEFINE, ELexer.VARIABLE_IDENTIFIER,
			ELexer.AS, ELexer.TEXT, ELexer.ATTRIBUTE, ELexer.LF ]);
	test.equal(expected,actual);
	test.done();
};


exports.testPersonCategory= function(test) {
	var actual = parseTokenNamesFromString("define Person as category with attributes id, name");
	var expected = tokenNamesAsString([ ELexer.DEFINE, ELexer.TYPE_IDENTIFIER,
			ELexer.AS, ELexer.CATEGORY, ELexer.WITH, ELexer.ATTRIBUTES,
			ELexer.VARIABLE_IDENTIFIER, ELexer.COMMA, ELexer.VARIABLE_IDENTIFIER, ELexer.LF ]);
	test.equal(expected,actual);
	test.done();
};


exports.testEmployeeCategoryExtendsPerson= function(test) {
	var actual = parseTokenNamesFromString("define Employee as Person with attribute company");
	var expected = tokenNamesAsString([ ELexer.DEFINE, ELexer.TYPE_IDENTIFIER,
			ELexer.AS, ELexer.TYPE_IDENTIFIER, ELexer.WITH, ELexer.ATTRIBUTE,
			ELexer.VARIABLE_IDENTIFIER, ELexer.LF ]);
	test.equal(expected,actual);
	test.done();
};


exports.testEmptyLine= function(test) {
	var actual = parseTokenNamesFromString("a\n\t\nb");
	var expected = tokenNamesAsString([ 
			ELexer.VARIABLE_IDENTIFIER, ELexer.LF, ELexer.LF, ELexer.VARIABLE_IDENTIFIER, ELexer.LF ]);
	test.equal(expected,actual);
	test.done();
};


exports.test1Indent= function(test) {
	var actual = parseTokenNamesFromString("a\n\tb");
	var expected = tokenNamesAsString([ ELexer.VARIABLE_IDENTIFIER, ELexer.LF,
			ELexer.INDENT, ELexer.VARIABLE_IDENTIFIER, ELexer.DEDENT, ELexer.LF ]);
	test.equal(expected,actual);
	test.done();
};


exports.test2Indents= function(test) {
	var actual = parseTokenNamesFromString("a\n\tb\n\t\tc\n\td");
	var expected = tokenNamesAsString([ ELexer.VARIABLE_IDENTIFIER, ELexer.LF,
			ELexer.INDENT, ELexer.VARIABLE_IDENTIFIER, ELexer.LF,
			ELexer.INDENT, ELexer.VARIABLE_IDENTIFIER, ELexer.DEDENT,
			ELexer.LF, ELexer.VARIABLE_IDENTIFIER, ELexer.DEDENT,
			ELexer.LF ]);
	test.equal(expected,actual);
	test.done();
};


exports.testCharLiteral= function(test) {
	var actual = parseTokenNamesFromString("'a'");
	var expected = tokenNamesAsString([ ELexer.CHAR_LITERAL, ELexer.LF ]);
	test.equal(expected,actual);
	test.done();
};


exports.testDateLiteral= function(test) {
	var actual = parseTokenNamesFromString("'2012-10-10'");
	var expected = tokenNamesAsString([ ELexer.DATE_LITERAL, ELexer.LF ]);
	test.equal(expected,actual);
	test.done();
};


exports.testTimeLiteral= function(test) {
	var actual = parseTokenNamesFromString("'10:10:10'");
	var expected = tokenNamesAsString([ ELexer.TIME_LITERAL, ELexer.LF ]);
	test.equal(expected,actual);
	test.done();
};


exports.testDateTimeLiteral= function(test) {
	var actual = parseTokenNamesFromString("'2012-10-10T10:10:10'");
	var expected = tokenNamesAsString([ ELexer.DATETIME_LITERAL, ELexer.LF ]);
	test.equal(expected,actual);
	test.done();
};


exports.testPeriodLiteral= function(test) {
	var actual = parseTokenNamesFromString("'P122Y'");
	var expected = tokenNamesAsString([ ELexer.PERIOD_LITERAL, ELexer.LF ]);
	test.equal(expected,actual);
	test.done();
};


exports.testRangeLiteral= function(test) {
	var actual = parseTokenNamesFromString("1..3");
	var expected = tokenNamesAsString([ ELexer.INTEGER_LITERAL, ELexer.RANGE,
			ELexer.INTEGER_LITERAL, ELexer.LF ]);
	test.equal(expected,actual);
	test.done();
};


exports.testEnumIdentifier= function(test) {
	var actual = parseTokenNamesFromString("ENTITY_1");
	var expected = tokenNamesAsString([ ELexer.SYMBOL_IDENTIFIER, ELexer.LF ]);
	test.equal(expected,actual);
	test.done();
};


exports.testMethodCallWith= function(test) {
	var actual = parseTokenNamesFromString("print with \"person\" + p.name as value");
	var expected = tokenNamesAsString([ ELexer.VARIABLE_IDENTIFIER, ELexer.WITH,
			ELexer.TEXT_LITERAL, ELexer.PLUS, ELexer.VARIABLE_IDENTIFIER, ELexer.DOT,
			ELexer.VARIABLE_IDENTIFIER, ELexer.AS, ELexer.VARIABLE_IDENTIFIER, ELexer.LF ]);
	test.equal(expected,actual);
	test.done();
};

