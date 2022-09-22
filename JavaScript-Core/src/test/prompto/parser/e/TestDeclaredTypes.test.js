var prompto = require("../../../../main/prompto");
var parseString = require("../../parser/BaseEParserTest").parseString;

var Identifier = prompto.grammar.Identifier;
var CategoryType = prompto.type.CategoryType;
var BlobType = prompto.type.BlobType;
var BooleanType = prompto.type.BooleanType;
var ImageType = prompto.type.ImageType
var IntegerType = prompto.type.IntegerType
var DecimalType = prompto.type.DecimalType
var TextType = prompto.type.TextType;
var DateType = prompto.type.DateType;
var DateTimeType = prompto.type.DateTimeType
var MissingType = prompto.type.MissingType;
var AnyType = prompto.type.AnyType;

var context;

beforeEach(() => {
	var stmts = parseString("define id as Integer attribute\r\n" +
		"define name as Text attribute\r\n" +
		"define Root as category with attribute id\r\n" +
		"define Derived as Root with attribute name\r\n" +
		"define Unrelated as category with attributes id and name\r\n");
	context = prompto.runtime.Context.newGlobalsContext();
	stmts.register(context);
});

function isAssignableTo(context, t1, t2) {
    return t2.isAssignableFrom(context, t1);
}

test('BlobType is assignable', () => {
    var st = BlobType.instance;
    expect(st instanceof BlobType).toBeTruthy()
    expect(isAssignableTo(context, st, BlobType.instance)).toBeTruthy();
    expect(isAssignableTo(context, st, ImageType.instance)).toBeFalsy();
    expect(isAssignableTo(context, st, TextType.instance)).toBeFalsy();
});


test('ImageType is assignable', () => {
    var st = ImageType.instance;
    expect(st instanceof ImageType).toBeTruthy()
    expect(isAssignableTo(context, st, ImageType.instance)).toBeTruthy();
    expect(isAssignableTo(context, st, BlobType.instance)).toBeFalsy();
    expect(isAssignableTo(context, st, TextType.instance)).toBeFalsy();
});


test('BooleanType is assignable', () => {
	var st = BooleanType.instance;
	expect(st instanceof BooleanType).toBeTruthy()
	expect(isAssignableTo(context, st, BooleanType.instance)).toBeTruthy();
	expect(isAssignableTo(context, st, IntegerType.instance)).toBeFalsy();
	expect(isAssignableTo(context, st, DecimalType.instance)).toBeFalsy();
	expect(isAssignableTo(context, st, TextType.instance)).toBeFalsy();
	expect(isAssignableTo(context, st, DateType.instance)).toBeFalsy();
	expect(isAssignableTo(context, st, DateTimeType.instance)).toBeFalsy();
	expect(isAssignableTo(context, st, MissingType.instance)).toBeTruthy();
	expect(isAssignableTo(context, st, AnyType.instance)).toBeTruthy();
	expect(isAssignableTo(context, st, new CategoryType(new Identifier("Root")))).toBeFalsy();
	expect(isAssignableTo(context, st, new CategoryType(new Identifier("Derived")))).toBeFalsy();
	expect(isAssignableTo(context, st, new CategoryType(new Identifier("Unrelated")))).toBeFalsy();
});


test('IntegerType is assignable', () => {
	var st = IntegerType.instance;
	expect(st instanceof IntegerType).toBeTruthy()
	expect(isAssignableTo(context, st, BooleanType.instance)).toBeFalsy();
	expect(isAssignableTo(context, st, IntegerType.instance)).toBeTruthy();
	expect(isAssignableTo(context, st, DecimalType.instance)).toBeTruthy();
	expect(isAssignableTo(context, st, TextType.instance)).toBeFalsy();
	expect(isAssignableTo(context, st, DateType.instance)).toBeFalsy();
	expect(isAssignableTo(context, st, DateTimeType.instance)).toBeFalsy();
    expect(isAssignableTo(context, st, MissingType.instance)).toBeTruthy();
	expect(isAssignableTo(context, st, AnyType.instance)).toBeTruthy();
	expect(isAssignableTo(context, st, new CategoryType(new Identifier("Root")))).toBeFalsy();
	expect(isAssignableTo(context, st, new CategoryType(new Identifier("Derived")))).toBeFalsy();
	expect(isAssignableTo(context, st, new CategoryType(new Identifier("Unrelated")))).toBeFalsy();
});


test('DecimalType is assignable', () => {
	var st = DecimalType.instance;
	expect(st instanceof DecimalType).toBeTruthy()
	expect(isAssignableTo(context, st, BooleanType.instance)).toBeFalsy();
	expect(isAssignableTo(context, st, IntegerType.instance)).toBeTruthy();
	expect(isAssignableTo(context, st, DecimalType.instance)).toBeTruthy();
	expect(isAssignableTo(context, st, TextType.instance)).toBeFalsy();
	expect(isAssignableTo(context, st, DateType.instance)).toBeFalsy();
	expect(isAssignableTo(context, st, DateTimeType.instance)).toBeFalsy();
    expect(isAssignableTo(context, st, MissingType.instance)).toBeTruthy();
	expect(isAssignableTo(context, st, AnyType.instance)).toBeTruthy();
	expect(isAssignableTo(context, st, new CategoryType(new Identifier("Root")))).toBeFalsy();
	expect(isAssignableTo(context, st, new CategoryType(new Identifier("Derived")))).toBeFalsy();
	expect(isAssignableTo(context, st, new CategoryType(new Identifier("Unrelated")))).toBeFalsy();
});


test('TextType is assignable', () => {
	var st = TextType.instance;
	expect(st instanceof TextType).toBeTruthy()
	expect(isAssignableTo(context, st, BooleanType.instance)).toBeFalsy();
	expect(isAssignableTo(context, st, IntegerType.instance)).toBeFalsy();
	expect(isAssignableTo(context, st, DecimalType.instance)).toBeFalsy();
	expect(isAssignableTo(context, st, TextType.instance)).toBeTruthy();
	expect(isAssignableTo(context, st, DateType.instance)).toBeFalsy();
	expect(isAssignableTo(context, st, DateTimeType.instance)).toBeFalsy();
    expect(isAssignableTo(context, st, MissingType.instance)).toBeTruthy();
	expect(isAssignableTo(context, st, AnyType.instance)).toBeTruthy();
	expect(isAssignableTo(context, st, new CategoryType(new Identifier("Root")))).toBeFalsy();
	expect(isAssignableTo(context, st, new CategoryType(new Identifier("Derived")))).toBeFalsy();
	expect(isAssignableTo(context, st, new CategoryType(new Identifier("Unrelated")))).toBeFalsy();
});


test('DateType is assignable', () => {
	var st = DateType.instance;
	expect(st instanceof DateType).toBeTruthy()
	expect(isAssignableTo(context, st, BooleanType.instance)).toBeFalsy();
	expect(isAssignableTo(context, st, IntegerType.instance)).toBeFalsy();
	expect(isAssignableTo(context, st, DecimalType.instance)).toBeFalsy();
	expect(isAssignableTo(context, st, TextType.instance)).toBeFalsy();
	expect(isAssignableTo(context, st, DateType.instance)).toBeTruthy();
	expect(isAssignableTo(context, st, DateTimeType.instance)).toBeFalsy();
    expect(isAssignableTo(context, st, MissingType.instance)).toBeTruthy();
	expect(isAssignableTo(context, st, AnyType.instance)).toBeTruthy();
	expect(isAssignableTo(context, st, new CategoryType(new Identifier("Root")))).toBeFalsy();
	expect(isAssignableTo(context, st, new CategoryType(new Identifier("Derived")))).toBeFalsy();
	expect(isAssignableTo(context, st, new CategoryType(new Identifier("Unrelated")))).toBeFalsy();
});


test('DateTimeType is assignable', () => {
	var st = DateTimeType.instance;
	expect(st instanceof DateTimeType).toBeTruthy()
	expect(isAssignableTo(context, st, BooleanType.instance)).toBeFalsy();
	expect(isAssignableTo(context, st, IntegerType.instance)).toBeFalsy();
	expect(isAssignableTo(context, st, DecimalType.instance)).toBeFalsy();
	expect(isAssignableTo(context, st, TextType.instance)).toBeFalsy();
	expect(isAssignableTo(context, st, DateType.instance)).toBeTruthy();
	expect(isAssignableTo(context, st, DateTimeType.instance)).toBeTruthy();
    expect(isAssignableTo(context, st, MissingType.instance)).toBeTruthy();
	expect(isAssignableTo(context, st, AnyType.instance)).toBeTruthy();
	expect(isAssignableTo(context, st, new CategoryType(new Identifier("Root")))).toBeFalsy();
	expect(isAssignableTo(context, st, new CategoryType(new Identifier("Derived")))).toBeFalsy();
	expect(isAssignableTo(context, st, new CategoryType(new Identifier("Unrelated")))).toBeFalsy();
});


test('MissingType is assignable', () => {
	var st = MissingType.instance;
	expect(st.isAssignableFrom(context, BooleanType.instance)).toBeTruthy();
	expect(st.isAssignableFrom(context, IntegerType.instance)).toBeTruthy();
	expect(st.isAssignableFrom(context, DecimalType.instance)).toBeTruthy();
	expect(st.isAssignableFrom(context, TextType.instance)).toBeTruthy();
	expect(st.isAssignableFrom(context, DateType.instance)).toBeTruthy();
	expect(st.isAssignableFrom(context, DateTimeType.instance)).toBeTruthy();
	expect(st.isAssignableFrom(context, MissingType.instance)).toBeTruthy();
	expect(st.isAssignableFrom(context, AnyType.instance)).toBeTruthy();
	expect(st.isAssignableFrom(context, new CategoryType(new Identifier("Root")))).toBeTruthy();
	expect(st.isAssignableFrom(context, new CategoryType(new Identifier("Derived")))).toBeTruthy();
	expect(st.isAssignableFrom(context, new CategoryType(new Identifier("Unrelated")))).toBeTruthy();
});


test('Root CategoryType is assignable', () => {
	var st = new CategoryType(new Identifier("Root"));
	expect(isAssignableTo(context, st, BooleanType.instance)).toBeFalsy();
	expect(isAssignableTo(context, st, IntegerType.instance)).toBeFalsy();
	expect(isAssignableTo(context, st, DecimalType.instance)).toBeFalsy();
	expect(isAssignableTo(context, st, TextType.instance)).toBeFalsy();
	expect(isAssignableTo(context, st, DateType.instance)).toBeFalsy();
	expect(isAssignableTo(context, st, DateTimeType.instance)).toBeFalsy();
	expect(isAssignableTo(context, st, MissingType.instance)).toBeTruthy();
	expect(isAssignableTo(context, st, AnyType.instance)).toBeTruthy();
	expect(isAssignableTo(context, st, new CategoryType(new Identifier("Root")))).toBeTruthy();
	expect(isAssignableTo(context, st, new CategoryType(new Identifier("Derived")))).toBeFalsy();
	expect(isAssignableTo(context, st, new CategoryType(new Identifier("Unrelated")))).toBeFalsy();
});


test('Derived CategoryType is assignable', () => {
	var st = new CategoryType(new Identifier("Derived"));
	expect(isAssignableTo(context, st, BooleanType.instance)).toBeFalsy();
	expect(isAssignableTo(context, st, IntegerType.instance)).toBeFalsy();
	expect(isAssignableTo(context, st, DecimalType.instance)).toBeFalsy();
	expect(isAssignableTo(context, st, TextType.instance)).toBeFalsy();
	expect(isAssignableTo(context, st, DateType.instance)).toBeFalsy();
	expect(isAssignableTo(context, st, DateTimeType.instance)).toBeFalsy();
	expect(isAssignableTo(context, st, MissingType.instance)).toBeTruthy();
	expect(isAssignableTo(context, st, AnyType.instance)).toBeTruthy();
	expect(isAssignableTo(context, st, new CategoryType(new Identifier("Root")))).toBeTruthy();
	expect(isAssignableTo(context, st, new CategoryType(new Identifier("Derived")))).toBeTruthy();
	expect(isAssignableTo(context, st, new CategoryType(new Identifier("Unrelated")))).toBeFalsy();
});


test('Unrelated CategoryType is assignable', () => {
	var st = new CategoryType(new Identifier("Unrelated"));
	expect(isAssignableTo(context, st, BooleanType.instance)).toBeFalsy();
	expect(isAssignableTo(context, st, IntegerType.instance)).toBeFalsy();
	expect(isAssignableTo(context, st, DecimalType.instance)).toBeFalsy();
	expect(isAssignableTo(context, st, TextType.instance)).toBeFalsy();
	expect(isAssignableTo(context, st, DateType.instance)).toBeFalsy();
	expect(isAssignableTo(context, st, DateTimeType.instance)).toBeFalsy();
	expect(isAssignableTo(context, st, MissingType.instance)).toBeTruthy();
	expect(isAssignableTo(context, st, AnyType.instance)).toBeTruthy();
	expect(isAssignableTo(context, st, new CategoryType(new Identifier("Root")))).toBeFalsy();
	expect(isAssignableTo(context, st, new CategoryType(new Identifier("Derived")))).toBeFalsy();
	expect(isAssignableTo(context, st, new CategoryType(new Identifier("Unrelated")))).toBeTruthy();
});


