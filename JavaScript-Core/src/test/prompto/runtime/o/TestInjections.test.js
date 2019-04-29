var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseOParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseOParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted ExpressionInjection', () => {
	checkInterpretedOutput('injections/expressionInjection.poc');
});

test('Transpiled ExpressionInjection', () => {
	checkTranspiledOutput('injections/expressionInjection.poc');
});

