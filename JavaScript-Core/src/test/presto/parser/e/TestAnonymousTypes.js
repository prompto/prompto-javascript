require("../../../../exploded");

var presto = require("../../../../main/presto/index");
var parseString = require("../../parser/BaseEParserTest").parseString;

var IdentifierList = presto.grammar.IdentifierList;
var CategoryArgument = presto.grammar.CategoryArgument;
var AnyType = presto.type.AnyType;
var TextType = presto.type.TextType;
var DateType = presto.type.DateType;
var BooleanType = presto.type.BooleanType;
var MissingType = presto.type.MissingType;
var IntegerType = presto.type.IntegerType
var DecimalType = presto.type.DecimalType
var DateTimeType = presto.type.DateTimeType
var CategoryType = presto.type.CategoryType;
var ConcreteCategoryDeclaration = presto.declaration.ConcreteCategoryDeclaration;

var context;

exports.setUp = function(done) {
	var stmts = parseString("define id as: Integer attribute\r\n" +
			"define name as: String attribute\r\n" +
			"define other as: String attribute\r\n" +
			"define Simple as: category with attribute: name\r\n" +
			"define Root as: category with attribute: id\r\n" +
			"define DerivedWithOther as: Root with attribute: other\r\n" +
			"define DerivedWithName as: Root with attribute: name\r\n");
	context = presto.runtime.Context.newGlobalContext();
	stmts.register(context);
	done();
};

exports.tearDown = function(done) {
	done();
};


exports.testAnonymousAnyType = function(test) {
	// any x
	var argument = new CategoryArgument(AnyType.instance, "x", null);
	argument.register(context);
	var st = argument.getType(context);
	test.ok(st instanceof AnyType);
	test.ok(BooleanType.instance.isAssignableTo(context,st));
	test.ok(IntegerType.instance.isAssignableTo(context,st));
	test.ok(DecimalType.instance.isAssignableTo(context,st));
	test.ok(TextType.instance.isAssignableTo(context,st));
	test.ok(DateType.instance.isAssignableTo(context,st));
	test.ok(DateTimeType.instance.isAssignableTo(context,st));
	test.ok(MissingType.instance.isAssignableTo(context,st)); // missing type always compatible
	test.ok(AnyType.instance.isAssignableTo(context,st)); 
	test.ok(new CategoryType("Simple").isAssignableTo(context,st));
	test.ok(new CategoryType("Root").isAssignableTo(context,st));
	test.ok(new CategoryType("DerivedWithOther").isAssignableTo(context,st));
	test.ok(new CategoryType("DerivedWithName").isAssignableTo(context,st));
	test.done();
}


exports.testAnonymousAnyTypeWithAttribute = function(test) {
	// any x with attribute: name
	var list = new IdentifierList("name");
	var argument = new CategoryArgument(AnyType.instance, "x", list);
	argument.register(context);
	var st = argument.getType(context);
	test.ok(st instanceof CategoryType);
	test.ok(!BooleanType.instance.isAssignableTo(context,st));
	test.ok(!IntegerType.instance.isAssignableTo(context,st));
	test.ok(!DecimalType.instance.isAssignableTo(context,st));
	test.ok(!TextType.instance.isAssignableTo(context,st));
	test.ok(!DateType.instance.isAssignableTo(context,st));
	test.ok(!DateTimeType.instance.isAssignableTo(context,st));
	test.ok(MissingType.instance.isAssignableTo(context,st)); // missing type always compatible
	test.ok(!AnyType.instance.isAssignableTo(context,st)); // any type never compatible
	test.ok(new CategoryType("Simple").isAssignableTo(context,st)); // since Simple has a name
	test.ok(!new CategoryType("Root").isAssignableTo(context,st)); // since Root has no name
	test.ok(!new CategoryType("DerivedWithOther").isAssignableTo(context,st)); // since DerivedWithOther has no name
	test.ok(new CategoryType("DerivedWithName").isAssignableTo(context,st)); // since DerivedWithName has a name
	test.done();
}


exports.testAnonymousCategoryType = function(test) {
	// Root x
	var argument = new CategoryArgument(new CategoryType("Root"), "x", null);
	argument.register(context);
	var st = argument.getType(context);
	test.ok(st instanceof CategoryType);
	test.ok(!BooleanType.instance.isAssignableTo(context,st));
	test.ok(!IntegerType.instance.isAssignableTo(context,st));
	test.ok(!DecimalType.instance.isAssignableTo(context,st));
	test.ok(!TextType.instance.isAssignableTo(context,st));
	test.ok(!DateType.instance.isAssignableTo(context,st));
	test.ok(!DateTimeType.instance.isAssignableTo(context,st));
	test.ok(MissingType.instance.isAssignableTo(context,st)); // missing type always compatible
	test.ok(!AnyType.instance.isAssignableTo(context,st)); // any type never compatible
	test.ok(!(new CategoryType("Simple").isAssignableTo(context,st)));  // since Simple does not extend Root
	test.ok(new CategoryType("Root").isAssignableTo(context,st)); // since Root is Root
	test.ok(new CategoryType("DerivedWithOther").isAssignableTo(context,st)); // since DerivedWithOther extends Root
	test.ok(new CategoryType("DerivedWithName").isAssignableTo(context,st)); // since DerivedWithName extends Root
	test.done();
}


exports.testAnonymousCategoryTypeWithAttribute = function(test) {
	// Root x with attribute: name
	var list = new IdentifierList("name");
	var argument = new CategoryArgument(new CategoryType("Root"), "test", list);
	argument.register(context);
	var st = argument.getType(context);
	test.ok(st instanceof CategoryType);
	test.ok(!BooleanType.instance.isAssignableTo(context,st));
	test.ok(!IntegerType.instance.isAssignableTo(context,st));
	test.ok(!DecimalType.instance.isAssignableTo(context,st));
	test.ok(!TextType.instance.isAssignableTo(context,st));
	test.ok(!DateType.instance.isAssignableTo(context,st));
	test.ok(!DateTimeType.instance.isAssignableTo(context,st));
	test.ok(MissingType.instance.isAssignableTo(context,st)); // missing type always compatible
	test.ok(!AnyType.instance.isAssignableTo(context,st)); // any type never compatible
	test.ok(!(new CategoryType("Simple").isAssignableTo(context,st)));  // since Simple does not extend Root
	test.ok(!(new CategoryType("Root").isAssignableTo(context,st))); // since Root has no name
	test.ok(!(new CategoryType("DerivedWithOther").isAssignableTo(context,st))); // since DerivedWithOther has no name
	test.ok(new CategoryType("DerivedWithName").isAssignableTo(context,st)); // since DerivedWithName has a name
	test.done();
}
	

