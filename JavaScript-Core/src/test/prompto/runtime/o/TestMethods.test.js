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

test('Interpreted ImplicitMember', () => {
	checkInterpretedOutput('methods/implicitMember.poc');
});

test('Transpiled ImplicitMember', () => {
	checkTranspiledOutput('methods/implicitMember.poc');
});

test('Interpreted Member', () => {
	checkInterpretedOutput('methods/member.poc');
});

test('Transpiled Member', () => {
	checkTranspiledOutput('methods/member.poc');
});

test('Interpreted Override', () => {
	checkInterpretedOutput('methods/override.poc');
});

test('Transpiled Override', () => {
	checkTranspiledOutput('methods/override.poc');
});

test('Interpreted Polymorphic_abstract', () => {
	checkInterpretedOutput('methods/polymorphic_abstract.poc');
});

test('Transpiled Polymorphic_abstract', () => {
	checkTranspiledOutput('methods/polymorphic_abstract.poc');
});

test('Interpreted Polymorphic_implicit', () => {
	checkInterpretedOutput('methods/polymorphic_implicit.poc');
});

test('Transpiled Polymorphic_implicit', () => {
	checkTranspiledOutput('methods/polymorphic_implicit.poc');
});

test('Interpreted Polymorphic_named', () => {
	checkInterpretedOutput('methods/polymorphic_named.poc');
});

test('Transpiled Polymorphic_named', () => {
	checkTranspiledOutput('methods/polymorphic_named.poc');
});

test('Interpreted Polymorphic_runtime', () => {
	checkInterpretedOutput('methods/polymorphic_runtime.poc');
});

test('Transpiled Polymorphic_runtime', () => {
	checkTranspiledOutput('methods/polymorphic_runtime.poc');
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

