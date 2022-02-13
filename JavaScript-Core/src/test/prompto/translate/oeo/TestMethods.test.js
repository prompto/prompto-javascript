var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

test('AbstractMember', () => {
	compareResourceOEO('methods/abstractMember.poc');
});

test('AbstractMemberItem', () => {
	compareResourceOEO('methods/abstractMemberItem.poc');
});

test('Anonymous', () => {
	compareResourceOEO('methods/anonymous.poc');
});

test('Attribute', () => {
	compareResourceOEO('methods/attribute.poc');
});

test('Default', () => {
	compareResourceOEO('methods/default.poc');
});

test('E_as_e_bug', () => {
	compareResourceOEO('methods/e_as_e_bug.poc');
});

test('Empty', () => {
	compareResourceOEO('methods/empty.poc');
});

test('Explicit', () => {
	compareResourceOEO('methods/explicit.poc');
});

test('ExplicitMember', () => {
	compareResourceOEO('methods/explicitMember.poc');
});

test('ExpressionMember', () => {
	compareResourceOEO('methods/expressionMember.poc');
});

test('ExpressionWith', () => {
	compareResourceOEO('methods/expressionWith.poc');
});

test('Extended', () => {
	compareResourceOEO('methods/extended.poc');
});

test('Global', () => {
	compareResourceOEO('methods/global.poc');
});

test('Homonym2', () => {
	compareResourceOEO('methods/homonym2.poc');
});

test('LocalMember', () => {
	compareResourceOEO('methods/localMember.poc');
});

test('Member', () => {
	compareResourceOEO('methods/member.poc');
});

test('MemberRef', () => {
	compareResourceOEO('methods/memberRef.poc');
});

test('Override', () => {
	compareResourceOEO('methods/override.poc');
});

test('Parameter', () => {
	compareResourceOEO('methods/parameter.poc');
});

test('PolymorphicAbstract', () => {
	compareResourceOEO('methods/polymorphicAbstract.poc');
});

test('PolymorphicMember', () => {
	compareResourceOEO('methods/polymorphicMember.poc');
});

test('PolymorphicNamed', () => {
	compareResourceOEO('methods/polymorphicNamed.poc');
});

test('PolymorphicRuntime', () => {
	compareResourceOEO('methods/polymorphicRuntime.poc');
});

test('Return', () => {
	compareResourceOEO('methods/return.poc');
});

test('Specified', () => {
	compareResourceOEO('methods/specified.poc');
});

test('TextAsync', () => {
	compareResourceOEO('methods/textAsync.poc');
});

test('VoidAsync', () => {
	compareResourceOEO('methods/voidAsync.poc');
});

