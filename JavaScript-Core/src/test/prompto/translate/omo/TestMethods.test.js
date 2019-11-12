var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

test('AbstractMember', () => {
	compareResourceOMO('methods/abstractMember.poc');
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

test('ImplicitMember', () => {
	compareResourceOMO('methods/implicitMember.poc');
});

test('Member', () => {
	compareResourceOMO('methods/member.poc');
});

test('Override', () => {
	compareResourceOMO('methods/override.poc');
});

test('Polymorphic_abstract', () => {
	compareResourceOMO('methods/polymorphic_abstract.poc');
});

test('Polymorphic_implicit', () => {
	compareResourceOMO('methods/polymorphic_implicit.poc');
});

test('Polymorphic_named', () => {
	compareResourceOMO('methods/polymorphic_named.poc');
});

test('Polymorphic_runtime', () => {
	compareResourceOMO('methods/polymorphic_runtime.poc');
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

