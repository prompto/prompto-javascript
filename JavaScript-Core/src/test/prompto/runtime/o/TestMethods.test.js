var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseOParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseOParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted AbstractMember', () => {
	checkInterpretedOutput('methods/abstractMember.poc');
});

test('Transpiled AbstractMember', () => {
	checkTranspiledOutput('methods/abstractMember.poc');
});

test('Interpreted AbstractMemberItem', () => {
	checkInterpretedOutput('methods/abstractMemberItem.poc');
});

test('Transpiled AbstractMemberItem', () => {
	checkTranspiledOutput('methods/abstractMemberItem.poc');
});

test('Interpreted Anonymous', () => {
	checkInterpretedOutput('methods/anonymous.poc');
});

test('Transpiled Anonymous', () => {
	checkTranspiledOutput('methods/anonymous.poc');
});

test('Interpreted Attribute', () => {
	checkInterpretedOutput('methods/attribute.poc');
});

test('Transpiled Attribute', () => {
	checkTranspiledOutput('methods/attribute.poc');
});

test('Interpreted Default', () => {
	checkInterpretedOutput('methods/default.poc');
});

test('Transpiled Default', () => {
	checkTranspiledOutput('methods/default.poc');
});

test('Interpreted E_as_e_bug', () => {
	checkInterpretedOutput('methods/e_as_e_bug.poc');
});

test('Transpiled E_as_e_bug', () => {
	checkTranspiledOutput('methods/e_as_e_bug.poc');
});

test('Interpreted Explicit', () => {
	checkInterpretedOutput('methods/explicit.poc');
});

test('Transpiled Explicit', () => {
	checkTranspiledOutput('methods/explicit.poc');
});

test('Interpreted ExplicitMember', () => {
	checkInterpretedOutput('methods/explicitMember.poc');
});

test('Transpiled ExplicitMember', () => {
	checkTranspiledOutput('methods/explicitMember.poc');
});

test('Interpreted ExpressionMember', () => {
	checkInterpretedOutput('methods/expressionMember.poc');
});

test('Transpiled ExpressionMember', () => {
	checkTranspiledOutput('methods/expressionMember.poc');
});

test('Interpreted ExpressionWith', () => {
	checkInterpretedOutput('methods/expressionWith.poc');
});

test('Transpiled ExpressionWith', () => {
	checkTranspiledOutput('methods/expressionWith.poc');
});

test('Interpreted Extended', () => {
	checkInterpretedOutput('methods/extended.poc');
});

test('Transpiled Extended', () => {
	checkTranspiledOutput('methods/extended.poc');
});

test('Interpreted Homonym2', () => {
	checkInterpretedOutput('methods/homonym2.poc');
});

test('Transpiled Homonym2', () => {
	checkTranspiledOutput('methods/homonym2.poc');
});

test('Interpreted InheritedMember', () => {
	checkInterpretedOutput('methods/inheritedMember.poc');
});

test('Transpiled InheritedMember', () => {
	checkTranspiledOutput('methods/inheritedMember.poc');
});

test('Interpreted LocalMember', () => {
	checkInterpretedOutput('methods/localMember.poc');
});

test('Transpiled LocalMember', () => {
	checkTranspiledOutput('methods/localMember.poc');
});

test('Interpreted Member', () => {
	checkInterpretedOutput('methods/member.poc');
});

test('Transpiled Member', () => {
	checkTranspiledOutput('methods/member.poc');
});

test('Interpreted MemberRef', () => {
	checkInterpretedOutput('methods/memberRef.poc');
});

test('Transpiled MemberRef', () => {
	checkTranspiledOutput('methods/memberRef.poc');
});

test('Interpreted Override', () => {
	checkInterpretedOutput('methods/override.poc');
});

test('Transpiled Override', () => {
	checkTranspiledOutput('methods/override.poc');
});

test('Interpreted Parameter', () => {
	checkInterpretedOutput('methods/parameter.poc');
});

test('Transpiled Parameter', () => {
	checkTranspiledOutput('methods/parameter.poc');
});

test('Interpreted PolymorphicAbstract', () => {
	checkInterpretedOutput('methods/polymorphicAbstract.poc');
});

test('Transpiled PolymorphicAbstract', () => {
	checkTranspiledOutput('methods/polymorphicAbstract.poc');
});

test('Interpreted PolymorphicMember', () => {
	checkInterpretedOutput('methods/polymorphicMember.poc');
});

test('Transpiled PolymorphicMember', () => {
	checkTranspiledOutput('methods/polymorphicMember.poc');
});

test('Interpreted PolymorphicNamed', () => {
	checkInterpretedOutput('methods/polymorphicNamed.poc');
});

test('Transpiled PolymorphicNamed', () => {
	checkTranspiledOutput('methods/polymorphicNamed.poc');
});

test('Interpreted PolymorphicRuntime', () => {
	checkInterpretedOutput('methods/polymorphicRuntime.poc');
});

test('Transpiled PolymorphicRuntime', () => {
	checkTranspiledOutput('methods/polymorphicRuntime.poc');
});

test('Interpreted Specified', () => {
	checkInterpretedOutput('methods/specified.poc');
});

test('Transpiled Specified', () => {
	checkTranspiledOutput('methods/specified.poc');
});

test('Interpreted TextAsync', () => {
	checkInterpretedOutput('methods/textAsync.poc');
});

test('Transpiled TextAsync', () => {
	checkTranspiledOutput('methods/textAsync.poc');
});

test('Interpreted VoidAsync', () => {
	checkInterpretedOutput('methods/voidAsync.poc');
});

test('Transpiled VoidAsync', () => {
	checkTranspiledOutput('methods/voidAsync.poc');
});

