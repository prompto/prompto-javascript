require("../../../../exploded");

var prompto = require("../../../../main/prompto/index");
var parseString = require("../../parser/BaseEParserTest").parseString;

var Identifier = prompto.grammar.Identifier;
var IdentifierList = prompto.grammar.IdentifierList;
var CategoryArgument = prompto.argument.CategoryArgument;
var ExtendedArgument = prompto.argument.ExtendedArgument;
var AnyType = prompto.type.AnyType;
var TextType = prompto.type.TextType;
var DateType = prompto.type.DateType;
var BooleanType = prompto.type.BooleanType;
var MissingType = prompto.type.MissingType;
var IntegerType = prompto.type.IntegerType
var DecimalType = prompto.type.DecimalType
var DateTimeType = prompto.type.DateTimeType
var CategoryType = prompto.type.CategoryType;
var ConcreteCategoryDeclaration = prompto.declaration.ConcreteCategoryDeclaration;

var context;

exports.setUp = function(done) {
	var stmts = parseString("define id as Integer attribute\r\n" +
			"define name as String attribute\r\n" +
			"define other as String attribute\r\n" +
			"define Simple as category with attribute name\r\n" +
			"define Root as category with attribute id\r\n" +
			"define DerivedWithOther as Root with attribute other\r\n" +
			"define DerivedWithName as Root with attribute name\r\n");
	context = prompto.runtime.Context.newGlobalContext();
	stmts.register(context);
	done();
};

exports.tearDown = function(done) {
	done();
};


exports.testAnonymousAnyType = function(test) {
	// any x
	var argument = new CategoryArgument(AnyType.instance, new Identifier("x"));
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
	test.ok(new CategoryType(new Identifier("Simple")).isAssignableTo(context,st));
	test.ok(new CategoryType(new Identifier("Root")).isAssignableTo(context,st));
	test.ok(new CategoryType(new Identifier("DerivedWithOther")).isAssignableTo(context,st));
	test.ok(new CategoryType(new Identifier("DerivedWithName")).isAssignableTo(context,st));
	test.done();
}


exports.testAnonymousAnyTypeWithAttribute = function(test) {
	// any x with attribute: name
	var list = new IdentifierList(new Identifier("name"));
	var argument = new ExtendedArgument(AnyType.instance, new Identifier("x"), list);
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
	test.ok(new CategoryType(new Identifier("Simple")).isAssignableTo(context,st)); // since Simple has a name
	test.ok(!new CategoryType(new Identifier("Root")).isAssignableTo(context,st)); // since Root has no name
	test.ok(!new CategoryType(new Identifier("DerivedWithOther")).isAssignableTo(context,st)); // since DerivedWithOther has no name
	test.ok(new CategoryType(new Identifier("DerivedWithName")).isAssignableTo(context,st)); // since DerivedWithName has a name
	test.done();
}


exports.testAnonymousCategoryType = function(test) {
	// Root x
	var argument = new CategoryArgument(new CategoryType(new Identifier("Root")), new Identifier("x"));
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
	test.ok(!(new CategoryType(new Identifier("Simple")).isAssignableTo(context,st)));  // since Simple does not extend Root
	test.ok(new CategoryType(new Identifier("Root")).isAssignableTo(context,st)); // since Root is Root
	test.ok(new CategoryType(new Identifier("DerivedWithOther")).isAssignableTo(context,st)); // since DerivedWithOther extends Root
	test.ok(new CategoryType(new Identifier("DerivedWithName")).isAssignableTo(context,st)); // since DerivedWithName extends Root
	test.done();
}


exports.testAnonymousCategoryTypeWithAttribute = function(test) {
	// Root x with attribute: name
	var list = new IdentifierList(new Identifier("name"));
	var argument = new ExtendedArgument(new CategoryType(new Identifier("Root")), new Identifier("test"), list);
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
	test.ok(!(new CategoryType(new Identifier("Simple")).isAssignableTo(context,st)));  // since Simple does not extend Root
	test.ok(!(new CategoryType(new Identifier("Root")).isAssignableTo(context,st))); // since Root has no name
	test.ok(!(new CategoryType(new Identifier("DerivedWithOther")).isAssignableTo(context,st))); // since DerivedWithOther has no name
	test.ok(new CategoryType(new Identifier("DerivedWithName")).isAssignableTo(context,st)); // since DerivedWithName has a name
	test.done();
}
	

