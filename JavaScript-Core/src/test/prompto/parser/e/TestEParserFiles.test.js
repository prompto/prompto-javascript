var parseString = require("../BaseEParserTest").parseString;
var parseResource = require("../BaseEParserTest").parseResource;

test('Empty', () => {
	var stmts = parseString("");
	expect(stmts).toBeTruthy();
	expect(stmts.length).toEqual(0);
});


test('Native', () => {
	var stmts = parseResource("native/method.pec");
	expect(stmts).toBeTruthy();
	expect(stmts.length).toEqual(2);
});


test('Specified', () => {
	var stmts = parseResource("methods/specified.pec");
	expect(stmts).toBeTruthy();
	expect(stmts.length).toEqual(6);
});


test('Attribute', () => {
	var stmts = parseResource("methods/attribute.pec");
	expect(stmts).toBeTruthy();
	expect(stmts.length).toEqual(7);
});


test('EnumeratedCategory', () => {
	var stmts = parseResource("enums/categoryEnum.pec");
	expect(stmts).toBeTruthy();
	expect(stmts.length).toEqual(7);
});

