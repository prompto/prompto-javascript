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

test('ImplicitAnd', () => {
	compareResourceEOE('methods/implicitAnd.pec');
});

test('ImplicitMember', () => {
	compareResourceEOE('methods/implicitMember.pec');
});

test('Member', () => {
	compareResourceEOE('methods/member.pec');
});

test('MemberCall', () => {
	compareResourceEOE('methods/memberCall.pec');
});

test('Override', () => {
	compareResourceEOE('methods/override.pec');
});

test('Polymorphic_abstract', () => {
	compareResourceEOE('methods/polymorphic_abstract.pec');
});

test('Polymorphic_implicit', () => {
	compareResourceEOE('methods/polymorphic_implicit.pec');
});

test('Polymorphic_named', () => {
	compareResourceEOE('methods/polymorphic_named.pec');
});

test('Polymorphic_runtime', () => {
	compareResourceEOE('methods/polymorphic_runtime.pec');
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

