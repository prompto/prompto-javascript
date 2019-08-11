var prompto = require("../../../../main/prompto/index");
var parseString = require("../../parser/BaseEParserTest").parseString;

var Identifier = prompto.grammar.Identifier;
var IdentifierList = prompto.grammar.IdentifierList;
var CategoryParameter = prompto.argument.CategoryParameter;
var ExtendedParameter = prompto.argument.ExtendedParameter;
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

beforeEach(() => {
	context = prompto.runtime.Context.newGlobalContext();
	var stmts = parseString("define id as Integer attribute\r\n" +
			"define name as String attribute\r\n" +
			"define other as String attribute\r\n" +
			"define Simple as category with attribute name\r\n" +
			"define Root as category with attribute id\r\n" +
			"define DerivedWithOther as Root with attribute other\r\n" +
			"define DerivedWithName as Root with attribute name\r\n");
	stmts.register(context);
});

test('AnonymousAnyType is assignable', () => {
	// any x
	var argument = new CategoryParameter(AnyType.instance, new Identifier("x"));
	argument.register(context);
	var st = argument.getType(context);
	expect(st instanceof AnyType).toBeTruthy();
	expect(st.isAssignableFrom(context, BooleanType.instance)).toBeTruthy();
	expect(st.isAssignableFrom(context, IntegerType.instance)).toBeTruthy();
	expect(st.isAssignableFrom(context, DecimalType.instance)).toBeTruthy();
	expect(st.isAssignableFrom(context, TextType.instance)).toBeTruthy();
	expect(st.isAssignableFrom(context, DateType.instance)).toBeTruthy();
	expect(st.isAssignableFrom(context, DateTimeType.instance)).toBeTruthy();
	expect(st.isAssignableFrom(context, MissingType.instance)).toBeTruthy(); // missing type always compatible
	expect(st.isAssignableFrom(context, AnyType.instance)).toBeTruthy();
	expect(st.isAssignableFrom(context, new CategoryType(new Identifier("Simple")))).toBeTruthy();
	expect(st.isAssignableFrom(context, new CategoryType(new Identifier("Root")))).toBeTruthy();
	expect(st.isAssignableFrom(context, new CategoryType(new Identifier("DerivedWithOther")))).toBeTruthy();
	expect(st.isAssignableFrom(context, new CategoryType(new Identifier("DerivedWithName")))).toBeTruthy();
});

test('AnonymousAnyType with attribute is assignable', () => {
	// any x with attribute: name
	var list = new IdentifierList(new Identifier("name"));
	var argument = new ExtendedParameter(AnyType.instance, new Identifier("x"), list);
	argument.register(context);
	var st = argument.getType(context);
	expect(st instanceof CategoryType).toBeTruthy();
	expect(st.isAssignableFrom(context, BooleanType.instance)).toBeFalsy();
	expect(st.isAssignableFrom(context, IntegerType.instance)).toBeFalsy();
	expect(st.isAssignableFrom(context, DecimalType.instance)).toBeFalsy();
	expect(st.isAssignableFrom(context, TextType.instance)).toBeFalsy();
	expect(st.isAssignableFrom(context, DateType.instance)).toBeFalsy();
	expect(st.isAssignableFrom(context, DateTimeType.instance)).toBeFalsy();
	expect(st.isAssignableFrom(context, MissingType.instance)).toBeFalsy(); // missing type always compatible
	expect(st.isAssignableFrom(context, AnyType.instance)).toBeFalsy(); // any type never compatible
	expect(st.isAssignableFrom(context, new CategoryType(new Identifier("Simple")))).toBeTruthy(); // since Simple has a name
	expect(st.isAssignableFrom(context, new CategoryType(new Identifier("Root")))).toBeFalsy(); // since Root has no name
	expect(st.isAssignableFrom(context, new CategoryType(new Identifier("DerivedWithOther")))).toBeFalsy(); // since DerivedWithOther has no name
	expect(st.isAssignableFrom(context, new CategoryType(new Identifier("DerivedWithName")))).toBeTruthy(); // since DerivedWithName has a name
});

test('AnonymousCategoryType is assignable', () => {
	// Root x
	var argument = new CategoryParameter(new CategoryType(new Identifier("Root")), new Identifier("x"));
	argument.register(context);
	var st = argument.getType(context);
	expect(st instanceof CategoryType).toBeTruthy();
	expect(st.isAssignableFrom(context, BooleanType.instance)).toBeFalsy();
	expect(st.isAssignableFrom(context, IntegerType.instance)).toBeFalsy();
	expect(st.isAssignableFrom(context, DecimalType.instance)).toBeFalsy();
	expect(st.isAssignableFrom(context, TextType.instance)).toBeFalsy();
	expect(st.isAssignableFrom(context, DateType.instance)).toBeFalsy();
	expect(st.isAssignableFrom(context, DateTimeType.instance)).toBeFalsy();
	expect(st.isAssignableFrom(context, MissingType.instance)).toBeFalsy(); // missing type always compatible
	expect(st.isAssignableFrom(context, AnyType.instance)).toBeFalsy(); // any type never compatible
	expect(st.isAssignableFrom(context, new CategoryType(new Identifier("Simple")))).toBeFalsy();  // since Simple does not extend Root
	expect(st.isAssignableFrom(context, new CategoryType(new Identifier("Root")))).toBeTruthy(); // since Root is Root
	expect(st.isAssignableFrom(context, new CategoryType(new Identifier("DerivedWithOther")))).toBeTruthy(); // since DerivedWithOther extends Root
	expect(st.isAssignableFrom(context, new CategoryType(new Identifier("DerivedWithName")))).toBeTruthy(); // since DerivedWithName extends Root
});


test('AnonymousCategoryType with attribute is assignable', () => {
	// Root x with attribute: name
	var list = new IdentifierList(new Identifier("name"));
	var argument = new ExtendedParameter(new CategoryType(new Identifier("Root")), new Identifier("test"), list);
	argument.register(context);
	var st = argument.getType(context);
	expect(st instanceof CategoryType).toBeTruthy();
	expect(st.isAssignableFrom(context, BooleanType.instance)).toBeFalsy();
	expect(st.isAssignableFrom(context, IntegerType.instance)).toBeFalsy();
	expect(st.isAssignableFrom(context, DecimalType.instance)).toBeFalsy();
	expect(st.isAssignableFrom(context, TextType.instance)).toBeFalsy();
	expect(st.isAssignableFrom(context, DateType.instance)).toBeFalsy();
	expect(st.isAssignableFrom(context, DateTimeType.instance)).toBeFalsy();
	expect(st.isAssignableFrom(context, MissingType.instance)).toBeFalsy(); // missing type always compatible
	expect(st.isAssignableFrom(context, AnyType.instance)).toBeFalsy(); // any type never compatible
	expect(st.isAssignableFrom(context, new CategoryType(new Identifier("Simple")))).toBeFalsy();  // since Simple does not extend Root
	expect(st.isAssignableFrom(context, new CategoryType(new Identifier("Root")))).toBeFalsy(); // since Root has no name
	expect(st.isAssignableFrom(context, new CategoryType(new Identifier("DerivedWithOther")))).toBeFalsy(); // since DerivedWithOther has no name
	expect(st.isAssignableFrom(context, new CategoryType(new Identifier("DerivedWithName")))).toBeTruthy(); // since DerivedWithName has a name
});
	

