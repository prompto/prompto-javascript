require("../../../../exploded");

var presto = require("../../../../main/presto/index");
var parseString = require("../../parser/BaseOParserTest").parseString;

var CategoryType = presto.type.CategoryType;
var BooleanType = presto.type.BooleanType;
var IntegerType = presto.type.IntegerType
var DecimalType = presto.type.DecimalType
var TextType = presto.type.TextType;
var DateType = presto.type.DateType;
var DateTimeType = presto.type.DateTimeType
var MissingType = presto.type.MissingType;
var AnyType = presto.type.AnyType;

var context;

exports.setUp = function(done) {
	var stmts = parseString("attribute id: Integer;" +
			"attribute name: Text;" +
			"category Root(id);" +
			"category Derived(name) extends Root;" +
			"category Unrelated(id, name);");
	context = presto.runtime.Context.newGlobalContext();
	stmts.register(context);
	done();
};
	

exports.testBooleanType = function(test) {
	var st = BooleanType.instance;
	test.equal(st,BooleanType.instance);
	test.ok(st.isAssignableTo(context, BooleanType.instance));
	test.ok(!st.isAssignableTo(context, IntegerType.instance));
	test.ok(!st.isAssignableTo(context, DecimalType.instance));
	test.ok(!st.isAssignableTo(context, TextType.instance));
	test.ok(!st.isAssignableTo(context, DateType.instance));
	test.ok(!st.isAssignableTo(context, DateTimeType.instance));
	test.ok(!st.isAssignableTo(context, MissingType.instance));
	test.ok(st.isAssignableTo(context, AnyType.instance));
	test.ok(!st.isAssignableTo(context, new CategoryType("Root")));
	test.ok(!st.isAssignableTo(context, new CategoryType("Derived")));
	test.ok(!st.isAssignableTo(context, new CategoryType("Unrelated")));
	test.done();
};


exports.testIntegerType = function(test) {
	var st = IntegerType.instance;
	test.equal(st,IntegerType.instance);
	test.ok(!st.isAssignableTo(context, BooleanType.instance));
	test.ok(st.isAssignableTo(context, IntegerType.instance));
	test.ok(st.isAssignableTo(context, DecimalType.instance));
	test.ok(!st.isAssignableTo(context, TextType.instance));
	test.ok(!st.isAssignableTo(context, DateType.instance));
	test.ok(!st.isAssignableTo(context, DateTimeType.instance));
	test.ok(!st.isAssignableTo(context, MissingType.instance));
	test.ok(st.isAssignableTo(context, AnyType.instance));
	test.ok(!st.isAssignableTo(context, new CategoryType("Root")));
	test.ok(!st.isAssignableTo(context, new CategoryType("Derived")));
	test.ok(!st.isAssignableTo(context, new CategoryType("Unrelated")));
	test.done();
};


exports.testDecimalType = function(test) {
	var st = DecimalType.instance;
	test.equal(st,DecimalType.instance);
	test.ok(!st.isAssignableTo(context, BooleanType.instance));
	test.ok(st.isAssignableTo(context, IntegerType.instance));
	test.ok(st.isAssignableTo(context, DecimalType.instance));
	test.ok(!st.isAssignableTo(context, TextType.instance));
	test.ok(!st.isAssignableTo(context, DateType.instance));
	test.ok(!st.isAssignableTo(context, DateTimeType.instance));
	test.ok(!st.isAssignableTo(context, MissingType.instance));
	test.ok(st.isAssignableTo(context, AnyType.instance));
	test.ok(!st.isAssignableTo(context, new CategoryType("Root")));
	test.ok(!st.isAssignableTo(context, new CategoryType("Derived")));
	test.ok(!st.isAssignableTo(context, new CategoryType("Unrelated")));
	test.done();
};


exports.testStringType = function(test) {
	var st = TextType.instance;
	test.equal(st,TextType.instance);
	test.ok(!st.isAssignableTo(context, BooleanType.instance));
	test.ok(!st.isAssignableTo(context, IntegerType.instance));
	test.ok(!st.isAssignableTo(context, DecimalType.instance));
	test.ok(st.isAssignableTo(context, TextType.instance));
	test.ok(!st.isAssignableTo(context, DateType.instance));
	test.ok(!st.isAssignableTo(context, DateTimeType.instance));
	test.ok(!st.isAssignableTo(context, MissingType.instance));
	test.ok(st.isAssignableTo(context, AnyType.instance));
	test.ok(!st.isAssignableTo(context, new CategoryType("Root")));
	test.ok(!st.isAssignableTo(context, new CategoryType("Derived")));
	test.ok(!st.isAssignableTo(context, new CategoryType("Unrelated")));
	test.done();
};


exports.testDateType = function(test) {
	var st = DateType.instance;
	test.equal(st,DateType.instance);
	test.ok(!st.isAssignableTo(context, BooleanType.instance));
	test.ok(!st.isAssignableTo(context, IntegerType.instance));
	test.ok(!st.isAssignableTo(context, DecimalType.instance));
	test.ok(!st.isAssignableTo(context, TextType.instance));
	test.ok(st.isAssignableTo(context, DateType.instance));
	test.ok(!st.isAssignableTo(context, DateTimeType.instance));
	test.ok(!st.isAssignableTo(context, MissingType.instance));
	test.ok(st.isAssignableTo(context, AnyType.instance));
	test.ok(!st.isAssignableTo(context, new CategoryType("Root")));
	test.ok(!st.isAssignableTo(context, new CategoryType("Derived")));
	test.ok(!st.isAssignableTo(context, new CategoryType("Unrelated")));
	test.done();
};


exports.testInstantType = function(test) {
	var st = DateTimeType.instance;
	test.equal(st,DateTimeType.instance);
	test.ok(!st.isAssignableTo(context, BooleanType.instance));
	test.ok(!st.isAssignableTo(context, IntegerType.instance));
	test.ok(!st.isAssignableTo(context, DecimalType.instance));
	test.ok(!st.isAssignableTo(context, TextType.instance));
	test.ok(st.isAssignableTo(context, DateType.instance));
	test.ok(st.isAssignableTo(context, DateTimeType.instance));
	test.ok(!st.isAssignableTo(context, MissingType.instance));
	test.ok(st.isAssignableTo(context, AnyType.instance));
	test.ok(!st.isAssignableTo(context, new CategoryType("Root")));
	test.ok(!st.isAssignableTo(context, new CategoryType("Derived")));
	test.ok(!st.isAssignableTo(context, new CategoryType("Unrelated")));
	test.done();
};


exports.testMissingType = function(test) {
	var st = MissingType.instance;
	test.equal(st,MissingType.instance);
	test.ok(st.isAssignableTo(context, BooleanType.instance));
	test.ok(st.isAssignableTo(context, IntegerType.instance));
	test.ok(st.isAssignableTo(context, DecimalType.instance));
	test.ok(st.isAssignableTo(context, TextType.instance));
	test.ok(st.isAssignableTo(context, DateType.instance));
	test.ok(st.isAssignableTo(context, DateTimeType.instance));
	test.ok(st.isAssignableTo(context, MissingType.instance));
	test.ok(st.isAssignableTo(context, AnyType.instance));
	test.ok(st.isAssignableTo(context, new CategoryType("Root")));
	test.ok(st.isAssignableTo(context, new CategoryType("Derived")));
	test.ok(st.isAssignableTo(context, new CategoryType("Unrelated")));
	test.done();
};


exports.testRootCategoryType = function(test) {
	var st = new CategoryType("Root");
	test.ok(!st.isAssignableTo(context, BooleanType.instance));
	test.ok(!st.isAssignableTo(context, IntegerType.instance));
	test.ok(!st.isAssignableTo(context, DecimalType.instance));
	test.ok(!st.isAssignableTo(context, TextType.instance));
	test.ok(!st.isAssignableTo(context, DateType.instance));
	test.ok(!st.isAssignableTo(context, DateTimeType.instance));
	test.ok(!st.isAssignableTo(context, MissingType.instance));
	test.ok(st.isAssignableTo(context, AnyType.instance));
	test.ok(st.isAssignableTo(context, new CategoryType("Root")));
	test.ok(!st.isAssignableTo(context, new CategoryType("Derived")));
	test.ok(!st.isAssignableTo(context, new CategoryType("Unrelated")));
	test.done();
};


exports.testDerivedCategoryType = function(test) {
	var st = new CategoryType("Derived");
	test.ok(!st.isAssignableTo(context, BooleanType.instance));
	test.ok(!st.isAssignableTo(context, IntegerType.instance));
	test.ok(!st.isAssignableTo(context, DecimalType.instance));
	test.ok(!st.isAssignableTo(context, TextType.instance));
	test.ok(!st.isAssignableTo(context, DateType.instance));
	test.ok(!st.isAssignableTo(context, DateTimeType.instance));
	test.ok(!st.isAssignableTo(context, MissingType.instance));
	test.ok(st.isAssignableTo(context, AnyType.instance));
	test.ok(st.isAssignableTo(context, new CategoryType("Root")));
	test.ok(st.isAssignableTo(context, new CategoryType("Derived")));
	test.ok(!st.isAssignableTo(context, new CategoryType("Unrelated")));
	test.done();
};


exports.testUnrelatedCategoryType = function(test) {
	var st = new CategoryType("Unrelated");
	test.ok(!st.isAssignableTo(context, BooleanType.instance));
	test.ok(!st.isAssignableTo(context, IntegerType.instance));
	test.ok(!st.isAssignableTo(context, DecimalType.instance));
	test.ok(!st.isAssignableTo(context, TextType.instance));
	test.ok(!st.isAssignableTo(context, DateType.instance));
	test.ok(!st.isAssignableTo(context, DateTimeType.instance));
	test.ok(!st.isAssignableTo(context, MissingType.instance));
	test.ok(st.isAssignableTo(context, AnyType.instance));
	test.ok(!st.isAssignableTo(context, new CategoryType("Root")));
	test.ok(!st.isAssignableTo(context, new CategoryType("Derived")));
	test.ok(st.isAssignableTo(context, new CategoryType("Unrelated")));
	test.done();
};