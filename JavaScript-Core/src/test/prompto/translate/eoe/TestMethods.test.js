var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

test('AbstractMember', () => {
	compareResourceEOE('methods/abstractMember.pec');
});

test('Anonymous', () => {
	compareResourceEOE('methods/anonymous.pec');
});

test('Attribute', () => {
	compareResourceEOE('methods/attribute.pec');
});

test('Default', () => {
	compareResourceEOE('methods/default.pec');
});

test('E_as_e_bug', () => {
	compareResourceEOE('methods/e_as_e_bug.pec');
});

test('Empty', () => {
	compareResourceEOE('methods/empty.pec');
});

test('Explicit', () => {
	compareResourceEOE('methods/explicit.pec');
});

test('ExplicitMember', () => {
	compareResourceEOE('methods/explicitMember.pec');
});

test('ExpressionMember', () => {
	compareResourceEOE('methods/expressionMember.pec');
});

test('ExpressionWith', () => {
	compareResourceEOE('methods/expressionWith.pec');
});

test('Extended', () => {
	compareResourceEOE('methods/extended.pec');
});

test('Global', () => {
	compareResourceEOE('methods/global.pec');
});

test('Homonym', () => {
	compareResourceEOE('methods/homonym.pec');
});

test('Homonym2', () => {
	compareResourceEOE('methods/homonym2.pec');
});

test('ImplicitAnd', () => {
	compareResourceEOE('methods/implicitAnd.pec');
});

test('Member', () => {
	compareResourceEOE('methods/member.pec');
});

test('MemberCall', () => {
	compareResourceEOE('methods/memberCall.pec');
});

test('MemberRef', () => {
	compareResourceEOE('methods/memberRef.pec');
});

test('Override', () => {
	compareResourceEOE('methods/override.pec');
});

test('Parameter', () => {
	compareResourceEOE('methods/parameter.pec');
});

test('PolymorphicAbstract', () => {
	compareResourceEOE('methods/polymorphicAbstract.pec');
});

test('PolymorphicNamed', () => {
	compareResourceEOE('methods/polymorphicNamed.pec');
});

test('PolymorphicRuntime', () => {
	compareResourceEOE('methods/polymorphicRuntime.pec');
});

test('Return', () => {
	compareResourceEOE('methods/return.pec');
});

test('Specified', () => {
	compareResourceEOE('methods/specified.pec');
});

test('TextAsync', () => {
	compareResourceEOE('methods/textAsync.pec');
});

test('VoidAsync', () => {
	compareResourceEOE('methods/voidAsync.pec');
});

