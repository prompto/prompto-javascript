var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseEParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseEParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted AbstractMember', () => {
	checkInterpretedOutput('methods/abstractMember.pec');
});

test('Transpiled AbstractMember', () => {
	checkTranspiledOutput('methods/abstractMember.pec');
});

test('Interpreted Anonymous', () => {
	checkInterpretedOutput('methods/anonymous.pec');
});

test('Transpiled Anonymous', () => {
	checkTranspiledOutput('methods/anonymous.pec');
});

test('Interpreted Attribute', () => {
	checkInterpretedOutput('methods/attribute.pec');
});

test('Transpiled Attribute', () => {
	checkTranspiledOutput('methods/attribute.pec');
});

test('Interpreted Default', () => {
	checkInterpretedOutput('methods/default.pec');
});

test('Transpiled Default', () => {
	checkTranspiledOutput('methods/default.pec');
});

test('Interpreted E_as_e_bug', () => {
	checkInterpretedOutput('methods/e_as_e_bug.pec');
});

test('Transpiled E_as_e_bug', () => {
	checkTranspiledOutput('methods/e_as_e_bug.pec');
});

test('Interpreted Explicit', () => {
	checkInterpretedOutput('methods/explicit.pec');
});

test('Transpiled Explicit', () => {
	checkTranspiledOutput('methods/explicit.pec');
});

test('Interpreted ExplicitMember', () => {
	checkInterpretedOutput('methods/explicitMember.pec');
});

test('Transpiled ExplicitMember', () => {
	checkTranspiledOutput('methods/explicitMember.pec');
});

test('Interpreted ExpressionMember', () => {
	checkInterpretedOutput('methods/expressionMember.pec');
});

test('Transpiled ExpressionMember', () => {
	checkTranspiledOutput('methods/expressionMember.pec');
});

test('Interpreted ExpressionWith', () => {
	checkInterpretedOutput('methods/expressionWith.pec');
});

test('Transpiled ExpressionWith', () => {
	checkTranspiledOutput('methods/expressionWith.pec');
});

test('Interpreted Extended', () => {
	checkInterpretedOutput('methods/extended.pec');
});

test('Transpiled Extended', () => {
	checkTranspiledOutput('methods/extended.pec');
});

test('Interpreted Homonym', () => {
	checkInterpretedOutput('methods/homonym.pec');
});

test('Transpiled Homonym', () => {
	checkTranspiledOutput('methods/homonym.pec');
});

test('Interpreted Homonym2', () => {
	checkInterpretedOutput('methods/homonym2.pec');
});

test('Transpiled Homonym2', () => {
	checkTranspiledOutput('methods/homonym2.pec');
});

test('Interpreted ImplicitAnd', () => {
	checkInterpretedOutput('methods/implicitAnd.pec');
});

test('Transpiled ImplicitAnd', () => {
	checkTranspiledOutput('methods/implicitAnd.pec');
});

test('Interpreted Member', () => {
	checkInterpretedOutput('methods/member.pec');
});

test('Transpiled Member', () => {
	checkTranspiledOutput('methods/member.pec');
});

test('Interpreted MemberCall', () => {
	checkInterpretedOutput('methods/memberCall.pec');
});

test('Transpiled MemberCall', () => {
	checkTranspiledOutput('methods/memberCall.pec');
});

test('Interpreted MemberRef', () => {
	checkInterpretedOutput('methods/memberRef.pec');
});

test('Transpiled MemberRef', () => {
	checkTranspiledOutput('methods/memberRef.pec');
});

test('Interpreted Override', () => {
	checkInterpretedOutput('methods/override.pec');
});

test('Transpiled Override', () => {
	checkTranspiledOutput('methods/override.pec');
});

test('Interpreted Parameter', () => {
	checkInterpretedOutput('methods/parameter.pec');
});

test('Transpiled Parameter', () => {
	checkTranspiledOutput('methods/parameter.pec');
});

test('Interpreted PolymorphicAbstract', () => {
	checkInterpretedOutput('methods/polymorphicAbstract.pec');
});

test('Transpiled PolymorphicAbstract', () => {
	checkTranspiledOutput('methods/polymorphicAbstract.pec');
});

test('Interpreted PolymorphicMember', () => {
	checkInterpretedOutput('methods/polymorphicMember.pec');
});

test('Transpiled PolymorphicMember', () => {
	checkTranspiledOutput('methods/polymorphicMember.pec');
});

test('Interpreted PolymorphicNamed', () => {
	checkInterpretedOutput('methods/polymorphicNamed.pec');
});

test('Transpiled PolymorphicNamed', () => {
	checkTranspiledOutput('methods/polymorphicNamed.pec');
});

test('Interpreted PolymorphicRuntime', () => {
	checkInterpretedOutput('methods/polymorphicRuntime.pec');
});

test('Transpiled PolymorphicRuntime', () => {
	checkTranspiledOutput('methods/polymorphicRuntime.pec');
});

test('Interpreted Specified', () => {
	checkInterpretedOutput('methods/specified.pec');
});

test('Transpiled Specified', () => {
	checkTranspiledOutput('methods/specified.pec');
});

test('Interpreted TextAsync', () => {
	checkInterpretedOutput('methods/textAsync.pec');
});

test('Transpiled TextAsync', () => {
	checkTranspiledOutput('methods/textAsync.pec');
});

test('Interpreted VoidAsync', () => {
	checkInterpretedOutput('methods/voidAsync.pec');
});

test('Transpiled VoidAsync', () => {
	checkTranspiledOutput('methods/voidAsync.pec');
});

