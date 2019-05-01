var prompto = require("../../../../../JavaScript-Core/src/main/prompto/index.js");
var Out = require("../../../../../JavaScript-Core/src/test/prompto/runtime/utils/Out").Out;
var BaseParserTest = require("../../../../../JavaScript-Core/src/test/prompto/parser/BaseParserTest");
var loadDependency = require("../../../../../JavaScript-Core/src/test/prompto/parser/BaseEParserTest").loadDependency;
var runInterpretedTests = require("../../../../../JavaScript-Core/src/test/prompto/parser/BaseEParserTest").runInterpretedTests;
var runTranspiledTests = require("../../../../../JavaScript-Core/src/test/prompto/parser/BaseEParserTest").runTranspiledTests;

beforeEach( () => {
	Out.init();
	BaseParserTest.coreContext = null;
	loadDependency("console");
	loadDependency("core");
});

afterEach( () => {
	Out.restore();
});

test('Interpreted Buffer', () => {
	runInterpretedTests('console/buffer.pec');
});

test('Transpiled Buffer', () => {
	runTranspiledTests('console/buffer.pec');
});

test('Interpreted Print', () => {
	runInterpretedTests('console/print.pec');
});

test('Transpiled Print', () => {
	runTranspiledTests('console/print.pec');
});

