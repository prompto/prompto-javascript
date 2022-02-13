var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

test('AbstractMember', () => {
	compareResourceOMO('methods/abstractMember.poc');
});

test('AbstractMemberItem', () => {
	compareResourceOMO('methods/abstractMemberItem.poc');
});

test('Anonymous', () => {
	compareResourceOMO('methods/anonymous.poc');
});

test('Attribute', () => {
	compareResourceOMO('methods/attribute.poc');
});

test('Default', () => {
	compareResourceOMO('methods/default.poc');
});

test('E_as_e_bug', () => {
	compareResourceOMO('methods/e_as_e_bug.poc');
});

test('Empty', () => {
	compareResourceOMO('methods/empty.poc');
});

test('Explicit', () => {
	compareResourceOMO('methods/explicit.poc');
});

test('ExplicitMember', () => {
	compareResourceOMO('methods/explicitMember.poc');
});

test('ExpressionMember', () => {
	compareResourceOMO('methods/expressionMember.poc');
});

test('ExpressionWith', () => {
	compareResourceOMO('methods/expressionWith.poc');
});

test('Extended', () => {
	compareResourceOMO('methods/extended.poc');
});

test('Global', () => {
	compareResourceOMO('methods/global.poc');
});

test('Homonym2', () => {
	compareResourceOMO('methods/homonym2.poc');
});

test('LocalMember', () => {
	compareResourceOMO('methods/localMember.poc');
});

test('Member', () => {
	compareResourceOMO('methods/member.poc');
});

test('MemberRef', () => {
	compareResourceOMO('methods/memberRef.poc');
});

test('Override', () => {
	compareResourceOMO('methods/override.poc');
});

test('Parameter', () => {
	compareResourceOMO('methods/parameter.poc');
});

test('PolymorphicAbstract', () => {
	compareResourceOMO('methods/polymorphicAbstract.poc');
});

test('PolymorphicMember', () => {
	compareResourceOMO('methods/polymorphicMember.poc');
});

test('PolymorphicNamed', () => {
	compareResourceOMO('methods/polymorphicNamed.poc');
});

test('PolymorphicRuntime', () => {
	compareResourceOMO('methods/polymorphicRuntime.poc');
});

test('Return', () => {
	compareResourceOMO('methods/return.poc');
});

test('Specified', () => {
	compareResourceOMO('methods/specified.poc');
});

test('TextAsync', () => {
	compareResourceOMO('methods/textAsync.poc');
});

test('VoidAsync', () => {
	compareResourceOMO('methods/voidAsync.poc');
});

