var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseEParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseEParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted ExpressionInjection', () => {
	checkInterpretedOutput('injections/expressionInjection.pec');
});

test('Transpiled ExpressionInjection', () => {
	checkTranspiledOutput('injections/expressionInjection.pec');
});

