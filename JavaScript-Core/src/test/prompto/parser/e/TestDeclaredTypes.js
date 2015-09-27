require("../../../../exploded");

var prompto = require("../../../../main/prompto/index");
var parseString = require("../../parser/BaseEParserTest").parseString;

var Identifier = prompto.grammar.Identifier;
var CategoryType = prompto.type.CategoryType;
var BooleanType = prompto.type.BooleanType;
var IntegerType = prompto.type.IntegerType
var DecimalType = prompto.type.DecimalType
var TextType = prompto.type.TextType;
var DateType = prompto.type.DateType;
var DateTimeType = prompto.type.DateTimeType
var MissingType = prompto.type.MissingType;
var AnyType = prompto.type.AnyType;

var context;

exports.setUp = function(done) {
	var stmts = parseString("define id as Integer attribute\r\n" +
			"define name as Text attribute\r\n" +
			"define Root as category with attribute id\r\n" +
			"define Derived as Root with attribute name\r\n" +
			"define Unrelated as category with attributes id and name\r\n");
	context = prompto.runtime.Context.newGlobalContext();
	stmts.register(context);
	done();
};

exports.tearDown = function(done) {
	done();
};


exports.testBooleanType = function(test) {
	var st = BooleanType.instance;
	test.ok(st,BooleanType.instance);
	test.ok(st.isAssignableTo(context, BooleanType.instance));
	test.ok(!(st.isAssignableTo(context, IntegerType.instance)));
	test.ok(!(st.isAssignableTo(context, DecimalType.instance)));
	test.ok(!(st.isAssignableTo(context, TextType.instance)));
	test.ok(!(st.isAssignableTo(context, DateType.instance)));
	test.ok(!(st.isAssignableTo(context, DateTimeType.instance)));
	test.ok(!(st.isAssignableTo(context, MissingType.instance)));
	test.ok(st.isAssignableTo(context, AnyType.instance));
	test.ok(!(st.isAssignableTo(context, new CategoryType(new Identifier("Root")))));
	test.ok(!(st.isAssignableTo(context, new CategoryType(new Identifier("Derived")))));
	test.ok(!(st.isAssignableTo(context, new CategoryType(new Identifier("Unrelated")))));
	test.done();
};


exports.testIntegerType = function(test) {
	var st = IntegerType.instance;
	test.ok(st,IntegerType.instance);
	test.ok(!(st.isAssignableTo(context, BooleanType.instance)));
	test.ok(st.isAssignableTo(context, IntegerType.instance));
	test.ok(st.isAssignableTo(context, DecimalType.instance));
	test.ok(!(st.isAssignableTo(context, TextType.instance)));
	test.ok(!(st.isAssignableTo(context, DateType.instance)));
	test.ok(!(st.isAssignableTo(context, DateTimeType.instance)));
	test.ok(!(st.isAssignableTo(context, MissingType.instance)));
	test.ok(st.isAssignableTo(context, AnyType.instance));
	test.ok(!(st.isAssignableTo(context, new CategoryType(new Identifier("Root")))));
	test.ok(!(st.isAssignableTo(context, new CategoryType(new Identifier("Derived")))));
	test.ok(!(st.isAssignableTo(context, new CategoryType(new Identifier("Unrelated")))));
	test.done();
};


exports.testDecimalType = function(test) {
	var st = DecimalType.instance;
	test.ok(st,DecimalType.instance);
	test.ok(!(st.isAssignableTo(context, BooleanType.instance)));
	test.ok(st.isAssignableTo(context, IntegerType.instance));
	test.ok(st.isAssignableTo(context, DecimalType.instance));
	test.ok(!(st.isAssignableTo(context, TextType.instance)));
	test.ok(!(st.isAssignableTo(context, DateType.instance)));
	test.ok(!(st.isAssignableTo(context, DateTimeType.instance)));
	test.ok(!(st.isAssignableTo(context, MissingType.instance)));
	test.ok(st.isAssignableTo(context, AnyType.instance));
	test.ok(!(st.isAssignableTo(context, new CategoryType(new Identifier("Root")))));
	test.ok(!(st.isAssignableTo(context, new CategoryType(new Identifier("Derived")))));
	test.ok(!(st.isAssignableTo(context, new CategoryType(new Identifier("Unrelated")))));
	test.done();
};


exports.testTextType = function(test) {
	var st = TextType.instance;
	test.ok(st,TextType.instance);
	test.ok(!(st.isAssignableTo(context, BooleanType.instance)));
	test.ok(!(st.isAssignableTo(context, IntegerType.instance)));
	test.ok(!(st.isAssignableTo(context, DecimalType.instance)));
	test.ok(st.isAssignableTo(context, TextType.instance));
	test.ok(!(st.isAssignableTo(context, DateType.instance)));
	test.ok(!(st.isAssignableTo(context, DateTimeType.instance)));
	test.ok(!(st.isAssignableTo(context, MissingType.instance)));
	test.ok(st.isAssignableTo(context, AnyType.instance));
	test.ok(!(st.isAssignableTo(context, new CategoryType(new Identifier("Root")))));
	test.ok(!(st.isAssignableTo(context, new CategoryType(new Identifier("Derived")))));
	test.ok(!(st.isAssignableTo(context, new CategoryType(new Identifier("Unrelated")))));
	test.done();
};


exports.testDateType = function(test) {
	var st = DateType.instance;
	test.ok(st,DateType.instance);
	test.ok(!(st.isAssignableTo(context, BooleanType.instance)));
	test.ok(!(st.isAssignableTo(context, IntegerType.instance)));
	test.ok(!(st.isAssignableTo(context, DecimalType.instance)));
	test.ok(!(st.isAssignableTo(context, TextType.instance)));
	test.ok(st.isAssignableTo(context, DateType.instance));
	test.ok(!(st.isAssignableTo(context, DateTimeType.instance)));
	test.ok(!(st.isAssignableTo(context, MissingType.instance)));
	test.ok(st.isAssignableTo(context, AnyType.instance));
	test.ok(!(st.isAssignableTo(context, new CategoryType(new Identifier("Root")))));
	test.ok(!(st.isAssignableTo(context, new CategoryType(new Identifier("Derived")))));
	test.ok(!(st.isAssignableTo(context, new CategoryType(new Identifier("Unrelated")))));
	test.done();
};


exports.testInstantType = function(test) {
	var st = DateTimeType.instance;
	test.ok(st,DateTimeType.instance);
	test.ok(!(st.isAssignableTo(context, BooleanType.instance)));
	test.ok(!(st.isAssignableTo(context, IntegerType.instance)));
	test.ok(!(st.isAssignableTo(context, DecimalType.instance)));
	test.ok(!(st.isAssignableTo(context, TextType.instance)));
	test.ok(st.isAssignableTo(context, DateType.instance));
	test.ok(st.isAssignableTo(context, DateTimeType.instance));
	test.ok(!(st.isAssignableTo(context, MissingType.instance)));
	test.ok(st.isAssignableTo(context, AnyType.instance));
	test.ok(!(st.isAssignableTo(context, new CategoryType(new Identifier("Root")))));
	test.ok(!(st.isAssignableTo(context, new CategoryType(new Identifier("Derived")))));
	test.ok(!(st.isAssignableTo(context, new CategoryType(new Identifier("Unrelated")))));
	test.done();
};


exports.testMissingType = function(test) {
	var st = MissingType.instance;
	test.ok(st.isAssignableTo(context, BooleanType.instance));
	test.ok(st.isAssignableTo(context, IntegerType.instance));
	test.ok(st.isAssignableTo(context, DecimalType.instance));
	test.ok(st.isAssignableTo(context, TextType.instance));
	test.ok(st.isAssignableTo(context, DateType.instance));
	test.ok(st.isAssignableTo(context, DateTimeType.instance));
	test.ok(st.isAssignableTo(context, MissingType.instance));
	test.ok(st.isAssignableTo(context, AnyType.instance));
	test.ok(st.isAssignableTo(context, new CategoryType(new Identifier("Root"))));
	test.ok(st.isAssignableTo(context, new CategoryType(new Identifier("Derived"))));
	test.ok(st.isAssignableTo(context, new CategoryType(new Identifier("Unrelated"))));
	test.done();
};


exports.testRootCategoryType = function(test) {
	var st = new CategoryType(new Identifier("Root"));
	test.ok(!(st.isAssignableTo(context, BooleanType.instance)));
	test.ok(!(st.isAssignableTo(context, IntegerType.instance)));
	test.ok(!(st.isAssignableTo(context, DecimalType.instance)));
	test.ok(!(st.isAssignableTo(context, TextType.instance)));
	test.ok(!(st.isAssignableTo(context, DateType.instance)));
	test.ok(!(st.isAssignableTo(context, DateTimeType.instance)));
	test.ok(!(st.isAssignableTo(context, MissingType.instance)));
	test.ok(st.isAssignableTo(context, AnyType.instance));
	test.ok(st.isAssignableTo(context, new CategoryType(new Identifier("Root"))));
	test.ok(!(st.isAssignableTo(context, new CategoryType(new Identifier("Derived")))));
	test.ok(!(st.isAssignableTo(context, new CategoryType(new Identifier("Unrelated")))));
	test.done();
};


exports.testDerivedCategoryType = function(test) {
	var st = new CategoryType(new Identifier("Derived"));
	test.ok(!(st.isAssignableTo(context, BooleanType.instance)));
	test.ok(!(st.isAssignableTo(context, IntegerType.instance)));
	test.ok(!(st.isAssignableTo(context, DecimalType.instance)));
	test.ok(!(st.isAssignableTo(context, TextType.instance)));
	test.ok(!(st.isAssignableTo(context, DateType.instance)));
	test.ok(!(st.isAssignableTo(context, DateTimeType.instance)));
	test.ok(!(st.isAssignableTo(context, MissingType.instance)));
	test.ok(st.isAssignableTo(context, AnyType.instance));
	test.ok(st.isAssignableTo(context, new CategoryType(new Identifier("Root"))));
	test.ok(st.isAssignableTo(context, new CategoryType(new Identifier("Derived"))));
	test.ok(!(st.isAssignableTo(context, new CategoryType(new Identifier("Unrelated")))));
	test.done();
};


exports.testUnrelatedCategoryType = function(test) {
	var st = new CategoryType(new Identifier("Unrelated"));
	test.ok(!(st.isAssignableTo(context, BooleanType.instance)));
	test.ok(!(st.isAssignableTo(context, IntegerType.instance)));
	test.ok(!(st.isAssignableTo(context, DecimalType.instance)));
	test.ok(!(st.isAssignableTo(context, TextType.instance)));
	test.ok(!(st.isAssignableTo(context, DateType.instance)));
	test.ok(!(st.isAssignableTo(context, DateTimeType.instance)));
	test.ok(!(st.isAssignableTo(context, MissingType.instance)));
	test.ok(st.isAssignableTo(context, AnyType.instance));
	test.ok(!(st.isAssignableTo(context, new CategoryType(new Identifier("Root")))));
	test.ok(!(st.isAssignableTo(context, new CategoryType(new Identifier("Derived")))));
	test.ok(st.isAssignableTo(context, new CategoryType(new Identifier("Unrelated"))));
	test.done();
};


