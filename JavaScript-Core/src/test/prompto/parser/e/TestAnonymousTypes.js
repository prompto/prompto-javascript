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
	test.ok(st.isAssignableFrom(context, BooleanType.instance));
	test.ok(st.isAssignableFrom(context, IntegerType.instance));
	test.ok(st.isAssignableFrom(context, DecimalType.instance));
	test.ok(st.isAssignableFrom(context, TextType.instance));
	test.ok(st.isAssignableFrom(context, DateType.instance));
	test.ok(st.isAssignableFrom(context, DateTimeType.instance));
	test.ok(st.isAssignableFrom(context, MissingType.instance)); // missing type always compatible
	test.ok(st.isAssignableFrom(context, AnyType.instance)); 
	test.ok(st.isAssignableFrom(context, new CategoryType(new Identifier("Simple"))));
	test.ok(st.isAssignableFrom(context, new CategoryType(new Identifier("Root"))));
	test.ok(st.isAssignableFrom(context, new CategoryType(new Identifier("DerivedWithOther"))));
	test.ok(st.isAssignableFrom(context, new CategoryType(new Identifier("DerivedWithName"))));
	test.done();
}


exports.testAnonymousAnyTypeWithAttribute = function(test) {
	// any x with attribute: name
	var list = new IdentifierList(new Identifier("name"));
	var argument = new ExtendedArgument(AnyType.instance, new Identifier("x"), list);
	argument.register(context);
	var st = argument.getType(context);
	test.ok(st instanceof CategoryType);
	test.ok(!st.isAssignableFrom(context, BooleanType.instance));
	test.ok(!st.isAssignableFrom(context, IntegerType.instance));
	test.ok(!st.isAssignableFrom(context, DecimalType.instance));
	test.ok(!st.isAssignableFrom(context, TextType.instance));
	test.ok(!st.isAssignableFrom(context, DateType.instance));
	test.ok(!st.isAssignableFrom(context, DateTimeType.instance));
	test.ok(!st.isAssignableFrom(context, MissingType.instance)); // missing type always compatible
	test.ok(!st.isAssignableFrom(context, AnyType.instance)); // any type never compatible
	test.ok(st.isAssignableFrom(context, new CategoryType(new Identifier("Simple")))); // since Simple has a name
	test.ok(!st.isAssignableFrom(context, new CategoryType(new Identifier("Root")))); // since Root has no name
	test.ok(!st.isAssignableFrom(context, new CategoryType(new Identifier("DerivedWithOther")))); // since DerivedWithOther has no name
	test.ok(st.isAssignableFrom(context, new CategoryType(new Identifier("DerivedWithName")))); // since DerivedWithName has a name
	test.done();
}


exports.testAnonymousCategoryType = function(test) {
	// Root x
	var argument = new CategoryArgument(new CategoryType(new Identifier("Root")), new Identifier("x"));
	argument.register(context);
	var st = argument.getType(context);
	test.ok(st instanceof CategoryType);
	test.ok(!st.isAssignableFrom(context, BooleanType.instance));
	test.ok(!st.isAssignableFrom(context, IntegerType.instance));
	test.ok(!st.isAssignableFrom(context, DecimalType.instance));
	test.ok(!st.isAssignableFrom(context, TextType.instance));
	test.ok(!st.isAssignableFrom(context, DateType.instance));
	test.ok(!st.isAssignableFrom(context, DateTimeType.instance));
	test.ok(!st.isAssignableFrom(context, MissingType.instance)); // missing type always compatible
	test.ok(!st.isAssignableFrom(context, AnyType.instance)); // any type never compatible
	test.ok(!(st.isAssignableFrom(context, new CategoryType(new Identifier("Simple")))));  // since Simple does not extend Root
	test.ok(st.isAssignableFrom(context, new CategoryType(new Identifier("Root")))); // since Root is Root
	test.ok(st.isAssignableFrom(context, new CategoryType(new Identifier("DerivedWithOther")))); // since DerivedWithOther extends Root
	test.ok(st.isAssignableFrom(context, new CategoryType(new Identifier("DerivedWithName")))); // since DerivedWithName extends Root
	test.done();
}


exports.testAnonymousCategoryTypeWithAttribute = function(test) {
	// Root x with attribute: name
	var list = new IdentifierList(new Identifier("name"));
	var argument = new ExtendedArgument(new CategoryType(new Identifier("Root")), new Identifier("test"), list);
	argument.register(context);
	var st = argument.getType(context);
	test.ok(st instanceof CategoryType);
	test.ok(!st.isAssignableFrom(context, BooleanType.instance));
	test.ok(!st.isAssignableFrom(context, IntegerType.instance));
	test.ok(!st.isAssignableFrom(context, DecimalType.instance));
	test.ok(!st.isAssignableFrom(context, TextType.instance));
	test.ok(!st.isAssignableFrom(context, DateType.instance));
	test.ok(!st.isAssignableFrom(context, DateTimeType.instance));
	test.ok(!st.isAssignableFrom(context, MissingType.instance)); // missing type always compatible
	test.ok(!st.isAssignableFrom(context, AnyType.instance)); // any type never compatible
	test.ok(!(st.isAssignableFrom(context, new CategoryType(new Identifier("Simple")))));  // since Simple does not extend Root
	test.ok(!(st.isAssignableFrom(context, new CategoryType(new Identifier("Root"))))); // since Root has no name
	test.ok(!(st.isAssignableFrom(context, new CategoryType(new Identifier("DerivedWithOther"))))); // since DerivedWithOther has no name
	test.ok(st.isAssignableFrom(context, new CategoryType(new Identifier("DerivedWithName")))); // since DerivedWithName has a name
	test.done();
}
	

