var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

test('AbstractMember', () => {
	compareResourceEME('methods/abstractMember.pec');
});

test('Anonymous', () => {
	compareResourceEME('methods/anonymous.pec');
});

test('Attribute', () => {
	compareResourceEME('methods/attribute.pec');
});

test('Default', () => {
	compareResourceEME('methods/default.pec');
});

test('E_as_e_bug', () => {
	compareResourceEME('methods/e_as_e_bug.pec');
});

test('Empty', () => {
	compareResourceEME('methods/empty.pec');
});

test('Explicit', () => {
	compareResourceEME('methods/explicit.pec');
});

test('ExplicitMember', () => {
	compareResourceEME('methods/explicitMember.pec');
});

test('ExpressionMember', () => {
	compareResourceEME('methods/expressionMember.pec');
});

test('ExpressionWith', () => {
	compareResourceEME('methods/expressionWith.pec');
});

test('Extended', () => {
	compareResourceEME('methods/extended.pec');
});

test('Global', () => {
	compareResourceEME('methods/global.pec');
});

test('Homonym', () => {
	compareResourceEME('methods/homonym.pec');
});

test('Homonym2', () => {
	compareResourceEME('methods/homonym2.pec');
});

test('ImplicitAnd', () => {
	compareResourceEME('methods/implicitAnd.pec');
});

test('Member', () => {
	compareResourceEME('methods/member.pec');
});

test('MemberCall', () => {
	compareResourceEME('methods/memberCall.pec');
});

test('MemberRef', () => {
	compareResourceEME('methods/memberRef.pec');
});

test('Override', () => {
	compareResourceEME('methods/override.pec');
});

test('Parameter', () => {
	compareResourceEME('methods/parameter.pec');
});

test('PolymorphicAbstract', () => {
	compareResourceEME('methods/polymorphicAbstract.pec');
});

test('PolymorphicNamed', () => {
	compareResourceEME('methods/polymorphicNamed.pec');
});

test('PolymorphicRuntime', () => {
	compareResourceEME('methods/polymorphicRuntime.pec');
});

test('Return', () => {
	compareResourceEME('methods/return.pec');
});

test('Specified', () => {
	compareResourceEME('methods/specified.pec');
});

test('TextAsync', () => {
	compareResourceEME('methods/textAsync.pec');
});

test('VoidAsync', () => {
	compareResourceEME('methods/voidAsync.pec');
});

